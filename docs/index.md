---
layout: false
---

<script setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

const { site, theme } = useData()

onMounted(() => {
  const firstLinks = site.value.themeConfig?.firstLinks || theme.value?.firstLinks || {}
  const userLang = navigator.language || navigator.userLanguage || 'zh-CN'
  let targetLocale = userLang.toLowerCase().startsWith('en') ? 'en' : 'zh-cn'
  
  const targetLink = firstLinks[targetLocale] || '/zh-cn/'
  
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
