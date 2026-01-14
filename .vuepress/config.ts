import { viteBundler } from "@vuepress/bundler-vite"
import { defineUserConfig } from "vuepress"
import { getDirname, path } from "vuepress/utils"
import theme from "./theme.js"

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Oinone技术手册",
  description: "Oinone技术手册",

  theme,

  // 自定义组件 https://theme-hope.vuejs.press/zh/guide/advanced/replace.html
  alias: {
    "@theme-hope/modules/sidebar/components/Sidebar": path.resolve(
      __dirname,
      "./components/Sidebar.vue"
    ),
    "@theme-hope/modules/navbar/components/Navbar": path.resolve(
      __dirname,
      "./components/Navbar/Navbar.vue"
    ),
    "@theme-hope/components/SkipLink": path.resolve(
      __dirname,
      "./components/SkipLink.vue"
    ),
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/zh-cn/": {
      lang: "zh-CN",
    },
    "/en/": {
      lang: "en-US",
    },
    "/v6/zh-cn/": {
      lang: "zh-CN",
    },
    "/v6/en/": {
      lang: "en-US",
    },
  },
  markdown: {
    headers: {
      level: [1, 2],
    },
  },
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  // pagePatterns: ['**/*.md', '!**/README.md'],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
})
