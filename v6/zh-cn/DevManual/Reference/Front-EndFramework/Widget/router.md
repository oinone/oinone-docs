---
title: Router
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Widget
order: 11
prev:
  text: Gallery Field
  link: /zh-cn/DevManual/Reference/Front-EndFramework/Widget/Field/gallery-field.md
next:
  text: Vue UI Antd
  link: /zh-cn/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI-antd.md
---
路由组件是 Oinone 路由中的核心组件，与其他组件一样，都是通过 SPI 注册组件的方式实现的，下面将对这一类路由组件的注册以及内置路由组件进行介绍。

更多关于 路由 的内容请参考：[Router Service](/zh-cn/DevManual/Reference/Front-EndFramework/Services/router-service.md)

# 一、路由组件的注册

## （一）路由组件的注册可选项

```typescript
/**
 * Router组件注册可选项
 */
export interface BaseRouterOptions extends SPIOptions {
  /**
   * 指定组件名称或别称
   */
  widget?: string | string[];
}
```

从上述类型声明中不难发现，路由组件的注册仅包含一个属性：`widget` 。由于路由组件本身没有其他上下文信息，因此不能像 `字段` 或 `动作` 组件那样具备 `位置描述` 的一些上下文信息，这一点在自定义路由小节中就可以看出。

## （二）注册组件

与其他类型组件一样，路由组件也是通过 SPI 完成注册的。以 `LoginWidget` 组件为例：

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Login'
  })
)
export class LoginWidget extends BaseI18nRouterWidget
```

# 二、Reference List

## （一）抽象基类

### 1、RouterWidget

**继承**：BaseRouterWidget

### 2、BaseI18nRouterWidget

**继承**：RouterWidget

**属性**：

+ moduleName：模块名称。（`string`）
+ isoStorageKey：ISO 存储键。（`string`）
+ translateBrowserTitle：是否翻译浏览器标题。（`boolean`）

## （二）路由组件

### 1、LoginPageWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Login'
  })
)
export class LoginWidget extends BaseI18nRouterWidget
```

**属性**：

+ accountLoginLabel：账号登录标签。（`string`）
+ accountPlaceholder：账号输入框占位文本。（`string`）
+ authForm：登录表单数据，包含登录相关字段。（`Record<string, string>`）
+ buttonContent：验证码按钮文本。（`string`）
+ canClick：验证码按钮是否可点击。（`boolean`）
+ codeLogin：是否启用验证码登录模式。（`boolean`）
+ codeLoginLabel：验证码登录标签。（`string`）
+ codePlaceholder：验证码输入框占位文本。（`string`）
+ copyrightYear：版权年份，自动获取当前年份。（`string`）
+ countryList：国家 / 地区电话区号列表。（`any[]`）
+ currentLoginTheme：当前登录主题。（`any`）
+ currentLanguage：当前选择的语言对象。（`RuntimeLanguage`）
+ email：是否启用邮箱登录模式。（`boolean`）
+ emailCodePlaceholder：邮箱验证码输入框占位文本。（`string`）
+ emailLoginLabel：邮箱登录标签。（`string`）
+ emailPlaceholder：邮箱输入框占位文本。（`string`）
+ enableI18n：是否启用国际化配置。（`boolean | undefined`）
+ error：登录错误信息对象，包含各字段错误信息。（`LoginData`）
+ errorMessages：登录错误信息配置，包含默认错误文案。（`any`）
+ forgetPassword：是否显示忘记密码选项。（`boolean`）
+ forgetPasswordLabel：忘记密码标签。（`string`）
+ graphCode：图形验证码路径。（`string`）
+ languages：支持的语言列表。（`RuntimeLanguage[]`）
+ loginLabel：登录按钮标签。（`string`）
+ loginMode：当前登录模式（账号 / 验证码 / 邮箱）。（`LoginMode`）
+ loginModeTitle：当前登录模式的显示标题。（`string`）
+ moduleName：模块名称，标识为用户模块。（`string`）
+ passwordPlaceholder：密码输入框占位文本。（`string`）
+ phonePlaceholder：手机输入框占位文本。（`string`）
+ register：是否显示注册选项。（`string`）
+ registerLabel：注册标签。（`string`）
+ selectCountry：选择的国家 / 地区电话区号，默认`+86`。（`string`）
+ systemMajorConfig：系统主要配置信息。（`MajorConfig`）
+ validation：表单验证状态，包含状态和消息。（`Record<string, string>`）
+ year：当前年份，自动获取。（`string`）
+ isAccount：是否为账号登录模式。（`boolean`）
+ isCode：是否为验证码登录模式。（`boolean`）
+ isEmail：是否为邮箱登录模式。（`boolean`）

