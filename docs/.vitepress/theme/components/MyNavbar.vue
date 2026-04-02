
<template>
  <nav class="nav" :class="{ scrolled }" id="mainNav">
    <div class="nav-inner">
      <a class="nav-link nav-logo" :href="localePath('/')">
        <img src="http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/website/oinone-logo.webp"
             alt="Oinone" width="120" height="32" style="height:32px;width:auto">
      </a>
      <div class="nav-links">
        <!-- Product Dropdown -->
        <div class="nav-dropdown-wrap">
          <a class="nav-link">{{ $t('nav.product') }}
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
          </a>
          <div class="nav-dropdown">
            <a class="nav-link" :href="localePath('/product/framework')">
              <div class="dd-icon oinone"><img
                src="http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/website/oinone-logo-100.webp"
                alt="Oinone" style="width:24px;height:24px;object-fit:contain"></div>
              <div>
                <div class="dd-title">{{ $t('nav.oinoneFramework') }}</div>
                <div class="dd-desc">{{ $t('nav.oinoneFrameworkDesc') }}</div>
              </div>
            </a>
            <a class="nav-link" :href="localePath('/product/aino')">
              <div class="dd-icon aino"><img
                src="http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/website/aino-logo-100.webp"
                alt="Aino" style="width:24px;height:24px;object-fit:contain"></div>
              <div>
                <div class="dd-title">{{ $t('nav.aino') }}</div>
                <div class="dd-desc">{{ $t('nav.ainoDesc') }}</div>
              </div>
            </a>
          </div>
        </div>
        <a class="nav-link" :href="localePath('/use-cases')">{{ $t('nav.useCases') }}</a>
        <a class="nav-link" :href="localePath('/pricing')">{{ $t('nav.pricing') }}</a>
        <a class="nav-link" :href="localePath('/blogs')">{{ $t('nav.blog') }}</a>
        <a class="nav-link" href="https://doc.oinone.top/" target="_blank">{{ $t('nav.community') }}</a>
        <!-- Resources Dropdown -->
        <div class="nav-dropdown-wrap">
          <a class="nav-link">{{ $t('nav.resources') }}
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
          </a>
          <div class="nav-dropdown">
            <a :href="docUrl" target="_blank">
              <div class="dd-icon oinone">&#128214;</div>
              <div>
                <div class="dd-title">{{ $t('nav.documentation') }}</div>
                <div class="dd-desc">{{ $t('nav.documentationDesc') }}</div>
              </div>
            </a>
            <a class="nav-link" :href="localePath('/support')">
              <div class="dd-icon oinone">&#128172;</div>
              <div>
                <div class="dd-title">{{ $t('nav.support') }}</div>
                <div class="dd-desc">{{ $t('nav.supportDesc') }}</div>
              </div>
            </a>
            <a class="nav-link" :href="localePath('/changelog')">
              <div class="dd-icon oinone">&#128196;</div>
              <div>
                <div class="dd-title">{{ $t('nav.changelog') }}</div>
                <div class="dd-desc">{{ $t('nav.changelogDesc') }}</div>
              </div>
            </a>
            <a class="nav-link" :href="localePath('/about')">
              <div class="dd-icon oinone">&#127969;</div>
              <div>
                <div class="dd-title">{{ $t('nav.about') }}</div>
                <div class="dd-desc">{{ $t('nav.aboutDesc') }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="vp-navbar-end">
        <VPLocalSearchBox v-if="theme.localSearch" :options="theme.localSearch.options" />
        <VersionDropdown />
        <LangDropdown />
        <VPSocialLinks class="social-links" :links="theme.socialLinks" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';
import VersionDropdown from './VersionDropdown.vue';
import LangDropdown from './LangDropdown.vue';
import { useTranslate } from '../../plugins/useTranslate';
import VPLocalSearchBox from 'vitepress/dist/client/theme-default/components/VPLocalSearchBox.vue'
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue'

const { theme, lang } = useData();

const scrolled = ref(false);

const WELCOME_WEBSITE_URL = 'https://www.oinone.top';

const localePath = (uri: string) => {
  return `${WELCOME_WEBSITE_URL}${uri}`;
};

const docUrl = computed(() =>
  lang.value === 'en-US' || lang.value === 'en'
    ? 'https://guide.oinone.top/en/DevManual/Tutorials/'
    : 'https://guide.oinone.top/zh-cn/DevManual/Tutorials/'
);

const { t: $t } = useTranslate();

const onScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--vp-nav-height);
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: 1px solid transparent;
  transition: all .5s ease;
}

.nav.scrolled {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(240, 248, 255, 0.5) 100%);
  backdrop-filter: blur(40px) saturate(2) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) saturate(2) brightness(1.05);
  border-bottom-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 4px 24px rgba(0, 0, 0, 0.04);
}

.nav-inner {
  width: 100%;
  display: flex;
  align-items: center
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
  transition: opacity .2s;
  margin-right: 48px
}

.nav-logo:hover {
  opacity: .75
}

.nav-logo img {
  height: 32px;
  width: auto
}

.nav-links {
  display: flex;
  gap: 36px;
  align-items: center;
  margin-right: auto
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color .2s;
  cursor: pointer;
  position: relative;
}

.nav-link:hover {
  color: var(--vp-c-text-1)
}

.nav-link svg {
  width: 10px;
  height: 10px;
  opacity: .4
}

/* Dropdown */
.nav-dropdown-wrap {
  position: relative
}

.nav-dropdown-wrap > a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 20px
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 8px;
  width: max-content;
  opacity: 0;
  pointer-events: none;
  transition: all .25s ease-out;
  box-shadow: 0 12px 40px rgba(0, 0, 0, .08);
}

.nav-dropdown-wrap:hover .nav-dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0)
}

.nav-dropdown a {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: background .15s;
}

.nav-dropdown a:hover {
  background: var(--vp-c-bg-soft)
}

.dd-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.dd-icon.oinone {
  background: rgba(26, 115, 232, .08);
  color: var(--vp-c-brand)
}

.dd-icon.aino {
  background: linear-gradient(135deg, rgba(26, 115, 232, .1), rgba(0, 212, 170, .1));
  color: #00B894
}

.dd-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px
}

.dd-desc {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  white-space: nowrap
}

.vp-navbar-end {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media(max-width: 768px) {
  .nav-links {
    display: none
  }
  .vp-navbar-end {
      margin-left: auto;
  }
}
</style>
