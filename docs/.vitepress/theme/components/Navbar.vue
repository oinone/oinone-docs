<template>
  <nav class="nav" :class="{ scrolled }" id="mainNav">
    <div class="nav-inner">
      <div class="nav-left">
        <div class="VPNavBarHamburger" @click="$emit('toggle-sidebar')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>
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
        <Search />

        <!-- Mobile "More" Button -->
        <div class="mobile-more-wrap" v-if="isMobile" :class="{ open: isMoreOpen }">
          <div class="mobile-more-btn" @click.stop="isMoreOpen = !isMoreOpen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>
          <transition name="fade-slide">
            <div v-show="isMoreOpen" class="mobile-more-dropdown custom-dropdown">
              <div class="mobile-dropdown-item">
                <VersionDropdown />
              </div>
              <div class="mobile-dropdown-item">
                <LanguageDropdown />
              </div>
              <div class="mobile-dropdown-item social-container">
                <VPSocialLinks class="social-links" :links="theme.socialLinks" />
              </div>
              <div class="mobile-dropdown-item appearance-container">
                <VPSwitchAppearance />
              </div>
            </div>
          </transition>
        </div>

        <!-- Desktop Action Area -->
        <div class="desktop-navbar-end" v-else>
          <VersionDropdown />
          <LanguageDropdown />
          <VPSocialLinks class="social-links" :links="theme.socialLinks" />
          <div class="nav-appearance-wrap">
            <VPSwitchAppearance />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';
import VersionDropdown from './VersionDropdown.vue';
import LanguageDropdown from './LanguageDropdown.vue';
import Search from './Search.vue';
import { useTranslate } from '../../plugins/useTranslate';
import { GUIDE_WEBSITE_URL, WELCOME_WEBSITE_URL } from '../../constants';
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue';
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue';

defineEmits(['toggle-sidebar']);

const { theme, lang } = useData();

const scrolled = ref(false);
const isMobile = ref(false);
const isMoreOpen = ref(false);

const localePath = (uri: string) => {
  return `${WELCOME_WEBSITE_URL}${uri}`;
};

const docUrl = computed(() =>
  lang.value === 'zh' || lang.value === 'zh-cn'
    ? `${GUIDE_WEBSITE_URL}/zh/DevManual/README.html`
    : `${GUIDE_WEBSITE_URL}/en/DevManual/README.html`
);

const { t: $t } = useTranslate();

const onScroll = () => {
  scrolled.value = window.scrollY > 10;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 960;
  if (!isMobile.value) {
    isMoreOpen.value = false;
  }
};

const closeMoreDropdown = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.closest('.mobile-more-wrap')) {
    isMoreOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', checkMobile);
  document.addEventListener('click', closeMoreDropdown);
  checkMobile();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', checkMobile);
  document.removeEventListener('click', closeMoreDropdown);
});
</script>

<style lang="scss">
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
  background: transparent;
  border-bottom-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 4px 24px rgba(0, 0, 0, 0.04);
}

.nav.scrolled::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(240, 248, 255, 0.5) 100%);
  backdrop-filter: blur(40px) saturate(2) brightness(1.05);
  -webkit-backdrop-filter: blur(40px) saturate(2) brightness(1.05);
  pointer-events: none;
}

html.dark .nav.scrolled::before {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(40px) saturate(1.5);
  -webkit-backdrop-filter: blur(40px) saturate(1.5);
}

html.dark .nav.scrolled {
  background: transparent;
  border-bottom-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.05) inset, 0 4px 24px rgba(0, 0, 0, 0.4);
}

@media (min-width: 960px) {
  .nav {
    padding-left: 32px;
    padding-right: 32px;
  }
}

@media (min-width: 1440px) {
  .nav {
    padding-left: max(32px, calc((100vw - (1440px - 64px)) / 2));
    padding-right: max(32px, calc((100vw - (1440px - 64px)) / 2));
  }
}

.nav-inner {
  width: 100%;
  display: flex;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
  transition: opacity .2s;
  margin-right: 48px;
}

.nav-logo:hover {
  opacity: .75;
}

.nav-logo img {
  height: 32px;
  width: auto;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-appearance-wrap {
  display: flex;
  align-items: center;
  margin-left: 16px;
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
  z-index: 2; /* keep above absolute logo */
}

@media(max-width: 768px) {
  .nav-links {
    display: none
  }
  .vp-navbar-end {
    margin-left: auto;
  }
}

/* Fix mobile menu integration */
.VPNavBarHamburger {
  display: none;
  cursor: pointer;
  padding: 8px;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
  z-index: 2; /* keep above absolute logo */
}

.VPNavBarHamburger:hover {
  color: var(--vp-c-brand);
}

.desktop-navbar-end {
  display: flex;
  align-items: center;
}

/* Mobile "More" Dropdown specific styles */
.mobile-more-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.mobile-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}

.mobile-more-btn:hover, .mobile-more-wrap.open .mobile-more-btn {
  color: var(--vp-c-brand);
}

.mobile-more-dropdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  top: calc(100% + 12px);
  right: 0;
  transform-origin: top right;
}

.mobile-dropdown-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.social-container {
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: center;
}

.appearance-container {
  padding-top: 8px;
  display: flex;
  justify-content: center;
}

@media (max-width: 960px) {
  .nav {
    background: transparent !important;
    border-bottom-color: transparent !important;
  }

  .nav.scrolled {
    background: transparent !important;
    border-bottom-color: rgba(255, 255, 255, 0.5) !important;
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 4px 24px rgba(0, 0, 0, 0.04) !important;
  }

  .nav.scrolled::before {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(240, 248, 255, 0.7) 100%) !important;
    backdrop-filter: blur(40px) saturate(2) brightness(1.05) !important;
    -webkit-backdrop-filter: blur(40px) saturate(2) brightness(1.05) !important;
  }

  html.dark .nav.scrolled::before {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(40px) saturate(1.5) !important;
    -webkit-backdrop-filter: blur(40px) saturate(1.5) !important;
  }

  html.dark .nav.scrolled {
    background: transparent !important;
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.05) inset, 0 4px 24px rgba(0, 0, 0, 0.4) !important;
  }

  .VPNavBarHamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-inner {
    justify-content: space-between;
    position: relative;
  }

  .nav-logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    z-index: 1;
  }

  .vp-navbar-end {
    margin-left: 0;
  }
}
</style>
