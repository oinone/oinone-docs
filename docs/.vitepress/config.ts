import { defineConfig } from 'vitepress';
import { getSidebar } from './auto-sidebar';
import { pagefindPlugin, chineseSearchOptimize } from 'vitepress-plugin-pagefind';

function getFirstLink(sidebar: any[]): string {
  if (!sidebar || !Array.isArray(sidebar)) return '';
  for (const item of sidebar) {
    if (item.link) return item.link;
    if (item.items && item.items.length > 0) {
      const link = getFirstLink(item.items);
      if (link) return link;
    }
  }
  return '';
}

const zhSidebar = getSidebar('zh-cn', '/zh-cn/');
const enSidebar = getSidebar('en', '/en/');
const v6ZhSidebar = getSidebar('v6/zh-cn', '/v6/zh-cn/');
const v6EnSidebar = getSidebar('v6/en', '/v6/en/');

export default defineConfig({
  ignoreDeadLinks: true,
  title: 'Oinone Docs',
  base: '/',
  vite: {
    plugins: [
    ]
  },
  themeConfig: {
    outline: [1, 6],
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/oinone/oinone-pamirs' },
      { icon: 'gitee', link: 'https://gitee.com/oinone/oinone-pamirs' }
    ],
    firstLinks: {
      'zh-cn': getFirstLink(zhSidebar),
      'en': getFirstLink(enSidebar),
      'v6/zh-cn': getFirstLink(v6ZhSidebar),
      'v6/en': getFirstLink(v6EnSidebar)
    }
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: getFirstLink(zhSidebar) || '/zh-cn/',
      themeConfig: {
        sidebar: zhSidebar,
        outlineTitle: '本页目录'
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: getFirstLink(enSidebar) || '/en/',
      themeConfig: {
        sidebar: enSidebar,
        outlineTitle: 'On this page'
      }
    },
    v6_zh: {
      label: 'v6-中文',
      lang: 'zh-CN',
      link: getFirstLink(v6ZhSidebar) || '/v6/zh-cn/',
      themeConfig: {
        sidebar: v6ZhSidebar,
        outlineTitle: '本页目录'
      }
    },
    v6_en: {
      label: 'v6-English',
      lang: 'en-US',
      link: getFirstLink(v6EnSidebar) || '/v6/en/',
      themeConfig: {
        sidebar: v6EnSidebar,
        outlineTitle: 'On this page'
      }
    }
  }
});
