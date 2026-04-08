import { defineConfig } from 'vitepress';
import { getSidebar } from './auto-sidebar';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';

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
  head: [
    ['link', { rel: 'icon', href: 'https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/website/oinone-logo-100.webp' }]
  ],
  base: '/',
  buildConcurrency: 8,
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery(input) {
          // 支持多语言/多版本下的中文分词和基础搜索
          return input.replace(/[\u4e00-\u9fa5]/g, ' $& ')
            .replace(/\s+/g, ' ')
            .trim();
        },
        locales: {
          root: {
            btnPlaceholder: '搜索',
            placeholder: '搜索文档',
            emptyText: '没有找到结果',
            heading: '共找到 {{searchResult}} 个结果'
          },
          'zh-cn': {
            btnPlaceholder: '搜索',
            placeholder: '搜索文档',
            emptyText: '没有找到结果',
            heading: '共找到 {{searchResult}} 个结果'
          },
          'v6/zh-cn': {
            btnPlaceholder: '搜索',
            placeholder: '搜索文档',
            emptyText: '没有找到结果',
            heading: '共找到 {{searchResult}} 个结果'
          },
          'en': {
            btnPlaceholder: 'Search',
            placeholder: 'Search docs',
            emptyText: 'No results found',
            heading: 'Total: {{searchResult}} results'
          },
          'v6/en': {
            btnPlaceholder: 'Search',
            placeholder: 'Search docs',
            emptyText: 'No results found',
            heading: 'Total: {{searchResult}} results'
          }
        }
      })
    ],
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  },
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    outline: [1, 6],
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
    // 顺序决定了解析顺序，因此，具备包含关系的 key 必须放在最下面进行定义
    root: {
      label: '中文',
      lang: 'zh',
      link: getFirstLink(zhSidebar) || '/zh-cn/',
      themeConfig: {
        sidebar: zhSidebar,
        outlineTitle: '本页目录'
      }
    },
    'v6/zh-cn': {
      label: 'v6-中文',
      lang: 'zh',
      link: getFirstLink(v6ZhSidebar) || '/v6/zh-cn/',
      themeConfig: {
        sidebar: v6ZhSidebar,
        outlineTitle: '本页目录'
      }
    },
    'v6/en': {
      label: 'v6-English',
      lang: 'en',
      link: getFirstLink(v6EnSidebar) || '/v6/en/',
      themeConfig: {
        sidebar: v6EnSidebar,
        outlineTitle: 'On this page'
      }
    },
    'zh-cn': {
      label: '中文',
      lang: 'zh',
      link: getFirstLink(zhSidebar) || '/zh-cn/',
      themeConfig: {
        sidebar: zhSidebar,
        outlineTitle: '本页目录'
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: getFirstLink(enSidebar) || '/en/',
      themeConfig: {
        sidebar: enSidebar,
        outlineTitle: 'On this page'
      }
    }
  }
});