**方法**：

#### afterClick

+ **功能描述**：处理登录接口调用后的逻辑，可修改后端返回的错误文案，只有返回 true 才会执行默认跳转事件。
+ **类型**：`(result?: any) => Promise<any | null | undefined>`
+ **参数**：
  - `result`：后端接口返回的数据，包含错误字段、错误信息等。
+ **返回值**：若返回 true 则执行默认跳转，否则终止后续操作。

#### beforeClick

+ **功能描述**：处理点击「登录」前的事件，可进行二次确认或其他逻辑，只有返回 true 才会继续执行登录流程。
+ **类型**：`() => Promise<Boolean | null | undefined>`
+ **返回值**：布尔值，决定是否继续执行登录。

#### beforeMount

+ **功能描述**：在组件挂载前初始化国际化配置，加载语言列表并设置当前语言。
+ **类型**：`async () => void`

#### clearErrorMessage

+ **功能描述**：清除所有登录错误信息。
+ **类型**：`() => void`

#### countDown

+ **功能描述**：验证码发送倒计时逻辑，60 秒后重置按钮状态。
+ **类型**：`() => void`

#### getCode

+ **功能描述**：根据当前登录模式发送相应的验证码（手机或邮箱）。
+ **类型**：`async () => void`

#### getCurrentLanguage

+ **功能描述**：获取本地存储的当前语言代码，默认返回系统默认语言。
+ **类型**：`async () => string`
+ **返回值**：当前语言代码。

#### getCurrentLanguageIsoCode

+ **功能描述**：获取本地存储的当前语言 ISO 代码。
+ **类型**：`async () => string | null`
+ **返回值**：当前语言 ISO 代码。

#### getEmailCode

+ **功能描述**：发送邮箱验证码，验证邮箱有效性并处理错误。
+ **类型**：`async () => boolean`
+ **返回值**：布尔值，标识验证码发送是否成功。

#### getLoginConfig

+ **功能描述**：获取登录配置信息，从运行时配置中解析登录相关参数。
+ **类型**：`() => LoginConfig`
+ **返回值**：登录配置对象，包含登录模式、标签等配置。

#### getPhoneCode

+ **功能描述**：发送手机验证码，验证手机号有效性并处理错误。
+ **类型**：`async () => boolean`
+ **返回值**：布尔值，标识验证码发送是否成功。

#### getPicCode

+ **功能描述**：获取图形验证码，可自定义错误信息提示。
+ **类型**：`async (message?: string) => void`
+ **参数**：
  - `message`：图形验证码错误信息提示文本。

#### handleCountryChange

+ **功能描述**：处理国家 / 地区电话区号选择变化，更新当前选择的区号。
+ **类型**：`(val: string) => void`
+ **参数**：
  - `val`：选择的国家 / 地区电话区号（如`+86`）。

#### handleRegister

+ **功能描述**：处理注册事件，默认输出错误提示，需在子类中重写以实现注册功能。
+ **类型**：`() => void`

#### initCurrentLanguage

