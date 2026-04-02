---
title: Router
index: true
category:
  - Development Manual
  - Reference
  - Frontend API
  - Widget
order: 11
prev:
  text: Gallery Field
  link: /v6/en/DevManual/Reference/Front-EndFramework/Widget/Field/gallery-field.md
next:
  text: Vue UI Antd
  link: /v6/en/DevManual/Reference/Front-EndFramework/OioComponents/vue-UI-antd.md
---
The Router component is the core component in Oinone's routing system. Like other components, it is implemented through the SPI (Service Provider Interface) component registration mechanism. This document will introduce the registration of such router components and the built-in router components.

For more information about routing, please refer to: [Router Service](/en/DevManual/Reference/Front-EndFramework/Services/router-service.md)

# I. Registration of Router Components

## (1) Optional Configuration for Router Component Registration

```typescript
/**
 * Optional configurations for Router component registration
 */
export interface BaseRouterOptions extends SPIOptions {
  /**
   * Specify the component name or aliases
   */
  widget?: string | string[];
}
```

From the above type declaration, it is easy to see that the registration of a router component only includes one property: `widget`. Since router components do not have other contextual information, they cannot have contextual information such as "position description" like `field` or `action` components, which can be seen in the section on custom routing.

## (2) Registering Components

Like other types of components, router components are registered through SPI. Taking the `LoginWidget` component as an example:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Login'
  })
)
export class LoginWidget extends BaseI18nRouterWidget
```

# II. Reference List

## (1) Abstract Base Classes

### 1. RouterWidget

**Inheritance**: BaseRouterWidget

### 2. BaseI18nRouterWidget

**Inheritance**: RouterWidget

**Properties**:

+ moduleName: Module name. (`string`)
+ isoStorageKey: ISO storage key. (`string`)
+ translateBrowserTitle: Whether to translate the browser title. (`boolean`)

## (2) Router Components

### 1. LoginPageWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Login'
  })
)
export class LoginWidget extends BaseI18nRouterWidget
```

**Properties**:

+ accountLoginLabel: Label for account login. (`string`)
+ accountPlaceholder: Placeholder text for the account input box. (`string`)
+ authForm: Login form data, including login-related fields. (`Record<string, string>`)
+ buttonContent: Text for the verification code button. (`string`)
+ canClick: Whether the verification code button is clickable. (`boolean`)
+ codeLogin: Whether to enable verification code login mode. (`boolean`)
+ codeLoginLabel: Label for verification code login. (`string`)
+ codePlaceholder: Placeholder text for the verification code input box. (`string`)
+ copyrightYear: Copyright year, automatically gets the current year. (`string`)
+ countryList: List of country/region phone codes. (`any[]`)
+ currentLoginTheme: Current login theme. (`any`)
+ currentLanguage: Currently selected language object. (`RuntimeLanguage`)
+ email: Whether to enable email login mode. (`boolean`)
+ emailCodePlaceholder: Placeholder text for the email verification code input box. (`string`)
+ emailLoginLabel: Label for email login. (`string`)
+ emailPlaceholder: Placeholder text for the email input box. (`string`)
+ enableI18n: Whether to enable internationalization configuration. (`boolean | undefined`)
+ error: Login error information object, including error fields and error messages. (`LoginData`)
+ errorMessages: Login error message configuration, including default error texts. (`any`)
+ forgetPassword: Whether to display the forgot password option. (`boolean`)
+ forgetPasswordLabel: Label for forgot password. (`string`)
+ graphCode: Path to the graphic verification code. (`string`)
+ languages: List of supported languages. (`RuntimeLanguage[]`)
+ loginLabel: Label for the login button. (`string`)
+ loginMode: Current login mode (account / verification code / email). (`LoginMode`)
+ loginModeTitle: Display title for the current login mode. (`string`)
+ moduleName: Module name, identified as the user module. (`string`)
+ passwordPlaceholder: Placeholder text for the password input box. (`string`)
+ phonePlaceholder: Placeholder text for the phone number input box. (`string`)
+ register: Whether to display the registration option. (`string`)
+ registerLabel: Label for registration. (`string`)
+ selectCountry: Selected country/region phone code, default `+86`. (`string`)
+ systemMajorConfig: System main configuration information. (`MajorConfig`)
+ validation: Form validation status, including status and messages. (`Record<string, string>`)
+ year: Current year, automatically obtained. (`string`)
+ isAccount: Whether it is account login mode. (`boolean`)
+ isCode: Whether it is verification code login mode. (`boolean`)
+ isEmail: Whether it is email login mode. (`boolean`)

**Methods**:

#### afterClick

