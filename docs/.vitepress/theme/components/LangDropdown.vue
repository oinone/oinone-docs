<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

// Detect current language from filePath
const currentLang = computed(() => {
  const fp = page.value.filePath
  if (fp.startsWith('en/') || fp.startsWith('v6/en/')) {
    return 'en'
  }
  return 'zh-cn'
})

// Calculate the path to switch to the other language
const switchLangPath = computed(() => {
  const fp = page.value.filePath // e.g. "zh-cn/DevManual/index.md" or "v6/en/index.md"
  
  // Replace language segment in path
  let newPath = '/' + fp.replace(/\.md$/, '')
  if (newPath.endsWith('/index')) {
    newPath = newPath.replace(/\/index$/, '/')
  }
  
  if (currentLang.value === 'zh-cn') {
    // Change zh-cn -> en
    newPath = newPath.replace(/^\/zh-cn\//, '/en/').replace(/^\/v6\/zh-cn\//, '/v6/en/')
  } else {
    // Change en -> zh-cn
    newPath = newPath.replace(/^\/en\//, '/zh-cn/').replace(/^\/v6\/en\//, '/v6/zh-cn/')
  }
  
  return newPath
})

function toggleLang() {
  window.location.href = switchLangPath.value
}
</script>

<template>
  <div class="lang-dropdown-wrapper">
    <button class="lang-btn" @click="toggleLang">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="lang-text">{{ currentLang === 'zh' ? 'English' : '中文' }}</span>
    </button>
  </div>
</template>

<style scoped>
.lang-dropdown-wrapper {
  display: flex;
  align-items: center;
}
.lang-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;
}
.lang-btn:hover {
  color: var(--vp-c-brand);
}
.lang-text {
  font-weight: 500;
}
</style>