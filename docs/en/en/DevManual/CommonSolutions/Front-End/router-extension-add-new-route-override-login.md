---
title: Route Extension:Adding New Routes, such as Overriding the Default Login Page
index: true
category:
   - Frontend
order: 15
next:
  text: Dependency Configuration:How to Add Data Visualization Runtime Dependencies
  link: /v6/en/DevManual/CommonSolutions/Back-End/dependency-configuration-how-to-add-data-visualization-dependencies.md
---

# I. Problem Overview
The Oinone platform has three default routes built into its routing system:

``` plain
/login // Default login page
/page // Default main logic page
/ // Root page, which automatically initiates the highest-priority application query and redirects
```

During actual business iterations, we typically encounter three needs:

1. Override the default login page due to dissatisfaction with its design or login logic;
2. Add a help center to the platform;
3. Customize the path prefix to meet company specifications.

Below, we will address these scenarios within the Oinone platform.

# II. Overriding Default Paths
Take the login page as an example.

1. Add a custom router in the project's `src/main.ts` file:

``` typescript
import 'ant-design-vue/dist/antd.css';
import 'element-plus/dist/index.css';


import '@oinone/kunlun-vue-ui-antd/dist/kunlun-vue-ui-antd.css';
import '@oinone/kunlun-vue-ui-el/dist/kunlun-vue-ui-el.css';

import 'reflect-metadata';
import { VueOioProvider } from '@oinone/kunlun-dependencies';
import interceptor from './middleware/network-interceptor';

import './field';
import './view';
import './actions';

VueOioProvider(
  {
    http: {
      url: location.origin,
      callback: interceptor
    },
    browser: {
      title: 'Oinone - Build Your Imagination!',
      favicon: 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/pamirs/image/default_favicon.ico'
    },
    router: [{ path: '/login', widget: 'CustomLogin'}] // Override default login page with CustomLogin
  },
  []
);
```

2. Define `CustomLogin` using the same approach as custom forms and tables in the documentation. The simplified code is as follows:

``` typescript
import { RouterWidget, SPI } from "@oinone/kunlun-dependencies";


@SPI.ClassFactory(RouterWidget.Token({ widget: 'CustomLogin' })) // SPI registration: the router's widget must match this widget
  export class CustomLogin extends RouterWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent('Defined Vue file');
    return this;
  }
}
```

# III. Adding New Access Paths
The process is similar to overriding the login page.

1. Add routes to the `router` configuration:

``` typescript
router: [{ path: '/login', widget: 'CustomLogin'}, { path: '/help', widget: 'Help'}]
```

2. Define the `Help` component, similar to overriding the login page.

# IV. Defining Personalized Paths
To add a unified identifier (e.g., "Oinone") to all access paths, create a `.env` file in the project directory (reuse if existing) and add:

``` plain
BASE_PATH=/Oinone
```

After modifying, restart the project. Access `\Oinone\login` to use the new path.

# V. Conclusion
The above demonstrates the route extension capabilities of the Oinone platform. By customizing the Router and using common configurations like env, we can extend routes and efficiently modify path structures in batches.