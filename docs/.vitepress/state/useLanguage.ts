import { computed } from 'vue';
import { useData } from 'vitepress';
import { useVersion } from './useVersion';
import { Version } from './typing';
import { defaultLanguage as $defaultLanguage, supportedLanguages } from './languages';

export const useLanguage = () => {
  const { lang } = useData();
  const { currentVersion } = useVersion();

  const defaultLanguage = computed(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const browserLangs = window.navigator.languages || [window.navigator.language];
      for (const l of browserLangs) {
        if (!l) continue;
        const base = l.split('-')[0].toLowerCase();
        const matched = supportedLanguages.find(
          (v) => v.version === currentVersion.value && (v.baseLang || v.lang.split('/').pop()) === base
        );
        if (matched) {
          return matched;
        }
      }
    }
    return $defaultLanguage;
  });

  const currentLanguage = computed(() => {
    const currentLang = lang.value;
    if (currentVersion.value === Version.v6) {
      return supportedLanguages.find(v => v.version === Version.v6 && v.lang === currentLang) || defaultLanguage.value;
    }
    return supportedLanguages.find(v => v.lang === currentLang) || defaultLanguage.value;
  });

  const languageOptions = computed(() => {
    return supportedLanguages.filter(v => v.version === currentVersion.value);
  });

  return {
    defaultLanguage,
    currentLanguage,
    languageOptions
  };
};