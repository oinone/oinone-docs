<template>
  <div class="nav-item language-dropdown" style="width: 46px">
    <NavbarDropdown v-if="dropdownConfig" :config="dropdownConfig">
      <template #title>
        <span class="nav-link dropdown-toggle">
          <I18nIcon class="language-icon" />
        </span>
      </template>
    </NavbarDropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useSiteData } from "vuepress/client"
import NavbarDropdown from "vuepress-theme-hope/navbar/components/NavbarDropdown.js"
import { I18nIcon } from "vuepress-theme-hope/navbar/components/icons/i18nIcon.js"

const route = useRoute()
const siteData = useSiteData()

const versions = [
  { text: "6.0", prefix: "/v6" },
  { text: "7.0", prefix: "" },
]

const languages = computed(() => {
  if (!siteData.value || !siteData.value.locales) return []
  const locales = siteData.value.locales
  const path = route.path

  const matchedVersion =
    versions
      .filter(v => v.prefix !== "")
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find(v => path.startsWith(v.prefix)) ||
    versions.find(v => v.prefix === "") ||
    versions[0]

  const langTextMap: Record<string, string> = {
    "zh-CN": "简体中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ru-RU": "Русский",
    zh: "简体中文",
    en: "English",
  }

  // 2. 过滤出属于当前版本的 locales
  const currentVersionLocales = Object.entries(locales).filter(([p]) => {
    if (matchedVersion.prefix === "") {
      // 默认版本，排除所有带版本前缀的路径
      return !versions.some(v => v.prefix !== "" && p.startsWith(v.prefix))
    }
    // 指定版本，只保留带该前缀的路径
    return p.startsWith(matchedVersion.prefix)
  })

  return currentVersionLocales.map(([path, config]) => ({
    text: langTextMap[config.lang || ""] || config.title || config.lang || path,
    path: path,
  }))
})

const currentLanguage = computed(() => {
  const path = route.path
  if (!siteData.value || !siteData.value.locales) return languages.value[0]

  // 查找最长匹配的 locale 路径
  const matchedPath = Object.keys(siteData.value.locales)
    .sort((a, b) => b.length - a.length)
    .find(p => path.startsWith(p))

  // 在过滤后的 languages 中查找
  return languages.value.find(l => l.path === matchedPath) || languages.value[0]
})

const getLanguageLink = (lang: { text: string; path: string }) => {
  const path = route.path
  const currentLangPath = currentLanguage.value.path
  const targetLangPath = lang.path

  if (currentLangPath === targetLangPath) return path

  // 普通路径替换
  const newPath = path.replace(currentLangPath, targetLangPath)
  return newPath.startsWith(targetLangPath) ? newPath : targetLangPath
}

const dropdownConfig = computed<any>(() => {
  if (!currentLanguage.value) return null
  return {
    text: currentLanguage.value.text,
    icon: "language",
    children: languages.value.map(lang => ({
      text: lang.text,
      link: getLanguageLink(lang),
      active: currentLanguage.value.path === lang.path,
    })),
  }
})
</script>

<style scoped lang="scss">
.language-dropdown {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  position: relative;
  background-color: transparent !important;
}

.fa-language {
  font-size: 16px;
}

.language-icon {
  width: "1rem";
  height: "1rem";
  vertical-align: middle;
}

.nav-link {
  display: inline;
}
</style>
