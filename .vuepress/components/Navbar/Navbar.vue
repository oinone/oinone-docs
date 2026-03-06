<template>
  <div>
    <Navbar v-if="os != 'pc'"></Navbar>
    <nav v-else class="nav" :class="{ scrolled }" id="mainNav">
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
            <div class="nav-dropdown" style="opacity:0;pointer-events:none;position:absolute">
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
            <div class="nav-dropdown" style="opacity:0;pointer-events:none;position:absolute">
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
          <VersionDropdown />
          <LanguageDropdown />
          <search-box />
          <RepoLink />
          <GiteeRepo />
          <OutlookButton />
          <div class="navbar-text mr-2">
            <i class="fas fa-phone"></i>0571-88757863
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup lang="ts">
import Navbar from 'vuepress-theme-hope/navbar/components/Navbar.js';
import RepoLink from 'vuepress-theme-hope/navbar/components/RepoLink';
import GiteeRepo from './GiteeRepo.js';
import LanguageDropdown from '../language-dropdown';
import OutlookButton from 'vuepress-theme-hope/outlook/components/OutlookButton';
import { computed, defineEmits, inject, onMounted, onUnmounted, ref } from 'vue';
import VersionDropdown from '../version-dropdown';
import { useTranslate } from '../../plugins';

const os = inject('os');

const emit = defineEmits(['toggleSidebar']);

const toggleSidebarEvent = () => {
  emit('toggleSidebar');
};

const env = import.meta.env;

const scrolled = ref(false);

const WELCOME_WEBSITE_URL =
  env?.VITE_WELCOME_WEBSITE_URL || 'https://www.oinone.top';

const localePath = (uri: string) => {
  return `${WELCOME_WEBSITE_URL}${uri}`;
};

const docUrl = computed(() =>
  'zh-cn' === 'en'
    ? 'https://guide.oinone.top/en/DevManual/Tutorials/'
    : 'https://guide.oinone.top/zh-cn/DevManual/Tutorials/'
);

const { t: $t } = useTranslate();

const onScroll = () => {
  scrolled.value = window.scrollY > 10;
};

let toggleSidebarButton;
onMounted(async () => {
  await import('./js/style.js');
  const toggleSidebarButtons = document.getElementsByClassName(
    'vp-toggle-sidebar-button'
  );
  if (toggleSidebarButtons.length > 0) {
    toggleSidebarButton = toggleSidebarButtons[0] as HTMLElement;
    toggleSidebarButton.addEventListener('click', toggleSidebarEvent);
  }

  window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
  toggleSidebarButton &&
  toggleSidebarButton.removeEventListener('click', toggleSidebarEvent);
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
  height: var(--nav-h);
  display: flex;
  align-items: center;
  padding: 0 var(--side-pad);
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-bottom: 1px solid transparent;
  transition: all .5s var(--ease);
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
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color .2s;
  cursor: pointer;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary)
}

.nav-link svg {
  width: 10px;
  height: 10px;
  opacity: .4
}

.nav-cta {
  background: var(--text-primary);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .3s var(--ease-out);
  font-family: inherit;
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, .18)
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
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 8px;
  width: max-content;
  opacity: 0;
  pointer-events: none;
  transition: all .25s var(--ease-out);
  box-shadow: 0 12px 40px rgba(0, 0, 0, .08);
}

.nav-dropdown-wrap:hover .nav-dropdown {
  opacity: 1 !important;
  pointer-events: auto !important;
  transform: translateX(-50%) translateY(0)
}

.nav-dropdown a, .nav-dropdown :deep(a) {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: background .15s;
}

.nav-dropdown a:hover, .nav-dropdown :deep(a:hover) {
  background: var(--bg-off)
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
  background: rgba(0, 102, 255, .08);
  color: var(--brand)
}

.dd-icon.aino {
  background: linear-gradient(135deg, rgba(0, 102, 255, .1), rgba(0, 212, 170, .1));
  color: #00B894
}

.dd-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px
}

.dd-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  line-height: 1.5;
  white-space: nowrap
}

/* Hamburger */
.nav-hamburger {
  display: none;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  margin-left: 12px;
  position: relative;
  z-index: 1001;
}

.nav-hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all .3s var(--ease-out);
  transform-origin: center;
}

.nav-hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg)
}

.nav-hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0)
}

.nav-hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg)
}

@media(max-width: 768px) {
  .nav-links {
    display: none
  }
  .nav-cta {
    display: none
  }
  .nav-hamburger {
    display: flex;
    margin-left: auto
  }
}
</style>
