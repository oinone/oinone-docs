---
title: 路由扩展：添加新路由，比如覆盖默认的登录页
index: true
category:
   - 前端
order: 15
next:
  text: 依赖配置：如何添加数据可视化运行时依赖
  link: /v6/zh/DevManual/CommonSolutions/Back-End/dependency-configuration-how-to-add-data-visualization-dependencies.md
---
# 一、问题概述
在 Oinone 平台内置路由中，默认了三种路由

``` plain
/login //默认登录页
/page //默认主逻辑页
/ //根页面，会自动发起查询优先级最高的应用，并跳转
```

在实际的业务迭代中，我们通常有以下三种需求：

1. 我要覆盖默认的登录页，页面我不喜欢，登录逻辑满足不了；
2. 我要在平台上加个帮助中心；
3. 这个路径不符合我司规范，我要自定义加前缀

接下来，我将在 Oinone 平台中满足以上场景

# 二、覆盖默认路径
以登录页为例

1. 在项目目录`src/main.ts`下，添加自定义 router

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
      title: 'Oinone - 构你想象!',
      favicon: 'https://pamirs.oss-cn-hangzhou.aliyuncs.com/pamirs/image/default_favicon.ico&#039;
    },
    router: [{ path: '/login', widget: 'CustomLogin'}] // 用CustomLogin覆盖默认登录页
  },
  []
);
```

2. 定义`CustomLogin`, 定义方式同书籍中的自定义表单和自定义表格类似，精简版的代码为：

``` typescript
import { RouterWidget, SPI } from "@oinone/kunlun-dependencies";


@SPI.ClassFactory(RouterWidget.Token({ widget: 'CustomLogin' })) // SPI注册，router得widget和此处的widgetshi对应的
  export class CustomLogin extends RouterWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent('定义的vue文件');
    return this;
  }
}
```

# 三、增加新的访问路径
同覆盖登录页

1. 在`router`中增加路由

``` typescript
router: [{ path: '/login', widget: 'CustomLogin'}, { path: '/help', widget: 'Help'}]
```

2. 定义`Help`，同覆盖登录页

# 四、定义个性化路径
需要再所有访问路径前统一加标识，比如添加 Oinone，在`项目目录下`新建`.env`文件(若存在，可以复用)，在 env 文件中添加：

``` plain
BASE_PATH=/Oinone
```

修改后重启工程即可，访问`/Oinone/login`即可

# 五、结语
以上就是 Oinone 平台路由的扩展能力，在 Oinone 平台中，通过自定义 Router 达到扩展路由的能力，并通过采用 env 等通用配置的能力，解决批量修改路由的目的。