+ **Description**: Handles logic after calling the login interface, can modify error texts returned by the backend. Only when returning true will the default jump event be executed.
+ **Type**: `(result?: any) => Promise<any | null | undefined>`
+ **Parameters**:
  - `result`: Data returned by the backend interface, including error fields, error messages, etc.
+ **Return Value**: If true is returned, the default jump is executed; otherwise, subsequent operations are terminated.

#### beforeClick

+ **Description**: Handles events before clicking "Login", can perform secondary confirmation or other logic. Only when returning true will the login process continue.
+ **Type**: `() => Promise<Boolean | null | undefined>`
+ **Return Value**: Boolean value, determining whether to continue the login process.

#### beforeMount

+ **Description**: Initializes internationalization configuration before component mounting, loads the language list, and sets the current language.
+ **Type**: `async () => void`

#### clearErrorMessage

+ **Description**: Clears all login error messages.
+ **Type**: `() => void`

#### countDown

+ **Description**: Countdown logic for verification code sending, resets the button status after 60 seconds.
+ **Type**: `() => void`

#### getCode

+ **Description**: Sends the corresponding verification code (phone or email) according to the current login mode.
+ **Type**: `async () => void`

#### getCurrentLanguage

+ **Description**: Gets the currently stored language code, returns the system default language by default.
+ **Type**: `async () => string`
+ **Return Value**: Current language code.

#### getCurrentLanguageIsoCode

+ **Description**: Gets the currently stored ISO code of the language.
+ **Type**: `async () => string | null`
+ **Return Value**: Current language ISO code.

#### getEmailCode

+ **Description**: Sends the email verification code, verifies the validity of the email, and handles errors.
+ **Type**: `async () => boolean`
+ **Return Value**: Boolean value indicating whether the verification code was sent successfully.

#### getLoginConfig

+ **Description**: Gets login configuration information, parses login-related parameters from the runtime configuration.
+ **Type**: `() => LoginConfig`
+ **Return Value**: Login configuration object, including login mode, labels, and other configurations.

#### getPhoneCode

+ **Description**: Sends the phone verification code, verifies the validity of the phone number, and handles errors.
+ **Type**: `async () => boolean`
+ **Return Value**: Boolean value indicating whether the verification code was sent successfully.

#### getPicCode

+ **Description**: Gets the graphic verification code, can customize error message prompts.
+ **Type**: `async (message?: string) => void`
+ **Parameters**:
  - `message`: Prompt text for graphic verification code errors.

#### handleCountryChange

+ **Description**: Handles changes in country/region phone code selection, updates the currently selected code.
+ **Type**: `(val: string) => void`
+ **Parameters**:
  - `val`: Selected country/region phone code (e.g., `+86`).

#### handleRegister

+ **Description**: Handles registration events, outputs error prompts by default, needs to be overridden in subclasses to implement registration functions.
+ **Type**: `() => void`

#### initCurrentLanguage

+ **Description**: Initializes the current language setting, updates the window language identifier, and sets the current language object.
+ **Type**: `(code: string) => void`
+ **Parameters**:
  - `code`: Language code (e.g., `zh-CN`).

#### initLanguages

+ **Description**: Initializes the list of supported languages, queries and processes language data from the backend.
+ **Type**: `async () => Promise<void>`

#### login

+ **Description**: Executes the login operation, submits corresponding form data according to the current login mode (account / verification code / email), and handles the login result.
+ **Type**: `async () => void`

#### onLanguageChange

+ **Description**: Handles language switching events, updates the current language, and refreshes the page.
+ **Type**: `(value: RuntimeLanguage) => void`
+ **Parameters**:
  - `value`: Selected language object.

#### onResetPicCode

+ **Description**: Resets the graphic verification code when the login field of the login form changes.
+ **Type**: `async () => void`

#### picCode

+ **Description**: Gets the path to the graphic verification code, splices request parameters according to the current login mode.
+ **Type**: `async () => string`
+ **Return Value**: Complete URL path of the graphic verification code.

#### queryCountryList

+ **Description**: Queries the list of country/region phone codes, used for country selection in verification code login mode.
+ **Type**: `async () => any[]`
+ **Return Value**: List of countries/regions, including ID, name, phone code, etc.

#### queryLanguageList

+ **Description**: Queries the list of supported languages, used for the language switching function on the login page.
+ **Type**: `async () => RuntimeLanguage[]`
+ **Return Value**: List of languages, including language ID, name, code, etc.

#### queryLanguageSetting

+ **Description**: Queries configuration information for a specified language.
+ **Type**: `async (langCode: string) => any`
+ **Parameters**:
  - `langCode`: Language code (e.g., `zh-CN`).
+ **Return Value**: Language configuration information.

#### searchMethod

+ **Description**: Search method, used to filter the country/region list to match search keywords.
+ **Type**: `(keyword: string, option: any) => boolean`
+ **Parameters**:
  - `keyword`: Search keyword.
  - `option`: Option object containing country/region information.
