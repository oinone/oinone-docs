<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress';
import { computed } from 'vue';

const { theme } = useData();
const route = useRoute();

// Get the current active sidebar array
const currentSidebar = computed(() => {
  const sidebars = theme.value.sidebar;
  if (!sidebars) return [];
  const path = route.path;
  if (Array.isArray(sidebars)) {
    return sidebars;
  }
  for (const key in sidebars) {
    if (path.startsWith(key)) {
      return sidebars[key];
    }
  }
  return [];
});

const normalizePath = (p: string) => {
  let normalized = p.replace(/\/$/, '').replace(/\.html$/, '');
  // Also normalize /README or /index at the end to match directory root
  normalized = normalized.replace(/\/(README|index)$/i, '');
  // Ensure we don't return empty string for root
  return normalized || '/';
};

const breadcrumbs = computed(() => {
  const targetPath = normalizePath(route.path);
  const path: { text: string; link?: string }[] = [];
  
  const homeLink = (() => {
    if (route.path.startsWith('/v6/zh-cn/')) return '/v6/zh-cn/';
    if (route.path.startsWith('/v6/en/')) return '/v6/en/';
    if (route.path.startsWith('/zh-cn/')) return '/zh-cn/';
    if (route.path.startsWith('/en/')) return '/en/';
    return '/';
  })();
  
  const homeText = route.path.includes('/en/') ? 'Home' : '首页';
  
  const findPath = (items: any[], currentPath: { text: string; link?: string }[]): boolean => {
    for (const item of items) {
      const newPath = [...currentPath, { text: item.text, link: item.link }];
      
      if (item.link && normalizePath(item.link) === targetPath) {
        path.push({ text: homeText, link: homeLink }, ...newPath);
        return true;
      }
      
      if (item.items && item.items.length > 0) {
        if (findPath(item.items, newPath)) {
          return true;
        }
      }
    }
    return false;
  };
  
  findPath(currentSidebar.value, []);
  
  return path;
});
</script>

<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length > 0">
    <ol>
      <li v-for="(item, index) in breadcrumbs" :key="index">
        <a v-if="item.link && index < breadcrumbs.length - 1" :href="withBase(item.link)">{{ item.text }}</a>
        <span v-else-if="index < breadcrumbs.length - 1" class="text">{{ item.text }}</span>
        <span v-else class="current">{{ item.text }}</span>
        <span class="separator" v-if="index < breadcrumbs.length - 1">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.breadcrumb ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--vp-c-brand);
}

.breadcrumb .text {
  color: var(--vp-c-text-2);
}

.breadcrumb .current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.breadcrumb .separator {
  margin: 0 8px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
</style>