+ **功能描述**：初始化当前语言设置，更新窗口语言标识并设置当前语言对象。
+ **类型**：`(code: string) => void`
+ **参数**：
  - `code`：语言代码（如`zh-CN`）。

#### initLanguages

+ **功能描述**：初始化支持的语言列表，从后端查询并处理语言数据。
+ **类型**：`async () => Promise<void>`

#### login

+ **功能描述**：执行登录操作，根据当前登录模式（账号 / 验证码 / 邮箱）提交对应表单数据，并处理登录结果。
+ **类型**：`async () => void`

#### onLanguageChange

+ **功能描述**：处理语言切换事件，更新当前语言并刷新页面。
+ **类型**：`(value: RuntimeLanguage) => void`
+ **参数**：
  - `value`：选择的语言对象。

#### onResetPicCode

+ **功能描述**：当登录表单的登录字段变化时，重置图形验证码。
+ **类型**：`async () => void`

#### picCode

+ **功能描述**：获取图形验证码路径，根据当前登录模式拼接请求参数。
+ **类型**：`async () => string`
+ **返回值**：图形验证码的完整 URL 路径。

#### queryCountryList

+ **功能描述**：查询国家 / 地区电话区号列表，用于验证码登录模式下的国家选择。
+ **类型**：`async () => any[]`
+ **返回值**：国家 / 地区列表，包含 ID、名称、电话区号等信息。

#### queryLanguageList

+ **功能描述**：查询支持的语言列表，用于登录页面的语言切换功能。
+ **类型**：`async () => RuntimeLanguage[]`
+ **返回值**：语言列表，包含语言 ID、名称、代码等信息。

#### queryLanguageSetting

+ **功能描述**：查询指定语言的配置信息。
+ **类型**：`async (langCode: string) => any`
+ **参数**：
  - `langCode`：语言代码（如`zh-CN`）。
+ **返回值**：语言配置信息。

#### searchMethod

+ **功能描述**：搜索方法，用于筛选国家 / 地区列表，匹配搜索关键词。
+ **类型**：`(keyword: string, option: any) => boolean`
+ **参数**：
  - `keyword`：搜索关键词。
  - `option`：选项对象，包含国家 / 地区信息。
+ **返回值**：布尔值，标识是否匹配搜索条件。

#### setCurrentLanguage

+ **功能描述**：设置当前语言并存储到本地缓存，触发页面语言更新。
+ **类型**：`async (language: RuntimeLanguage) => void`
+ **参数**：
  - `language`：语言对象，包含代码和 ISO 代码。

#### setLoginMode

+ **功能描述**：设置登录模式，清除错误信息和图形验证码。
+ **类型**：`(mode: LoginMode) => void`
+ **参数**：
  - `mode`：登录模式（`LoginMode.ACCOUNT`/`CODE`/`EMAIL`）。

#### executeResult

+ **功能描述**：处理登录接口返回结果，包括错误处理、页面跳转和首次登录密码修改逻辑。
+ **类型**：`async (result: any, isByLogin?: boolean) => void`
+ **参数**：
  - `result`：登录接口返回结果，包含错误字段、错误信息等。
  - `isByLogin`：标识是否通过登录接口调用（默认`false`）。

#### gotoForget

+ **功能描述**：跳转到忘记密码页面。
+ **类型**：`() => void`

#### getUserMutation

+ **功能描述**：执行用户相关的 mutation 操作，构造请求参数并处理返回结果。
+ **类型**：`async (mutation: string, data: any) => any`
+ **参数**：
  - `mutation`：mutation 操作名称。
  - `data`：请求参数对象。
+ **返回值**：mutation 操作的执行结果。

#### watchError

+ **功能描述**：监听登录相关错误信息，当收到特定错误码时重新获取图形验证码。
+ **类型**：`() => void`

#### watchSwitch

+ **功能描述**：监听登录模式切换事件，当切换到验证码模式且国家列表为空时，加载国家 / 地区列表。
+ **类型**：`async (mode: LoginMode) => void`
+ **参数**：
  - `mode`：新的登录模式。

