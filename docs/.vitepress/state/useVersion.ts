import { computed } from 'vue';
import { useData } from 'vitepress';
import { Version } from './typing';

export const useVersion = () => {
  const { page } = useData();

  const currentVersion = computed<Version>(() => {
    if (page.value?.relativePath?.startsWith(Version.v6)) {
      return Version.v6;
    }
    return Version.latest;
  });

  return {
    currentVersion
  };
};
