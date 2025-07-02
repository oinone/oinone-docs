---
title: Router Service
index: true
category:
  - DevManual
  - Reference
  - 前端API
  - Services
order: 3

---
In any web application, a routing system is an essential component. In Oinone Kunlun, in addition to the single-page application routing under the `/page` route implemented through the `navigation action (ViewAction)`, it also provides other independent routing pages such as the login page (`/login`) and the forgot password page (`/forget`).

# 1. Built-in Routes

Oinone has built-in some routing paths and routing components that support the basic functions of the system:

+ /login: Login page. (`LoginWidget`)
+ /forget: Forgot password page. (`ForgetPasswordWidget`)
+ /first: First login password reset page. (`FirstResetPasswordWidget`)
+ /debug: Debug page. (`DebugMainViewWidget`)
+ /shared: Sharing page. (`SharedMainViewWidget`)

## (1) Login Page

The login page is the entry page for users to enter login information when they are not logged in.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750413567564-781a0edc-2a3f-45b3-bcf3-98ee480791fb.png)

**Diagram of Redirecting to Login Page**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750470594174-e4acae91-1b69-46bd-9047-df85d9093b9a.jpeg)

## (2) Forgot Password Page

When a user forgets their password, they can reset it through some authentication methods. The built-in forgot password page of the system resets the password through mobile phone verification. Business systems can decide whether to allow self-service password reset and the related logic of password reset according to their own needs.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750470849372-548a6040-e0ec-4c40-9d0e-621db7312887.png)

**Runtime Related Configuration**

```typescript
runtimeConfigResolve({
  login: {
    forgetPassword: false, // Whether to display the "forgot password" button on the login page
    forgetPasswordLabel: "Forgot Password" // The text content of the "forgot password" button on the login page
  }
});
```

## (3) First Login Password Reset Page

When the business system requires users to modify their initial password when logging in for the first time, this function can be enabled through the `needModifyInitialPassword` attribute of the `sysSetting.SysSettings` model. In this way, new users will be redirected to the first login password reset page when they have not modified their initial password.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750474439836-5c2d5669-a96b-4255-be79-9fda384201a9.png)

**Diagram of Redirecting to First Login Password Reset Page**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750475079830-7461c110-dcfd-4e69-ba35-ce3aca62146a.jpeg)

# 2. Custom Routes

In addition to the built-in routes, Oinone can also configure other routes through `OioProviderProps#router`. For example:

```typescript
VueOioProvider({
  router: [
    {
      path: '/custom',
      widget: 'CustomRouter'
    }
  ]
});
```

In addition to the configuration, we also need to register the corresponding routing component:

```typescript
@SPI.ClassFactory(
  RouterWidget.Token({
    widget: 'CustomRouter'
  })
)
export class CustomRouterWidget extends RouterWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(CustomRouter);
    return this;
  }
}
```

The corresponding Template of the Vue component is:

```vue
<template>
  <div>hello world</div>
</template>
```

At this point, the custom route has been added. We can access the corresponding path through the browser to view the rendering effect:

```typescript
http://127.0.0.1:8080/custom
```

# 3. Common Usages

## (1) Get Current URL Parameters

```typescript
// Get URL parameters under any route
useMatched().matched.segmentParams

// Get URL parameters under the /page route
getMatchedUrl()
```

## (2) Get Routing Instance and Navigate

### 1. Basic Usage

```typescript
protected $router!: Router;

protected doSomething() {
  this.$router.push(...);
}

protected beforeMount() {
  this.$router = useRouter().router;
}
```

### 2. Append or Modify Specified Parameters for Navigation

```typescript
this.$router.push({
  segments: [
    {
      path: 'page',
      parameters: {
        ...
      }
    }
  ]
});
```

### 3. Navigate with Specified Parameters Cleared

```typescript
this.$router.push({
  segments: [
    {
      path: 'page',
      parameters: {
        id: null
      }
    }
  ]
});
```

### 4. Navigate with All Parameters Replaced

```typescript
this.$router.push({
  segments: [
    {
      path: 'page',
      extra: { preserveParameter: false },
      parameters: {
        ...
      }
    }
  ]
});
```

## (3) Subscribe to Route Changes

### 1. Basic Usage

```typescript
protected watchRouter: Subscription | undefined;

protected beforeMount() {
  this.watchRouter = subscribeRoute(...);
}

protected unmounted() {
  this.watchRouter?.unsubscribe();
}
```

### 2. Trigger on Any Change (Will Trigger Repeatedly if Parameters Are the Same)

```typescript
this.watchRouter = subscribeRoute((matched) => {
  // do something.
});
```

### 3. Parameter Deduplication (Will Not Trigger if Parameters Are the Same)

```typescript
this.watchRouter = subscribeRoute(
  (matched) => {
    // do something.
  },
  { distinct: true }
);
```

# 4. Reference List

## (1) useMatched

**Description**: A custom Hook for managing route matching status, used to track the currently matched route information and historical matching status, and provide status update and subscription functions.

**Properties**:

**prevMatched**

+ **Description**: The previous route matching object, used for status comparison and history recording.
+ **Type**: `Matched | null`

**matched**

+ **Description**: The current route matching object, which stores route parameters.
+ **Type**: `Matched`

**Methods**:

**getMatched$**

+ **Description**: An observable object of the route matching status, implemented using `BehaviorSubject`
+ **Type**: `() => BehaviorSubject<Matched>`
+ **Return Value**: An observable object for route change subscription.

## (2) useRouter

**Description**: Get the routing object in the current Vue instance, which can only be used inside Vue components.

**Properties**:

**router**

+ **Description**: Routing instance.
+ **Type**: `Router`

## (3) getRouterInstance

**Description**: Get the current routing instance, which can be called anywhere after initialization is completed.

**Return Value**: `Router`

## (4) Router

**Description**: Routing instance.

**Methods**:

**push**

+ **Description**: Navigate based on the `SegmentGroup` object, supporting parameter retention.
+ **Type**: `(options: SegmentGroup, target?: string) => void`
+ **Parameters**:
  - options: `SegmentGroup` object.
  - target: Optional, specifies the opening method (such as `_blank`).

**back**

+ **Description**: Go back to the previous page.
+ **Type**: `() => void`