import i18next, {LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import 'intl-pluralrules';
import englishTranslation from './en/translation.json'
import swedishTranslation from './sv/translation.json'

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb('en'),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: englishTranslation,
      },
      sv: {
        translation: swedishTranslation,
      },
    },
  });