import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSiteData, useSiteLocaleData } from '@vuepress/client';
import { currentVersion, versions } from '../../state';

const languageNames: { [key: string]: string } = {
  'en-US': 'English',
  'zh-CN': '简体中文'
};

export const useNavbarLanguageDropdown = () => {
  const route = useRoute();
  const siteData = useSiteData();
  const siteLocale = useSiteLocaleData();

  const currentLocalePath = computed(() => {
    for (const path in siteData.value.locales) {
      if (siteData.value.locales[path].lang === siteLocale.value.lang) {
        return path;
      }
    }
    return '/';
  });

  const getLanguageLink = (targetLocalePath: string) => {
    return route.path.replace(currentLocalePath.value, targetLocalePath);
  };

  return computed(() => {
    const allLocales = siteData.value.locales;
    const versionPrefix = currentVersion.value.prefix;
    const otherVersionPrefixes = versions
      .map(v => v.prefix)
      .filter(p => p && p !== versionPrefix);

    const localePathsForVersion = Object.keys(allLocales).filter(path => {
      if (versionPrefix) {
        return path.startsWith(versionPrefix);
      } else {
        return !otherVersionPrefixes.some(p => path.startsWith(p));
      }
    });

    if (localePathsForVersion.length < 2) {
      return null;
    }

    return {
      text: languageNames[siteLocale.value.lang] || siteLocale.value.lang,
      ariaLabel: 'Select language',
      children: localePathsForVersion.map(path => {
        const locale = allLocales[path];
        return {
          text: languageNames[locale.lang] || locale.lang,
          link: getLanguageLink(path),
          active: path === currentLocalePath.value
        };
      })
    };
  });
};
