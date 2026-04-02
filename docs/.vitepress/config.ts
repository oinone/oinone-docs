
import { defineConfig } from 'vitepress'
import sidebarRoot from './sidebar-root.json'
import sidebarEn from './sidebar-en.json'
import sidebarV6Zh from './sidebar-v6-zh.json'
import sidebarV6En from './sidebar-v6-en.json'

export default defineConfig({
  title: 'Oinone Docs',
  base: '/',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh-cn/',
      themeConfig: {
        nav: [
          { text: '服务中心', link: '/zh-cn/' },
        ],
        sidebar: sidebarRoot
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Service Center', link: '/en/' },
        ],
        sidebar: sidebarEn
      }
    },
    v6_zh: {
        label: 'v6-中文',
        lang: 'zh-CN',
        link: '/v6/zh-cn/',
        themeConfig: {
          nav: [
            { text: '服务中心', link: '/v6/zh-cn/' },
          ],
          sidebar: sidebarV6Zh
        }
    },
    v6_en: {
        label: 'v6-English',
        lang: 'en-US',
        link: '/v6/en/',
        themeConfig: {
          nav: [
            { text: 'Service Center', link: '/v6/en/' },
          ],
          sidebar: sidebarV6En
        }
    }
  }
})
