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
        <img :src="`${Globals.OSS_URL}/welcome-document/website/oinone-logo.webp`"
             alt="Oinone" width="120" height="32">
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
                :src="`${Globals.OSS_URL}/welcome-document/website/oinone-logo-100.webp`"
                alt="Oinone" class="dd-icon-img"></div>
              <div>
                <div class="dd-title">{{ $t('nav.oinoneFramework') }}</div>
                <div class="dd-desc">{{ $t('nav.oinoneFrameworkDesc') }}</div>
              </div>
            </a>
            <a class="nav-link" :href="localePath('/product/aino')">
              <div class="dd-icon aino"><img
                :src="`${Globals.OSS_URL}/welcome-document/website/aino-logo-100.webp`"
                alt="Aino" class="dd-icon-img"></div>
              <div>
                <div class="dd-title">{{ $t('nav.aino') }}</div>
                <div class="dd-desc">{{ $t('nav.ainoDesc') }}</div>
              </div>
            </a>
          </div>
        </div>
        <a class="nav-link" :href="localePath('/use-cases')">{{ $t('nav.useCases') }}</a>
        <a class="nav-link" :href="localePath('/pricing')">{{ $t('nav.pricing') }}</a>
        <a class="nav-link" :href="localePath('/support')">{{ $t('nav.support') }}</a>
        <!-- Resources Dropdown -->
        <div class="nav-dropdown-wrap">
          <a class="nav-link">{{ $t('nav.resources') }}
            <svg viewBox="0 0 10 10" width="10" height="10">
              <path d="M2.5 4l2.5 2.5L7.5 4" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
          </a>
          <div class="nav-dropdown">
            <a :href="docUrl" target="_blank" rel="nofollow">
              <div class="dd-icon oinone">&#128214;</div>
              <div>
                <div class="dd-title">{{ $t('nav.documentation') }}</div>
                <div class="dd-desc">{{ $t('nav.documentationDesc') }}</div>
              </div>
            </a>
            <a :href="localePath('/changelog')">
              <div class="dd-icon oinone">&#128196;</div>
              <div>
                <div class="dd-title">{{ $t('nav.changelog') }}</div>
                <div class="dd-desc">{{ $t('nav.changelogDesc') }}</div>
              </div>
            </a>
            <a :href="localePath('/about')">
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
import VersionDropdown from '../VersionDropdown.vue';
import LanguageDropdown from '../LanguageDropdown.vue';
import Search from '../Search.vue';
import VPSocialLinks from 'vitepress/dist/client/theme-default/components/VPSocialLinks.vue';
import VPSwitchAppearance from 'vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue';
import { useNavbar } from './useNavbar';
import { Globals } from '../../../constants';

defineEmits(['toggle-sidebar']);

const {
  $t,
  scrolled,
  isMobile,
  isMoreOpen,
  theme,
  localePath,
  docUrl
} = useNavbar();
</script>