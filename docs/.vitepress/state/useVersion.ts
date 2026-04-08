import { computed, ref } from 'vue';
import { useData } from 'vitepress';

// 全局状态，支持持久化或跨组件共享
const globalVersion = ref('v7');

export const useVersion = () => {
  const { localeIndex } = useData();

  // 根据当前 localeIndex 计算当前的版本号
  const currentVersion = computed(() => {
    if (localeIndex.value && localeIndex.value.startsWith('v6')) {
      return 'v6';
    }
    return 'v7';
  });

  const setVersion = (newVersion: string) => {
    globalVersion.value = newVersion;
  };

  return {
    globalVersion,
    currentVersion,
    setVersion
  };
};
