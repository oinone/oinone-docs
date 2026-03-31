import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteLocale, useSiteData, useSiteLocaleData } from '@vuepress/client';
import { currentVersion, versions } from '../../state';

const languageNames: { [key: string]: string } = {
  'en-US': 'English',
  'zh-CN': '简体中文'
};

export const useNavbarLanguageDropdown = () => {
  const route = useRoute();
  const siteData = useSiteData();
  const siteLocale = useSiteLocaleData();
  const routeLocale = useRouteLocale();

  // A computed variable that returns all locale paths for the current version.
  const versionedLocalePaths = computed(() => {
    const allLocales = siteData.value.locales;
    const versionPrefix = currentVersion.value.prefix;
    const otherVersionPrefixes = versions
      .map(v => v.prefix)
      .filter(p => p && p !== versionPrefix);

    return Object.keys(allLocales).filter(path => {
      if (versionPrefix) {
        return path.startsWith(versionPrefix);
      }
      return !otherVersionPrefixes.some(p => path.startsWith(p));
    });
  });

  // The current locale path, filtered by version.
  const currentLocalePath = computed(() => {
    const matchingLocales = versionedLocalePaths.value.filter(path => {
      const locale = siteData.value.locales[path];
      return locale && locale.lang === siteLocale.value.lang;
    });

    matchingLocales.sort((a, b) => b.length - a.length);
    return matchingLocales[0] || routeLocale.value;
  });

  const getLanguageLink = (targetLocalePath: string) => {
    return route.path.replace(currentLocalePath.value, targetLocalePath);
  };

  return computed(() => {
    const localePathsForVersion = versionedLocalePaths.value;

    if (localePathsForVersion.length < 2) {
      return null;
    }

    return {
      text: languageNames[siteLocale.value.lang] || siteLocale.value.lang,
      ariaLabel: 'Select language',
      children: localePathsForVersion
        .map(path => {
          const locale = siteData.value.locales[path];
          if (!locale) return null;
          return {
            text: (locale.lang && languageNames[locale.lang]) || locale.lang,
            link: getLanguageLink(path),
            active: path === currentLocalePath.value
          };
        })
        .filter(Boolean)
    };
  });
};
