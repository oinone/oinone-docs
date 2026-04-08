<template>
  <div class="search-wrapper">
    <SearchBox />
  </div>
</template>

<script setup lang="ts">
// 引入 vitepress-plugin-pagefind 提供的搜索组件
import SearchBox from 'vitepress-plugin-pagefind/Search.vue';
</script>

<style scoped>
.search-wrapper {
  display: flex;
  align-items: center;
}

/* 覆盖/调整 Pagefind 搜索框在当前主题中的显示 */
:deep(.VPNavBarSearch) {
  display: flex;
  align-items: center;
}

/* 移动端图标按钮显示调整 */
@media (max-width: 759px) {
  :deep(.nav-search-btn-wait) {
    width: auto !important;
    height: auto !important;
    padding: 8px !important;
    margin: 0 !important;
    background: transparent !important;
    border-radius: 4px;
    color: var(--vp-c-text-1) !important;
    transition: color 0.2s ease !important;
    border: none !important;
  }

  :deep(.nav-search-btn-wait:hover),
  :deep(.nav-search-btn-wait:active) {
    color: var(--vp-c-brand) !important;
  }

  :deep(.nav-search-btn-wait svg) {
    width: 22px !important;
    height: 22px !important;
    color: currentColor !important;
    margin: 0 !important;
  }

  :deep(.search-tip),
  :deep(.metaKey) {
    display: none !important;
  }

  :deep(.blog-search) {
    padding-left: 0;
  }
}
</style>
