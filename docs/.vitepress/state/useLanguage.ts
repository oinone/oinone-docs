import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
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

  const getLangPath = (targetLang: string) => {
    if (currentLanguage.value.lang === targetLang) return '#';

    let newPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const currentLangObj = currentLanguage.value;
    const targetLangObj = supportedLanguages.find(
      l => l.lang === targetLang
    );

    if (targetLangObj && currentLangObj) {
      newPath = newPath.replace(currentLangObj.path, targetLangObj.path);
    } else if (targetLangObj && currentVersion.value === Version.v6) {
      // fallback if the target lang doesn't have a v6 version
      const fallbackTarget = supportedLanguages.find(l => l.lang === targetLang && l.version !== Version.v6);
      if (fallbackTarget) {
        newPath = newPath.replace(currentLangObj.path, fallbackTarget.path);
      }
    }

    return newPath + (typeof window !== 'undefined' ? window.location.hash : '');
  };

  const changeLang = async (targetLang: string) => {
    if (currentLanguage.value.lang === targetLang) return;
    if (typeof window !== 'undefined') {
      const newPath = getLangPath(targetLang);
      const pathname = newPath.split('#')[0];

      // If we are navigating to the exact same path, no need to check
      if (window.location.pathname === withBase(pathname)) {
        return;
      }

      // Attempt to check if the new path exists by sending a HEAD request to the actual html file
      try {
        // Since vitepress urls might be `/en/foo/bar/` or `/en/foo/bar.html`,
        // we normalize the URL to `.html` for the check, or `/` for directories
        let checkUrl = withBase(pathname);
        if (!checkUrl.endsWith('/') && !checkUrl.endsWith('.html')) {
          checkUrl += '.html';
        }

        const response = await fetch(checkUrl, { method: 'HEAD' });
        if (response.ok) {
          window.location.href = withBase(newPath);
          return;
        }
      } catch (error) {
        // Ignore fetch errors and proceed to fallback
      }

      // If the target page doesn't exist, fallback to English version
      let fallbackPath = newPath;
      const targetLangObj = supportedLanguages.find(
        l => l.lang === targetLang
      ) || supportedLanguages.find(l => l.lang.replace('v6/', '') === targetLang.replace('v6/', '') && l.version !== Version.v6);

      const enLangObj = supportedLanguages.find(
        l => l.lang.replace('v6/', '') === 'en' &&
          (currentVersion.value === Version.v6 ? l.version === Version.v6 : l.version !== Version.v6)
      ) || supportedLanguages.find(l => l.lang.replace('v6/', '') === 'en'); // absolute fallback to english if version en is missing

      if (targetLangObj && enLangObj) {
        fallbackPath = newPath.replace(targetLangObj.path, enLangObj.path);
      }

      // Try to check if the fallback english path exists
      try {
        let fallbackCheckUrl = withBase(fallbackPath.split('#')[0]);
        if (!fallbackCheckUrl.endsWith('/') && !fallbackCheckUrl.endsWith('.html')) {
          fallbackCheckUrl += '.html';
        }
        const fallbackResponse = await fetch(fallbackCheckUrl, { method: 'HEAD' });
        if (fallbackResponse.ok) {
          window.location.href = withBase(fallbackPath);
          return;
        }
      } catch (e) {
      }

      // If the english fallback path isn't valid or doesn't exist, fallback to root of that language
      fallbackPath = targetLangObj ? targetLangObj.path : '/';

      window.location.href = withBase(fallbackPath);
    }
  };

  return {
    currentLanguage,
    getLangPath,
    changeLang
  };
};