<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLanguage, useVersion, Version } from '../../state';

const { site } = useData();
const { currentVersion } = useVersion();
const { currentLanguage, languageOptions } = useLanguage();

// State for dropdown
const isOpen = ref(false);
const isLoading = ref(false);
let isTouch = false;

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.lang-dropdown-wrapper')) {
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

function getLang() {
  return currentLanguage.value.baseLang || currentLanguage.value.lang;
}

async function onLanguageChange(targetLanguage: string) {
  isOpen.value = false;
  const curr = getLang();
  if (targetLanguage === curr) return;
  let currentPath = window.location.pathname;
  const base = site.value.base || '/';
  if (base !== '/' && currentPath.startsWith(base)) {
    currentPath = currentPath.slice(base.length - 1);
  }
  let currentPathPrefix = `/${curr}`;
  let newPathPrefix = `/${targetLanguage}`;
  if (currentVersion.value !== Version.latest) {
    currentPathPrefix = `/${currentVersion.value}/${curr}`;
    newPathPrefix = `/${currentVersion.value}/${targetLanguage}`;
  }
  const newPath = currentPath.replace(currentPathPrefix, newPathPrefix);
  window.location.assign(`${window.location.origin}${newPath}`);
}

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

const currentLangLabel = computed(() => {
  return currentLanguage.value.label;
});
</script>

<template>
  <div
    class="lang-dropdown-wrapper custom-dropdown-wrap"
    :class="{ open: isOpen, loading: isLoading }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <button class="custom-dropdown-button" @click="toggleDropdown" :disabled="isLoading">
      <svg v-if="!isLoading" class="icon-translate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16"
           height="16"
           fill="currentColor">
        <path
          d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <svg v-else class="icon-loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"
           fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      <span class="lang-text">{{ currentLangLabel }}</span>
      <svg class="icon-arrow" viewBox="0 0 10 10" width="10" height="10">
        <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="custom-dropdown">
        <a
          v-for="lang in languageOptions"
          :key="lang.lang"
          class="custom-dropdown-item"
          :class="{ active: currentLanguage.lang === lang.lang }"
          @click="onLanguageChange(lang.baseLang || lang.lang)"
        >
          <span>{{ lang.label }}</span>
          <svg v-if="currentLanguage.lang === lang.lang" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               width="16"
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
.icon-translate {
  margin-right: 2px;
}

.icon-loading {
  margin-right: 2px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.loading .custom-dropdown-button {
  cursor: wait;
  opacity: 0.7;
}
</style>