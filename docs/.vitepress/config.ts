import { defineConfig } from 'vitepress';
import { getSidebar } from './auto-sidebar';
import { pagefindPlugin } from 'vitepress-plugin-pagefind';
import { defaultLanguage, supportedLanguages } from './state/languages';

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

const firstLinks: Record<string, string> = {};
const localesConfig: Record<string, any> = {};
const searchLocales: Record<string, any> = {
  root: {
    btnPlaceholder: 'Search',
    placeholder: 'Search docs',
    emptyText: 'No results found',
    heading: 'Total: {{searchResult}} results'
  },
  'zh': {
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
  'es': {
    btnPlaceholder: 'Buscar',
    placeholder: 'Buscar documentos',
    emptyText: 'No se encontraron resultados',
    heading: 'Total: {{searchResult}} resultados'
  },
  'fr': {
    btnPlaceholder: 'Rechercher',
    placeholder: 'Rechercher dans les documents',
    emptyText: 'Aucun résultat trouvé',
    heading: 'Total : {{searchResult}} résultats'
  },
  'de': {
    btnPlaceholder: 'Suchen',
    placeholder: 'Dokumente durchsuchen',
    emptyText: 'Keine Ergebnisse gefunden',
    heading: 'Insgesamt: {{searchResult}} Ergebnisse'
  },
  'ko': {
    btnPlaceholder: '검색',
    placeholder: '문서 검색',
    emptyText: '결과를 찾을 수 없습니다',
    heading: '총 {{searchResult}}개의 결과'
  },
  'ja': {
    btnPlaceholder: '検索',
    placeholder: 'ドキュメントを検索',
    emptyText: '結果が見つかりません',
    heading: '合計 {{searchResult}} 件の結果'
  },
  'th': {
    btnPlaceholder: 'ค้นหา',
    placeholder: 'ค้นหาเอกสาร',
    emptyText: 'ไม่พบผลลัพธ์',
    heading: 'พบทั้งหมด {{searchResult}} รายการ'
  }
};

// Set up root locale
const sidebar = getSidebar(defaultLanguage.lang, defaultLanguage.path);
localesConfig.root = {
  label: defaultLanguage.label,
  lang: defaultLanguage.lang,
  link: getFirstLink(sidebar) || defaultLanguage.path,
  themeConfig: {
    sidebar,
    outlineTitle: defaultLanguage.outlineTitle
  }
};

// Set up other locales based on supportedLanguages
supportedLanguages.forEach(langInfo => {
  const { lang, label, path, outlineTitle } = langInfo;
  const sidebar = getSidebar(lang, path);
  const link = getFirstLink(sidebar) || path;

  firstLinks[lang] = link;

  localesConfig[lang] = {
    label,
    lang,
    link,
    themeConfig: {
      sidebar,
      outlineTitle
    }
  };
});

export default defineConfig({
  ignoreDeadLinks: true,
  title: 'Oinone Docs',
  head: [
    ['link', {
      rel: 'icon',
      href: 'https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/website/oinone-logo-100.webp'
    }]
  ],
  base: '/',
  buildConcurrency: 8,
  vite: {
    plugins: [
      // {
      //   name: 'rewrite-zh-cn',
      //   enforce: 'pre',
      //   configureServer(server) {
      //     server.middlewares.use((req, res, next) => {
      //       if (req.url && req.url.includes('/zh-cn/')) {
      //         req.url = req.url.replace('/zh-cn/', '/zh/');
      //       }
      //       next();
      //     });
      //   },
      //   transform(code, id) {
      //     if (id.includes('vitepress/dist/client/app/router.js')) {
      //       return code.replace(
      //         'history.replaceState({}, \'\', href);',
      //         'if (!window.location.pathname.includes("/zh-cn/")) { history.replaceState({}, "", href); }'
      //       );
      //     }
      //   }
      // },
      pagefindPlugin({
        customSearchQuery(input) {
          // 支持多语言/多版本下的中文分词和基础搜索
          return input.replace(/[\u4e00-\u9fa5]/g, ' $& ')
            .replace(/\s+/g, ' ')
            .trim();
        },
        locales: searchLocales
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
    firstLinks
  },
  locales: localesConfig,
  async buildEnd(siteConfig) {
    const fs = await import('fs/promises');
    const path = await import('path');

    // 遍历生成的所有 html 文件
    const walk = async (dir) => {
      const files = await fs.readdir(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          await walk(filePath);
        } else if (filePath.endsWith('.html')) {
          let content = await fs.readFile(filePath, 'utf-8');
          // 替换 VitePress 默认生成的 preload stylesheet 为阻塞式 stylesheet，以解决闪屏抖动问题
          content = content.replace(/<link rel="preload stylesheet"([^>]+)>/g, '<link rel="stylesheet"$1>');
          await fs.writeFile(filePath, content, 'utf-8');
        }
      }
    };

    await walk(siteConfig.outDir);
  }
});