### 2、ForgetPasswordWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'ForgetPassword'
  })
)
export class ForgetPasswordWidget extends BaseI18nRouterWidget
```

**属性**：

+ formData：重置密码表单数据，包含手机号、验证码等字段。（`ResetPasswordData`）
+ majorConfig：系统主要配置信息。（`MajorConfig | undefined`）
+ countryList：国家 / 地区电话区号列表，用于手机号选择。（`SelectItem<ResourceCountry>[]`）
+ selectedCountry：当前选择的国家 / 地区。（`SelectItem<ResourceCountry> | undefined`）
+ copyrightYear：版权年份，自动获取当前年份。（`string`）
+ verificationRules：表单验证规则，定义各字段的验证逻辑。（`Record<string, FormItemRule[]>`）

**方法**：

#### getFormInstance

+ **功能描述**：获取表单实例。
+ **类型**：`() => OioFormInstance | undefined`
+ **返回值**：表单实例对象或 undefined。

#### setFormInstance

+ **功能描述**：设置表单实例。
+ **类型**：`(formInstance: OioFormInstance | undefined) => void`
+ **参数**：
  - `formInstance`：表单实例对象或 undefined。

#### validateNewPassword

+ **功能描述**：验证新密码字段，确保输入不为空。
+ **类型**：`(rule: FormItemRule, value: string) => Promise<void | never>`
+ **参数**：
  - `rule`：验证规则对象。
  - `value`：输入的新密码值。
+ **返回值**：验证成功返回 resolved Promise，失败返回 rejected Promise 并携带错误信息。

#### validateConfirmPassword

+ **功能描述**：验证确认密码字段，确保与新密码一致且不为空。
+ **类型**：`(role: FormItemRule, value: string) => Promise<void | never>`
+ **参数**：
  - `rule`：验证规则对象。
  - `value`：输入的确认密码值。
+ **返回值**：验证成功返回 resolved Promise，失败返回 rejected Promise 并携带错误信息。

#### onSelectCountry

+ **功能描述**：处理国家 / 地区选择变化，更新当前选择的国家 / 地区。
+ **类型**：`(selected: SelectItem<ResourceCountry> | undefined) => void`
+ **参数**：
  - `selected`：选择的国家 / 地区对象或 undefined。

#### gotoLogin

+ **功能描述**：跳转到登录页面。
+ **类型**：`() => void`

#### fetchVerificationCode

+ **功能描述**：发送重置密码验证码到指定手机号。
+ **类型**：`async () => boolean`
+ **返回值**：布尔值，标识验证码是否发送成功。

#### refreshPicCodeImage

+ **功能描述**：刷新图形验证码图片。
+ **类型**：`async () => void`

#### getPicCode

+ **功能描述**：获取图形验证码 URL，包含时间戳和手机号参数。
+ **类型**：`() => string`
+ **返回值**：图形验证码的完整 URL 路径。

#### onOk

+ **功能描述**：执行重置密码操作，验证表单数据并提交请求，成功后跳转登录页。
+ **类型**：`async () => void`

#### executeResetPasswordByPhone

+ **功能描述**：通过手机号执行重置密码操作。
+ **类型**：`async (phone: string, verificationCode: string, password: string, confirmPassword: string) => boolean`
+ **参数**：
  - `phone`：手机号。
  - `verificationCode`：验证码。
  - `password`：新密码。
  - `confirmPassword`：确认密码。
+ **返回值**：布尔值，标识密码重置是否成功。

#### initMajorConfig

+ **功能描述**：初始化系统主要配置信息。
+ **类型**：`async () => void`

#### initCountryList

+ **功能描述**：初始化国家 / 地区电话区号列表，并设置默认选择项。
+ **类型**：`async () => void`

### 3、FirstResetPasswordWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'FirstResetPassword'
  })
)
export class FirstResetPasswordWidget extends ForgetPasswordWidget
```

