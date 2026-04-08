<template>
  <div class="pdf-preview-container">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
}>();
</script>

<style scoped>
.pdf-preview-container {
  width: 100%;
  height: 800px;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}
</style>
