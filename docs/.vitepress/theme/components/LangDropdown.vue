<script setup>
import { useData, withBase } from 'vitepress'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const { page } = useData()

// State for dropdown
const isOpen = ref(false)
let isTouch = false

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.lang-dropdown-wrapper')) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('touchstart', () => { isTouch = true }, { once: true })
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const onMouseEnter = () => {
  if (!isTouch) isOpen.value = true
}

const onMouseLeave = () => {
  if (!isTouch) isOpen.value = false
}

// Detect current language from filePath
const currentLang = computed(() => {
  const fp = page.value.filePath
  if (fp.startsWith('en/') || fp.startsWith('v6/en/')) {
    return 'en'
  }
  return 'zh-cn'
})

const langs = [
  { text: '简体中文', value: 'zh-cn' },
  { text: 'English', value: 'en' }
]

// Calculate the path to switch to a specific language
const getLangPath = (targetLang) => {
  if (currentLang.value === targetLang) return '#'

  const fp = page.value.filePath // e.g. "zh-cn/DevManual/index.md" or "v6/en/index.md"
  
  // Replace language segment in path
  let newPath = '/' + fp.replace(/\.md$/, '')
  if (newPath.endsWith('/index')) {
    newPath = newPath.replace(/\/index$/, '/')
  }
  
  if (targetLang === 'en') {
    // Change zh-cn -> en
    newPath = newPath.replace(/^\/zh-cn\//, '/en/').replace(/^\/v6\/zh-cn\//, '/v6/en/')
  } else {
    // Change en -> zh-cn
    newPath = newPath.replace(/^\/en\//, '/zh-cn/').replace(/^\/v6\/en\//, '/v6/zh-cn/')
  }
  
  return newPath
}

function changeLang(targetLang) {
  isOpen.value = false
  if (currentLang.value === targetLang) return
  window.location.href = withBase(getLangPath(targetLang))
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div 
    class="lang-dropdown-wrapper custom-dropdown-wrap"
    :class="{ open: isOpen }"
    @mouseenter="onMouseEnter" 
    @mouseleave="onMouseLeave"
  >
    <button class="custom-dropdown-button" @click="toggleDropdown">
      <svg class="icon-translate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="lang-text">{{ currentLang === 'en' ? 'English' : '简体中文' }}</span>
      <svg class="icon-arrow" viewBox="0 0 10 10" width="10" height="10">
        <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="custom-dropdown">
        <a 
          v-for="lang in langs" 
          :key="lang.value" 
          class="custom-dropdown-item" 
          :class="{ active: currentLang === lang.value }"
          @click="changeLang(lang.value)"
        >
          <span>{{ lang.text }}</span>
          <svg v-if="currentLang === lang.value" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lang-dropdown-wrapper {
  margin-right: 0.5rem;
}
.icon-translate {
  margin-right: 2px;
}
</style>