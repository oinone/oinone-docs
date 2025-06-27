---
title: Development Specifications：Function and Action Function Usage Specifications
index: true
category:
  - Common Solutions
order: 12
---

# Ⅰ. Function Definition Specifications
The definition of Function must strictly follow Oinone's specifications:

+ `@Action` refers to a method displayed as a button on the page, and all methods with the `@Action` annotation require permission settings to be accessible. Each Action corresponds to a Function.
+ `@Function` is a manageable execution logic in Oinone, which is ubiquitous.
+ If it is just a query and does not require a button on the page, define it as `@Function`.

## \(Ⅰ\) Overwrite Common Default Data Manager Definition Standards:
```java
@Action.Advanced(name = FunctionConstants.create, managed = true)//The default is the method name
@Action(displayName = "Confirm", summary = "Add", bindingType = ViewTypeEnum.FORM)
public AuthRole create(AuthRole data) {}

@Action.Advanced(type = FunctionTypeEnum.UPDATE, managed = true, invisible = ExpConstants.idValueNotExist)
@Action(displayName = "Update", label = "Confirm", summary = "Modify", bindingType = ViewTypeEnum.FORM)
public AuthRole update(AuthRole data) {}

@Action.Advanced(type = FunctionTypeEnum.DELETE, managed = true)
@Action(displayName = "Delete", label = "Delete", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
@Function.fun(FunctionConstant.deleteWithFieldBatch)
public List<AuthRole> delete(List<AuthRoe> dataList) {}

@Function.Advanced(displayName = "Query Role List", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<AuthRole> queryPage(Pagination<AuthRole> page, IWrapper<AuthRole> queryWrapper) {
    //Note that the method name and parameter name must be consistent with the platform
}

@Function.Advanced(displayName = "Query Specified Role", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_ONE, managed = true)
@Function.fun(FunctionConstants.queryByEntity)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public AuthRole queryOne(AuthRole query) {
    //Note that the method name and parameter name must be consistent with the platform
}
```

## \(Ⅱ\) Custom Function Definition Standards
```java
@Action(displayName = "Enable")
@Action.Advanced(type = FunctionTypeEnum.UPDATE)
public Teacher dataStatus(Teacher data) {}

@Function
@Function.Advanced(displayName = "Construct", type = FunctionTypeEnum.QUERY)
public Teacher constructAll(Teacher data) {}
```

:::info Note:

1. Overwriting the definition of common default data manager Function must strictly follow the above function definition, including the definition of input and output parameter names and annotation definitions. Incorrect definitions will cause GQL requests to report errors or fail to find functions.
2. When defining `@Action` or `@Function`, the input and output parameters of the function must be the model annotated by `@Model.model()` of the current class, or a model fully containing the fields of the current model, such as its parent model.
3. For `@Action` or `@Function` methods called by the page, the input and output parameters must be oinone objects, not basic Java types, because oinone objects have metadata information, which can complete the automatic interaction between the front end and the back end.
4. `managed = true` defines the current function as a data management function. It is only used when overwriting the platform default data manager.
5. `@Function.fun()` represents the definition of the function code, which cannot be changed and defaults to the same as the method name. Two functions with the same code are not allowed in the same model Action.
6. Do not use set, get, or unset as the beginning of the function method name, and do not use toString as the function method name.
7. The transmission model does not have a default data manager, so data management functions cannot be defined.

:::

# Ⅱ. @Action and @Function Annotation Usage Conventions
+ For overriding built-in data manager actions and functions, they should be completely consistent with the platform registration method. The following attributes can be modified as needed: (must)
    - `@Function.Advanced#displayName`
    - `@Function#openLevel`
+ Custom methods should not have the same name as the actions and functions defined in the built-in data manager. (must)
+ Do not mix `@Action` and `@Function` annotations. (must for custom methods)
+ Unless necessary, do not use the following attributes to modify function definitions: (must for custom methods)
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
+ When selecting to register actions or functions for custom methods, the following rules should be followed for judgment: (must)
    - If the method is triggered by user behavior, it should be registered as an action.
    - If the method is controlled by an "entry", it should be registered as a function.
+ When registering custom methods as actions, the following rules should be followed for definition:
    - Use the `@Action.Advanced#type` attribute to define the function type, which defaults to UPDATE. Actions with mixed operations should clearly list all types. (must)
    - Use the `@Action#displayName` attribute to define the action function name. Unless necessary, do not repeat the names of all actions under the same model. If the display names on the page are repeated, use the `@Action#label` attribute to define the display name. (must)
    - Use the `@Action#summary` attribute to define a brief description of the action function.
    - Use the `@Action#contextType` attribute to define the action context type, which defaults to SINGLE. (must)
    - Use the `@Action#bindingType` attribute to define the view type where the action is located, which defaults to TABLE. (must)
+ When registering custom methods as functions, the following rules should be followed for definition:
    - Use the `@Function.Advanced#type` attribute to define the function type, which defaults to UPDATE. Functions with mixed operations should clearly list all types. (must)
    - Use the `@Function#openLevel` attribute to define the function open level. (must)
    - Use the `@Function.Advanced#displayName` attribute to define the function function name. Unless necessary, do not repeat the names of all functions under the same namespace. (must)
    - Use the `@Function#summary` attribute to define a brief description of the function function.
    - Use the `@Function.Advanced#category` attribute to define the function category.