
<script setup>
import { useData, withBase } from 'vitepress'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const { page, site, theme } = useData()

// State for dropdown
const isOpen = ref(false)
let isTouch = false

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.version-dropdown-wrapper')) {
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

// Compute the current version string from filePath
const currentVersion = computed(() => {
  if (page.value.filePath.startsWith('v6/')) {
    return '6.0'
  }
  return '7.0'
})

const versions = [
  { text: '7.0', prefix: '/' },
  { text: '6.0', prefix: '/v6/' }
]

function onVersionChange(targetVersion) {
  isOpen.value = false
  if (targetVersion === currentVersion.value) return

  // Determine current language from filePath
  const isEn = page.value.filePath.includes('/en/') || page.value.filePath.startsWith('en/')
  const langKey = isEn ? 'en' : 'zh-cn'

  // Get first links from theme config
  const firstLinks = site.value.themeConfig?.firstLinks || theme.value.firstLinks || {}

  let targetLocaleKey = ''
  if (targetVersion === '6.0') {
    targetLocaleKey = `v6/${langKey}`
  } else {
    targetLocaleKey = langKey
  }

  const newPath = firstLinks[targetLocaleKey] || '/'

  window.location.href = withBase(newPath)
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div 
    class="version-dropdown-wrapper custom-dropdown-wrap" 
    :class="{ open: isOpen }"
    @mouseenter="onMouseEnter" 
    @mouseleave="onMouseLeave"
  >
    <button class="custom-dropdown-button" @click="toggleDropdown">
      <span>v{{ currentVersion }}</span>
      <svg class="icon-arrow" viewBox="0 0 10 10" width="10" height="10">
        <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="custom-dropdown">
        <a 
          v-for="version in versions" 
          :key="version.text" 
          class="custom-dropdown-item" 
          :class="{ active: currentVersion === version.text }"
          @click="onVersionChange(version.text)"
        >
          <span>v{{ version.text }}</span>
          <svg v-if="currentVersion === version.text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.version-dropdown-wrapper {
  margin-right: 1rem;
}
</style>
