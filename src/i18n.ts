import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import ml from './locales/ml.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('kmrl-language') : null;

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      ml: { translation: ml },
    },
    lng: savedLang || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });

export default i18n;
