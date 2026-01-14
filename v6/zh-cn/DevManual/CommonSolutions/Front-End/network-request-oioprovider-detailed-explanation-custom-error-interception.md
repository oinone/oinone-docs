---
title: 网络请求：OioProvider详解（自定义请求错误拦截）
index: true
category:
   - 前端
order: 9
---
## 一、OioProvider
OioProvider 是平台的初始化入口。

## （一）示例入口 `main.ts`
```typescript
import { VueOioProvider } from '@kunlun/dependencies';

VueOioProvider();
```

# 二、网络请求/响应配置 `http`
平台统一使用 apollo作为统一的 http 请求发起服务，并使用 GraphQL 协议作为前后端协议。

参考文档：

+ [apollo-client](https://github.com/apollographql/apollo-client#readme)
+ [graphql](https://github.com/graphql/graphql-js#readme)

## （一）配置方式
```typescript
VueOioProvider({
  http?: OioHttpConfig
});
```

## （二）OioHttpConfig
```typescript
/**
 * OioHttp配置
 */
export interface OioHttpConfig {
  /**
   * base url
   */
  url: string;

  /**
   * 拦截器配置
   */
  interceptor?: Partial<InterceptorOptions>;

  /**
   * 中间件配置（优先于拦截器）
   */
  middleware?: NetworkMiddlewareHandler | NetworkMiddlewareHandler[];
}
```

## （三）内置拦截器可选项 `InterceptorOptions`
```typescript
/**
 * 拦截器可选项
 */
export interface InterceptorOptions {
  /**
   * 网络错误拦截器
   */
  networkError: NetworkInterceptor;

  /**
   * 请求成功拦截器 (success)
   */
  requestSuccess: NetworkInterceptor;

  /**
   * 重定向拦截器 (success)
   */
  actionRedirect: NetworkInterceptor;

  /**
   * 登录重定向拦截器 (error)
   */
  loginRedirect: NetworkInterceptor;

  /**
   * 请求错误拦截器 (error)
   */
  requestError: NetworkInterceptor;

  /**
   * MessageHub拦截器 (success/error)
   */
  messageHub: NetworkInterceptor;

  /**
   * 前置拦截器
   */
  beforeInterceptors: NetworkInterceptor | NetworkInterceptor[];

  /**
   * 后置拦截器
   */
  afterInterceptors: NetworkInterceptor | NetworkInterceptor[];
}
```

内置拦截器执行顺序:

+ beforeInterceptors：前置拦截器
+ networkError：网络错误
+ actionRedirect：重定向
+ requestSuccess 请求成功
+ loginRedirect：登录重定向
+ requestError：请求错误
+ messageHub：MessageHub
+ afterInterceptors：后置拦截器

## （四）NetworkInterceptor
```typescript
/**
 * <h3>网络请求拦截器</h3>
 * <ul>
 *   <li>拦截器将按照注册顺序依次执行</li>
 *   <li>当任何一个拦截器返回false时，将中断拦截器执行</li>
 *   <li>内置拦截器总是优先于自定义拦截器执行</li>
 * </ul>
 *
 */
export interface NetworkInterceptor {
  /**
   * 成功拦截
   * @param response 响应结果
   */
  success?(response: IResponseResult): ReturnPromise<boolean>;

  /**
   * 错误拦截
   * @param response 响应结果
   */
  error?(response: IResponseErrorResult): ReturnPromise<boolean>;
}
```

# 三、自定义路由配置 `router`
## （一）配置方式
```typescript
VueOioProvider({
  router?: RouterPath[]
});
```

## （二）RouterPath
```typescript
/**
 * 路由配置
 */
export interface RouterPath {
  /**
   * 访问路径
   */
  path: string;
  /**
   * 路由组件名称
   */
  widget: string;
}
```

## （三）内置路由配置
```typescript
[
  {
    path: '/login',
    widget: 'Login'
  },
  {
    path: '/forget',
    widget: 'ForgetPassword'
  },
  {
    path: '/first',
    widget: 'FirstResetPassword'
  }
]
```

+ login：登录页路由
+ forget：忘记密码页路由（非登录态）
+ first：首次登录页路由

# 四、外观配置
## （一）配置方式
```typescript
VueOioProvider({
  copyrightStatus?: boolean;
  loginTheme?: OioLoginThemeConfig;
  browser?: OioProviderBrowserProps;
  theme?: ThemeName[];
});
```

## （二）copyrightStatus
是否显示 copyright 信息，默认显示(true)

## （三）OioLoginThemeConfig
```typescript
/**
 * 登录主题配置
 */
export interface OioLoginThemeConfig {
  /**
   * 内置登录主题名称
   */
  name?: OioLoginThemeName;
  /**
   * 背景图片 url
   */
  backgroundImage?: string;
  /**
   * 背景色
   */
  backgroundColor?: string;
  /**
   * logo url
   */
  logo?: string;
  /**
   * 登录页logo显示位置
   */
  logoPosition?: OioLoginLogoPosition;
}

/**
 * 内置登录主题名称
 */
export enum OioLoginThemeName {
  /**
   * 大背景居左登录
   */
  LEFT_STICK = 'LEFT_STICK',
  /**
   * 大背景居右登录
   */
  RIGHT_STICK = 'RIGHT_STICK',
  /**
   * 大背景居中登录
   */
  CENTER_STICK = 'CENTER_STICK',
  /**
   * 大背景居中登录,logo在登录页里面
   */
  CENTER_STICK_LOGO = 'CENTER_STICK_LOGO',
  /**
   * 左侧登录
   */
  STAND_LEFT = 'STAND_LEFT',
  /**
   * 右侧登录
   */
  STAND_RIGHT = 'STAND_RIGHT'
}

/**
 * 登录页logo显示位置
 */
export enum OioLoginLogoPosition {
  /**
   * 左侧
   */
  LEFT = 'LEFT',
  /**
   * 右侧
   */
  RIGHT = 'RIGHT',
  /**
   * 中间
   */
  CENTER = 'CENTER'
}
```

## （四）OioProviderBrowserProps
```typescript
/**
 * 浏览器配置
 */
export interface OioProviderBrowserProps {
  /**
   * 浏览器选项卡图标
   */
  favicon?: string;
  /**
   * 浏览器默认标题（仅用于非主页面）
   */
  title?: string;
}
```

## （五）ThemeName
```typescript
type ThemeName =
  | 'default-large'
  | 'default-medium'
  | 'default-small'
  | 'dark-large'
  | 'dark-medium'
  | 'dark-small'
  | string;
```

+ default-large：默认大号主题
+ default-medium：默认中号主题（默认）
+ default-small：默认小号主题
+ dark-large：深色大号主题
+ dark-medium：深色中号主题
+ dark-small：深色小号主题
+ 其他：自定义主题

## （六）定义自定义主题
```typescript
export const themeName = 'customTheme';

export const themeCssVars = {
  ......
};
```

主题变量参考文档：[OioThemeCssVars](缺少文档)

## （七）应用自定义主题
```typescript
import { registerTheme } from '@kunlun/dependencies';
import { themeName, themeCssVars } from './theme';

registerTheme(themeName, themeCssVars);

VueOioProvider({
  theme: [themeName]
});
```

# 五、低无一体依赖配置 `dependencies`
## （一）配置方式
```typescript
VueOioProvider({
  dependencies?: PluginLoadDependencies
});
```

## （二）PluginLoadDependencies
```typescript
/**
 * 插件加载依赖
 */
export type PluginLoadDependencies = Record<string, unknown> | PluginLoadDependency[];

/**
 * 插件加载类型
 */
export type PluginLoadType = 'esm' | 'cjs' | 'umd' | 'iife' | 'css';

/**
 * 插件加载依赖
 */
export type PluginLoadDependency = {
  /**
   * 插件加载类型
   */
  type: PluginLoadType;
  /**
   * 依赖项
   */
  dependencies: Record<string, unknown>;
};
```

