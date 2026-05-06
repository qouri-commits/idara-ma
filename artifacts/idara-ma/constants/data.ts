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
  {
    id: "hawiya",
    title: "الهوية و الحالة المدنية",
    icon: "user",
    description: "بطاقة التعريف، عقود الازدياد، شهادة السكنى",
    services: [
      {
        id: "cnie-appointment",
        name: "حجز موعد البطاقة الوطنية",
        link: "https://www.cnie.ma",
        docs: "البطاقة القديمة + تصويرة",
        source: "cnie.ma",
      },
      {
        id: "cnie-track",
        name: "تتبع البطاقة واش واجدة",
        link: "https://www.cnie.ma/suivi",
        docs: "رقم الطلب",
        source: "cnie.ma",
      },
      {
        id: "birth-cert",
        name: "طلب عقود الازدياد",
        link: "https://www.watiqa.ma",
        docs: "رقم البطاقة + معلومات الازدياد",
        source: "watiqa.ma",
      },
      {
        id: "residence-cert",
        name: "شهادة السكنى",
        link: "https://www.watiqa.ma",
        docs: "طلب أونلاين + تمشي للمقاطعة تسنيها",
        source: "watiqa.ma",
        warning: "خاصك تمشي للمقاطعة تسنيها",
      },
    ],
  },
  {
    id: "adl",
    title: "العدل و السوابق",
    icon: "shield",
    description: "السجل العدلي، الشكايات، تتبع الملفات",
    services: [
      {
        id: "criminal-record",
        name: "طلب السجل العدلي",
        link: "https://casierjudiciaire.justice.gov.ma",
        docs: "نسخة البطاقة + 10 دراهم أونلاين",
        source: "justice.gov.ma",
      },
      {
        id: "complaints",
        name: "الشكايات الإلكترونية",
        link: "https://www.chikaya.ma",
        docs: "وصف المشكل + الوثائق",
        source: "chikaya.ma",
      },
    ],
  },
  {
    id: "himaya",
    title: "الدعم و الحماية الاجتماعية",
    icon: "heart",
    description: "RNP، RSU، AMO تضامن، الدعم المباشر، CNSS",
    services: [
      {
        id: "rnp",
        name: "السجل الوطني للسكان RNP",
        link: "https://www.rnp.ma",
        docs: "حضور شخصي + بصمات + تصويرة",
        source: "rnp.ma",
        warning:
          "الخطوة 1: ضروري تمشي للمقاطعة مع لاكارط و عقود الازدياد ديال الأسرة كاملة",
      },
      {
        id: "rsu",
        name: "السجل الاجتماعي الموحد RSU",
        link: "https://www.rsu.ma",
        docs: "خاصك المعرف الرقمي من RNP أولا",
        source: "rsu.ma",
      },
      {
        id: "amo",
        name: "AMO تضامن",
        link: "https://www.cnss.ma/ar/assurance-maladie-obligatoire",
        docs: "من بعد ما يخرج المؤشر فـ RSU",
        source: "cnss.ma",
      },
      {
        id: "daam",
        name: "الدعم المباشر",
        link: "https://www.daam.ma",
        docs: "من بعد ما يخرج المؤشر فـ RSU",
        source: "daam.ma",
      },
      {
        id: "daam-sakan",
        name: "دعم السكن",
        link: "https://www.daamsakane.ma",
        docs: "طلب أونلاين + بطاقة التعريف + وثيقة الوضعية العائلية",
        source: "daamsakane.ma",
      },
    ],
  },
  {
    id: "naql",
    title: "السياقة و التنقل",
    icon: "navigation",
    description: "جواز السفر، رخصة السياقة، Vignette، المخالفات",
    services: [
      {
        id: "passport",
        name: "جواز السفر",
        link: "https://www.passeport.ma",
        docs: "لاكارط + تصاور + 500 درهم",
        source: "passeport.ma",
      },
      {
        id: "license-points",
        name: "نقط رخصة السياقة",
        link: "https://services.narsa.gov.ma/PermisdeConduire/",
        docs: "رقم الرخصة",
        source: "services.narsa.gov.ma",
      },
      {
        id: "vignette",
        name: "الضريبة على السيارات Vignette",
        link: "https://www.vignette.ma",
        docs: "البطاقة الرمادية",
        source: "vignette.ma",
      },
    ],
  },
  {
    id: "aqar",
    title: "الضرائب و العقار",
    icon: "home",
    description: "الضرائب، المحافظة العقارية، شهادة الملكية",
    services: [
      {
        id: "income-tax",
        name: "الضريبة العامة على الدخل",
        link: "https://www.tax.gov.ma",
        docs: "بيانات التعريف + وثائق الدخل",
        source: "tax.gov.ma",
      },
      {
        id: "property-registry",
        name: "المحافظة العقارية",
        link: "https://www.ancfcc.gov.ma",
        docs: "عقد الملكية + بطاقة التعريف",
        source: "ancfcc.gov.ma",
      },
      {
        id: "ownership-cert",
        name: "شهادة الملكية",
        link: "https://www.ancfcc.gov.ma",
        docs: "رقم الرسم العقاري + بطاقة التعريف",
        source: "ancfcc.gov.ma",
      },
    ],
  },
  {
    id: "taalim",
    title: "التعليم و الشباب",
    icon: "book-open",
    description: "منحة، باك حر، التكوين المهني، جواز الشباب",
    services: [
      {
        id: "scholarship",
        name: "المنحة الدراسية",
        link: "https://www.minhaty.ma",
        docs: "بطاقة التعريف + وثائق الدراسة + وثيقة الدخل",
        source: "minhaty.ma",
      },
      {
        id: "bac-libre",
        name: "باك الحر",
        link: "https://candidaturebac.men.gov.ma",
        docs: "بطاقة التعريف + نتائج السنة السابقة",
        source: "candidaturebac.men.gov.ma",
      },
      {
        id: "ofppt",
        name: "التكوين المهني OFPPT",
        link: "https://www.ofppt.ma",
        docs: "شهادة التمدرس + بطاقة التعريف",
        source: "ofppt.ma",
      },
      {
        id: "youth-pass",
        name: "جواز الشباب",
        link: "https://www.passjeunes.ma",
        docs: "بطاقة التعريف + تصويرة",
        source: "passjeunes.ma",
      },
    ],
  },
];

export const ALL_SERVICE_LINKS: { serviceId: string; url: string }[] =
  categories.flatMap((cat) =>
    cat.services.map((svc) => ({ serviceId: svc.id, url: svc.link }))
  );
