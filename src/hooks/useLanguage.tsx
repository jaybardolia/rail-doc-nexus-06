import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, getSavedLanguage, saveLanguage } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return getSavedLanguage();
    } catch (error) {
      console.warn('Failed to get saved language, defaulting to English:', error);
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      saveLanguage(lang);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  useEffect(() => {
    // Set document direction for RTL languages if needed
    document.documentElement.dir = language === 'hi' ? 'ltr' : 'ltr'; // Both Hindi and Malayalam use LTR
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider. Current context:', context);
    // Provide fallback to prevent app crash
    return {
      language: 'en' as Language,
      setLanguage: () => console.warn('Language setter called outside provider'),
      t: (key: keyof typeof translations.en) => translations.en[key] || key
    };
  }
  return context;
};