<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useTranslate } from '../plugins/useTranslate';

const { localeIndex } = useData();
const { t: $t } = useTranslate();

// 自动根据当前 localeIndex 决定跳转首页的链接
const homeLink = computed(() => {
  const currentLocale = localeIndex.value;
  if (currentLocale === 'v6/en') {
    return '/v6/en/';
  } else if (currentLocale === 'v6/zh-cn') {
    return '/v6/zh-cn/';
  } else if (currentLocale === 'en') {
    return '/en/';
  }
  return '/zh-cn/';
});
</script>

<template>
  <div class="not-found-wrapper">
    <div class="not-found-content">
      <div class="image-wrapper">
        <svg class="illustration" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="svg-text">404</text>
          <circle cx="200" cy="100" r="80" class="svg-circle" />
          <path d="M160 80 Q200 120 240 80" class="svg-smile" />
          <circle cx="170" cy="85" r="5" class="svg-eye" />
          <circle cx="230" cy="85" r="5" class="svg-eye" />
        </svg>
      </div>
      <h1 class="title">{{ $t('notFound.title') }}</h1>
      <p class="desc">{{ $t('notFound.desc') }}</p>
      <div class="action-area">
        <a :href="homeLink" class="back-btn">
          {{ $t('notFound.button') }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--nav-height, 60px));
  padding: 2rem;
  text-align: center;
  background-color: var(--vp-c-bg);
}

.not-found-content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.image-wrapper {
  width: 100%;
  max-width: 320px;
  margin-bottom: 2rem;
}

.illustration {
  width: 100%;
  height: auto;
}

.svg-text {
  font-size: 140px;
  font-weight: 900;
  fill: var(--vp-c-brand-1, #3eaf7c);
  opacity: 0.05;
  font-family: var(--vp-font-family-base, sans-serif);
}

.svg-circle {
  fill: none;
  stroke: var(--vp-c-brand-1, #3eaf7c);
  stroke-width: 3;
  stroke-dasharray: 15 15;
  animation: rotate 30s linear infinite;
  transform-origin: center;
}

.svg-smile {
  fill: none;
  stroke: var(--vp-c-text-1, #333);
  stroke-width: 6;
  stroke-linecap: round;
}

.svg-eye {
  fill: var(--vp-c-text-1, #333);
}

:deep(.dark) .svg-smile {
  stroke: var(--vp-c-text-1, #fff);
}

:deep(.dark) .svg-eye {
  fill: var(--vp-c-text-1, #fff);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.action-area {
  display: flex;
  gap: 1rem;
}

.back-btn {
  display: inline-block;
  padding: 0.7rem 2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-button-brand-text, #ffffff);
  background-color: var(--vp-button-brand-bg, var(--vp-c-brand-1, #3eaf7c));
  border-radius: 24px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.back-btn:hover {
  background-color: var(--vp-button-brand-hover-bg, var(--vp-c-brand-2, #33a06f));
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
</style>
