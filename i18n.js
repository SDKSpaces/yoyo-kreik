// Arabic / English text and language switching
const STRINGS = {
  en: {
    demoBanner: "Demo mode — data is saved in this browser only",
    joinTitle: "Your loyalty card",
    joinLead: "Collect {max} stamps and your next haircut is on us.",
    name: "Your name",
    phone: "Phone number",
    getCard: "Get my card",
    joining: "Creating your card…",
    joinError: "Please enter your name and a valid phone number.",
    netError: "Something went wrong. Please try again.",
    hello: "Hi {name}",
    progress: "{n} of {max} stamps",
    toGo: "{left} more for a free haircut",
    rewardReady: "Your free haircut is ready!",
    rewardHint: "Show this card to your barber to redeem it.",
    showBarber: "Show this code to your barber after your cut",
    homeTip: "Tip: add this page to your home screen so your card is always one tap away.",
    notYou: "Not you? Use a different number",
    book: "Book your next cut",
    freeCuts: "Free cuts earned: {n}",
    lastVisit: "Last visit: {date}",
    cardNotFound: "We couldn't find this card.",
    // barber
    barberTitle: "Barber dashboard",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    signOut: "Sign out",
    signInError: "Wrong email or password.",
    notConfirmed: "This account is not confirmed yet. Confirm the user in Supabase.",
    scan: "Scan card",
    stopScan: "Stop camera",
    searchPh: "Search name or phone…",
    addCustomer: "New customer",
    add: "Add",
    cancel: "Cancel",
    addStamp: "+ Add stamp",
    redeem: "Give free haircut",
    whatsapp: "WhatsApp",
    sendCard: "Send card",
    stamped: "Stamp added ✓",
    redeemed: "Free haircut given ✓ — card reset",
    undo: "Undo last stamp",
    confirmUndo: "Undo the last stamp (or free haircut) for {name}?",
    undone: "Undone ✓",
    nothingToUndo: "Nothing to undo for this customer.",
    deleteCustomer: "Delete customer",
    confirmDelete: "Delete {name} and all their stamps? This cannot be undone.",
    deleted: "Customer deleted",
    cardFull: "Card is full — give the free haircut first.",
    recentStamp: "This customer got a stamp {min} min ago. Add another?",
    statCustomers: "Customers",
    statMonth: "Visits this month",
    statFree: "Free cuts given",
    tabAll: "All",
    tabDue: "Due for a visit",
    tabReady: "Reward ready",
    noCustomers: "No customers here yet.",
    never: "never",
    daysAgo: "{d} days ago",
    today: "today",
    notFound: "Card not found.",
    scanError: "Couldn't open the camera.",
    poster: "Print counter poster",
    close: "Close",
    remindMsg: "Hi {name}! We miss you at {shop} ✂️ You have {n} of {max} stamps — book your next cut. Your card: {link}",
    cardMsg: "Hi {name}! Here is your {shop} loyalty card — collect {max} stamps for a free haircut: {link}",
    // poster
    posterTitle: "Every 10th haircut is FREE",
    posterSub: "Scan to get your loyalty card"
  },
  ar: {
    demoBanner: "وضع تجريبي — البيانات محفوظة في هذا المتصفح فقط",
    joinTitle: "بطاقة الولاء",
    joinLead: "اجمع {max} أختام وقصتك القادمة مجاناً علينا.",
    name: "اسمك",
    phone: "رقم الجوال",
    getCard: "احصل على بطاقتي",
    joining: "جارٍ إنشاء بطاقتك…",
    joinError: "يرجى إدخال اسمك ورقم جوال صحيح.",
    netError: "حدث خطأ، حاول مرة أخرى.",
    hello: "أهلاً {name}",
    progress: "{n} من {max} أختام",
    toGo: "باقي {left} للحصول على قصة مجانية",
    rewardReady: "قصتك المجانية جاهزة!",
    rewardHint: "اعرض هذه البطاقة على الحلاق لاستلامها.",
    showBarber: "اعرض هذا الرمز على الحلاق بعد القصة",
    homeTip: "نصيحة: أضف هذه الصفحة إلى الشاشة الرئيسية لتكون بطاقتك دائماً في متناولك.",
    notYou: "لست أنت؟ استخدم رقماً آخر",
    book: "احجز موعدك القادم",
    freeCuts: "القصات المجانية: {n}",
    lastVisit: "آخر زيارة: {date}",
    cardNotFound: "لم نجد هذه البطاقة.",
    barberTitle: "لوحة الحلاق",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "دخول",
    signOut: "خروج",
    signInError: "البريد أو كلمة المرور غير صحيحة.",
    notConfirmed: "هذا الحساب غير مؤكد بعد. قم بتأكيد المستخدم في Supabase.",
    scan: "مسح البطاقة",
    stopScan: "إيقاف الكاميرا",
    searchPh: "ابحث بالاسم أو الرقم…",
    addCustomer: "عميل جديد",
    add: "إضافة",
    cancel: "إلغاء",
    addStamp: "+ إضافة ختم",
    redeem: "منح قصة مجانية",
    whatsapp: "واتساب",
    sendCard: "إرسال البطاقة",
    stamped: "تمت إضافة الختم ✓",
    redeemed: "تم منح القصة المجانية ✓ — بدأت بطاقة جديدة",
    undo: "تراجع عن آخر ختم",
    confirmUndo: "التراجع عن آخر ختم (أو قصة مجانية) لـ {name}؟",
    undone: "تم التراجع ✓",
    nothingToUndo: "لا يوجد شيء للتراجع عنه.",
    deleteCustomer: "حذف العميل",
    confirmDelete: "حذف {name} وجميع أختامه؟ لا يمكن التراجع عن ذلك.",
    deleted: "تم حذف العميل",
    cardFull: "البطاقة ممتلئة — امنح القصة المجانية أولاً.",
    recentStamp: "هذا العميل حصل على ختم قبل {min} دقيقة. إضافة ختم آخر؟",
    statCustomers: "العملاء",
    statMonth: "زيارات هذا الشهر",
    statFree: "قصات مجانية",
    tabAll: "الكل",
    tabDue: "حان موعد زيارته",
    tabReady: "المكافأة جاهزة",
    noCustomers: "لا يوجد عملاء هنا بعد.",
    never: "لا توجد",
    daysAgo: "قبل {d} يوم",
    today: "اليوم",
    notFound: "البطاقة غير موجودة.",
    scanError: "تعذّر فتح الكاميرا.",
    poster: "طباعة ملصق الكاونتر",
    close: "إغلاق",
    remindMsg: "أهلاً {name}! اشتقنا لك في {shop} ✂️ لديك {n} من {max} أختام — احجز قصتك القادمة. بطاقتك: {link}",
    cardMsg: "أهلاً {name}! هذه بطاقة الولاء الخاصة بك في {shop} — اجمع {max} أختام واحصل على قصة مجانية: {link}",
    posterTitle: "القصة العاشرة مجاناً",
    posterSub: "امسح الرمز للحصول على بطاقة الولاء"
  }
};

