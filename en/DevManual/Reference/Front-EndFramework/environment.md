---
title: Environment
index: true
category:
  - Development Manual
  - Reference
  - Frontend API
order: 2

---
# I. Compile-time Environment Configuration

## (Ⅰ) Using .env Configuration

Create a `.env` file in the `startup project` for environment configuration, for example:

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

Try configuring the `BASE_PATH` property in the `.env` file:

``` plain
BASE_PATH=/test
```

To make the configuration effective:
+ Use `npm run dev` to restart the service during development.
+ Use `npm run build` for production to complete the build and release.

## (Ⅱ) Custom .env Configuration

You can retrieve `.env` configurations anywhere using:

``` typescript
protected doSomething() {
  console.log(process.env.CUSTOM_PROPERTY);
}
```

Configure the `CUSTOM_PROPERTY` property in the .env file:

``` typescript
CUSTOM_PROPERTY=test
```

When executing the `doSomething` function, you will see `test` printed in the console.

:::warning Note

For more on `.env` configuration usage, refer to: [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack)

:::

# II. Runtime Environment Configuration

## (Ⅰ) Using Runtime Configuration in Development

Create a `manifest.js` file in the `startup project` for runtime environment configuration, for example:

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

Try configuring `multiTabs.inline` as `true` in the `manifest.js` file to move the `multi-tab` from the top of the entire page to above the main content distribution area:

``` javascript
runtimeConfigResolve({
  multiTabs: {
    inline: true
  }
});
```

## (Ⅱ) Using Runtime Configuration in Production Environment

Normally, the `manifest.js` created in the `public` directory of the `startup project` is automatically placed in the `dist` directory during `build-time`. However, sometimes development configuration files are not used in the production environment. In such cases, manually create a `manifest.js` file in the production `dist` directory for production-specific configurations, for example:

``` shell
dist
├── favicon.ico
├── fonts
├── js
├── manifest.js
└── index.html
```

:::warning Note

The path and file name of runtime configuration can be modified via the `RUNTIME_CONFIG_FILENAME` and `RUNTIME_CONFIG_FILENAME` properties in `.env` configuration. The actual path and file name should be determined based on `.env` configuration.

:::

# III. Custom Runtime Configuration

The following steps demonstrate the declaration and usage process of a runtime configuration, which is typically a "best practice" in projects. We recommend declaring and using any runtime configuration in this format.

Additionally, all possible configurations should be independently placed in the `src/config` directory or the `corresponding function` directory.

## (Ⅰ) Define Configuration Type

``` typescript
/**
 * Demo runtime configuration type definition
 */
export interface DemoConfig extends RuntimeConfigOptions, EnabledConfig {
  /**
   * Whether to enable
   */
  enabled?: boolean;

  // Add other possible configuration items
}
```

+ RuntimeConfigOptions: Defines types that can be configured in `manifest.js` and used.
+ EnabledConfig: Defines a standard enable/disable configuration format.

## (Ⅱ) Define Runtime Configuration Manager

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

  // Add methods to get other possible configuration items
}
```

## (Ⅲ) Define Parameters in Runtime Configuration

### 1. Simple Enable/Disable Configuration

``` typescript
runtimeConfigResolve({
  demo: true
});
```

:::warning Note:

In the `ConfigHelper#getConfig` method, the `boolean` value is converted to a `DemoConfig` object and placed in the `enabled` property.

:::

### 2. Complete Configuration

``` typescript
runtimeConfigResolve({
  demo: {
    enabled: true
    // Other possible configuration items
  }
});
```

:::warning Note:

Here, the `demo` key matches the parameter defined in the `DemoConfigManager#getConfig` method.

:::

## (Ⅳ) Use Configuration Methods in Components

``` typescript
DemoConfigManager.isEnabled()
```

# IV. VueOioProvider Entry Configuration

In a Vue project, `main.ts` is a common entry file used to create the framework instance and initialize the framework. The Oinone Kunlun framework provides an entry method `VueOioProvider` for system initialization.

