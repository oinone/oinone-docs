---
title: 环境（Environment）
index: true
category:
  - 研发手册
  - Reference
  - 前端API
order: 2

---
# 一、编译时环境配置

## （一）使用 .env 配置

在 `启动工程` 创建 `.env` 文件可进行环境配置，例如：

``` shell
kunlun-boot
├── .env
├── public
│   ├── favicon.ico
│   └── index.html
├── src
├── vue.config.js
├── package.json
└── README.MD
```

尝试在 `.env` 文件中配置 `BASE_PATH` 属性：

``` plain
BASE_PATH=/test
```

使配置生效

+ 开发时使用 `npm run dev` 重启服务即可。
+ 生产时使用 `npm run build` 完成构建并发布即可。

## （二）自定义 .env 配置

你可以在任何地方使用这样的方式获取 `.env` 配置：

``` typescript
protected doSomething() {
  console.log(process.env.CUSTOM_PROPERTY);
}
```

在 .env 文件中配置 `CUSTOM_PROPERTY` 属性：

``` typescript
CUSTOM_PROPERTY=test
```

在执行 `doSomething` 函数时，你将在控制台看到输出 `test` 文本。

:::warning 提示

更多关于 `.env` 配置的使用请参考：[dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)

:::

# 二、运行时环境配置

## （一）开发时使用运行时配置

在 `启动工程` 创建 `manifest.js` 文件可进行运行时环境配置，例如：

``` shell
kunlun-boot
├── public
│   ├── favicon.ico
│   ├── manifest.js
│   └── index.html
├── src
├── vue.config.js
├── package.json
└── README.MD
```

尝试在 `manifest.js` 文件中配置 `multiTabs.inline` 为 `true` ，将 `多选项卡` 从整个页面的顶部移动到主内容分发区的上方：

``` javascript
runtimeConfigResolve({
  multiTabs: {
    inline: true
  }
});
```

## （二）生产环境使用运行时配置

正常情况下，在 `启动工程` 的 `public` 目录下创建的 `manifest.js` 会在 `构建时` 自动放置在 `dist` 目录下，但有时我们不会把开发时的配置文件放在生产环境中使用。这时就需要我们在生产环境的 `dist` 目录下手动创建 `manifest.js` 文件进行一些生产环境的配置。例如：

``` shell
dist
├── favicon.ico
├── fonts
├── js
├── manifest.js
└── index.html
```

:::warning 提示

运行时配置的路径和文件名可以通过 `.env` 配置中 `RUNTIME_CONFIG_FILENAME` 和 `RUNTIME_CONFIG_FILENAME` 属性进行修改，实际的路径和文件名需要结合 `.env` 配置进行确定。

:::

# 三、自定义运行时配置

下面的步骤展示了一个运行时配置的声明和使用过程，它通常是在项目中的 “最佳实践”，我们建议任何一个运行时配置都按照这样的格式进行声明和使用。

不仅如此，你应该将所有可能的配置独立的放在 `src/config` 目录下或者 `对应功能` 的目录下。

## （一）定义配置类型

``` typescript
/**
 * 演示运行时配置类型定义
 */
export interface DemoConfig extends RuntimeConfigOptions, EnabledConfig {
  /**
   * 是否启用
   */
  enabled?: boolean;

  // 添加其他可能的配置项
}
```

+ RuntimeConfigOptions：定义了任何可以配置在 `manifest.js` 中可以被使用的类型。
+ EnabledConfig：定义了一个标准的启用禁用配置格式。

## （二）定义运行时配置管理器

``` typescript
export class DemoConfigManager {
  private constructor() {
    // reject create object
  }

  public static getConfig(): DemoConfig {
    return ConfigHelper.getConfig(RuntimeConfig.getConfig('demo'));
  }

  public static isEnabled(): boolean {
    let { enabled } = DemoConfigManager.getConfig();
    if (enabled == null) {
      enabled = false;
    }
    return enabled;
  }

  // 添加其他可能的配置项获取方法
}
```

## （三）在运行时配置中定义参数

### 1、启用和禁用的简单配置

``` typescript
runtimeConfigResolve({
  demo: true
});
```

:::warning 提示：

在 `ConfigHelper#getConfig` 方法中，会将 `boolean` 值转换为 `DemoConfig` 对象，并且将它放在 `enabled` 属性中。

