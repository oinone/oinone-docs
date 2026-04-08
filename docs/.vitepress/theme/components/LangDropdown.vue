<script setup>
import { useData, withBase } from 'vitepress'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useVersion } from '../composables/useVersion'

const { page } = useData()
const { currentVersion } = useVersion()

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
  const fp = page.value.filePath || window.location.pathname
  if (fp.includes('/en/')) {
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

  // 始终从当前的完整 URL 中进行替换，保证带有 hash 时也能处理，并确保只改变语言，不改变版本
  let newPath = window.location.pathname

  if (targetLang === 'en') {
    // 切换为英文
    // 当前为中文
    if (currentVersion.value === 'v6') {
      newPath = newPath.replace(/^\/v6\/zh-cn\//, '/v6/en/')
    } else {
      newPath = newPath.replace(/^\/zh-cn\//, '/en/')
    }
  } else {
    // 切换为中文
    // 当前为英文
    if (currentVersion.value === 'v6') {
      newPath = newPath.replace(/^\/v6\/en\//, '/v6/zh-cn/')
    } else {
      newPath = newPath.replace(/^\/en\//, '/zh-cn/')
    }
  }
  
  return newPath + window.location.hash
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