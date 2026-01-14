import { hopeTheme } from "vuepress-theme-hope"
import { enNavbar, zhCNNavbar, v6EnNavbar, v6ZhCNNavbar } from "./navbar.js"
import { sidebarConfig } from "./sidebar.js"

export default hopeTheme(
  {
    hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",
    // 禁用深色主题
    darkmode: "toggle",
    author: {
      name: "Mr.Hope",
      url: "https://mister-hope.com",
    },

    logo: "https://doc.oinone.top/wp-content/uploads/2023/11/oio_logo-cfcd405e.png",

    docsDir: ".",

    home: "/zh-cn/",
    locales: {
      "/zh-cn/": {
        sidebar: sidebarConfig,
        navbar: zhCNNavbar,
      },
      "/en/": {
        sidebar: sidebarConfig,
        navbar: enNavbar,
      },
      "/v6/zh-cn/": {
        sidebar: sidebarConfig,
        navbar: v6ZhCNNavbar,
      },
      "/v6/en/": {
        sidebar: sidebarConfig,
        navbar: v6EnNavbar,
      },
    },

    pageInfo: false,
    contributors: false,
    toc: {
      levels: [1, 6],
    },

    editLink: true,
    docsRepo: "https://github.com/oinone/oinone-docs",
    docsBranch: "6.x",
    // // 导航栏
    // navbar,

    // // 侧边栏
    // sidebar: enSidebar,

    // 页脚
    footer: "默认页脚",
    displayFooter: true,

    // 加密配置
    encrypt: {
      config: {
        "/demo/encrypt.html": ["1234"],
      },
    },
    markdown: {
      highlighter: {
        type: "shiki", // or "prismjs"

        // shiki 或 prismjs 选项
        // ...
      },
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              }
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 katex
      // katex: true,

      // 在启用之前安装 mathjax-full
      // mathjax: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 reveal.js
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 多语言配置
    routeLocales: {
      skipToContent: "跳至主要内容",
    },

    repo: "https://github.com/oinone",

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,
    // 在这里配置主题提供的插件
    plugins: {
      icon: {
        assets: "fontawesome-with-brands",
      },
      // 你应该自行生成自己的评论服务
      /*comment: {
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },*/
      slimsearch: true,
      sitemap: false,
      components: {
        components: ["Badge", "VPCard", "PDF"],
      },

      // 此处开启了很多功能用于演示，你应仅保留用到的功能。

      // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cachePic: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
    },
  },
  { custom: true }
)
