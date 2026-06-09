export interface Service {
  id: string;
  name: string;
  link: string;
  docs: string;
  source: string;
  warning?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  services: Service[];
}

export const categories: Category[] = [
  // ─────────────────────────────────────────────
  // 1. الهوية و الحالة المدنية
  // ─────────────────────────────────────────────
  {
    id: "hawiya",
    title: "الهوية و الحالة المدنية",
    icon: "user",
    description: "بطاقة التعريف، جواز السفر، عقود الازدياد، شهادة السكنى",
    services: [
      {
        id: "cnie-appointment",
        name: "حجز موعد البطاقة الوطنية",
        link: "https://www.cnie.ma",
        docs: "البطاقة القديمة أو منتهية الصلاحية + تصويرة حديثة",
        source: "cnie.ma",
      },
      {
        id: "cnie-track",
        name: "تتبع جاهزية البطاقة الوطنية",
        link: "https://www.cnie.ma/suivi",
        docs: "رقم الوصل ديال الطلب",
        source: "cnie.ma",
      },
      {
        id: "passport",
        name: "جواز السفر — طلب وتجديد",
        link: "https://www.passeport.ma",
        docs: "لاكارط الوطنية + تصاور + 500 درهم",
        source: "passeport.ma",
      },
      {
        id: "watiqa-birth",
        name: "عقد الازدياد — نسخة كاملة أو ملخصة",
        link: "https://www.watiqa.ma",
        docs: "رقم البطاقة الوطنية + معلومات الازدياد",
        source: "watiqa.ma",
      },
      {
        id: "watiqa-marriage",
        name: "عقد الزواج وشهادة الوضعية العائلية",
        link: "https://www.watiqa.ma",
        docs: "رقم البطاقة الوطنية",
        source: "watiqa.ma",
      },
      {
        id: "residence-cert",
        name: "شهادة السكنى",
        link: "https://www.watiqa.ma",
        docs: "طلب أونلاين + تمشي للمقاطعة باش تسنيها",
        source: "watiqa.ma",
        warning: "الطلب يتعمل أونلاين لكن خاصك تمشي للمقاطعة ديالك باش تسنيها",
      },
      {
        id: "watiqa-life-cert",
        name: "شهادة الحياة",
        link: "https://www.watiqa.ma",
        docs: "البطاقة الوطنية + الحضور الشخصي للمقاطعة",
        source: "watiqa.ma",
        warning: "خاصك تمشي شخصياً — ما تعمدش أونلاين",
      },
      {
        id: "service-public",
        name: "البوابة الوطنية للخدمات العمومية",
        link: "https://www.service-public.ma",
        docs: "تسجيل بالإيميل — تجمع خدمات متعددة فبلاصة وحدة",
        source: "service-public.ma",
      },
      {
        id: "maroc-portal",
        name: "البوابة الوطنية للمملكة",
        link: "https://www.maroc.ma",
        docs: "لا يلزم تسجيل — معلومات و توجيه إداري",
        source: "maroc.ma",
      },
      {
        id: "diwan",
        name: "ديوان المظالم — وسيط المملكة",
        link: "https://www.diwan.ma",
        docs: "شكاية مكتوبة + وثائق الملف + نسخة البطاقة",
        source: "diwan.ma",
        warning: "مخصص للشكايات من الإدارات العمومية — مجاني وسري",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. العدل و الأمن
  // ─────────────────────────────────────────────
  {
    id: "adl",
    title: "العدل و الأمن",
    icon: "shield",
    description: "السجل العدلي، الشكايات، تتبع الملفات، حقوق المواطن",
    services: [
      {
        id: "criminal-record",
        name: "طلب السجل العدلي (نمرة 3)",
        link: "https://casierjudiciaire.justice.gov.ma",
        docs: "نسخة البطاقة الوطنية + 10 دراهم أداء إلكتروني",
        source: "justice.gov.ma",
      },
      {
        id: "complaints",
        name: "الشكايات الإلكترونية للمرافق العمومية",
        link: "https://www.chikaya.ma",
        docs: "وصف المشكل + الوثائق المرفقة",
        source: "chikaya.ma",
      },
      {
        id: "justice-portal",
        name: "بوابة وزارة العدل — الخدمات الإلكترونية",
        link: "https://www.justice.gov.ma",
        docs: "تسجيل بالإيميل",
        source: "justice.gov.ma",
      },
      {
        id: "e-justice",
        name: "تتبع الملفات القضائية إلكترونياً",
        link: "https://e-justice.justice.gov.ma",
        docs: "رقم الملف القضائي + رقم البطاقة الوطنية",
        source: "e-justice.justice.gov.ma",
      },
      {
        id: "dgsn",
        name: "خدمات المديرية العامة للأمن الوطني",
        link: "https://www.dgsn.gov.ma",
        docs: "حسب الخدمة: بطاقة التعريف + وثائق الملف",
        source: "dgsn.gov.ma",
      },
      {
        id: "gendarmerie",
        name: "الدرك الملكي — خدمات إلكترونية",
        link: "https://www.gr.gov.ma",
        docs: "رقم البطاقة الوطنية",
        source: "gr.gov.ma",
      },
      {
        id: "cndh",
        name: "المجلس الوطني لحقوق الإنسان CNDH",
        link: "https://www.cndh.org.ma",
        docs: "شكاية مكتوبة أو أونلاين — مجانية",
        source: "cndh.org.ma",
        warning: "للشكايات المتعلقة بانتهاك حقوق الإنسان فقط",
      },
      {
        id: "cndp",
        name: "حماية المعطيات الشخصية CNDP",
        link: "https://www.cndp.ma",
        docs: "شكاية مكتوبة ضد جهة معالجة بياناتك بدون إذن",
        source: "cndp.ma",
      },
      {
        id: "cspj",
        name: "المجلس الأعلى للسلطة القضائية",
        link: "https://www.cspj.ma",
        docs: "شكاية مكتوبة ضد قاضٍ أو إشكال قضائي",
        source: "cspj.ma",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. الدعم و الحماية الاجتماعية
  // ─────────────────────────────────────────────
  {
    id: "himaya",
    title: "الدعم و الحماية الاجتماعية",
    icon: "heart",
    description: "الدعم المباشر، التشغيل، التقاعد، CNSS، CNOPS، AMO، RNP، RSU",
    services: [
      {
        id: "rnp",
        name: "التسجيل في السجل الوطني للسكان RNP",
        link: "https://www.rnp.ma",
        docs: "حضور شخصي + بطاقة التعريف + عقود الازدياد ديال الأسرة + تصويرة",
        source: "rnp.ma",
        warning: "الخطوة 1 — ضروري تمشي للمقاطعة. بدون RNP ما تقدرش تسجل في RSU",
      },
      {
        id: "rsu",
        name: "السجل الاجتماعي الموحد RSU",
        link: "https://www.rsu.ma",
        docs: "المعرف الرقمي من RNP + معلومات الأسرة والدخل",
        source: "rsu.ma",
        warning: "خاصك تكون مسجل في RNP أولاً — المؤشر كيحدد أهليتك للدعم",
      },
      {
        id: "amo",
        name: "التأمين الصحي الإجباري AMO تضامن",
        link: "https://www.cnss.ma/ar/assurance-maladie-obligatoire",
        docs: "المؤشر الاجتماعي من RSU — لا يلزم ملف إضافي",
        source: "cnss.ma",
      },
      {
        id: "daam",
        name: "الدعم المباشر للأسر",
        link: "https://www.daam.ma",
        docs: "المؤشر الاجتماعي من RSU — الأداء مباشر في الحساب البنكي",
        source: "daam.ma",
      },
      {
        id: "daam-sakan",
        name: "دعم السكن — اقتناء أو بناء",
        link: "https://www.daamsakane.ma",
        docs: "بطاقة التعريف + وثيقة الوضعية العائلية + شهادة الدخل",
        source: "daamsakane.ma",
      },
      {
        id: "cnss-services",
        name: "خدمات الضمان الاجتماعي CNSS — الأجراء",
        link: "https://www.cnss.ma",
        docs: "رقم الانخراط في CNSS أو رقم البطاقة الوطنية",
        source: "cnss.ma",
      },
      {
        id: "cnss-ipe",
        name: "تعويض فقدان الشغل IPE — CNSS",
        link: "https://www.cnss.ma/ar/indemnite-perte-emploi",
        docs: "شهادة الطرد + آخر 6 كشوف أجور + بطاقة التعريف",
        source: "cnss.ma",
        warning: "خاصك تقدم الطلب داخل 60 يوم من تاريخ الطرد",
      },
      {
        id: "cnops",
        name: "التأمين الصحي للموظفين العموميين CNOPS",
        link: "https://www.cnops.org.ma",
        docs: "بطاقة التعريف + وثيقة الانتماء للوظيفة العمومية",
        source: "cnops.org.ma",
      },
      {
        id: "cimr",
        name: "التقاعد التكميلي CIMR",
        link: "https://www.cimr.ma",
        docs: "رقم الانخراط في CIMR أو الرقم المهني",
        source: "cimr.ma",
      },
      {
        id: "cps-retraite",
        name: "تقاعد موظفي الدولة — الصندوق المغربي للتقاعد",
        link: "https://www.cmp.ma",
        docs: "بطاقة التعريف + وثيقة التقاعد",
        source: "cmp.ma",
      },
      {
        id: "anapec",
        name: "التسجيل في ANAPEC للباحثين عن الشغل",
        link: "https://www.anapec.org",
        docs: "بطاقة التعريف + السيرة الذاتية + الشهادات",
        source: "anapec.org",
      },
      {
        id: "tayssir",
        name: "منحة تيسير للأسر ذات الأطفال المتمدرسين",
        link: "https://www.tayssir.gov.ma",
        docs: "شهادة تمدرس الطفل + بطاقة التعريف + رقم حساب بريدي",
        source: "tayssir.gov.ma",
      },
      {
        id: "entraide",
        name: "مساعدات التعاون الوطني — Entraide Nationale",
        link: "https://www.entraide.ma",
        docs: "طلب مكتوب + وثائق الوضعية الاجتماعية والعائلية",
        source: "entraide.ma",
      },
      {
        id: "social-ministry",
        name: "وزارة التضامن — الخدمات الاجتماعية",
        link: "https://www.social.gov.ma",
        docs: "حسب الخدمة المطلوبة",
        source: "social.gov.ma",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. السياقة و التنقل
  // ─────────────────────────────────────────────
  {
    id: "naql",
    title: "السياقة و التنقل",
    icon: "navigation",
    description: "رخصة السياقة، Vignette، تسجيل السيارة، المخالفات، قطار، باص",
    services: [
      {
        id: "license-points",
        name: "استشارة نقط رخصة السياقة",
        link: "https://services.narsa.gov.ma/PermisdeConduire/",
        docs: "رقم رخصة السياقة",
        source: "services.narsa.gov.ma",
      },
      {
        id: "vignette",
        name: "الأداء الإلكتروني لـ Vignette",
        link: "https://www.vignette.ma",
        docs: "البطاقة الرمادية للسيارة + بطاقة بنكية",
        source: "vignette.ma",
      },
      {
        id: "narsa-main",
        name: "تسجيل السيارة والبطاقة الرمادية — NARSA",
        link: "https://narsa.gov.ma",
        docs: "فاكتورة الشراء أو عقد الانتقال + بطاقة التعريف + وثيقة التأمين",
        source: "narsa.gov.ma",
      },
      {
        id: "contraventions",
        name: "دفع مخالفات السير إلكترونياً",
        link: "https://www.contraventions.ma",
        docs: "رقم PV المخالفة أو رقم البطاقة الرمادية",
        source: "contraventions.ma",
        warning: "الدفع الفوري داخل 15 يوم يخفض الغرامة بنسبة 50%",
      },
      {
        id: "narsa-permis-code",
        name: "استدعاء اختبار الرخصة النظري والتطبيقي",
        link: "https://services.narsa.gov.ma",
        docs: "رقم الطلب من مدرسة السياقة + رقم البطاقة الوطنية",
        source: "services.narsa.gov.ma",
      },
      {
        id: "narsa-visite-technique",
        name: "الفحص التقني للسيارة — مواعيد ومراكز",
        link: "https://narsa.gov.ma",
        docs: "البطاقة الرمادية + وثيقة التأمين الساريين",
        source: "narsa.gov.ma",
        warning: "الفحص التقني كيكون كل سنة للسيارات فوق 5 سنوات",
      },
      {
        id: "oncf",
        name: "قطارات ONCF — حجز التذاكر",
        link: "https://www.oncf-voyageurs.com",
        docs: "بطاقة التعريف للحجز المسبق",
        source: "oncf-voyageurs.com",
      },
      {
        id: "ctm",
        name: "حافلات CTM — الحجز الدولي والوطني",
        link: "https://www.ctm.ma",
        docs: "بطاقة التعريف",
        source: "ctm.ma",
      },
      {
        id: "supratours",
        name: "Supratours — الحجز أونلاين",
        link: "https://www.supratours.ma",
        docs: "بطاقة التعريف",
        source: "supratours.ma",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. الضرائب و العقار و المقاولات
  // ─────────────────────────────────────────────
  {
    id: "aqar",
    title: "الضرائب و العقار و المقاولات",
    icon: "home",
    description: "الضرائب، المحافظة العقارية، السجل التجاري، الخزينة، OMPIC",
    services: [
      {
        id: "income-tax",
        name: "الإقرار الضريبي الإلكتروني — DGI",
        link: "https://www.tax.gov.ma",
        docs: "رقم التعريف الضريبي (IF) + كلمة السر للفضاء الضريبي",
        source: "tax.gov.ma",
      },
      {
        id: "tax-simul",
        name: "احتساب الضريبة على الدخل — محاكاة",
        link: "https://www.tax.gov.ma",
        docs: "الدخل الشهري أو السنوي الصافي",
        source: "tax.gov.ma",
      },
      {
        id: "property-registry",
        name: "خدمات المحافظة العقارية ANCFCC",
        link: "https://www.ancfcc.gov.ma",
        docs: "رقم الرسم العقاري + بطاقة التعريف + رسوم التسجيل",
        source: "ancfcc.gov.ma",
      },
      {
        id: "ownership-cert",
        name: "طلب شهادة الملكية العقارية",
        link: "https://www.ancfcc.gov.ma",
        docs: "رقم الرسم العقاري + بطاقة التعريف",
        source: "ancfcc.gov.ma",
      },
      {
        id: "tgr-payment",
        name: "الأداء الإلكتروني للضرائب والرسوم — TGR",
        link: "https://www.tgr.gov.ma",
        docs: "رقم المرجع + بطاقة بنكية",
        source: "tgr.gov.ma",
      },
      {
        id: "tgr-bons-tresor",
        name: "بونات الخزينة — الاستثمار الآمن",
        link: "https://www.tgr.gov.ma",
        docs: "حساب بنكي مغربي + نسخة البطاقة الوطنية",
        source: "tgr.gov.ma",
      },
      {
        id: "ompic",
        name: "تسجيل العلامات التجارية وبراءات الاختراع — OMPIC",
        link: "https://www.ompic.ma",
        docs: "نموذج الطلب + رسوم التسجيل + عينة العلامة",
        source: "ompic.ma",
      },
      {
        id: "registre-commerce",
        name: "السجل التجاري الإلكتروني — RC",
        link: "https://www.registre.ma",
        docs: "النظام الأساسي للشركة + بطاقة التعريف + رسوم",
        source: "registre.ma",
      },
      {
        id: "cri-invest",
        name: "إحداث مقاولة — مركز الاستثمار الجهوي",
        link: "https://www.invest.ma",
        docs: "جميع وثائق التأسيس في شباك وحدة — مجاني",
        source: "invest.ma",
      },
      {
        id: "dar-moukawil",
        name: "دار المقاول — دعم المقاولات الصغيرة",
        link: "https://www.darmoukawil.ma",
        docs: "بطاقة التعريف + الفكرة المشروع",
        source: "darmoukawil.ma",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. التعليم و الشباب
  // ─────────────────────────────────────────────
  {
    id: "taalim",
    title: "التعليم و الشباب",
    icon: "book-open",
    description: "منحة، نتائج، باك، OFPPT، توجيه جامعي، جامعات",
    services: [
      {
        id: "massar",
        name: "نتائج و مسار التلميذ — Massar",
        link: "https://massar.men.gov.ma",
        docs: "رقم مسار التلميذ + كلمة السر",
        source: "massar.men.gov.ma",
      },
      {
        id: "bac-results",
        name: "نتائج الباكالوريا",
        link: "https://bac.men.gov.ma",
        docs: "رقم تسجيل الباكالوريا",
        source: "bac.men.gov.ma",
        warning: "الموقع كيكون مزدحم وقت إعلان النتائج — الصبر مفتاح",
      },
      {
        id: "bac-libre",
        name: "التسجيل في باك الأحرار",
        link: "https://candidaturebac.men.gov.ma",
        docs: "بطاقة التعريف + نتائج السنة الماضية",
        source: "men.gov.ma",
      },
      {
        id: "tawjihi",
        name: "التوجيه الجامعي — Tawjihi",
        link: "https://www.tawjihi.ma",
        docs: "نتيجة الباكالوريا + شعبة الدراسة",
        source: "tawjihi.ma",
      },
      {
        id: "scholarship",
        name: "المنحة الجامعية الوطنية — Minhaty",
        link: "https://www.minhaty.ma",
        docs: "بطاقة التعريف + وثائق التسجيل + وثيقة الدخل العائلي",
        source: "minhaty.ma",
      },
      {
        id: "enssup",
        name: "بوابة التعليم العالي والجامعات",
        link: "https://www.enssup.gov.ma",
        docs: "حسب الكلية: شهادة الباكالوريا + بطاقة التعريف",
        source: "enssup.gov.ma",
      },
      {
        id: "ofppt",
        name: "التكوين المهني OFPPT — التسجيل",
        link: "https://www.ofppt.ma",
        docs: "شهادة تمدرس + بطاقة التعريف + دبلوم آخر سنة",
        source: "ofppt.ma",
      },
      {
        id: "men-portal",
        name: "وزارة التربية الوطنية — الخدمات",
        link: "https://www.men.gov.ma",
        docs: "حسب الخدمة المطلوبة",
        source: "men.gov.ma",
      },
      {
        id: "bourses-ext",
        name: "المنح الدراسية الخارجية — التعليم العالي",
        link: "https://www.enssup.gov.ma",
        docs: "شهادة الباكالوريا + وثائق الدراسة + مستوى اللغات",
        source: "enssup.gov.ma",
        warning: "المنح الخارجية تتفتح فـ فترات محددة — تابع الموقع بانتظام",
      },
      {
        id: "youth-pass",
        name: "بطاقة الشباب — تخفيضات وخدمات",
        link: "https://www.passjeunes.ma",
        docs: "بطاقة التعريف + تصويرة + رسوم رمزية",
        source: "passjeunes.ma",
      },
      {
        id: "mjcc-youth",
        name: "وزارة الشباب والثقافة — الخدمات",
        link: "https://www.mjcc.gov.ma",
        docs: "حسب البرنامج: بطاقة التعريف",
        source: "mjcc.gov.ma",
      },
    ],
  },
];

export const ALL_SERVICE_LINKS: { serviceId: string; url: string }[] =
  categories.flatMap((cat) =>
    cat.services.map((svc) => ({ serviceId: svc.id, url: svc.link }))
  );
