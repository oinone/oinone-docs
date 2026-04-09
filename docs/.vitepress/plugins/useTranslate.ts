import { useLanguage } from '../state';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import ko from '../locales/ko.json';
import ja from '../locales/ja.json';

const locales: Record<string, any> = {
  zh,
  en,
  es,
  fr,
  de,
  ko,
  ja
};

export function useTranslate() {
  const { currentLanguage } = useLanguage();

  const t = (key: string) => {
    const keys = key.split('.');
    const baseLang = currentLanguage.value.lang.replace('v6/', '');
    const locale = locales[baseLang] || en;
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
