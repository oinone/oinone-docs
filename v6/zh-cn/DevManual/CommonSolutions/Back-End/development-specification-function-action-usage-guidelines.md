---
title: 开发规范：Function、Action函数使用规范
index: true
category:
  - 常见解决方案
order: 12
---

# 一、函数的定义规范
Function 的定义需要严格遵循 Oinone 的规范：

+ `@Action`是指页面上有按钮展示的方法，所有`@Action`注解的方法都是需要在权限处设置权限才能访问的。Action 背后都对应一个 Function。
+ `@Function`是 Oinone 的可管理的执行逻辑，是无处不在的。
+ 如果只是查询，不需要在页面有按钮，定义为`@Function`就可以了。

## （一）覆写常用默认数据管理器定义标准：
```java
@Action.Advanced(name = FunctionConstants.create, managed = true)//默认取的是方法名
@Action(displayName = "确定", summary = "添加", bindingType = ViewTypeEnum.FORM)
public AuthRole create(AuthRole data) {}

@Action.Advanced(type = FunctionTypeEnum.UPDATE, managed = true, invisible = ExpConstants.idValueNotExist)
@Action(displayName = "更新", label = "确定", summary = "修改", bindingType = ViewTypeEnum.FORM)
public AuthRole update(AuthRole data) {}

@Action.Advanced(type = FunctionTypeEnum.DELETE, managed = true)
@Action(displayName = "删除", label = "删除", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
@Function.fun(FunctionConstant.deleteWithFieldBatch)
public List<AuthRole> delete(List<AuthRoe> dataList) {}

@Function.Advanced(displayName = "查询角色列表", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<AuthRole> queryPage(Pagination<AuthRole> page, IWrapper<AuthRole> queryWrapper) {
    //注意方法名和入参名称必须和平台保持一致
}

@Function.Advanced(displayName = "查询指定角色", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_ONE, managed = true)
@Function.fun(FunctionConstants.queryByEntity)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public AuthRole queryOne(AuthRole query) {
    //注意方法名和入参名称必须和平台保持一致
}
```

## （二）自定义函数定义标准
```java
@Action(displayName = "启用")
@Action.Advanced(type = FunctionTypeEnum.UPDATE)
public Teacher dataStatus(Teacher data) {}

@Function
@Function.Advanced(displayName = "构造", type = FunctionTypeEnum.QUERY)
public Teacher constructAll(Teacher data) {}
```

:::info 注意：

1. 覆写常用默认数据管理器 Function 定义需要严格按照以上函数定义，包括出入参名字定义、注解定义。定义错误会导致 gql 请求报错或者找不到函数。
2. 定义`@Action`或者`@Function`时，函数出入参必须是当前类注解定义的`@Model.model（）`的模型，或者被该模型字段全包含的的模型，比如它的父模型。
3. 页面调用使用的`@Action`或者`@Function`方法，出入参必须是 oinone 的对象，且不能是基础的 java 类型，因为 oinone 的对象有元数据信息，这样才能完成前后端之间的自动交互
4. `managed = true`定义当前函数为数据管理函数。它只有在重写平台默认数据管理器时需要使用。
5. `@Function.fun()`代表定义函数编码，不可更改，默认与方法名称相同。同一个模型 Action 内不允许有两个相同的函数编码。
6. 不要使用 set、get、unset 作为函数方法名的开头，不要使用 toString 作为函数方法名。
7. 传输模型没有默认的数据管理器，所以不能定义数据管理函数。

:::

# 二、@Action 和 @Function 注解使用约定
+ 重写内置数据管理器动作和函数的，应与平台注册方式完全保持一致。以下属性可根据需要进行修改：（必须）
    - `@Function.Advanced#displayName`
    - `@Function#openLevel`
+ 自定义方法不要与内置数据管理器中定义的动作和函数重名。（必须）
+ @Action和@Function注解不要混合使用。（自定义方法必须）
+ 如无特殊必要，请不要使用如下属性修改函数定义：（自定义方法必须）
    - `@Function#name`
    - `@Function.fun#value`
    - `@Function.Advanced#managed`
    - `@Function.Advanced#builtin`
    - `@Function.Advanced#group`
    - `@Function.Advanced#version`
    - `@Action.Advanced#name`
    - `@Action.Advanced#args`
    - `@Action.Advanced#managed`
    - `@Action.Advanced#language`
+ 自定义方法在选择注册动作或函数时，应按照如下规则进行判断：（必须）
    - 若该方法通过用户行为触发的，应注册为动作。
    - 若该方法通过“入口”进行控制的，应注册为函数。
+ 自定义方法若注册为动作时，应按照如下规则进行定义：
    - 使用`@Action.Advanced#type`属性定义函数类型，默认为 UPDATE。混合操作的动作应明确列出所有类型。（必须）
    - 使用`@Action#displayName`属性定义动作功能名称。如无特殊必要，同一模型下的所有动作名称不要重复。页面展示名称重复的，可使用`@Action#label`属性定义展示名称。（必须）
    - 使用`@Action#summary`属性定义动作功能简要描述。
    - 使用`@Action#contextType`属性定义动作上下文类型，默认为 SINGLE。（必须）
    - 使用`@Action#bindingType`属性定义动作所在视图类型，默认为 TABLE。（必须）
+ 自定义方法若注册为函数时，应按照如下规则进行定义：
    - 使用`@Function.Advanced#type`属性定义函数类型，默认为 UPDATE。混合操作的函数应明确列出所有类型。（必须）
    - 使用`@Function#openLevel`属性定义函数开放级别。（必须）
    - 使用`@Function.Advanced#displayName`属性定义函数功能名称。如无特殊必要，同一命名空间下的所有函数名称不要重复。（必须）
    - 使用`@Function#summary`属性定义函数功能简要描述。
    - 使用`@Function.Advanced#category`属性定义函数分类。

