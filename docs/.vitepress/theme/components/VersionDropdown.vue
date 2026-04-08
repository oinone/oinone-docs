<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useLanguage, useVersion, Version, versionOptions } from '../../state';

const { site } = useData();
const { currentVersion } = useVersion();
const { currentLanguage } = useLanguage();

const currentVersionLabel = computed(() => {
  return versionOptions.find(v => v.version === currentVersion.value).label;
});

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

function onVersionChange(targetVersion: Version) {
  isOpen.value = false;
  if (targetVersion === currentVersion.value) return;

  let currentPath = window.location.pathname;
  const base = site.value.base || '/';
  if (base !== '/' && currentPath.startsWith(base)) {
    currentPath = currentPath.slice(base.length - 1);
  }

  const curr = currentLanguage.value.baseLang || currentLanguage.value.lang;
  let currentPathPrefix = `/${curr}`;
  if (currentVersion.value !== Version.latest) {
    currentPathPrefix = `/${currentVersion.value}/${curr}`;
  }
  let newPathPrefix = `/${curr}`;
  if (targetVersion !== Version.latest) {
    newPathPrefix = `/${targetVersion}/${curr}`;
  }
  const newPath = currentPath.replace(currentPathPrefix, newPathPrefix);
  window.location.assign(`${window.location.origin}${newPath}`);
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
      <span>{{ currentVersionLabel }}</span>
      <svg class="icon-arrow" viewBox="0 0 10 10" width="10" height="10">
        <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="custom-dropdown">
        <a
          v-for="version in versionOptions"
          :key="version.version"
          class="custom-dropdown-item"
          :class="{ active: currentVersion === version.version }"
          @click="onVersionChange(version.version)"
        >
          <span>{{ version.label }}</span>
          <svg v-if="currentVersion === version.version" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
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
.version-dropdown-wrapper {
  margin-right: 1rem;
}
</style>
