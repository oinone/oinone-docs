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
import { versions } from "../../versionConfig"

const route = useRoute()
const siteData = useSiteData()

const defaultLanguage = "/zh-cn/"

const currentLanguagePath = computed(() => {
  const path = route.path
  if (!siteData.value || !siteData.value.locales) return defaultLanguage

  const locales = siteData.value.locales

  const matchedLocalePath = Object.keys(locales)
    .sort((a, b) => b.length - a.length)
    .find(p => path.startsWith(p))

  if (!matchedLocalePath) return defaultLanguage

  const matchedVersion = versions
    .filter(v => v.prefix !== "")
    .sort((a, b) => b.prefix.length - a.prefix.length)
    .find(v => path.startsWith(v.prefix))

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

  let relativePath = path
  if (current.prefix && path.startsWith(current.prefix)) {
    relativePath = path.substring(current.prefix.length)
  }

  if (
    relativePath === "/" ||
    relativePath === "" ||
    relativePath === currentLanguagePath.value
  ) {
    return `${targetVersion.prefix}${currentLanguagePath.value}`
  }

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
