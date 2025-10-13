<template>
  <div>
    <Navbar v-if="os != 'pc'"></Navbar>
    <div class="custom-vp-navbar" v-else>
      <div class="head">
        <nav class="navbar navbar-expand-lg navbar-light bg-light-transparent">
          <div class="container">
            <a class="navbar-brand" :href="WELCOME_WEBSITE_URL">
              <img
                src="https://pamirs.oss-cn-hangzhou.aliyuncs.com/welcome/assets/ss_logo-06efd107.png"
                alt=""
              />
              <span class="shu"></span>
              <img
                class="shushi"
                src="https://pamirs.oss-cn-hangzhou.aliyuncs.com/welcome/assets/oio_logo-cfcd405e.png"
                alt=""
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" :href="WELCOME_WEBSITE_URL">首页</a>
                </li>
                <li
                  class="nav-item dropdown"
                  id="nav-product"
                  data-toggle="dropdown"
                >
                  <a
                    class="nav-link dropdown-toggle"
                    :href="`${WELCOME_WEBSITE_URL}/product.html`"
                    role="button"
                    aria-expanded="false"
                  >产品中心</a
                  >
                  <div class="dropdown-menu nav-product w-100">
                    <div class="container">
                      <div class="col-3">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-1"
                            >
                              数式Oinone四大产品
                            </p>
                            <div class="dropdown-menu" id="sub-menu-1">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/lowcodeDesign.html`"
                                >低代码开发平台</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/nocodeDesign.html`"
                                >无代码开发平台</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/ipaasDesign.html`"
                                >集成开发平台</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/AI-large-model.html`"
                                >AI大模型开发</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-3">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-2"
                            >
                              数式Oinone体系能力
                            </p>
                            <div class="dropdown-menu" id="sub-menu-2">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=user`"
                                >用户与组织</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=authority`"
                                >权限管理</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=file`"
                                >文件管理</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=message`"
                                >消息中心</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=internationalization`"
                                >国际化</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/systemCapability?menuName=audit`"
                                >业务审计</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-3 nav-product nav-img">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-3"
                            >
                              数式Oinone核心产品特性
                            </p>
                            <div class="dropdown-menu dropdown-submenu" id="sub-menu-3">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/choose?menuName=understand`"
                                >低无一体</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/choose?menuName=powerful`"
                                >面向软件公司</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/choose?menuName=marvel`"
                                >场景无限制</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/choose?menuName=extreme`"
                                >应用级扩容</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/choose`"
                                >可分可合</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  class="nav-item dropdown"
                  id="nav-serve"
                  data-toggle="dropdown"
                >
                  <a
                    class="nav-link dropdown-toggle"
                    :href="`${WELCOME_WEBSITE_URL}/serve`"
                    role="button"
                    aria-expanded="false"
                  >服务中心</a
                  >
                  <div class="dropdown-menu nav-serve w-100">
                    <div class="container">
                      <div class="col-3">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-4"
                            >
                              客户服务
                            </p>
                            <div class="dropdown-menu" id="sub-menu-4">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/demonstrate.html`"
                                >预约演示</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/consultation.html`"
                                >方案咨询</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/deployment.html`"
                                >私有部署</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/customized.html`"
                                >找人定制</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-3">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-5"
                            >
                              开发者
                            </p>
                            <div class="dropdown-menu" id="sub-menu-5">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  href="https://doc.oinone.top/faq"
                                >问答</a
                                >
                                <a
                                  class="dropdown-item"
                                  :href="`${WELCOME_WEBSITE_URL}/download.html`"
                                >下载</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-3">
                        <ul class="navbar-nav ml-auto">
                          <li class="nav-item dropdown" data-toggle="dropdown">
                            <p
                              class="dropdown-item sub-menu-toggle"
                              data-target="#sub-menu-6"
                            >
                              Oinone学院
                            </p>
                            <div class="dropdown-menu" id="sub-menu-6">
                              <div class="col-12">
                                <a
                                  class="dropdown-item"
                                  href="https://doc.oinone.top/"
                                >社区</a
                                >
                                <a class="dropdown-item" :href="`${WELCOME_WEBSITE_URL}/document.html`"
                                >学习</a
                                >
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="col-3 nav-serve nav-img nav-serve-title">
                        <p>《精讲面向软件公司的低代码平台——以Oinone为例》</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  class="nav-item dropdown"
                  id="nav-channel"
                  data-toggle="dropdown"
                >
                  <a
                    class="nav-link dropdown-toggle"
                    :href="`${WELCOME_WEBSITE_URL}/partner`"
                    role="button"
                    aria-expanded="false"
                  >合作伙伴</a
                  >
                  <div class="dropdown-menu nav-channel">
                    <a
                      class="dropdown-item"
                      :href="`${WELCOME_WEBSITE_URL}/channelApply`"
                    >渠道申请</a
                    >
                    <a
                      class="dropdown-item"
                      :href="`${WELCOME_WEBSITE_URL}/partnerDirectory`"
                    >伙伴名录</a
                    >
                    <a
                      class="dropdown-item"
                      :href="`${WELCOME_WEBSITE_URL}/expertDB`"
                    >专家库</a
                    >
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :href="`${WELCOME_WEBSITE_URL}/about`"
                  >关于数式</a
                  >
                </li>
              </ul>
            </div>
            <div class="vp-navbar-end">
              <Language />
              <search-box />
              <RepoLink />
              <GiteeRepo />
              <OutlookButton />
              <div class="navbar-text mr-2">
                <i class="fas fa-phone"></i>0571-88757863
              </div>
            </div>
            <!--            <button class="btn btn-outline-primary my-2 my-lg-0" type="submit">申请体验</button>-->
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from 'vuepress-theme-hope/navbar/components/Navbar.js';
import RepoLink from 'vuepress-theme-hope/navbar/components/RepoLink';
import GiteeRepo from './GiteeRepo.js';
import LanguageDropdown from 'vuepress-theme-hope/navbar/components/LanguageDropdown.js';
import OutlookButton from 'vuepress-theme-hope/outlook/components/OutlookButton';
import { defineEmits, inject, onMounted, onUnmounted } from 'vue';
import noopComponent from './noopComponent.vue';

declare const __VP_MULTI_LANGUAGES__: Boolean;

const Language = __VP_MULTI_LANGUAGES__ ? LanguageDropdown : noopComponent;

const os = inject('os');

const emit = defineEmits(['toggleSidebar']);

const toggleSidebarEvent = () => {
  emit('toggleSidebar');
};

const env = import.meta.env;

const WELCOME_WEBSITE_URL =
  env?.VITE_WELCOME_WEBSITE_URL || 'https://www.oinone.top';

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
});
onUnmounted(() => {
  toggleSidebarButton &&
  toggleSidebarButton.removeEventListener('click', toggleSidebarEvent);
});
</script>

<style scoped lang="scss">
@import "./css/bootstrap.min.css";
@import "./css/style-2.min.css";

.custom-vp-navbar
.navbar
.container
.collapse
.navbar-nav
li.nav-item
a.nav-link:hover {
  color: rgb(3, 93, 255);
}

.custom-vp-navbar {
  --th-color: #035dff;
  --bs-nav-link-font-size: 1rem;
  --navbar-line-height: calc(
    var(--navbar-height) - var(--navbar-padding-y) * 2
  );
  position: fixed;
  inset: 0 0 auto;
  z-index: 175;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: var(--navbar-height);
  padding: var(--navbar-padding-y) var(--navbar-padding-x);
  background: var(--navbar-c-bg);
  box-shadow: 0 2px 8px var(--vp-c-shadow);
  line-height: var(--navbar-line-height);
  white-space: nowrap;
  -webkit-backdrop-filter: saturate(150%) blur(12px);
  backdrop-filter: saturate(150%) blur(12px);
  transition: transform var(--vp-t-transform);

  .head {
    box-shadow: unset;
    width: 90%;
    height: 100%;
    margin-left: 4%;

    .navbar-nav {
      .nav-item {
        .sub-menu-toggle {
          color: #035dff;
        }

        .dropdown-menu {
          background: white !important;

          > div {
            display: flex;
            flex-direction: column;
          }
        }

        .dropdown-submenu {
          background: transparent;
        }

        .nav-channel {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .navbar-text {
      font-size: 1rem;
      margin-right: 1.75rem;
      color: var(--th-color);
    }
  }

  .nav-serve-title {
    width: 235px;
    white-space: break-spaces;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    padding-left: 4px;
  }
}
</style>