+ **Return Value**: Boolean value indicating whether the search condition is matched.

#### setCurrentLanguage

+ **Description**: Sets the current language and stores it in local cache, triggering page language update.
+ **Type**: `async (language: RuntimeLanguage) => void`
+ **Parameters**:
  - `language`: Language object, including code and ISO code.

#### setLoginMode

+ **Description**: Sets the login mode, clears error messages and graphic verification code.
+ **Type**: `(mode: LoginMode) => void`
+ **Parameters**:
  - `mode`: New login mode (`LoginMode.ACCOUNT`/`CODE`/`EMAIL`).

#### executeResult

+ **Description**: Processes the login interface return result, including error handling, page jump, and first login password modification logic.
+ **Type**: `async (result: any, isByLogin?: boolean) => void`
+ **Parameters**:
  - `result`: Login interface return result, including error fields, error messages, etc.
  - `isByLogin`: Identifies whether it is called through the login interface (default `false`).

#### gotoForget

+ **Description**: Jumps to the forgot password page.
+ **Type**: `() => void`

#### getUserMutation

+ **Description**: Executes user-related mutation operations, constructs request parameters, and processes the return result.
+ **Type**: `async (mutation: string, data: any) => any`
+ **Parameters**:
  - `mutation`: Mutation operation name.
  - `data`: Request parameter object.
+ **Return Value**: Execution result of the mutation operation.

#### watchError

+ **Description**: Listens for login-related error messages, re-obtains the graphic verification code when receiving specific error codes.
+ **Type**: `() => void`

#### watchSwitch

+ **Description**: Listens for login mode switching events, loads the country/region list when switching to verification code mode and the country list is empty.
+ **Type**: `async (mode: LoginMode) => void`
+ **Parameters**:
  - `mode`: New login mode.

### 2. ForgetPasswordWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'ForgetPassword'
  })
)
export class ForgetPasswordWidget extends BaseI18nRouterWidget
```

**Properties**:

+ formData: Password reset form data, including phone number, verification code, etc. (`ResetPasswordData`)
+ majorConfig: System main configuration information. (`MajorConfig | undefined`)
+ countryList: List of country/region phone codes, used for phone number selection. (`SelectItem<ResourceCountry>[]`)
+ selectedCountry: Currently selected country/region. (`SelectItem<ResourceCountry> | undefined`)
+ copyrightYear: Copyright year, automatically gets the current year. (`string`)
+ verificationRules: Form validation rules, defining validation logic for each field. (`Record<string, FormItemRule[]>`)

**Methods**:

#### getFormInstance

+ **Description**: Gets the form instance.
+ **Type**: `() => OioFormInstance | undefined`
+ **Return Value**: Form instance object or undefined.

#### setFormInstance

+ **Description**: Sets the form instance.
+ **Type**: `(formInstance: OioFormInstance | undefined) => void`
+ **Parameters**:
  - `formInstance`: Form instance object or undefined.

#### validateNewPassword

+ **Description**: Validates the new password field to ensure the input is not empty.
+ **Type**: `(rule: FormItemRule, value: string) => Promise<void | never>`
+ **Parameters**:
  - `rule`: Validation rule object.
  - `value`: Input new password value.
+ **Return Value**: Returns a resolved Promise if validation is successful, a rejected Promise with an error message if failed.

#### validateConfirmPassword

+ **Description**: Validates the confirm password field to ensure it is consistent with the new password and not empty.
+ **Type**: `(role: FormItemRule, value: string) => Promise<void | never>`
+ **Parameters**:
  - `rule`: Validation rule object.
  - `value`: Input confirm password value.
+ **Return Value**: Returns a resolved Promise if validation is successful, a rejected Promise with an error message if failed.

#### onSelectCountry

+ **Description**: Handles changes in country/region selection, updates the currently selected country/region.
+ **Type**: `(selected: SelectItem<ResourceCountry> | undefined) => void`
+ **Parameters**:
  - `selected`: Selected country/region object or undefined.

#### gotoLogin

+ **Description**: Jumps to the login page.
+ **Type**: `() => void`

#### fetchVerificationCode

+ **Description**: Sends a password reset verification code to the specified phone number.
+ **Type**: `async () => boolean`
+ **Return Value**: Boolean value indicating whether the verification code was sent successfully.

#### refreshPicCodeImage

+ **Description**: Refreshes the graphic verification code image.
+ **Type**: `async () => void`

#### getPicCode

+ **Description**: Gets the graphic verification code URL, including timestamp and phone number parameters.
+ **Type**: `() => string`
+ **Return Value**: Complete URL path of the graphic verification code.

#### onOk

+ **Description**: Executes the password reset operation, validates form data, submits the request, and jumps to the login page upon success.
+ **Type**: `async () => void`

#### executeResetPasswordByPhone

+ **Description**: Executes the password reset operation via phone number.
+ **Type**: `async (phone: string, verificationCode: string, password: string, confirmPassword: string) => boolean`
+ **Parameters**:
  - `phone`: Phone number.
  - `verificationCode`: Verification code.
  - `password`: New password.
  - `confirmPassword`: Confirm password.
+ **Return Value**: Boolean value indicating whether the password reset was successful.

#### initMajorConfig

+ **Description**: Initializes system main configuration information.
+ **Type**: `async () => void`

#### initCountryList

+ **Description**: Initializes the country/region phone code list and sets the default selection.
+ **Type**: `async () => void`

### 3. FirstResetPasswordWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'FirstResetPassword'
  })
)
export class FirstResetPasswordWidget extends ForgetPasswordWidget
```

