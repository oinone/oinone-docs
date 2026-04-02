---
title: Router Service
index: true
category:
  - 研发手册
  - Reference
  - 前端API
  - Services
order: 3

---
在任何一个 Web 应用程序中，路由系统都是必不可少的一部分。在 Oinone Kunlun 中，除了通过 `跳转动作（ViewAction）` 实现的在 `/page` 路由下的单页应用路由外，还提供了 登录页（`/login`）、忘记密码页（`/forget`）等其他独立路由页面。

# 一、内置路由

在 Oinone 中内置了一些支持系统基础功能的一些路由路径和路由组件：

+ /login：登录页。（`LoginWidget`）
+ /forget：忘记密码页。（`ForgetPasswordWidget`）
+ /first：首次登录重置密码页。（`FirstResetPasswordWidget`）
+ /debug：调试页。（`DebugMainViewWidget`）
+ /shared：分享页。（`SharedMainViewWidget`）

## （一）登录页

登录页是用户未登录时提供用户输入登录信息的入口页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750413567564-781a0edc-2a3f-45b3-bcf3-98ee480791fb.png)

**重定向登录页图示**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750470594174-e4acae91-1b69-46bd-9047-df85d9093b9a.jpeg)

## （二）忘记密码页

当用户忘记密码时，可通过一些认证方式对密码进行重置，系统内置的忘记密码页是通过手机号验证的方式进行重置的。业务系统可根据自身需要决定是否允许自助重置密码以及重置密码的相关逻辑。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750470849372-548a6040-e0ec-4c40-9d0e-621db7312887.png)

**运行时相关配置**

```typescript
runtimeConfigResolve({
  login: {
    forgetPassword: false, // 登录页是否显示忘记密码按钮
    forgetPasswordLabel: "忘记密码" // 登录页忘记密码按钮文本内容
  }
});
```

## （三）首次登录重置密码页

当业务系统要求用户在首次登录时必须修改初始密码时，可通过 `sysSetting.SysSettings` 模型的 `needModifyInitialPassword` 属性开启这一功能，这样新用户在未修改初始密码时将重定向到首次登录重置密码页面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750474439836-5c2d5669-a96b-4255-be79-9fda384201a9.png)

**重定向首次登录重置密码页图示**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/FrontEndFramework/1750475079830-7461c110-dcfd-4e69-ba35-ce3aca62146a.jpeg)

# 二、自定义路由

除了内置路由外，Oinone 还可通过 `OioProviderProps#router` 配置其他路由。例如：

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

除了配置之外，我们还需要注册对应的路由组件：

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

与之对应的 Vue 组件的 Template 模板为：

```vue
<template>
  <div>hello world</div>
</template>
```

到了这里，自定义路由就添加完成了，我们可以通过浏览器访问对应路径查看渲染效果：

```typescript
http://127.0.0.1:8080/custom
```

# 三、常见用法

## （一）获取当前 URL 参数

```typescript
// 获取任意路由下的 URL 参数
useMatched().matched.segmentParams

// 获取 /page 路由下的 URL 参数
getMatchedUrl()
```

## （二）获取路由实例并跳转

### 1、基础用法

```typescript
protected $router!: Router;

protected doSomething() {
  this.$router.push(...);
}

protected beforeMount() {
  this.$router = useRouter().router;
}
```

### 2、追加或修改指定参数跳转

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

### 3、置空指定参数跳转

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

### 4、替换全部参数跳转

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

## （三）订阅路由变更

### 1、基础用法

```typescript
protected watchRouter: Subscription | undefined;

protected beforeMount() {
  this.watchRouter = subscribeRoute(...);
}

protected unmounted() {
  this.watchRouter?.unsubscribe();
}
```

### 2、任意变更触发（参数相同会重复触发）

```typescript
this.watchRouter = subscribeRoute((matched) => {
  // do something.
});
```

### 3、参数去重（参数相同不触发）

```typescript
this.watchRouter = subscribeRoute(
  (matched) => {
    // do something.
  },
  { distinct: true }
);
```

# 四、Reference List

## （一）useMatched

**描述**：管理路由匹配状态的自定义 Hook，用于跟踪当前匹配的路由信息和历史匹配状态，并提供状态更新和订阅功能。

**属性**：

**prevMatched**

+ **描述**：上一次路由匹配对象，用于状态对比和历史记录。
+ **类型**：`Matched | null`

**matched**

+ **描述**：当前路由匹配对象，存储路由参数。
+ **类型**：`Matched`

**方法**：

**getMatched$**

+ **描述**：路由匹配状态的可观察对象，使用 `BehaviorSubject` 实现
+ **类型**：`() => BehaviorSubject<Matched>`
+ **返回值**：可观察对象，用于路由变更订阅。

## （二）useRouter

**描述**：获取当前 Vue 实例中的路由对象，只能在 Vue 组件内部使用。

**属性**：

**router**

+ **描述**：路由实例。
+ **类型**： `Router`

## （三）getRouterInstance

**描述**：获取当前路由实例，可在初始化完成后的任意地方调用。

**返回值**：`Router`

## （四）Router

**描述**：路由实例。

**方法**：

**push**

+ **描述**：基于 `SegmentGroup` 对象导航，支持参数保留。
+ **类型**：`(options: SegmentGroup, target?: string) => void`
+ **参数**：
  - options：`SegmentGroup`对象。
  - target：可选，指定打开方式（如 `_blank`）。

**back**

+ **描述**：返回上一页。
+ **类型**：`() => void`

