import { TestIds } from "react-native-google-mobile-ads";

const IS_DEV = __DEV__;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚠️  للنشر الحقيقي: استبدل القيم التالية بمعرفاتك من AdMob
//    1. روح على https://admob.google.com
//    2. أنشئ تطبيق Android جديد (ma.idara.app)
//    3. أنشئ Banner Ad Unit
//    4. انسخ الـ IDs هنا بدل TEST_IDs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ADMOB_BANNER_ID = IS_DEV
  ? TestIds.BANNER
  : "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"; // ← Banner Unit ID ديالك

// Android App ID — مكتوب كذلك فـ app.json تحت plugins
// ca-app-pub-3940256099942544~3347511713  ← test (حالياً)
// ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX  ← real (بدّل فـ app.json)
