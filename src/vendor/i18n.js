import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'vi'];

i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step

  .use(initReactI18next) // pass the i18n instance to react-i18next.

  .init({
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
      allowMultiLoading: false,
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
