
<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()

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

function onVersionChange(event) {
  const targetVersion = event.target.value
  if (targetVersion === currentVersion.value) return

  // Determine current language from filePath
  const isEn = page.value.filePath.includes('/en/') || page.value.filePath.startsWith('en/')
  const langPath = isEn ? 'en/' : 'zh-cn/'

  let newPath = '/'
  if (targetVersion === '6.0') {
    newPath = '/v6/' + langPath
  } else {
    newPath = '/' + langPath
  }

  window.location.href = newPath
}
</script>

<template>
  <div class="version-dropdown-wrapper">
    <select class="version-dropdown" @change="onVersionChange" :value="currentVersion">
      <option v-for="version in versions" :key="version.text" :value="version.text">
        {{ version.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.version-dropdown-wrapper {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}
.version-dropdown {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}
</style>
