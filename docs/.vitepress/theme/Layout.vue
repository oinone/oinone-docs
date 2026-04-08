<script setup>
import { ref } from 'vue';
import { useData } from 'vitepress';
import Content from 'vitepress/dist/client/theme-default/components/VPContent.vue';
import VPDocAside from 'vitepress/dist/client/theme-default/components/VPDocAside.vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import NotFound from './NotFound.vue';

const { page, frontmatter } = useData();

// Mobile sidebar toggle state
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="Layout">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <NotFound v-if="page.isNotFound" />
    <div class="docs-page" v-else>
      <div class="docs-main-container">
        <!-- Left Sidebar -->
        <div class="docs-nav docs-section-nav" :class="{ 'is-open': isSidebarOpen }">
          <div class="docs-nav-scroll">
            <Sidebar />
          </div>
        </div>

        <!-- Mobile Sidebar Backdrop -->
        <div class="sidebar-backdrop" v-if="isSidebarOpen" @click="isSidebarOpen = false"></div>

        <!-- Main Content -->
        <div class="docs-main-content">
          <Breadcrumb />
          <Content />
        </div>

        <!-- Right Sidebar / TOC -->
        <div class="docs-nav docs-page-nav">
          <div class="docs-nav-scroll">
            <VPDocAside>
              <template #aside-top>
                <slot name="aside-top" />
              </template>
              <template #aside-bottom>
                <slot name="aside-bottom" />
              </template>
              <template #aside-outline-before>
                <slot name="aside-outline-before" />
              </template>
              <template #aside-outline-after>
                <slot name="aside-outline-after" />
              </template>
              <template #aside-ads-before>
                <slot name="aside-ads-before" />
              </template>
              <template #aside-ads-after>
                <slot name="aside-ads-after" />
              </template>
            </VPDocAside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
}

.docs-page {
  --page-margin: 24px;
  --nav-height: 60px;
  --grid-gutter: 24px;
  --breakpoint-xl: 1440px;

  font-weight: 400;
  gap: var(--grid-gutter);
  margin: 0 auto;
  max-width: calc(var(--breakpoint-xl) + var(--page-margin) * 2);
  padding: 0 var(--page-margin);
  padding-top: var(--nav-height);
  position: relative;
  width: 100%;
  flex-grow: 1;
}

.docs-main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  min-height: calc(100vh - var(--nav-height));
}

.docs-nav {
  position: sticky;
  top: var(--nav-height);
  height: calc(100vh - var(--nav-height));
  width: 280px;
  flex-shrink: 0;
  transition: .2s all;
}

.docs-nav-scroll {
  padding: 24px 0;
  padding-left: 24px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /* Fix scroll issue on webkit/blink */
  -webkit-overflow-scrolling: touch;
}

/* No need for deep VPSidebar styles since we are not using it */

.docs-main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  margin: 0;
  max-width: 900px;
  min-width: 0;
  padding: 24px;
}

/* Reset default VP content layout */
:deep(.VPContent) {
  padding: 0 !important;
  max-width: 100% !important;
  flex-grow: 1;
}

:deep(.VPDoc) {
  padding: 0 !important;
  width: 100% !important;
}

:deep(.VPDoc .container) {
  margin: 0 !important;
  max-width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc .content) {
  padding: 0 !important;
}

:deep(.VPDoc .aside) {
  display: none !important; /* Hide built-in aside since we moved it */
}

/* Fix mobile menu integration */
.VPNavBarHamburger {
  display: none; /* Can be enabled manually in MyNavbar if needed */
}

.sidebar-backdrop {
  display: none;
}

@media (max-width: 960px) {
  .docs-nav.docs-section-nav {
    display: block;
    position: fixed;
    top: var(--nav-height);
    left: 0;
    width: 280px;
    height: calc(100vh - var(--nav-height));
    background: var(--vp-c-bg);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 100;
    pointer-events: auto;
  }

  .docs-nav.docs-section-nav.is-open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }

  .docs-page {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 1200px) {
  .docs-nav.docs-page-nav {
    display: none;
  }
}

/* Hide mobile local nav if any */
:deep(.VPLocalNav) {
  display: none !important;
}

:deep(.VPDoc) {
  padding: 0 !important;
}

:deep(.VPDoc .container) {
  margin: 0 !important;
}
</style>