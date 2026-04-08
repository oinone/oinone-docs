<script setup>
import { onMounted } from 'vue';
import { useData, withBase } from 'vitepress';

const props = defineProps({
  locale: {
    type: String,
    required: true
  }
});

const { site, theme } = useData();

onMounted(() => {
  const firstLinks = site.value.themeConfig?.firstLinks || theme.value?.firstLinks || {};
  const targetLink = firstLinks[props.locale] || `/${props.locale}/`;

  const fullPath = withBase(targetLink);
  const currentPath = window.location.pathname.replace(/\.html$/, '');

  if (currentPath !== fullPath) {
    window.location.replace(fullPath);
  }
});
</script>

<template>
  <div style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
    Redirecting...
  </div>
</template>
