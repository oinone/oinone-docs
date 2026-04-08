import { useData } from 'vitepress';
import zh from '../locales/zh.json';
import en from '../locales/en.json';

export function useTranslate() {
  const { lang } = useData();

  const t = (key: string) => {
    const keys = key.split('.');
    const locale = lang.value === 'en-US' || lang.value === 'en' ? en : zh;
    let val: any = locale;
    for (const k of keys) {
      if (val && typeof val === 'object') {
        val = val[k];
      } else {
        return key;
      }
    }
    return val || key;
  };

  return { t };
}
