import { computed } from 'vue';
import { useData } from 'vitepress';
import { useVersion } from './useVersion';
import { Version } from './typing';
import { defaultLanguage, supportedLanguages } from './languages';

export const useLanguage = () => {
  const { lang } = useData();
  const { currentVersion } = useVersion();

  const currentLanguage = computed(() => {
    const currentLang = lang.value;
    if (currentVersion.value === Version.v6) {
      return supportedLanguages.find(v => v.version === Version.v6 && v.lang === currentLang) || defaultLanguage;
    }
    return supportedLanguages.find(v => v.lang === currentLang) || defaultLanguage;
  });

  const languageOptions = computed(() => {
    return supportedLanguages.filter(v => v.version === currentVersion.value);
  });

  return {
    currentLanguage,
    languageOptions
  };
};