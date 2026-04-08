---
layout: false
---

<script setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { site, theme } = useData()

onMounted(() => {
  const firstLinks = site.value.themeConfig?.firstLinks || theme.value?.firstLinks || {}
  const userLang = navigator.language || navigator.userLanguage || ''
  const browserLangCode = userLang.toLowerCase().split('-')[0] // e.g. 'en', 'zh', 'ja'
  
  // Find a matching language in firstLinks based on prefix, or fallback to the first available base language
  const availableLangs = Object.keys(firstLinks).filter(lang => !lang.startsWith('v6'))
  const defaultLang = 'en'
  
  let targetLocale = availableLangs.find(lang => lang.replace('v6/', '').startsWith(browserLangCode)) || defaultLang
  
  const targetLink = firstLinks[targetLocale] || firstLinks[defaultLang] || '/'
  
  const fullPath = withBase(targetLink)
  const currentPath = window.location.pathname.replace(/\.html$/, '')
  if (currentPath !== fullPath) {
    // Use window.location.replace to avoid history stack buildup
    window.location.replace(fullPath)
  }
})
</script>

<div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
  Redirecting...
</div>
