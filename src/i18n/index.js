import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    dashboard: 'Dashboard',
    ai_chatbot: 'AI Chatbot',
    get_support: 'Get mental health support',
    find_hospitals: 'Find Hospitals',
    nearby_hospitals: 'Nearby hospital listings',
    settings: 'Settings',
    configure_preferences: 'Configure your preferences',
    language: 'Language',
    set_language: 'Set your language',
    home: 'Home',
    chat: 'Chat',
    hospitals: 'Hospitals',
    logout: 'Logout',
    type_message: 'Type your message...',
    greeting: 'Hello! I am Lingua, your personal mental health assistant. How are you feeling today?',
    installApp: {
      title: 'Install LinguaCare',
      description: 'Install this app on your device for quick access and offline support.',
      install: 'Install',
      later: 'Later'
    },
  },
  fr: {
    dashboard: 'Tableau de bord',
    ai_chatbot: 'Chatbot IA',
    get_support: 'Obtenez un soutien en santé mentale',
    find_hospitals: 'Trouver des hôpitaux',
    nearby_hospitals: 'Listes d\'hôpitaux à proximité',
    settings: 'Paramètres',
    configure_preferences: 'Configurez vos préférences',
    language: 'Langue',
    set_language: 'Définir votre langue',
    home: 'Accueil',
    chat: 'Discuter',
    hospitals: 'Hôpitaux',
    logout: 'Déconnexion',
    type_message: 'Tapez votre message...',
    greeting: 'Bonjour! Je suis Lingua, votre assistant personnel en santé mentale. Comment vous sentez-vous aujourd\'hui?',
    installApp: {
      title: 'Installer LinguaCare',
      description: 'Installez cette application sur votre appareil pour un accès rapide et un support hors ligne.',
      install: 'Installer',
      later: 'Plus tard'
    },
  },
  rw: {
    dashboard: 'Kugaragaza', // Approximation
    ai_chatbot: 'Ikiganiro cya AI',
    get_support: 'Bona ubufasha bwo mu mutwe',
    find_hospitals: 'Shakisha Ibitaro',
    nearby_hospitals: 'Urutonde rw\'ibitaro byegereye',
    settings: 'Igenamiterere',
    configure_preferences: 'Hitamo ibyo ukunda',
    language: 'Ururimi',
    set_language: 'Hitamo ururimi rwawe',
    home: 'Ahabanza',
    chat: 'Ikiganiro',
    hospitals: 'Ibitaro',
    logout: 'Gusohoka',
    type_message: 'Andika ubutumwa bwawe...',
    greeting: 'Muraho! Ndi Lingua, umufasha wawe wihariye wita ku buzima bwo mu mutwe. Umeze ute uyu munsi?',
    installApp: {
      title: 'Shyiramo LinguaCare',
      description: 'Shyiramo iyi porogaramu ku mudasobwa wawe kugira ngo uyisangire vuba kandi uhabwe ubufasha.',
      install: 'Shyiramo',
      later: 'Nyuma'
    },
  },
  ar: {
    dashboard: 'لوحة القيادة',
    ai_chatbot: 'روبوت الدردشة بالذكاء الاصطناعي',
    get_support: 'احصل على دعم نفسي',
    find_hospitals: 'ابحث عن مستشفيات',
    nearby_hospitals: 'قوائم المستشفيات القريبة',
    settings: 'الإعدادات',
    configure_preferences: 'قم بتكوين تفضيلاتك',
    language: 'اللغة',
    set_language: 'اختر لغتك',
    home: 'الرئيسية',
    chat: 'محادثة',
    hospitals: 'المستشفيات',
    logout: 'تسجيل الخروج',
    type_message: 'اكتب رسالتك...',
    greeting: 'مرحباً! أنا لينجوا، مساعدك الشخصي للصحة النفسية. كيف تشعر اليوم؟',
    installApp: {
      title: 'تثبيت لينجوا كير',
      description: 'قم بتثبيت هذا التطبيق على جهازك للوصول السريع والدعم دون اتصال.',
      install: 'تثبيت',
      later: 'لاحقاً'
    },
  }
}

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  legacy: false, // you must set `legacy: false` to use Composition API
})

export default i18n
