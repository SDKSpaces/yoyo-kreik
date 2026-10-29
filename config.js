// ===== Shop settings — edit these =====
window.APP_CONFIG = {
  shopName: { en: "Yoyo & Kreik", ar: "يويو وكريك" },

  // Reservations number (shown as a "Book" button on the customer card). Leave empty to hide.
  bookingPhone: "71181512",

  // Stamps needed for a free haircut
  stampsNeeded: 10,

  // A customer shows up under "Due for a visit" after this many days
  remindAfterDays: 21,

  // Country calling code without "+" (961 = Lebanon).
  // Used to turn local numbers like 71 123 456 into WhatsApp links.
  countryCode: "961",

  // Leave both empty to run in DEMO mode (data stays in this browser only).
  // Fill them in from Supabase -> Project Settings -> API to go live.
  supabaseUrl: "",
  supabaseAnonKey: ""
};
