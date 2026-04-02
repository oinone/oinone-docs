---
title: 应用：引入微前端qiankun
index: true
category:
   - 前端
order: 6
---
在软件开发进程中，针对一个业已存在的系统实施全量的技术栈升级或重构，往往面临诸多挑战而难以推进。在此情形下，引入微前端架构作为一种渐进式重构的策略与手段，便成为颇具可行性的选择。

为实现将 Oinone 无缝集成至现有项目，并满足诸如在现有项目与 Oinone 之间实现路由跳转、界面嵌套以及数据通信等多样化需求，经过系统性的整理与开发，现已形成一套 Oinone 接入乾坤的模板工程。该工程旨在为开发人员提供一套标准化、可复用的解决方案，助力其高效完成相关集成任务。——[工程压缩包地址](https://doc.oinone.top/wp-content/uploads/2025/03/ss-front-micro-modules.zip)

# 一、模版工程启动
## （一）工程结构目录介绍
最外层`micro-front-end`用`pnpm`工作区来管理多工程仓库，维护统一的安装、运行、清除、构建等的脚本。`micro-main`是主应用，`micro-son`是子应用，模拟重构工作量巨大的老应用，`ss-front-modules`是`Oinone`应用。
``` text
micro-front-end/
├── packages/
│   ├── micro-main/
│   │   └── package.json
│   ├── micro-son/
│   │   └── package.json
│   └── ss-front-modules/
│       ├── packages/
│       │   ├── ss-admin-widget/
│       │   ├── ss-boot/
│       │   ├── ss-oinone/
│       │   └── ss-project/
│       └── package.json
└── package.json
```

## （二）模版工程安装、运行
### 1、安装
在`micro-front-end`目录下 `pnpm install`

### 2、运行
在`micro-front-end`目录下 `pnpm run dev`，这里应当能看到启动了三个服务（端口8888～8890），其中`http://localhost:8888/`是主应用。

### 3、效果
进入 `http://localhost:8888/`主应用 ，可以路由到`Oinone`应用看效果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/CF76E5EF-CEBE-4EC4-B764-B531CD8B65E9.png)

# 二、接入步骤分析
## （一）主应用搭建
### 1、微应用注册配置
配置了一个`oinone`的子应用，`name`是`ss-boot`。

``` typescript
export const SUB_APP_CONFIG = {
  subApps: [
    {
      name: 'micro-son', // 子应用名称，跟package.json一致
      entry: '//localhost:8889', // 子应用入口，本地环境下指定端口
      container: '#micro-son', // 挂载子应用的dom
      activeRule: '/app/micro-son', // 路由匹配规则
      props: {}, // 主应用与子应用通信传值
      sandbox: {
        strictStyleIsolation: false, // 关闭严格样式隔离
        experimentalStyleIsolation: false // 关闭实验性样式隔离
      }
    },
    {
      name: 'ss-boot', // 子应用名称，跟package.json一致
      entry: '//localhost:8890', // 子应用入口，本地环境下指定端口
      container: '#app-oinone', // 挂载子应用的dom
      activeRule: '/app/ss-boot', // 路由匹配规则
      props: {}, // 主应用与子应用通信传值
      sandbox: {
        strictStyleIsolation: false, // 关闭严格样式隔离
        experimentalStyleIsolation: false // 关闭实验性样式隔离
      }
    }
  ]
};
```

### 2、`main.ts` 执行注册逻辑
``` javascript
import { registerMicroApps } from "qiankun";

function registerApps() {
  try {
    // 调用乾坤注册微应用方法，subApps 就是上面的配置
    registerMicroApps(subApps, {
      beforeLoad: [
        (app) => {
          console.log("before load", app);
          return Promise.resolve();
        },
      ],
      beforeMount: [
        (app) => {
          console.log("before mount", app);
          return Promise.resolve();
        },
      ],
      afterUnmount: [
        (app) => {
          console.log("before unmount", app);
          return Promise.resolve();
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

registerApps();
// 可以看到这里 mount 的是micro-main，所以需要把 index.html 里的 id="app" 改成 id="micro-main"
createApp(App).use(router).mount("#micro-main");
```

### 3、主应用路由配置
以`vue-router`举例，将所有 `/app/ss-boot` 路由全部重定向到使用 `Oinone` 微应用的组件

``` javascript
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "",
    redirect: { name: "micro-son" },
    meta: { title: "首页" },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../components/HelloWorld.vue"),
      },
      {
        path: "/app/micro-son/:pathMatch(.*)*",
        name: "micro-son",
        component: () => import("../components/MicroSon.vue"),
      },
      // 这个前缀可以自定义，跟 Oinone 应用的 BASE_PATH 对应起来即可
      {
        path: "/app/ss-boot/:pathMatch(.*)*",
        name: "ss-boot",
        component: () => import("../components/SsFrontModules.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

```

### 4、主应用的某个组件使用`Oinone`微应用
在挂载点 dom 生成之后启动乾坤

``` javascript
<template>
  <!-- 微应用挂载点，与注册配置里的container对应 -->
  <div id="app-oinone"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { start } from "qiankun";

export default defineComponent({
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
});
</script>
  <style>
  #app-oinone {
  flex: auto;
  height: 100%;
}
</style>

```

### 5、`dev`服务器配置
这里以`vite`举例，如此启动后主应用就配置好了

``` javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8888,
    proxy: {
      // 将 /pamirs 开头的请求重定向到 oinone 后端
      "/pamirs": {
        // 支持跨域
        changeOrigin: true,
        target: "https://one.oinone.top/",
      },
    },
  },
});

```

## （二）`Oinone`应用搭建
### 1、配置 `ss-boot`的环境变量
`BASE_PATH=/app/ss-boot`
BASE_PATH 的作用是给 Oinone 应用的路由添加公共前缀，适配主应用的路由

### 2、`ss-boot`目录下`main.ts`暴露乾坤所需的生命周期
``` javascript
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

export const bootstrap = async () => {};

export const mount = async () => {
  // 挂载
  return new Promise(async (resolve, reject) => {
    try {
      await VueOioProvider(
        {
          browser: {
            title: 'Oinone - 构你想象!',
            favicon: 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/pamirs/image/default_favicon.ico'
          },
          dependencies: {
            vue: import('vue'),
            lodashEs: import('lodash-es'),
            antDesignVue: import('ant-design-vue'),
            elementPlusIconsVue: import('@element-plus/icons-vue'),
            elementPlus: import('element-plus'),
            kunlunDependencies: import('@oinone/kunlun-dependencies'),
            kunlunVueUiAntd: import('@oinone/kunlun-vue-ui-antd'),
            kunlunVueUiEl: import('@oinone/kunlun-vue-ui-el')
          }
        },
        []
      );
      resolve(true);
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};

export const update = async () => {
  // 更新
};

export const unmount = async () => {
  // 取消挂载
};

// 正常启动
if (!window.__POWERED_BY_QIANKUN__) {
  mount();
}
```

# 三、访问
主子应用都要`pnpm run dev`启动，访问主应用。当路由匹配到微应用的`activeRule`后，会自动加载微应用并挂载。

