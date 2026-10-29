# Barber Loyalty Card — how to put it online

Total time: about 15 minutes. Total cost: free.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The customer's page: they sign up, then see their stamp card |
| `barber.html` | Your friend's dashboard: scan cards, add stamps, give free cuts, send WhatsApp reminders |
| `poster.html` | A printable poster with the QR code for the counter |
| `config.js` | Shop name, number of stamps, reminder days, country code, database keys |
| `setup.sql` | Creates the database (you paste it in once) |

Until you finish step 2, the app runs in **demo mode**: everything works, but the data stays inside one browser. That's for trying it out, not for real customers.

---

## Step 1 — Check the shop settings

`config.js` is already set up for Yoyo & Kreik:

- `shopName` — "Yoyo & Kreik" / "يويو وكريك"
- `bookingPhone` — `71181512`, the reservations number from their Instagram. It powers the "Book your next cut" WhatsApp button.
- `countryCode` — `961` (Lebanon), so numbers like `71 123 456` work in WhatsApp links.

**Logo:** `img/logo.jpg` is the Instagram profile picture, which is only 150×150 pixels. For a sharp printed poster, ask your friend for the original logo file and save it over `img/logo.jpg`. Keep the same name; a square PNG or JPG of at least 600×600 works best.

## Step 2 — Create the database (Supabase)

1. Go to **supabase.com** and sign up (free).
2. Click **New project**. Pick any name and a strong database password, and choose the region closest to the shop. Wait about a minute for it to finish.
3. In the left menu, open **SQL Editor** and click **New query**. Open `setup.sql` in Notepad, copy everything, paste it in, and press **Run**. You should see "Success".
4. Create your friend's login. Go to **Authentication → Users → Add user → Create new user**, enter his email and a password, and tick **Auto Confirm User**.
5. **Important:** go to **Authentication → Sign In / Providers** (also listed as Settings) and turn **off** "Allow new users to sign up". This way nobody else can make a barber login.
6. Go to **Project Settings → API** (or **Data API**) and copy two things:
   - **Project URL**: put it in `supabaseUrl` in `config.js`
   - **anon public key**: put it in `supabaseAnonKey` in `config.js`

   The anon key is meant to be public, so it's fine to have it in the website. Never use the `service_role` key.

## Step 3 — The website (GitHub Pages)

The site is hosted for free by GitHub Pages from the `main` branch of the **SDKSpaces/yoyo-kreik** repository:

- Customer page: `https://sdkspaces.github.io/yoyo-kreik/`
- Barber dashboard: `https://sdkspaces.github.io/yoyo-kreik/barber.html`
- Poster: `https://sdkspaces.github.io/yoyo-kreik/poster.html`

To change something, edit the files, commit and push to `main`. The live site updates within a minute or two.

## Step 4 — Set up the shop

1. On your friend's phone, open `https://sdkspaces.github.io/yoyo-kreik/barber.html`, log in, and add it to his home screen.
2. Open `https://sdkspaces.github.io/yoyo-kreik/poster.html` and print it. Put it on the counter or mirror.

## How it works day to day

- **New customer:** scans the poster, enters name + phone, and gets their card. Tell them to add it to their home screen.
- **After a haircut:** the customer shows the QR code on their card. The barber taps **Scan card**, then **+ Add stamp**. The customer's card updates within a few seconds.
- **No phone or no QR:** the barber searches by name or phone, or uses **New customer** and then **Send card** to WhatsApp them their link.
- **10 stamps:** the card shows "free haircut ready". The barber taps **Give free haircut**, and the card starts again from 0.
- **Bringing people back:** the **Due for a visit** tab lists everyone who hasn't come in for 21+ days. One tap on **WhatsApp** opens a ready-made reminder message in the customer's language.

## Good to know

- Supabase free projects **pause after 7 days with no activity**. If the shop uses it every day this won't happen. If it ever pauses, log in to supabase.com and click **Restore**.
- If a customer loses their phone, they just sign up again with the same number and get the same card back.
- Free limits (around 50,000 customers, 500 MB) are far more than one shop needs.