**Properties**:

+ verificationRules: Form validation rules that define the validation logic for new passwords and confirm passwords. (Inherits and overrides the parent class property) (`Record<string, FormItemRule[]>`)

**Methods**:

#### onOk

+ **Function Description**: Executes the first password reset operation, validates form data, submits the request, and redirects to the homepage upon success.
+ **Type**: `async () => void`

#### executeResetPasswordByFirst

+ **Function Description**: Executes the password reset operation for the first login, processes the returned result, and redirects to the corresponding page.
+ **Type**: `async (password: string, confirmPassword: string) => boolean`
+ **Parameters**:
  - `password`: New password.
  - `confirmPassword`: Confirm password.
+ **Return Value**: Boolean value indicating whether the password reset is successful.

## (3) Functional Components

### 1. SharedMainViewWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'Shared'
  })
)
export class SharedMainViewWidget extends RouterWidget
```

**Properties**:

+ metadataViewWidget: Instance of the metadata view component. (`MetadataViewWidget | undefined`)
+ runtimeContext: Runtime context. (`RuntimeContext | undefined`)
+ reloadMainViewCallChaining: Chain call object for refreshing the main view. (`CallChaining<void>`)
+ loading: Flag indicating the page loading status. (`boolean`)
+ metadataHandle: Handle of the metadata view component. (`string | undefined`)

**Methods**:

#### createMetadataViewWidget

+ **Function Description**: Creates an instance of the metadata view component.
+ **Type**: `() => MetadataViewWidget`
+ **Return Value**: Instance of the metadata view component.

#### reloadPage

+ **Function Description**: Reloads the shared page data based on the share code.
+ **Type**: `async (sharedCode: string) => void`
+ **Parameters**:
  - `sharedCode`: Share code.

#### fetchSharedRuntimeViewAction

+ **Function Description**: Retrieves the runtime view action and parameters of the shared page.
+ **Type**: `async (sharedCode: string) => { action: SharedRuntimeViewAction; page: ViewActionQueryParameter } | undefined`
+ **Parameters**:
  - `sharedCode`: Share code.
+ **Return Value**: An object containing the view action and page parameters, or `undefined`.

#### beforeRender

+ **Function Description**: Preparations before rendering, such as setting the page language, title, and style classes.
+ **Type**: `(action: SharedRuntimeViewAction) => void`
+ **Parameters**:
  - `action`: Shared runtime view action object.

#### initView

+ **Function Description**: Initializes the view context and configures the metadata view based on the runtime view action.
+ **Type**: `(action: SharedRuntimeViewAction) => void`
+ **Parameters**:
  - `action`: Shared runtime view action object.

#### renderMainView

+ **Function Description**: Renders the main view content and triggers the chain call for refreshing the main view.
+ **Type**: `(page: ViewActionQueryParameter) => Promise<void>`
+ **Parameters**:
  - `page`: View action query parameter object.
+ **Return Value**: A Promise object that resolves when the view rendering is completed.

### 2. DebugMainViewWidget

**Type Declaration**:

```typescript
@SPI.ClassFactory(RouterWidget.Token({ widget: DEBUG_VIEW_WIDGET }))
export class DebugMainViewWidget extends RouterWidget
```

**Properties**:

+ activeDebugTab: Currently active debug tab, with a default value of `'debugView'`. (`string`)

**Methods**:

#### changeActiveDebugTab

+ **Function Description**: Switches the active debug tab.
+ **Type**: `(activeDebugTab: string) => void`
+ **Parameters**:
  - `activeDebugTab`: Name of the tab to be activated.

#### responseAnalysis

+ **Function Description**: Processes the debug response data, calls sub-components for response analysis, and updates the storage.
+ **Type**: `async (responseBody: DebugResponseData | DebugResponseData[]) => void`
+ **Parameters**:
  - `responseBody`: Debug response data (single or array).