:::

### 2、完整配置

``` typescript
runtimeConfigResolve({
  demo: {
    enabled: true
    // 其他可能的配置项
  }
});
```

:::warning 提示：

此处 `demo` 键值与 `DemoConfigManager#getConfig` 方法定义的参数一致。

:::

## （四）在组件中使用配置方法

``` typescript
DemoConfigManager.isEnabled()
```

# 四、VueOioProvider 入口配置

在 Vue 项目中，`main.ts` 是一个常用的入口文件，它通常用于创建框架实例以及初始化框架等准备工作。Oinone Kunlun 框架同样提供了一个用于初始化系统的入口方法 `VueOioProvider` 。

## （一）基础用法

``` typescript
import 'ant-design-vue/dist/antd.min.css';
import 'element-plus/dist/index.css';

// npm run dev 启动时需要注释
import '@oinone/kunlun-vue-ui-antd/dist/oinone-kunlun-vue-ui-antd.css';
import '@oinone/kunlun-vue-ui-el/dist/oinone-kunlun-vue-ui-el.css';

// 其他 css 导入

import 'reflect-metadata';
import { VueOioProvider } from '@oinone/kunlun-dependencies';

// 其他模块导入

VueOioProvider();
```

:::warning 提示：

`reflect-metadata` 导入必须在 `@oinone/kunlun-dependencies` 导入之前，否则系统将无法正常运行。

:::

## （二）自定义 HTTP 请求

### 1、启用 RSQL 加密传输

``` typescript
VueOioProvider({
  http: {
    encodeRsql: true
  }
});
```

:::warning 提示：

RSQL 加密传输功能需配合后端 `pro.shushi.pamirs.framework.gateways.hook.RsqlDecodeHook` 类进行使用，默认情况下后端无需其他配置。

:::

### 2、添加全局请求头参数
首先，让我们先创建一个自定义 Header 的拦截器，在请求头中添加 `demo: true` 这样的固定参数：

``` typescript
import { NetworkMiddlewareHandler } from '@oinone/kunlun-dependencies';

export const CustomHeaderMiddleware: NetworkMiddlewareHandler = (operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        demo: true
      }
    };
  });
  return forward(operation).subscribe({});
};
```

在 VueOioProvider 添加配置，让拦截器生效：

``` typescript
VueOioProvider({
  http: {
    middleware: CustomHeaderMiddleware
  }
});
```

:::warning 提示：

