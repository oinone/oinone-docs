---
title: Application:Introducing Qiankun Micro-Frontend
index: true
category:
   - Frontend
order: 6
---
In the software development process, implementing a full-scale technology stack upgrade or refactoring for an existing system often faces numerous challenges that make it difficult to proceed. In such cases, introducing a micro-frontend architecture as a strategy and means for progressive refactoring becomes a feasible choice.

To seamlessly integrate Oinone into existing projects and meet diverse requirements such as route navigation, interface nesting, and data communication between the existing project and Oinone, a template project for Oinone's integration with Qiankun has been systematically organized and developed. This project aims to provide developers with a standardized and reusable solution to efficiently complete relevant integration tasks. ——[Engineering Compressed Package Address](https://doc.oinone.top/wp-content/uploads/2025/03/ss-front-micro-modules.zip)

# I. Template Project Startup
## (一) Introduction to Project Structure Directory
The outermost `micro-front-end` uses a `pnpm` workspace to manage multi-project repositories, maintaining unified scripts for installation, running, cleaning, building, etc. `micro-main` is the main application, `micro-son` is the sub-application simulating a legacy application with huge refactoring workload, and `ss-front-modules` is the Oinone application.
```text
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

## (二) Installation and Running of Template Project
### 1. Installation
In the `micro-front-end` directory, execute `pnpm install`.

### 2. Running
In the `micro-front-end` directory, execute `pnpm run dev`. You should see three services started (ports 8888～8890), where `http://localhost:8888/` is the main application.

### 3. Effect
Access the main application at `http://localhost:8888/`, and you can route to the Oinone application to view the effect.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/CF76E5EF-CEBE-4EC4-B764-B531CD8B65E9.png)

# II. Analysis of Access Steps
## (一) Main Application Construction
### 1. Micro-Application Registration Configuration
A sub-application named `oinone` is configured with the `name` as `ss-boot`.

```typescript
export const SUB_APP_CONFIG = {
  subApps: [
    {
      name: 'micro-son', // Sub-application name, consistent with package.json
      entry: '//localhost:8889', // Sub-application entry, specifying the port in the local environment
      container: '#micro-son', // DOM for mounting the sub-application
      activeRule: '/app/micro-son', // Route matching rule
      props: {}, // Data communication between the main and sub-applications
      sandbox: {
        strictStyleIsolation: false, // Disable strict style isolation
        experimentalStyleIsolation: false // Disable experimental style isolation
      }
    },
    {
      name: 'ss-boot', // Sub-application name, consistent with package.json
      entry: '//localhost:8890', // Sub-application entry, specifying the port in the local environment
      container: '#app-oinone', // DOM for mounting the sub-application
      activeRule: '/app/ss-boot', // Route matching rule
      props: {}, // Data communication between the main and sub-applications
      sandbox: {
        strictStyleIsolation: false, // Disable strict style isolation
        experimentalStyleIsolation: false // Disable experimental style isolation
      }
    }
  ]
};
```

### 2. `main.ts` Executing Registration Logic
```javascript
import { registerMicroApps } from "qiankun";

function registerApps() {
  try {
    // Call the Qiankun method to register micro-applications, where subApps is the configuration above
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
// Note that here micro-main is mounted, so the id="app" in index.html needs to be changed to id="micro-main"
createApp(App).use(router).mount("#micro-main");
```

### 3. Main Application Routing Configuration
Taking `vue-router` as an example, all routes under `/app/ss-boot` are redirected to components using the Oinone micro-application.

```javascript
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "",
    redirect: { name: "micro-son" },
    meta: { title: "Home" },
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
      // This prefix can be customized and should correspond to the BASE_PATH of the Oinone application
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

### 4. A Component of the Main Application Using the Oinone Micro-Application
Start Qiankun after the mounting point DOM is generated.

```javascript
<template>
  <!-- Micro-application mounting point, corresponding to the container in the registration configuration -->
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

### 5. `dev` Server Configuration
Taking `vite` as an example, the main application is configured as follows after startup.

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8888,
    proxy: {
      // Redirect requests starting with /pamirs to the Oinone backend
      "/pamirs": {
        // Support cross-origin requests
        changeOrigin: true,
        target: "https://one.oinone.top/",
      },
    },
  },
});
```

## (二) Construction of Oinone Application
### 1. Configuring Environment Variables for `ss-boot`
`BASE_PATH=/app/ss-boot`
The role of BASE_PATH is to add a public prefix to the routes of the Oinone application to adapt to the routes of the main application.

### 2. `main.ts` in the `ss-boot` Directory Exposing the Lifecycle Required by Qiankun
```javascript
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

export const bootstrap = async () => {};

export const mount = async () => {
  // Mounting
  return new Promise(async (resolve, reject) => {
    try {
      await VueOioProvider(
        {
          browser: {
            title: 'Oinone - Build Your Imagination!',
            favicon: 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/pamirs/image/default_favicon.ico'
          },
          dependencies: {
            vue: import('vue'),
            lodashEs: import('lodash-es'),
            antDesignVue: import('ant-design-vue'),
            elementPlusIconsVue: import('@element-plus/icons-vue'),
            elementPlus: import('element-plus'),
            kunlunDependencies: import('@kunlun/dependencies'),
            kunlunVueUiAntd: import('@kunlun/vue-ui-antd'),
            kunlunVueUiEl: import('@kunlun/vue-ui-el')
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
  // Updating
};

export const unmount = async () => {
  // Unmounting
};

// Normal startup
if (!window.__POWERED_BY_QIANKUN__) {
  mount();
}
```

# III. Access
Both the main and sub-applications need to be started with `pnpm run dev` to access the main application. When the route matches the micro-application's `activeRule`, the micro-application will be automatically loaded and mounted.