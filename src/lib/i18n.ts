// Multi-language support for KMRL Document Management System
export type Language = 'en' | 'hi' | 'ml';

export interface Translations {
  // Navigation
  dashboard: string;
  upload: string;
  documents: string;
  compliance: string;
  reports: string;
  settings: string;
  help: string;
  administration: string;
  support: string;
  
  // Header
  search_placeholder: string;
  notifications: string;
  profile: string;
  logout: string;
  
  // Dashboard
  welcome: string;
  total_documents: string;
  active_alerts: string;
  new_uploads: string;
  recent_activity: string;
  quick_actions: string;
  upload_document: string;
  generate_report: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  view: string;
  download: string;
  
  // Compliance
  compliance_center: string;
  export_report: string;
  set_alerts: string;
  compliant: string;
  expiring_soon: string;
  overdue: string;
  overall_score: string;
  overview: string;
  timeline: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    upload: "Upload Documents",
    documents: "Document Library",
    compliance: "Compliance Center",
    reports: "Analytics & Reports",
    settings: "Settings",
    help: "Help & Support",
    administration: "Administration",
    support: "Support",
    
    // Header
    search_placeholder: "Search documents, contracts, or ask questions...",
    notifications: "Notifications",
    profile: "Profile",
    logout: "Logout",
    
    // Dashboard
    welcome: "Welcome back",
    total_documents: "Total Documents",
    active_alerts: "Active Alerts",
    new_uploads: "New Uploads This Week",
    recent_activity: "Recent Activity",
    quick_actions: "Quick Actions",
    upload_document: "Upload Document",
    generate_report: "Generate Report",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    download: "Download",
    
    // Compliance
    compliance_center: "Compliance Center",
    export_report: "Export Report",
    set_alerts: "Set Alerts",
    compliant: "Compliant",
    expiring_soon: "Expiring Soon",
    overdue: "Overdue",
    overall_score: "Overall Score",
    overview: "Overview",
    timeline: "Timeline",
  },
  hi: {
    // Navigation
    dashboard: "डैशबोर्ड",
    upload: "दस्तावेज़ अपलोड करें",
    documents: "दस्तावेज़ पुस्तकालय",
    compliance: "अनुपालन केंद्र",
    reports: "विश्लेषण और रिपोर्ट",
    settings: "सेटिंग्स",
    help: "सहायता और समर्थन",
    administration: "प्रशासन",
    support: "समर्थन",
    
    // Header
    search_placeholder: "दस्तावेज़, अनुबंध खोजें या प्रश्न पूछें...",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",
    
    // Dashboard
    welcome: "वापसी पर स्वागत है",
    total_documents: "कुल दस्तावेज़",
    active_alerts: "सक्रिय अलर्ट",
    new_uploads: "इस सप्ताह नए अपलोड",
    recent_activity: "हाल की गतिविधि",
    quick_actions: "त्वरित कार्य",
    upload_document: "दस्तावेज़ अपलोड करें",
    generate_report: "रिपोर्ट जेनरेट करें",
    
    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    cancel: "रद्द करें",
    save: "सेव करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    view: "देखें",
    download: "डाउनलोड करें",
    
    // Compliance
    compliance_center: "अनुपालन केंद्र",
    export_report: "रिपोर्ट एक्सपोर्ट करें",
    set_alerts: "अलर्ट सेट करें",
    compliant: "अनुपालित",
    expiring_soon: "जल्द समाप्त हो रहा",
    overdue: "अतिदेय",
    overall_score: "समग्र स्कोर",
    overview: "अवलोकन",
    timeline: "समयरेखा",
  },
  ml: {
    // Navigation
    dashboard: "ഡാഷ്‌ബോർഡ്",
    upload: "പ്രമാണങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക",
    documents: "പ്രമാണ ലൈബ്രറി",
    compliance: "അനുസരണ കേന്ദ്രം",
    reports: "വിശകലനം & റിപ്പോർട്ടുകൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    help: "സഹായം & പിന്തുണ",
    administration: "ഭരണം",
    support: "പിന്തുണ",
    
    // Header
    search_placeholder: "പ്രമാണങ്ങൾ, കരാറുകൾ തിരയുക അല്ലെങ്കിൽ ചോദ്യങ്ങൾ ചോദിക്കുക...",
    notifications: "അറിയിപ്പുകൾ",
    profile: "പ്രൊഫൈൽ",
    logout: "ലോഗൗട്ട്",
    
    // Dashboard
    welcome: "തിരിച്ചുവരവിൽ സ്വാഗതം",
    total_documents: "മൊത്തം പ്രമാണങ്ങൾ",
    active_alerts: "സജീവ അലേർട്ടുകൾ",
    new_uploads: "ഈ ആഴ്ച പുതിയ അപ്‌ലോഡുകൾ",
    recent_activity: "സമീപകാല പ്രവർത്തനം",
    quick_actions: "പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ",
    upload_document: "പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക",
    generate_report: "റിപ്പോർട്ട് സൃഷ്ടിക്കുക",
    
    // Common
    loading: "ലോഡ് ചെയ്യുന്നു...",
    error: "പിശക്",
    success: "വിജയം",
    cancel: "റദ്ദാക്കുക",
    save: "സേവ് ചെയ്യുക",
    delete: "ഇല്ലാതാക്കുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    view: "കാണുക",
    download: "ഡൗൺലോഡ് ചെയ്യുക",
    
    // Compliance
    compliance_center: "അനുസരണ കേന്ദ്രം",
    export_report: "റിപ്പോർട്ട് എക്സ്പോർട്ട് ചെയ്യുക",
    set_alerts: "അലേർട്ടുകൾ സജ്ജമാക്കുക",
    compliant: "അനുസരിക്കുന്ന",
    expiring_soon: "ഉടൻ കാലാവധി",
    overdue: "കാലാവധി കഴിഞ്ഞ",
    overall_score: "മൊത്തത്തിലുള്ള സ്കോർ",
    overview: "അവലോകനം",
    timeline: "ടൈംലൈൻ",
  },
};

// Get browser language preference
export const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('hi')) return 'hi';
  if (browserLang.startsWith('ml')) return 'ml';
  return 'en';
};

// Get saved language preference
export const getSavedLanguage = (): Language => {
  try {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('kmrl-language') as Language;
    return saved || getBrowserLanguage();
  } catch (error) {
    console.warn('Failed to access localStorage for language preference:', error);
    return getBrowserLanguage();
  }
};

// Save language preference
export const saveLanguage = (language: Language): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('kmrl-language', language);
  } catch (error) {
    console.warn('Failed to save language preference to localStorage:', error);
  }
};