更多配置参数请参考：[API](#3a290b70)

:::

# 五、Reference List

## （一）.env

### 1、BASE_PATH

类型：string

描述：统一配置 URL 请求路径前缀

示例：

``` plain
BASE_PATH=/test
```

### 2、STATIC_IMG

类型：string

描述：静态资源路径

示例：

``` plain
STATIC_IMG=/static/images
```

### 3、MESSAGE_LEVEL

类型：enum

可选项：DEBUG、SUCCESS、INFO、WARN、ERROR

描述：MessageHub 消息级别

示例：

``` plain
MESSAGE_LEVEL=INFO
```

### 4、RUNTIME_CONFIG_BASE_URL

类型：string

描述：运行时配置文件URL请求路径前缀

示例：

``` plain
RUNTIME_CONFIG_BASE_URL=/test
```

### 5、RUNTIME_CONFIG_FILENAME

类型：string

描述：运行时配置文件名

示例：

``` plain
RUNTIME_CONFIG_FILENAME=test
```

### 6、I18N_OSS_URL

类型：string

描述：翻译文件 OSS 目录

示例：

``` plain
I18N_OSS_URL=/upload/test
```

## （二）RuntimeConfig

### 1、I18N_OSS_URL

类型：string

描述：翻译文件 OSS 目录

示例：

``` typescript
runtimeConfigResolve({
  I18N_OSS_URL: '/upload/test'
});
```

### 2、登录页配置（LoginConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `loginLabel`        | string | 登录 | 登录按钮文本 |
| `forgetPassword`    | boolean | false | 登录页是否显示忘记密码按钮 |
| `forgetPasswordLabel` | string | 忘记密码 | 登录页忘记密码按钮文本内容 |
| `register`          | boolean | false | 是否显示注册按钮 |
| `registerLabel`     | string | 去注册 | 注册按钮文本 |
| `codeLogin`         | boolean | true | 是否显示验证码登录 Tab |
| `accountLoginLabel` | string | 账号登录 | 账号登录 Tab 文本 |
| `codeLoginLabel`    | string | 验证码登录 | 验证码登录 Tab 文本 |
| `accountPlaceholder` | string | 请输入您的账号 | 账号输入框占位符 |
| `passwordPlaceholder` | string | 请输入您的密码 | 密码输入框占位符 |
| `phonePlaceholder`  | string | 请输入您的手机号 | 手机号输入框占位符 |
| `codePlaceholder`   | string | 请输入收到的验证码 | 验证码输入框占位符 |
| `email`             | boolean | false | 是否开启邮箱登录模式 |
| `emailLoginLabel`   | string | 邮箱登录 | 邮箱登录 Tab 文本 |
| `emailPlaceholder`  | string | 请输入您的邮箱 | 邮箱输入框占位符 |
| `emailCodePlaceholder` | string | 请输入收到的验证码 | 邮箱验证码输入框占位符 |


**使用示例**

``` typescript
runtimeConfigResolve({
  login: {
    loginLabel: "登录",
    forgetPassword: false,
    forgetPasswordLabel: "忘记密码",
    register: false,
    registerLabel: "去注册",
    codeLogin: true,
    codeLoginLabel: "验证码登录",
    accountLoginLabel: "账号登录",
    accountPlaceholder: "请输入用户名",
    passwordPlaceholder: "请输入您的密码",
    phonePlaceholder: "请输入您的手机号",
    codePlaceholder: "请输入收到的验证码",
    email: false,
    emailLoginLabel: "邮箱登录",
    emailPlaceholder: "请输入邮箱",
    emailCodePlaceholder: "请输入收到的验证码"
  }
});
```

### 3、插件加载配置（PluginsLoaderConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `usingRemote`       | boolean | false | 使用低无一体组件；默认为 false |


**使用示例**

``` typescript
runtimeConfigResolve({
  plugins: {
    usingRemote: false
  }
});
```

### 4、多标签页配置（MultiTabsConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | 是否启用多标签页功能，启用时需配合 mask 渲染管理组件 |
| `inline`            | boolean | - | 是否使用内联多标签页（仅默认 mask 生效） |
| `showModuleLogo`    | boolean | true | 是否显示模块 Logo |
| `maxCount`          | number | - | 页面中最多显示的标签页数量，超过时自动关闭最早打开的标签页 |
| `maxCacheCount`     | number | 10 | 最多缓存标签页数量，超过时清理最早缓存（不关闭标签页，重新激活时重载） |
| `draggable`         | boolean | true | 是否启用标签页拖拽排序功能 |
| `homepage`          | boolean  | MultiTabsApplicationHomepageConfig                    | - |
| `moduleHomepage`    | boolean  | MultiTabsModuleHomepageConfig                         | - |
| `filter`            | string[] | - | 模块过滤列表，指定允许显示的模块标识符 |
| `theme`             | string | - | 多标签页主题（可选值：`theme1`<br/>/`theme2`<br/>/`theme3`<br/>/`theme4`<br/>） |


#### 应用首页配置（MultiTabsApplicationHomepageConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | 是否启用应用首页特殊标记（固定显示于标签页首位） |
| `auto`              | boolean | true | 是否自动获取应用首页 |
| `autoInvisible`     | boolean | 非内联时 true | 当前激活页为首页时是否自动隐藏（未启用模块首页时生效） |


#### 模块首页配置（MultiTabsModuleHomepageConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | false | 是否启用模块首页（切换模块时初始化） |
| `auto`              | boolean | true | 是否自动获取模块首页 |


**使用示例**

``` typescript
runtimeConfigResolve({
  multiTabs: {
    enabled: true,
    inline: false,
    showModuleLogo: true,
    maxCount: 12,
    maxCacheCount: 10,
    draggable: true,
    theme: "theme1",
    filter: ["workbench"],
    homepage: {
      enabled: true,
      auto: true,
      autoInvisible: false
    },
    moduleHomepage: {
      enabled: false,
      auto: true
    }
  }
});
```

### 5、面包屑配置（BreadcrumbConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | 是否启用面包屑功能，启用时需配合 mask 渲染面包屑组件 |
| `homepage`          | boolean  | BreadcrumbHomepageConfig                              | - |


#### 首页配置（BreadcrumbHomepageConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | 首项是否显示首页（固定显示于面包屑首位） |
| `type`              | 'application' | 'module'                                              | 'application' |


**使用示例**

``` typescript
runtimeConfigResolve({
  breadcrumb: {
    enabled: true,
    homepage: {
      enabled: true,
      type: 'application'
    }
  }
});
```

### 6、表格配置（TableConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `lineHeight`        | number | - | 行高 |
| `minLineHeight`     | number | - | 最小行高 |
| `autoLineHeight`    | boolean | - | 自动行高 |


**使用示例**

``` typescript
runtimeConfigResolve({
  tableConfig: {
    lineHeight: 40,
    minLineHeight: 30,
    autoLineHeight: true
  }
});
```

### 7、实验性配置（ExperimentalConfig）

| **参数名**               | **类型** | **描述**                                                                                                                                 |
|:----------------------|:-------|:---------------------------------------------------------------------------------------------------------------------------------------|
| `buildQueryCondition` | string | 设置为 next 使用新版搜索条件构建方式<br>旧版：构建搜索条件时，关联关系字段不判断是否存储，全部加入到 rsql 中。<br>新版：构建搜索条件时，关联关系字段根据字段元数据是否存储判断是否将其加入到 rsql 中，非存储字段将加入到 queryData 中。 |
| `AddressWidget`       | string | 设置为 next 使用新版地址组件<br>旧版：使用 ResourceCountry、ResourceProvince、ResourceCity 等模型进行地址的查询和回填。<br>新版：使用 ResourceRegion 模型进行地址的查询和回填。          |


**使用示例**

``` typescript
runtimeConfigResolve({
  experimental: {
    buildQueryCondition: 'next',
    AddressWidget: 'next'
  }
});
```

### 8、调试配置（DebugConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | - | 是否启用调试模式 |


**使用示例**

``` typescript
runtimeConfigResolve({
  debug: {
    enabled: true
  }
});
```

## （三）OioProviderProps

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `http` | `OioHttpConfig` | - | http 配置 |
| `router` | `RouterPath[]` | - | 路由配置 |
| `appSwitcher` | `{ logo?: string; appSideLogo?: string; }` | - | 应用 logo 配置 |
| `copyrightStatus` | `boolean` | - | copyright 状态 |
| `loginTheme` | `OioLoginThemeConfig` | - | 登录主题配置 |
| `sideBarTheme` | `SideBarThemeConfig` | - | 侧边栏菜单主题配置 |
| `multiTabTheme` | `MultiTabsConfig` | - | 多 tab 主题配置 |
| `browser` | `OioProviderBrowserProps` | - | 浏览器配置 |
| `install` | `((app) => void) | ((app) => Promise\<void>)` | - | app 被 mount 前触发，可以用来注册全局组件 |
| `theme` | `ThemeName[]` | - | 全局主题配置 |
| `dependencies` | `PluginLoadDependencies` | - | 低无一体依赖配置 |
| `encryptionUrlParams` | `boolean` | - | 是否对 url 参数进行加密 |
| `enableRuntimeConfig` | `boolean` | `true` | 是否启用运行时配置 |
| `enableI18n` | `boolean` | `true` | 是否启用国际化 |
| `enableScrollToErrorField` | `boolean` | `true` | 当表单提交时，验证失败的字段会自动定位到视图可视化区域（默认开启） |
| `extend` | `ExtendSettingType` | `false` | 单项翻译、工具箱开关配置（默认关闭） |


### 1、HTTP配置（OioHttpConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| --- | --- | --- | --- |
| `encodeRsql` | boolean | false | 是否启用RSQL加密传输 |
| `enableTranslate` | boolean | true | 是否启用翻译 |
| `interceptor` | Partial\<InterceptorOptions> | - | 内置拦截器配置 |
| `middleware` | NetworkMiddlewareHandler | NetworkMiddlewareHandler[] | - | HttpClient Middleware 配置（在内置拦截器之前执行） |


**InterceptorOptions**

| **参数名** | **类型** | **默认值** | **描述** |
| --- | --- | --- | --- |
| translate | NetworkInterceptor | TranslateInterceptor | 翻译拦截器 |
| networkError | NetworkInterceptor | NetworkErrorInterceptor | 网络错误拦截器（error) |
| requestSuccess | NetworkInterceptor | RequestSuccessInterceptor | 请求成功拦截器 (success) |
| actionRedirect | NetworkInterceptor | ActionRedirectInterceptor | 重定向拦截器 (success) |
| loginRedirect | NetworkInterceptor | LoginRedirectInterceptor | 登录重定向拦截器 (error) |
| requestError | NetworkInterceptor | RequestErrorInterceptor | 请求错误拦截器 (error) |
| beforeInterceptors | NetworkInterceptor | NetworkInterceptor[] | - | 前置拦截器 |
| afterInterceptors | NetworkInterceptor | NetworkInterceptor[] | - | 后置拦截器 |


