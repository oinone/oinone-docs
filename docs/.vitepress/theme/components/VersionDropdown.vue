<script setup>
import { useData, withBase } from 'vitepress';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useVersion } from '../../state';

const { page, site, theme } = useData();
const { currentVersion: globalCurrentVersion, setVersion } = useVersion();

// 同步初始状态
watch(globalCurrentVersion, (newVal) => {
  setVersion(newVal);
}, { immediate: true });

// State for dropdown
const isOpen = ref(false);
let isTouch = false;

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.version-dropdown-wrapper')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('touchstart', () => {
    isTouch = true;
  }, { once: true });
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const onMouseEnter = () => {
  if (!isTouch) isOpen.value = true;
};

const onMouseLeave = () => {
  if (!isTouch) isOpen.value = false;
};

const currentVersion = computed(() => {
  return globalCurrentVersion.value === 'v6' ? '6.0' : '7.0';
});

const versions = [
  { text: '7.0', prefix: '/' },
  { text: '6.0', prefix: '/v6/' }
];

function onVersionChange(targetVersion) {
  isOpen.value = false;
  if (targetVersion === currentVersion.value) return;

  // Use window.location.pathname to get the exact current URL path
  let currentPath = window.location.pathname;

  // Remove base if it exists (assuming withBase adds it, we need to handle raw path)
  // For standard VitePress, base is usually handled, but let's just work with the path
  const base = site.value.base || '/';
  if (base !== '/' && currentPath.startsWith(base)) {
    currentPath = currentPath.slice(base.length - 1);
  }

  // Determine current language from path
  const isEn = currentPath.includes('/en/') || currentPath.startsWith('/en/');
  const langKey = isEn ? 'en' : 'zh-cn';

  // Check if URL specifies no document path (root of the language/version)
  const isRoot = currentPath === '/zh-cn/' || currentPath === '/en/' || currentPath === '/v6/zh-cn/' || currentPath === '/v6/en/' || currentPath === '/' || currentPath === '/v6/' || currentPath === '/zh-cn' || currentPath === '/en' || currentPath === '/v6/zh-cn' || currentPath === '/v6/en' || currentPath === '/v6';

  let newPath = currentPath;

  if (isRoot) {
    // Get first links from theme config
    const firstLinks = site.value.themeConfig?.firstLinks || theme.value.firstLinks || {};

    let targetLocaleKey = '';
    if (targetVersion === '6.0') {
      targetLocaleKey = `v6/${langKey}`;
      setVersion('v6');
    } else {
      targetLocaleKey = langKey;
      setVersion('v7');
    }

    newPath = firstLinks[targetLocaleKey] || '/';
  } else {
    // Keep current document path but switch version
    if (targetVersion === '6.0') {
      setVersion('v6');
      // Add /v6 prefix
      if (!newPath.startsWith('/v6/')) {
        newPath = '/v6' + newPath;
      }
    } else {
      setVersion('v7');
      // Remove /v6 prefix
      newPath = newPath.replace(/^\/v6\//, '/');
    }
  }

  window.location.href = withBase(newPath);
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
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
          <svg v-if="currentVersion === version.text" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
               height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round">
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