## (Ⅰ) Basic Usage

``` typescript
import 'ant-design-vue/dist/antd.min.css';
import 'element-plus/dist/index.css';

// Comment out when running with 'npm run dev'
import '@oinone/kunlun-vue-ui-antd/dist/oinone-kunlun-vue-ui-antd.css';
import '@oinone/kunlun-vue-ui-el/dist/oinone-kunlun-vue-ui-el.css';

// Other CSS imports

import 'reflect-metadata';
import { VueOioProvider } from '@oinone/kunlun-dependencies';

// Other module imports

VueOioProvider();
```

:::warning Note:

The import of `reflect-metadata` must precede the import of `@oinone/kunlun-dependencies`; otherwise, the system will not function properly.

:::

## (Ⅱ) Customizing HTTP Requests

### 1. Enabling RSQL Encrypted Transmission

``` typescript
VueOioProvider({
  http: {
    encodeRsql: true
  }
});
```

:::warning Note:

The RSQL encrypted transmission feature must be used in conjunction with the backend class `pro.shushi.pamirs.framework.gateways.hook.RsqlDecodeHook`. No additional backend configuration is required by default.

:::

### 2. Adding Global Request Header Parameters
First, let's create a custom header interceptor to add a fixed parameter like `demo: true` to the request headers:

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

Configure VueOioProvider to activate the interceptor:

``` typescript
VueOioProvider({
  http: {
    middleware: CustomHeaderMiddleware
  }
});
```

:::warning Note:

