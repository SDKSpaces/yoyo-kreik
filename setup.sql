-- Barber loyalty card — database setup
-- Paste this whole file into Supabase -> SQL Editor -> New query, then press Run.

create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  token text unique not null default encode(gen_random_bytes(12), 'hex'),
  name text not null,
  phone text unique not null,
  lang text not null default 'ar',
  stamps int not null default 0,
  rewards_redeemed int not null default 0,
  total_visits int not null default 0,
  last_visit timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists visits (
  id bigserial primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  kind text not null check (kind in ('stamp', 'redeem')),
  created_at timestamptz not null default now()
);

-- Only the signed-in barber can read or change data directly.
-- (Explicit grants so this works whether or not "expose new tables" is enabled.)
revoke all on customers, visits from anon;
grant select, insert, update, delete on customers, visits to authenticated;
grant usage, select on sequence visits_id_seq to authenticated;

alter table customers enable row level security;
alter table visits enable row level security;

drop policy if exists "barber full access" on customers;
create policy "barber full access" on customers for all to authenticated using (true) with check (true);
drop policy if exists "barber full access" on visits;
create policy "barber full access" on visits for all to authenticated using (true) with check (true);

-- Customers (not signed in) can only: create a card, and view their own card by its secret token.
create or replace function register_customer(p_name text, p_phone text, p_lang text default 'ar')
returns text language plpgsql security definer set search_path = public as $$
declare
  v_phone text := regexp_replace(coalesce(p_phone, ''), '[^0-9+]', '', 'g');
  v_name text := left(trim(coalesce(p_name, '')), 60);
  v_token text;
begin
  if v_name = '' or length(replace(v_phone, '+', '')) < 6 then
    raise exception 'invalid';
  end if;
  insert into customers (name, phone, lang)
  values (v_name, v_phone, case when p_lang = 'en' then 'en' else 'ar' end)
  on conflict (phone) do update set lang = excluded.lang
  returning token into v_token;
  return v_token;
end $$;

create or replace function get_card(p_token text)
returns table (name text, stamps int, rewards_redeemed int, last_visit timestamptz)
language sql stable security definer set search_path = public as $$
  select c.name, c.stamps, c.rewards_redeemed, c.last_visit from customers c where c.token = p_token;
$$;

-- Barber-only actions (run with the barber's permissions, so row level security applies).
create or replace function add_stamp(p_id uuid, p_max int)
returns customers language plpgsql set search_path = public as $$
declare c customers;
begin
  update customers
     set stamps = stamps + 1, total_visits = total_visits + 1, last_visit = now()
   where id = p_id and stamps < p_max
  returning * into c;
  if c.id is not null then
    insert into visits (customer_id, kind) values (c.id, 'stamp');
  end if;
  return c;
end $$;

create or replace function redeem_reward(p_id uuid, p_max int)
returns customers language plpgsql set search_path = public as $$
declare c customers;
begin
  update customers
     set stamps = 0, rewards_redeemed = rewards_redeemed + 1, last_visit = now()
   where id = p_id and stamps >= p_max
  returning * into c;
  if c.id is not null then
    insert into visits (customer_id, kind) values (c.id, 'redeem');
  end if;
  return c;
end $$;

revoke all on function register_customer(text, text, text) from public;
revoke all on function get_card(text) from public;
revoke all on function add_stamp(uuid, int) from public, anon;
revoke all on function redeem_reward(uuid, int) from public, anon;

grant execute on function register_customer(text, text, text) to anon, authenticated;
grant execute on function get_card(text) to anon, authenticated;
grant execute on function add_stamp(uuid, int) to authenticated;
grant execute on function redeem_reward(uuid, int) to authenticated;
