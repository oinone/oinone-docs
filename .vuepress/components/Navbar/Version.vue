<template>
  <div class="nav-item version-dropdown">
    <NavbarDropdown v-if="dropdownConfig" :config="dropdownConfig">
      <template #title>
        <span class="nav-link dropdown-toggle">
          {{ currentVersion.text }}
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

const route = useRoute()
const siteData = useSiteData()

const versions = [
  { text: "6.0", prefix: "/v6" },
  { text: "7.0", prefix: "" }, // 7.0 是默认版本，没有前缀
]

const defaultLanguage = "/zh-cn/"

// 获取当前语言路径（例如 /zh-cn/ 或 /en/）
const currentLanguagePath = computed(() => {
  const path = route.path
  if (!siteData.value || !siteData.value.locales) return defaultLanguage

  const locales = siteData.value.locales

  // 1. 找到当前页面匹配的完整 locale 路径 (例如 /v6/zh-cn/ 或 /zh-cn/)
  const matchedLocalePath = Object.keys(locales)
    .sort((a, b) => b.length - a.length)
    .find(p => path.startsWith(p))

  if (!matchedLocalePath) return defaultLanguage

  // 2. 识别当前页面所属的版本前缀
  const matchedVersion = versions
    .filter(v => v.prefix !== "")
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(v => path.startsWith(v.prefix))

  // 3. 从完整 locale 路径中剥离版本前缀，提取出纯粹的语言路径
  if (matchedVersion && matchedLocalePath.startsWith(matchedVersion.prefix)) {
    return matchedLocalePath.substring(matchedVersion.prefix.length) || "/"
  }

  return matchedLocalePath
})

const currentVersion = computed(() => {
  const path = route.path
  // 按照前缀长度倒序排列，优先匹配更具体的路径
  return (
    versions
      .filter(v => v.prefix !== "")
      .sort((a, b) => b.prefix.length - a.prefix.length)
      .find(v => path.startsWith(v.prefix)) ||
    versions.find(v => v.prefix === "") ||
    versions[0]
  )
})

const getVersionLink = (targetVersion: { text: string; prefix: string }) => {
  const path = route.path
  const current = currentVersion.value

  if (current.text === targetVersion.text) return path

  // 1. 提取当前路径中除版本前缀外的相对部分
  let relativePath = path
  if (current.prefix && path.startsWith(current.prefix)) {
    relativePath = path.substring(current.prefix.length)
  }

  // 2. 如果相对路径是根路径 "/" 或仅包含语言路径，跳转到目标版本的对应语言首页
  if (
    relativePath === "/" ||
    relativePath === "" ||
    relativePath === currentLanguagePath.value
  ) {
    return `${targetVersion.prefix}${currentLanguagePath.value}`
  }

  // 3. 否则，尝试保持当前相对路径进行跳转
  return `${targetVersion.prefix}${relativePath}`
}

const dropdownConfig = computed<any>(() => {
  if (!currentVersion.value) return null
  return {
    text: currentVersion.value.text,
    children: versions.map(v => ({
      text: v.text,
      link: getVersionLink(v),
      active: v.text === currentVersion.value.text,
    })),
  }
})
</script>

<style scoped lang="scss">
.version-dropdown {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  position: relative;

  :deep(.dropdown-wrapper) {
    button.dropdown-title {
      background: transparent !important;
      border: none;
      font-size: 14px;
      color: #333;
      font-weight: 400;
      display: flex;
      align-items: center;
      padding: 0;
      cursor: pointer;
      text-decoration: none;
      line-height: 1.5;

      &:hover {
        color: #035dff;
        background: transparent !important;
      }

      .arrow {
        border-top: 4px solid;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        margin-left: 4px;
        transition: transform 0.2s;
      }
    }

    &.open button.dropdown-title .arrow {
      transform: rotate(-180deg);
    }

    .nav-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      min-width: 100px;
      padding: 8px 0;
      margin: 0;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      list-style: none;

      &::before {
        content: "";
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
      }

      .dropdown-item {
        .nav-link {
          display: block;
          padding: 8px 16px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s;
          display: inline;

          &:hover {
            color: #035dff;
            background-color: #f5f8ff;
          }

          &.active {
            color: #035dff;
            background-color: #f5f8ff;
            font-weight: 500;
          }
        }
      }
    }
  }
}
.nav-link {
  display: inline;
}
</style>
