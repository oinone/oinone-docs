import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSiteData } from '@vuepress/client';
import { versions, currentVersion } from '../../state';

export const useNavbarVersionDropdown = () => {
  const route = useRoute();
  const siteData = useSiteData();

  const versionFromPath = computed(() => {
    const path = route.path;
    return (
      versions
        .filter(v => v.prefix !== '')
        .sort((a, b) => b.prefix.length - a.prefix.length)
        .find(v => path.startsWith(v.prefix)) ||
      versions.find(v => v.prefix === '') ||
      versions[0]
    );
  });

  currentVersion.value = versionFromPath.value;

  const defaultLanguage = '/zh-cn/';
  const currentLanguagePath = computed(() => {
    const path = route.path;
    if (!siteData.value || !siteData.value.locales) return defaultLanguage;

    const locales = siteData.value.locales;

    const matchedLocalePath = Object.keys(locales)
      .sort((a, b) => b.length - a.length)
      .find(p => path.startsWith(p));

    if (!matchedLocalePath) return defaultLanguage;

    const matchedVersion = versions
      .filter(v => v.prefix !== '')
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find(v => path.startsWith(v.prefix));

    if (matchedVersion && matchedLocalePath.startsWith(matchedVersion.prefix)) {
      return matchedLocalePath.substring(matchedVersion.prefix.length) || '/';
    }

    return matchedLocalePath;
  });

  const getVersionLink = (targetVersion: { text: string; prefix: string }) => {
    const path = route.path;
    const current = versionFromPath.value;

    if (current.text === targetVersion.text) return path;

    let relativePath = path;
    if (current.prefix && path.startsWith(current.prefix)) {
      relativePath = path.substring(current.prefix.length);
    }

    if (
      relativePath === '/' ||
      relativePath === '' ||
      relativePath === currentLanguagePath.value
    ) {
      return `${targetVersion.prefix}${currentLanguagePath.value}`;
    }

    return `${targetVersion.prefix}${relativePath}`;
  };

  return computed(() => {
    if (!versionFromPath.value) return null;
    return {
      text: versionFromPath.value.text,
      children: versions.map(v => ({
        text: v.text,
        link: getVersionLink(v),
        active: v.text === versionFromPath.value.text
      }))
    };
  });
};
