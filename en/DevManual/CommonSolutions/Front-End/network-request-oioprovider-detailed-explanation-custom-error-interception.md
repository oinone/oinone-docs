---
title: Network Requests:Detailed Explanation of OioProvider (Custom Request Error Interception)
index: true
category:
   - Frontend
order: 9
---

## 一、OioProvider
OioProvider serves as the initialization entry point of the platform.

## (一) Example Entry `main.ts`
```typescript
import { VueOioProvider } from '@kunlun/dependencies';

VueOioProvider();
```

# 二、Network Request/Response Configuration `http`
The platform uniformly uses Apollo as the unified HTTP request initiation service and adopts the GraphQL protocol as the front-end to back-end protocol.

Reference documents:

+ [apollo-client](https://github.com/apollographql/apollo-client#readme)
+ [graphql](https://github.com/graphql/graphql-js#readme)

## (一) Configuration Method
```typescript
VueOioProvider({
  http?: OioHttpConfig
});
```

## (二) OioHttpConfig
```typescript
/**
 * OioHttp configuration
 */
export interface OioHttpConfig {
  /**
   * Base URL
   */
  url: string;

  /**
   * Interceptor configuration
   */
  interceptor?: Partial<InterceptorOptions>;

  /**
   * Middleware configuration (takes precedence over interceptors)
   */
  middleware?: NetworkMiddlewareHandler | NetworkMiddlewareHandler[];
}
```

## (三) Built-in Interceptor Options `InterceptorOptions`
```typescript
/**
 * Interceptor options
 */
export interface InterceptorOptions {
  /**
   * Network error interceptor
   */
  networkError: NetworkInterceptor;

  /**
   * Request success interceptor (success)
   */
  requestSuccess: NetworkInterceptor;

  /**
   * Redirection interceptor (success)
   */
  actionRedirect: NetworkInterceptor;

  /**
   * Login redirection interceptor (error)
   */
  loginRedirect: NetworkInterceptor;

  /**
   * Request error interceptor (error)
   */
  requestError: NetworkInterceptor;

  /**
   * MessageHub interceptor (success/error)
   */
  messageHub: NetworkInterceptor;

  /**
   * Pre-interceptors
   */
  beforeInterceptors: NetworkInterceptor | NetworkInterceptor[];

  /**
   * Post-interceptors
   */
  afterInterceptors: NetworkInterceptor | NetworkInterceptor[];
}
```

Execution order of built-in interceptors:

+ beforeInterceptors: Pre-interceptors
+ networkError: Network errors
+ actionRedirect: Redirection
+ requestSuccess: Request success
+ loginRedirect: Login redirection
+ requestError: Request errors
+ messageHub: MessageHub
+ afterInterceptors: Post-interceptors

## (四) NetworkInterceptor
```typescript
/**
 * <h3>Network request interceptor</h3>
 * <ul>
 *   <li>Interceptors will execute sequentially in the registered order</li>
 *   <li>When any interceptor returns false, interceptor execution will be interrupted</li>
 *   <li>Built-in interceptors always execute before custom interceptors</li>
 * </ul>
 *
 */
export interface NetworkInterceptor {
  /**
   * Success interception
   * @param response Response result
   */
  success?(response: IResponseResult): ReturnPromise<boolean>;

  /**
   * Error interception
   * @param response Response result
   */
  error?(response: IResponseErrorResult): ReturnPromise<boolean>;
}
```

# 三、Custom Routing Configuration `router`
## (一) Configuration Method
```typescript
VueOioProvider({
  router?: RouterPath[]
});
```

## (二) RouterPath
```typescript
/**
 * Routing configuration
 */
export interface RouterPath {
  /**
   * Access path
   */
  path: string;
  /**
   * Routing component name
   */
  widget: string;
}
```

## (三) Built-in Routing Configuration
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

+ login: Login page route
+ forget: Forgot password page route (non-login state)
+ first: First login page route

# 四、Appearance Configuration
## (一) Configuration Method
```typescript
VueOioProvider({
  copyrightStatus?: boolean;
  loginTheme?: OioLoginThemeConfig;
  browser?: OioProviderBrowserProps;
  theme?: ThemeName[];
});
```

## (二) copyrightStatus
Whether to display copyright information, default is display (true)

## (三) OioLoginThemeConfig
```typescript
/**
 * Login theme configuration
 */
export interface OioLoginThemeConfig {
  /**
   * Name of built-in login theme
   */
  name?: OioLoginThemeName;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Logo URL
   */
  logo?: string;
  /**
   * Display position of login page logo
   */
  logoPosition?: OioLoginLogoPosition;
}

/**
 * Names of built-in login themes
 */
export enum OioLoginThemeName {
  /**
   * Large background with login on left
   */
  LEFT_STICK = 'LEFT_STICK',
  /**
   * Large background with login on right
   */
  RIGHT_STICK = 'RIGHT_STICK',
  /**
   * Large background with login in center
   */
  CENTER_STICK = 'CENTER_STICK',
  /**
   * Large background with login in center, logo inside login page
   */
  CENTER_STICK_LOGO = 'CENTER_STICK_LOGO',
  /**
   * Login on left
   */
  STAND_LEFT = 'STAND_LEFT',
  /**
   * Login on right
   */
  STAND_RIGHT = 'STAND_RIGHT'
}

/**
 * Display positions of login page logo
 */
export enum OioLoginLogoPosition {
  /**
   * Left
   */
  LEFT = 'LEFT',
  /**
   * Right
   */
  RIGHT = 'RIGHT',
  /**
   * Center
   */
  CENTER = 'CENTER'
}
```

## (四) OioProviderBrowserProps
```typescript
/**
 * Browser configuration
 */
export interface OioProviderBrowserProps {
  /**
   * Browser tab icon
   */
  favicon?: string;
  /**
   * Default browser title (only for non-home pages)
   */
  title?: string;
}
```

## (五) ThemeName
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

+ default-large: Default large theme
+ default-medium: Default medium theme (default)
+ default-small: Default small theme
+ dark-large: Dark large theme
+ dark-medium: Dark medium theme
+ dark-small: Dark small theme
+ Others: Custom themes

## (六) Define Custom Theme
```typescript
export const themeName = 'customTheme';

export const themeCssVars = {
  ......
};
```

Theme variable reference document: [OioThemeCssVars] (document missing)

## (七) Apply Custom Theme
```typescript
import { registerTheme } from '@kunlun/dependencies';
import { themeName, themeCssVars } from './theme';

registerTheme(themeName, themeCssVars);

VueOioProvider({
  theme: [themeName]
});
```

# 五、Low-Code Dependencies Configuration `dependencies`
## (一) Configuration Method
```typescript
VueOioProvider({
  dependencies?: PluginLoadDependencies
});
```

## (二) PluginLoadDependencies
```typescript
/**
 * Plugin load dependencies
 */
export type PluginLoadDependencies = Record<string, unknown> | PluginLoadDependency[];

/**
 * Plugin load type
 */
export type PluginLoadType = 'esm' | 'cjs' | 'umd' | 'iife' | 'css';

/**
 * Plugin load dependency
 */
export type PluginLoadDependency = {
  /**
   * Plugin load type
   */
  type: PluginLoadType;
  /**
   * Dependencies
   */
  dependencies: Record<string, unknown>;
};
```