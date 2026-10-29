// Data layer: Supabase when configured, otherwise a localStorage demo.
const API = (() => {
  const cfg = APP_CONFIG;
  const MAX = cfg.stampsNeeded;
  const demo = !(cfg.supabaseUrl && cfg.supabaseAnonKey);

  function cleanPhone(p) {
    return String(p || "").replace(/[^0-9+]/g, "");
  }

  function validate(name, phone) {
    if (!String(name || "").trim() || cleanPhone(phone).replace("+", "").length < 6) throw new Error("invalid");
  }

  // ---------- Demo backend (single browser) ----------
  function load() {
    try { return JSON.parse(localStorage.getItem("bc_demo")) || { customers: [], visits: [] }; }
    catch (e) { return { customers: [], visits: [] }; }
  }
  function save(db) {
    try { localStorage.setItem("bc_demo", JSON.stringify(db)); } catch (e) {}
  }
  function randToken() {
    const a = new Uint8Array(12);
    crypto.getRandomValues(a);
    return Array.from(a, b => b.toString(16).padStart(2, "0")).join("");
  }

  const demoApi = {
    async register(name, phone, lang) {
      validate(name, phone);
      const db = load();
      const p = cleanPhone(phone);
      let c = db.customers.find(x => x.phone === p);
      if (!c) {
        c = {
          id: randToken(), token: randToken(), name: String(name).trim().slice(0, 60), phone: p, lang,
          stamps: 0, rewards_redeemed: 0, total_visits: 0, last_visit: null, created_at: new Date().toISOString()
        };
        db.customers.push(c);
        save(db);
      }
      return c.token;
    },
    async getCard(token) {
      const c = load().customers.find(x => x.token === token);
      return c ? { name: c.name, stamps: c.stamps, rewards_redeemed: c.rewards_redeemed, last_visit: c.last_visit } : null;
    },
    async signIn() { return true; },
    async signOut() {},
    async isSignedIn() { return true; },
    async listCustomers() { return load().customers; },
    async addStamp(id) {
      const db = load();
      const c = db.customers.find(x => x.id === id);
      if (!c || c.stamps >= MAX) throw new Error("full");
      c.stamps++; c.total_visits++; c.last_visit = new Date().toISOString();
      db.visits.push({ customer_id: id, kind: "stamp", created_at: c.last_visit });
      save(db);
      return c;
    },
    async redeem(id) {
      const db = load();
      const c = db.customers.find(x => x.id === id);
      if (!c || c.stamps < MAX) throw new Error("not_full");
      c.stamps = 0; c.rewards_redeemed++; c.last_visit = new Date().toISOString();
      db.visits.push({ customer_id: id, kind: "redeem", created_at: c.last_visit });
      save(db);
      return c;
    },
    async visitsSince(iso) {
      return load().visits.filter(v => v.kind === "stamp" && v.created_at >= iso).length;
    }
  };

  // ---------- Supabase backend ----------
  let sb = null;
  function client() {
    if (!sb) sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    return sb;
  }
  function check({ data, error }) {
    if (error) throw error;
    return data;
  }

  const liveApi = {
    async register(name, phone, lang) {
      validate(name, phone);
      return check(await client().rpc("register_customer", { p_name: String(name).trim(), p_phone: cleanPhone(phone), p_lang: lang }));
    },
    async getCard(token) {
      const rows = check(await client().rpc("get_card", { p_token: token }));
      return rows && rows.length ? rows[0] : null;
    },
    async signIn(email, password) {
      check(await client().auth.signInWithPassword({ email, password }));
      return true;
    },
    async signOut() { await client().auth.signOut(); },
    async isSignedIn() {
      const { data } = await client().auth.getSession();
      return !!(data && data.session);
    },
    async listCustomers() {
      return check(await client().from("customers").select("*").order("last_visit", { ascending: false, nullsFirst: false }));
    },
    async addStamp(id) {
      const c = check(await client().rpc("add_stamp", { p_id: id, p_max: MAX }));
      if (!c || !c.id) throw new Error("full");
      return c;
    },
    async redeem(id) {
      const c = check(await client().rpc("redeem_reward", { p_id: id, p_max: MAX }));
      if (!c || !c.id) throw new Error("not_full");
      return c;
    },
    async visitsSince(iso) {
      const { count, error } = await client().from("visits").select("id", { count: "exact", head: true }).eq("kind", "stamp").gte("created_at", iso);
      if (error) throw error;
      return count || 0;
    }
  };

  return Object.assign({ demo, cleanPhone }, demo ? demoApi : liveApi);
})();

function showDemoBanner() {
  if (!API.demo) return;
  const b = document.createElement("div");
  b.className = "demo-banner";
  b.dataset.i18n = "demoBanner";
  b.textContent = t("demoBanner");
  document.body.prepend(b);
}