### 2、登录主题配置（OioLoginThemeConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `name` | OioLoginThemeName | - | 内置登录主题名称 |
| `backgroundImage` | string | - | 背景图片 url |
| `backgroundColor` | string | - | 背景色 |
| `logo` | string | - | logo url |
| `logoPosition` | OioLoginLogoPosition | - | 登录页 logo 显示位置 |


**OioLoginThemeName**

| **成员** | **值** | **描述** |
| :--- | :--- | :--- |
| `LEFT_STICK` | `'LEFT_STICK'` | 大背景居左登录 |
| `RIGHT_STICK` | `'RIGHT_STICK'` | 大背景居右登录 |
| `CENTER_STICK` | `'CENTER_STICK'` | 大背景居中登录 |
| `CENTER_STICK_LOGO` | `'CENTER_STICK_LOGO'` | 大背景居中登录，logo 在登录页里面 |
| `STAND_LEFT` | `'STAND_LEFT'` | 左侧登录 |
| `STAND_RIGHT` | `'STAND_RIGHT'` | 右侧登录 |


**OioLoginLogoPosition**

| **成员** | **值** | **描述** |
| :--- | :--- | :--- |
| `LEFT` | `'LEFT'` | 左侧 |
| `RIGHT` | `'RIGHT'` | 右侧 |
| `CENTER` | `'CENTER'` | 中间 |


