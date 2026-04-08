import { SupportedLanguage, Version } from './typing';

export const supportedLanguages: SupportedLanguage[] = [
  {
    label: '简体中文',
    lang: 'v6/zh',
    baseLang: 'zh',
    path: '/v6/zh/',
    version: Version.v6,
    outlineTitle: '本页目录'
  },
  {
    label: 'English',
    lang: 'v6/en',
    baseLang: 'en',
    path: '/v6/en/',
    version: Version.v6,
    outlineTitle: 'On this page'
  },
  {
    label: '简体中文',
    lang: 'zh',
    path: '/zh/',
    version: Version.latest,
    outlineTitle: '本页目录'
  },
  {
    label: 'English',
    lang: 'en',
    path: '/en/',
    version: Version.latest,
    outlineTitle: 'On this page'
  },
  {
    label: 'Español',
    lang: 'es',
    path: '/es/',
    version: Version.latest,
    outlineTitle: 'En esta página'
  },
  {
    label: 'Français',
    lang: 'fr',
    path: '/fr/',
    version: Version.latest,
    outlineTitle: 'Sur cette page'
  },
  {
    label: 'Deutsch',
    lang: 'de',
    path: '/de/',
    version: Version.latest,
    outlineTitle: 'Auf dieser Seite'
  },
  {
    label: '한국어',
    lang: 'ko',
    path: '/ko/',
    version: Version.latest,
    outlineTitle: '이 페이지의 내용'
  },
  {
    label: '日本語',
    lang: 'ja',
    path: '/ja/',
    version: Version.latest,
    outlineTitle: 'このページの内容'
  }
  // {
  //   label: 'ภาษาไทย',
  //   lang: 'th',
  //   path: '/th/',
  //   version: Version.latest,
  //   outlineTitle: 'ในหน้านี้'
  // }
];

export const defaultLanguage = supportedLanguages.find(lang => lang.version === Version.latest && lang.lang === 'en');