**属性**：

+ verificationRules：表单验证规则，定义新密码和确认密码的验证逻辑。（继承并重写父类属性）（`Record<string, FormItemRule[]>`）

**方法**：

#### onOk

+ **功能描述**：执行首次重置密码操作，验证表单数据并提交请求，成功后跳转首页。
+ **类型**：`async () => void`

#### executeResetPasswordByFirst

+ **功能描述**：执行首次登录重置密码操作，处理返回结果并跳转相应页面。
+ **类型**：`async (password: string, confirmPassword: string) => boolean`
+ **参数**：
  - `password`：新密码。
  - `confirmPassword`：确认密码。
+ **返回值**：布尔值，标识密码重置是否成功。

## （三）功能组件

### 1、SharedMainViewWidget

**类型声明**：

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Shared'
  })
)
export class SharedMainViewWidget extends RouterWidget
```

**属性**：

+ metadataViewWidget：元数据视图组件实例。（`MetadataViewWidget | undefined`）
+ runtimeContext：运行时上下文。（`RuntimeContext | undefined`）
+ reloadMainViewCallChaining：用于刷新主视图的链式调用对象。（`CallChaining<void>`）
+ loading：页面加载状态标识。（`boolean`）
+ metadataHandle：元数据视图组件的句柄。（`string | undefined`）

**方法**：

#### createMetadataViewWidget

+ **功能描述**：创建元数据视图组件实例。
+ **类型**：`() => MetadataViewWidget`
+ **返回值**：元数据视图组件实例。

#### reloadPage

+ **功能描述**：根据分享码重新加载分享页面数据。
+ **类型**：`async (sharedCode: string) => void`
+ **参数**：
  - `sharedCode`：分享码。

#### fetchSharedRuntimeViewAction

+ **功能描述**：获取分享页面的运行时视图动作及参数。
+ **类型**：`async (sharedCode: string) => { action: SharedRuntimeViewAction; page: ViewActionQueryParameter } | undefined`
+ **参数**：
  - `sharedCode`：分享码。
+ **返回值**：包含视图动作和页面参数的对象，或`undefined`。

#### beforeRender

+ **功能描述**：渲染前准备工作，设置页面语言、标题和样式类。
+ **类型**：`(action: SharedRuntimeViewAction) => void`
+ **参数**：
  - `action`：分享运行时视图动作对象。

#### initView

+ **功能描述**：初始化视图上下文，基于运行时视图动作配置元数据视图。
+ **类型**：`(action: SharedRuntimeViewAction) => void`
+ **参数**：
  - `action`：分享运行时视图动作对象。

#### renderMainView

+ **功能描述**：渲染主视图内容，触发主视图刷新链式调用。
+ **类型**：`(page: ViewActionQueryParameter) => Promise<void>`
+ **参数**：
  - `page`：视图动作查询参数对象。
+ **返回值**：Promise 对象，resolve 时完成视图渲染。

### 2、DebugMainViewWidget

**类型声明**：

```typescript
@SPI.ClassFactory(RouterWidget.Token({ widget: DEBUG_VIEW_WIDGET }))
export class DebugMainViewWidget extends RouterWidget
```

**属性**：

+ activeDebugTab：当前激活的调试标签页，默认值为`'debugView'`。（`string`）

**方法**：

#### changeActiveDebugTab

+ **功能描述**：切换激活的调试标签页。
+ **类型**：`(activeDebugTab: string) => void`
+ **参数**：
  - `activeDebugTab`：要激活的标签页名称。

#### responseAnalysis

+ **功能描述**：处理调试响应数据，调用子组件进行响应分析并更新存储。
+ **类型**：`async (responseBody: DebugResponseData | DebugResponseData[]) => void`
+ **参数**：
  - `responseBody`：调试响应数据（单个或数组）。



