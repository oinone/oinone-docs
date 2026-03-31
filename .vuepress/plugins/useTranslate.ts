
import { defineClientConfig, useSiteLocaleData } from '@vuepress/client';
import { computed } from 'vue';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const messages = {
  en,
  zh,
};

export function useTranslate() {
  const siteLocale = useSiteLocaleData();

  const currentLang = computed(() => {
    const lang = siteLocale.value.lang;
    if (lang && lang.startsWith('zh')) {
      return 'zh';
    }
    return 'en';
  });

  const t = (key: string): string => {
    const lang = currentLang.value;
    const langMessages = messages[lang] || messages.en;

    if (!key) {
      return '';
    }

    const value = key.split('.').reduce((o, i) => {
      if (o && typeof o === 'object' && i in o) {
        return o[i];
      }
      return undefined;
    }, langMessages);

    return typeof value === 'string' ? value : key;
  };

  return { t, currentLang };
}

export default defineClientConfig({
  enhance({ app }) {
    const { t } = useTranslate();
    app.config.globalProperties.$t = t;
  },
});
