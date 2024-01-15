import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ar} from './locales';

import { getLocales } from 'expo-localization';
// import * as Localization from 'expo-localization';
// import { I18nManager } from 'react-native';

const deviceLanguage = getLocales()[0].languageCode;

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18next.use(initReactI18next).init({
  debug: true,
  compatibilityJSON: 'v3',
  resources,
  // lng: deviceLanguage && I18nManager.isRTL ? 'ar' : 'en', // default languag
  // default device languange is set
  lng: deviceLanguage,
  fallbackLng: 'en', // fallback language when device language doesn't match 'en' or 'er'
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18next;