For more configuration parameters, refer to: [API](#III-OioProviderProps)

:::

The translation maintains the original formatting, technical terms, and structure while ensuring clarity and adherence to internet domain terminology.

# V. Reference List

## (Ⅰ) .env

### 1. BASE_PATH

Type: string

Description: Uniform configuration for URL request path prefix

Example:

``` plain
BASE_PATH=/test
```

### 2. STATIC_IMG

Type: string

Description: Static resource path

Example:

``` plain
STATIC_IMG=/static/images
```

### 3. MESSAGE_LEVEL

Type: enum

Options: DEBUG, SUCCESS, INFO, WARN, ERROR

Description: MessageHub message level

Example:

``` plain
MESSAGE_LEVEL=INFO
```

### 4. RUNTIME_CONFIG_BASE_URL

Type: string

Description: Runtime configuration file URL request path prefix

Example:

``` plain
RUNTIME_CONFIG_BASE_URL=/test
```

### 5. RUNTIME_CONFIG_FILENAME

Type: string

Description: Runtime configuration file name

Example:

``` plain
RUNTIME_CONFIG_FILENAME=test
```

### 6. I18N_OSS_URL

Type: string

Description: OSS directory for translation files

Example:

``` plain
I18N_OSS_URL=/upload/test
```

## (Ⅱ) RuntimeConfig

### 1. I18N_OSS_URL

Type: string

Description: OSS directory for translation files

Example:

``` typescript
runtimeConfigResolve({
  I18N_OSS_URL: '/upload/test'
});
```

### 2. Login Page Configuration (LoginConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `loginLabel`        | string | Login | Login button text |
| `forgetPassword`    | boolean | false | Is the forgot password button displayed on the login page |
| `forgetPasswordLabel` | string | Forgot Password | Forgot password button text on the login page |
| `register`          | boolean | false | Whether to show the register button |
| `registerLabel`     | string | Register | Register button text |
| `codeLogin`         | boolean | true | Whether to show the verification code login Tab |
| `accountLoginLabel` | string | Account Login | Account login Tab text |
| `codeLoginLabel`    | string | Verification Code Login | Verification code login Tab text |
| `accountPlaceholder` | string | Please enter your account | Account input placeholder |
| `passwordPlaceholder` | string | Please enter your password | Password input placeholder |
| `phonePlaceholder`  | string | Please enter your phone number | Phone number input placeholder |
| `codePlaceholder`   | string | Please enter the received verification code | Verification code input placeholder |
| `email`             | boolean | false | Whether to enable email login mode |
| `emailLoginLabel`   | string | Email Login | Email login Tab text |
| `emailPlaceholder`  | string | Please enter your email | Email input placeholder |
| `emailCodePlaceholder` | string | Please enter the received verification code | Email verification code input placeholder |


**Usage Example**

``` typescript
runtimeConfigResolve({
  login: {
    loginLabel: "Login",
    forgetPassword: false,
    forgetPasswordLabel: "Forgot Password",
    register: false,
    registerLabel: "Go to Register",
    codeLogin: true,
    codeLoginLabel: "Verification Code Login",
    accountLoginLabel: "Account Login",
    accountPlaceholder: "Please enter username",
    passwordPlaceholder: "Please enter your password",
    phonePlaceholder: "Please enter your phone number",
    codePlaceholder: "Please enter the received verification code",
    email: false,
    emailLoginLabel: "Email Login",
    emailPlaceholder: "Please enter email",
    emailCodePlaceholder: "Please enter the received verification code"
  }
});
```

### 3. Plugin Loading Configuration (PluginsLoaderConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `usingRemote`       | boolean | false | Use low-code integrated components; default is false |


**Usage Example**

``` typescript
runtimeConfigResolve({
  plugins: {
    usingRemote: false
  }
});
```

### 4. Multi-Tab Configuration (MultiTabsConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | Whether to enable multi-tab functionality; requires配合 mask rendering management component when enabled |
| `inline`            | boolean | - | Whether to use inline multi-tabs (only effective for the default mask) |
| `showModuleLogo`    | boolean | true | Whether to show the module logo |
| `maxCount`          | number | - | Maximum number of tabs displayed in the page; automatically closes the oldest tab when exceeded |
| `maxCacheCount`     | number | 10 | Maximum number of cached tabs; clears the oldest cache when exceeded (does not close tabs, reloads when reactivated) |
| `draggable`         | boolean | true | Whether to enable tab dragging and sorting |
| `homepage`          | boolean  | MultiTabsApplicationHomepageConfig                    | - |
| `moduleHomepage`    | boolean  | MultiTabsModuleHomepageConfig                         | - |
| `filter`            | string[] | - | Module filter list, specifying allowed module identifiers |
| `theme`             | string | - | Multi-tab theme (optional values: `theme1`<br/>/`theme2`<br/>/`theme3`<br/>/`theme4`<br/>) |


#### Application Homepage Configuration (MultiTabsApplicationHomepageConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | Whether to enable the application homepage special marker (fixed at the first position in tabs) |
| `auto`              | boolean | true | Whether to automatically obtain the application homepage |
| `autoInvisible`     | boolean | true when not inline | Whether to automatically hide when the current active page is the homepage (effective when module homepage is not enabled) |


#### Module Homepage Configuration (MultiTabsModuleHomepageConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | false | Whether to enable the module homepage (initialized when switching modules) |
| `auto`              | boolean | true | Whether to automatically obtain the module homepage |


**Usage Example**

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

### 5. Breadcrumb Configuration (BreadcrumbConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | Whether to enable breadcrumb functionality; requires配合 mask to render the breadcrumb component when enabled |
| `homepage`          | boolean  | BreadcrumbHomepageConfig                              | - |


#### Homepage Configuration (BreadcrumbHomepageConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | true | Whether the first item shows the homepage (fixed at the first position in breadcrumbs) |
| `type`              | 'application' | 'module'                                              | 'application' |


**Usage Example**

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

### 6. Table Configuration (TableConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `lineHeight`        | number | - | Row height |
| `minLineHeight`     | number | - | Minimum row height |
| `autoLineHeight`    | boolean | - | Auto row height |


**Usage Example**

``` typescript
runtimeConfigResolve({
  tableConfig: {
    lineHeight: 40,
    minLineHeight: 30,
    autoLineHeight: true
  }
});
```

### 7. Experimental Configuration (ExperimentalConfig)

| **Parameter Name**    | **Type** | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|:----------------------|:-----------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `buildQueryCondition` | string | Set to use the new version of search criteria construction method for next<br>Old version: When constructing search criteria, the association relationship fields are not judged whether they are stored or not, and are all added to RSQL. <br>New version: When building search criteria, the association relationship field will be added to rsql based on whether the field metadata is stored, and non stored fields will be added to queryData. |
| `AddressWidget`       | string | Set to use the new address component for next<br>Old version: Use models such as ResourceCountry, ResourceProvince, and ResourceCity for address queries and backfilling. <br>New version: Use the ResourceRegion model for address queries and backfilling.                                                                                                                                                                                          |


**Usage Example**

``` typescript
runtimeConfigResolve({
  experimental: {
    buildQueryCondition: 'next',
    AddressWidget: 'next'
  }
});
```

### 8. Debug Configuration (DebugConfig)

| **Parameter Name** | **Type** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `enabled`           | boolean | - | Whether to enable debug mode |


**Usage Example**

``` typescript
runtimeConfigResolve({
  debug: {
    enabled: true
  }
});
```

## (Ⅲ) OioProviderProps

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `http` | `OioHttpConfig` | - | HTTP configuration |
| `router` | `RouterPath[]` | - | Routing configuration |
| `appSwitcher` | `{ logo?: string; appSideLogo?: string; }` | - | Application logo configuration |
| `copyrightStatus` | `boolean` | - | Copyright status |
| `loginTheme` | `OioLoginThemeConfig` | - | Login theme configuration |
| `sideBarTheme` | `SideBarThemeConfig` | - | Sidebar menu theme configuration |
| `multiTabTheme` | `MultiTabsConfig` | - | Multi-tab theme configuration |
| `browser` | `OioProviderBrowserProps` | - | Browser configuration |
| `install` | `((app) => void) \| ((app) => Promise<void>)` | - | Triggered before the app is mounted, can be used to register global components |
| `theme` | `ThemeName[]` | - | Global theme configuration |
| `dependencies` | `PluginLoadDependencies` | - | Low-code/no-code integrated dependency configuration |
| `encryptionUrlParams` | `boolean` | - | Whether to encrypt URL parameters |
| `enableRuntimeConfig` | `boolean` | `true` | Whether to enable runtime configuration |
| `enableI18n` | `boolean` | `true` | Whether to enable internationalization |
| `enableScrollToErrorField` | `boolean` | `true` | When the form is submitted, fields with validation errors will automatically scroll into view (enabled by default) |
| `extend` | `ExtendSettingType` | `false` | Single-item translation, toolbox switch configuration (disabled by default) |


### 1. HTTP Configuration (OioHttpConfig)

| **Parameter** | **Type** | **Default Value** | **Description** |
| --- | --- | --- | --- |
| `encodeRsql` | boolean | false | Whether to enable RSQL encrypted transmission |
| `enableTranslate` | boolean | true | Whether to enable translation |
| `interceptor` | Partial\<InterceptorOptions> | - | Built-in interceptor configuration |
| `middleware` | NetworkMiddlewareHandler \| NetworkMiddlewareHandler[] | - | HttpClient middleware configuration (executed before built-in interceptors) |


**InterceptorOptions**

| **Parameter** | **Type** | **Default Value** | **Description** |
| --- | --- | --- | --- |
| translate | NetworkInterceptor | TranslateInterceptor | Translation interceptor |
| networkError | NetworkInterceptor | NetworkErrorInterceptor | Network error interceptor (error) |
| requestSuccess | NetworkInterceptor | RequestSuccessInterceptor | Request success interceptor (success) |
| actionRedirect | NetworkInterceptor | ActionRedirectInterceptor | Redirect interceptor (success) |
| loginRedirect | NetworkInterceptor | LoginRedirectInterceptor | Login redirect interceptor (error) |
| requestError | NetworkInterceptor | RequestErrorInterceptor | Request error interceptor (error) |
| beforeInterceptors | NetworkInterceptor \| NetworkInterceptor[] | - | Pre-interceptors |
| afterInterceptors | NetworkInterceptor \| NetworkInterceptor[] | - | Post-interceptors |


### 2. Login Theme Configuration (OioLoginThemeConfig)

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `name` | OioLoginThemeName | - | Built-in login theme name |
| `backgroundImage` | string | - | Background image URL |
| `backgroundColor` | string | - | Background color |
| `logo` | string | - | Logo URL |
| `logoPosition` | OioLoginLogoPosition | - | Login page logo display position |


**OioLoginThemeName**

| **Member** | **Value** | **Description** |
| :--- | :--- | :--- |
| `LEFT_STICK` | `'LEFT_STICK'` | Large background, login form on the left |
| `RIGHT_STICK` | `'RIGHT_STICK'` | Large background, login form on the right |
| `CENTER_STICK` | `'CENTER_STICK'` | Large background, login form in the center |
| `CENTER_STICK_LOGO` | `'CENTER_STICK_LOGO'` | Large background, login form in the center, logo inside login form |
| `STAND_LEFT` | `'STAND_LEFT'` | Login form on the left |
| `STAND_RIGHT` | `'STAND_RIGHT'` | Login form on the right |


**OioLoginLogoPosition**

| **Member** | **Value** | **Description** |
| :--- | :--- | :--- |
| `LEFT` | `'LEFT'` | Left |
| `RIGHT` | `'RIGHT'` | Right |
| `CENTER` | `'CENTER'` | Center |


### 3. Sidebar Menu Theme Configuration (SideBarThemeConfig)

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `mode` | `SideBarThemeColor` | - | Sidebar theme color mode |
| `theme` | `SideBarTheme` | - | Sidebar theme type |


**SideBarThemeColor**

| **Member** | **Value** | **Description** |
| :--- | :--- | :--- |
| `default` | `'default'` | Default color |
| `dark` | `'dark'` | Dark color |


**SideBarTheme**

| **Member** | **Value** | **Description** |
| :--- | :--- | :--- |
| `side1` | `'theme1'` | Sidebar theme 1 |
| `side2` | `'theme2'` | Sidebar theme 2 |
| `side3` | `'theme3'` | Sidebar theme 3 |
| `side4` | `'theme4'` | Sidebar theme 4 |
| `side5` | `'theme5'` | Sidebar theme 5 |
| `side6` | `'theme6'` | Sidebar theme 6 |


### 4. Multi-Tab Configuration (MultiTabsConfig)

Same as `RuntimeConfg#multiTabs` configuration.

### 5. Browser Configuration (OioProviderBrowserProps)

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `favicon` | `string` | - | Browser tab icon |
| `title` | `string` | - | Default browser title (only for non-home pages) |


### 6. Extension Configuration (ExtendSettingType)

**Description**: Extension settings type, including system style configuration and translation settings

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `systemStyleConfig` | `SystemStyleConfig` | - | System style configuration |
| `translationManage` | `boolean` | - | Single-item translation switch |
| `toolboxTranslation` | `boolean` | - | Toolbox switch |
| `resourceTranslations` | `{ moduleName: string; remoteUrl: string; [key: string]: unknown; }[]` | - | Translation list |


**SystemStyleConfig**

| **Parameter** | **Type** | **Default Value** | **Description** |
| :--- | :--- | :--- | :--- |
| `sideBarConfig` | `SideBarThemeConfig` | - | Sidebar theme configuration |
| `multiTabConfig` | `MultiTabsConfig` | - | Multi-tab configuration |

The translation maintains the original table structure, technical terms, and formatting while ensuring clarity and adherence to internet domain terminology.