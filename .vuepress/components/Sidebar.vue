<template>
  <div v-if="os === 'pc'">
    <Sidebar
      :class="{'sidebar-hide': !displaySidebar}"
      style="transition: transform 0.3s ease-in-out"
    >
      <template #top>
        <div class="sidebar-top-title">
          <span id="title">Oinone文档</span>
          <div
            class="sidebar-top-icon"
            ref="sidebarTopIconDisplayRef"
            @click="() => (displaySidebar = !displaySidebar)"
          ></div>
        </div>
      </template>
    </Sidebar>
    <div
      v-show="!displaySidebar"
      id="hide-sidebar"
      class="sidebar-hide-space vp-sidebar"
    >
      <div class="hide-sidebar-top-title">
        <div
          class="hide-sidebar-top-icon"
          ref="sidebarTopIconHideRef"
          @click="() => (displaySidebar = !displaySidebar)"
        ></div>
      </div>
    </div>
  </div>
  <Sidebar v-else class="sidebar-hide" />
</template>

<script setup lang="ts">
import Sidebar from "vuepress-theme-hope/sidebar/components/Sidebar.js";
import {ref, onMounted, watch, inject, onUnmounted} from "vue";
import {getRootStyle, setRootStyle} from "../utils/styleUtils";

const os = inject("os");

const sidebarTopIconDisplayRef = ref<any>();
const sidebarTopIconHideRef = ref<any>();
const displaySidebar = ref<boolean>(true);

let originSidebarWidth;
let hideSidebarWidth;
watch(displaySidebar, () => {
  if (!displaySidebar.value) {
    originSidebarWidth = getRootStyle("--sidebar-width");
    setRootStyle("--sidebar-width", hideSidebarWidth);
  } else {
    setRootStyle("--sidebar-width", originSidebarWidth);
  }
});

const hideSideBar = () => {
  if (window.innerWidth < 960) {
    displaySidebar.value = false;
  }
};

window.addEventListener("resize", () => {
  if (window.innerWidth < 960) {
    displaySidebar.value = false;
  }
});

onMounted(() => {
  window.addEventListener("resize", hideSideBar);
});

onUnmounted(() => {
  window.removeEventListener("resize", hideSideBar);
});

onMounted(() => {
  originSidebarWidth = getRootStyle("--sidebar-width")
  if (document.getElementsByClassName("sidebar-hide-space").length > 0) {
    hideSidebarWidth = getComputedStyle(
      document.getElementsByClassName("sidebar-hide-space")[0]
    ).getPropertyValue("--hide-sidebar-width");
  }
  if (sidebarTopIconDisplayRef.value) {
    sidebarTopIconDisplayRef.value.appendChild(
      new DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="#636A72" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M8 10.5h32m-16 9h16m-16 9h16m-32 9h32"/><path fill="#636A72" d="m16 19l-8 5l8 5z"/></g></svg>`,
        "image/svg+xml"
      ).documentElement
    );
  }
  if (sidebarTopIconHideRef.value) {
    sidebarTopIconHideRef.value.appendChild(
      new DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><defs><mask id="IconifyId19511e881463ed78b3"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M8 10.5h32m-16 9h16m-16 9h16m-32 9h32"/><path fill="#555" d="m8 19l8 5l-8 5z"/></g></mask></defs><path fill="#636A72" d="M0 0h48v48H0z" mask="url(#IconifyId19511e881463ed78b3)"/></svg>`,
        "image/svg+xml"
      ).documentElement
    );
  }
});
</script>

<style scoped lang="scss">
#sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0px;
  z-index: 30;
  transform: translateX(0%);
}
#sidebar.sidebar-hide {
  display: none;
}

.sidebar-top-title {
  width: 100%;
  height: 76px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #title {
    font-size: 20px;
    color: #035dff;
    letter-spacing: 0;
    font-weight: 500;
    margin-left: 50px;
  }
}

.sidebar-top-icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-hide-space {
  --hide-sidebar-width: 50px;
  position: fixed;
  top: var(--navbar-height);
  width: var(--hide-sidebar-width);
  height: 100vh;
  background: rgb(236, 239, 244);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: start;

  .hide-sidebar-top-title {
    width: 100%;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;

    .hide-sidebar-top-icon {
      cursor: pointer;
      //margin-left: 10px;
      //margin-right: 20px;
    }
  }
}
</style>
