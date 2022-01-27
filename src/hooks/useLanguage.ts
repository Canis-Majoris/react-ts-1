import { useEffect } from 'react';
import i18n from '@Modules/i18n';
import languages from '@Constants/languages';
import useLocalStorage from './useLocalStorage';

const defaultLanguageValue: string =
  localStorage.getItem('language') ||
  process.env.REACT_APP_DEFAULT_LANGUAGE ||
  'en';

const useLanguage = (defaultLanguage: string = defaultLanguageValue) => {
  const [language, setLanguage] = useLocalStorage(
    'app-language',
    defaultLanguage
  );

  useEffect(() => {
    if (languages.find((l) => l.value === language)) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return { language, setLanguage, languages };
};

export default useLanguage;