const I18N = (() => {
  let lang;
  try { lang = localStorage.getItem("bc_lang"); } catch (e) {}
  if (lang !== "en" && lang !== "ar") lang = (navigator.language || "").startsWith("ar") ? "ar" : "en";

  function t(key, vars = {}) {
    let s = (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
    for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = t(el.dataset.i18n, { max: APP_CONFIG.stampsNeeded });
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      el.placeholder = t(el.dataset.i18nPh);
    });
    // Wordmark always uses the Latin name, like the logo, with a red "&"
    document.querySelectorAll(".shop-name").forEach(el => {
      el.textContent = "";
      APP_CONFIG.shopName.en.split("&").forEach((part, i) => {
        if (i) { const em = document.createElement("em"); em.textContent = "&"; el.appendChild(em); }
        el.appendChild(document.createTextNode(part));
      });
    });
    document.querySelectorAll(".lang-toggle").forEach(el => {
      el.textContent = lang === "ar" ? "English" : "العربية";
    });
  }

  function set(l) {
    lang = l;
    try { localStorage.setItem("bc_lang", l); } catch (e) {}
    apply();
    document.dispatchEvent(new Event("langchange"));
  }

  document.addEventListener("click", e => {
    if (e.target.closest(".lang-toggle")) set(lang === "ar" ? "en" : "ar");
  });

  return { t, apply, set, get lang() { return lang; } };
})();

const t = I18N.t;

function shopName() {
  return APP_CONFIG.shopName[I18N.lang] || APP_CONFIG.shopName.en;
}

function fmtDate(iso) {
  if (!iso) return t("never");
  return new Date(iso).toLocaleDateString(I18N.lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function daysSince(iso) {
  if (!iso) return null;
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

// Phone number in WhatsApp's international format (no + or leading zeros)
function waNumber(phone) {
  let p = String(phone || "");
  const intl = p.startsWith("+") || p.startsWith("00");
  p = p.replace(/\D/g, "");
  if (p.startsWith("00")) p = p.slice(2);
  const cc = APP_CONFIG.countryCode;
  if (!intl && cc && !p.startsWith(cc)) p = cc + p.replace(/^0+/, "");
  return p;
}

function cardLink(token) {
  return new URL("index.html?t=" + token, location.href).href;
}

// Scissors icon used for stamps
const SCISSORS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>';

function renderStamps(el, n, max, popIndex = -1) {
  el.innerHTML = "";
  for (let i = 0; i < max; i++) {
    const d = document.createElement("div");
    d.className = "stamp" + (i < n ? " on" : "") + (i === popIndex ? " pop" : "") + (i === max - 1 ? " last" : "");
    d.innerHTML = i < n ? SCISSORS_SVG : (i === max - 1 ? "<span>FREE</span>" : "<span>" + (i + 1) + "</span>");
    el.appendChild(d);
  }
}