### 3、侧边栏菜单主题配置（SideBarThemeConfig）

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `mode` | `SideBarThemeColor` | - | 侧边栏主题颜色模式 |
| `theme` | `SideBarTheme` | - | 侧边栏主题类型 |


**SideBarThemeColor**

| **成员** | **值** | **描述** |
| :--- | :--- | :--- |
| `default` | `'default'` | 默认颜色 |
| `dark` | `'dark'` | 深色 |


**SideBarTheme**

| **成员** | **值** | **描述** |
| :--- | :--- | :--- |
| `side1` | `'theme1'` | 侧边栏主题 1 |
| `side2` | `'theme2'` | 侧边栏主题 2 |
| `side3` | `'theme3'` | 侧边栏主题 3 |
| `side4` | `'theme4'` | 侧边栏主题 4 |
| `side5` | `'theme5'` | 侧边栏主题 5 |
| `side6` | `'theme6'` | 侧边栏主题 6 |


### 4、多选项卡配置（MultiTabsConfig）

同 `RuntimeConfg#multiTabs` 配置。

### 5、浏览器配置（OioProviderBrowserProps）

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `favicon` | `string` | - | 浏览器选项卡图标 |
| `title` | `string` | - | 浏览器默认标题（仅用于非主页面） |


### 6、扩展配置（ExtendSettingType）

**描述**：扩展设置类型，包含系统样式配置和翻译设置

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `systemStyleConfig` | `SystemStyleConfig` | - | 系统样式配置 |
| `translationManage` | `boolean` | - | 单项翻译开关 |
| `toolboxTranslation` | `boolean` | - | 工具箱开关 |
| `resourceTranslations` | `{ moduleName: string; remoteUrl: string; [key: string]: unknown; }[]` | - | 翻译列表 |


**SystemStyleConfig**

| **参数名** | **类型** | **默认值** | **描述** |
| :--- | :--- | :--- | :--- |
| `sideBarConfig` | `SideBarThemeConfig` | - | 侧边栏主题配置 |
| `multiTabConfig` | `MultiTabsConfig` | - | 多标签页配置 |
