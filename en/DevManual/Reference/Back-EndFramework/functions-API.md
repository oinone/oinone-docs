---
title: Functions API
index: true
category:
  - R&D Manual
  - Reference
  - Backend API
order: 3

---
# I. Function Definition

Oinone provides various environment configurations and method annotations to standardize model method behavior and data interaction logic. Below is a detailed explanation of core annotations:

## (Ⅰ) Function Source Types

### 1、Regular Function

#### Function Definition in Model Class

When defining functions in a model class, use annotations to clarify their functional attributes:

```java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "TestModel")
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    // Set function open level to API, which will build HTTP service interfaces based on GraphQL protocol
    // The operation semantic is QUERY, and the corresponding interface will be categorized under the query field of GraphQL, otherwise under mutation
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public TestModel sayHello(TestModel data) {
        // Business logic processing
        return data;
    }
}
```

#### Interface and Implementation Class Configuration

**Interface Definition**: Add the `@Function` annotation to interface methods to ensure automatic registration of remote service consumers when other modules depend on the API package.

```java
@Fun(TestModel.MODEL_MODEL)
// You can alternatively use the @Model.model annotation to specify the namespace
// @Model.model(TestModel.MODEL_MODEL)
public interface TestModelHelloService {
    @Function
    PetShop sayHello(TestModel data);
}
```

**Implementation Class Configuration**: The implementation class must add `@Fun` and `@Function` annotations simultaneously to inherit interface functional attributes:

```java
@Fun(TestModel.MODEL_MODEL)
// You can alternatively use the @Model.model annotation to specify the namespace
// @Model.model(TestModel.MODEL_MODEL)
@Component
public class TestModelHelloServiceImpl implements TestModelHelloService {
    @Override
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public PetShop sayHello(TestModel data) {
        // Business logic processing
        return data;
    }
}
```

These functions are independent of model definitions but are associated with models through binding, used to supplement or extend model functions.

#### Independent Function Interface and Implementation

If a function serves as an independent public logic unit, differentiate it through namespaces:

```java
@Fun(TestModelHelloService.FUN_NAMESPACE)
public interface TestModelHelloService {
    String FUN_NAMESPACE = "test.TestModelHelloService";
    @Function
    TestModel sayHello(TestModel data);
}

@Fun(TestModelHelloService.FUN_NAMESPACE)
@Component
public class TestModelHelloServiceImpl implements TestModelHelloService {
    @Override
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public TestModel sayHello(TestModel data) {
        // Business logic processing
        return data;
    }
}
```

Such functions exist as general public logic, not bound to specific models, and are commonly used to handle repeated logic in multiple business scenarios.

**Core Points**:

- Control function open levels, operation semantics, and interface construction rules through `@Function` series annotations;
- Interface methods must add the `@Function` annotation to support automatic remote service registration;
- Implementation classes must synchronize annotations to ensure consistency with interface configurations and avoid service invocation exceptions.

### 2、Extension Point Function Extpoint

Extension point functions are used to extend existing functions, implemented through interfaces and implementation classes.

```java
@Ext(TestModel.class)
public interface TestModelExtpoint {
    @ExtPoint(displayName = "Pre-extension point for TestModel's create function")
    public TestModel createBefore(TestModel data);
}

@Ext(TestModel.class)
public class TestModelExtpointImpl implements TestModelExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "Implementation of TestModel's create function pre-extension point", expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("Implementation of TestModel's create function pre-extension point");
        return data;
    }
}
```

### 3、Interceptor Function Hook

Interceptor functions can intercept processing before and after function execution.

```java
@Component
public class TestModelCreateBeforeHook implements HookBefore {

    @Override
    @Hook(model = {TestModel.MODEL_MODEL}, fun = {"create"}, priority = 1)
    public Object run(Function function, Object... args) {
        PamirsSession.getMessageHub().info("TestModel's create function BeforeHook");
        return args;
    }

}
```

### 4、Server Action Function ServerAction

Server action functions trigger specific operations on the page.

```java
@Model.model(TestActionModel.MODEL_MODEL)
public class TestActionModelAction {

    @Action.Advanced(invisible = ExpConstants.idValueNotExist)// Hide on page when ID is empty
    @Action(displayName = "actionDoSomething", bindingType = {ViewTypeEnum.FORM, ViewTypeEnum.TABLE})
    public TestActionModel actionDoSomething(TestActionModel testActionModel){
        // do something
        return testActionModel;
    }
}
```

## (Ⅱ) Function Invocation Methods

In the system, functions can be invoked in various ways, mainly including:

1. **Invoke via function manager using namespace and function code**: Use the function manager to invoke functions based on namespace and function code, specifically `Fun.run(namespace, fun, parameters)`.
2. **Invoke via function manager using function configuration**: Invoke through function manager based on function configuration, i.e., `Fun.run(function, parameters)`.
3. **Invoke via function manager using functional interface**: Utilize the function manager to invoke through a functional interface, such as `Fun.run(functional interface, parameters)`.
4. **Invoke using Spring bean**: Use Spring bean to invoke functions. First, inject the `FunctionInterface` instance via the `@Resource` annotation, then invoke through `functionInterface.method(parameters)`.

::: info Note

Backend programming-invoked function interceptors and extension points are not enabled by default. You can manually set meta directives to enable them, as shown in the example:

:::

```java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, parameters);
}, SystemDirectiveEnum.HOOK, SystemDirectiveEnum.EXT_POINT);
```

Additionally, function invocations by the function manager (Fun) are compatible with both Spring bean and reflection invocations. If the function's class is not managed by Spring, reflection invocation is used; otherwise, Spring bean invocation is employed.

## (Ⅲ) Function Configuration

### 1、Identification of Non-Model Function Classes

For classes that are not models but contain functions, they must be explicitly identified using the `@Fun` annotation. To provide remote services, declare function interfaces using the `@Fun` annotation in the API package.

### 2、Function Operation Semantic Types

Function operation semantics use binary multi-select enums, covering four core operation types:

- **Create**: For data addition operations.
- **Delete**: For data deletion operations.
- **Update**: For data update operations.
- **Query**: For data query operations.

The system defaults the function operation semantics to **"Update"**. If a function only involves data reading and does not perform any write operations (i.e., read-only function), you must explicitly specify its operation semantics as "**Query**" through annotations to ensure the system correctly identifies and processes function behavior.

::: warning Tip

Function type semantics include create, delete, update, and query. When the `Function` level is `API`, generating the `GraphQL` `Schema` is affected by this. "Query" type functions are categorized under the `query` field in the generated `GraphQL` `Schema`, while "create", "delete", and "update" type functions are categorized under the `mutation` field.

:::
### 3、Function Overloading Rules and Common Examples

- Only one overloaded function with the same namespace and function code takes effect.
- Functions defined in the model class have higher priority than those defined outside the model class; within the model class, later definitions have higher priority.

#### Data Construction Function construct Overloading

```java
/**
 * When opening the new page, the frontend will default to calling the construct of the given model
 */
@Function.Advanced( displayName = "Initialize data", type = {FunctionTypeEnum.QUERY})
@Function(summary = "Data construction function", openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.API, FunctionOpenEnum.REMOTE})
public TestModel construct(TestModel data) {
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs.
    log.info("doSomething 4 TestModel construct");
    data.construct();
    return data;
}
```

#### Create (create) Overloading

```java
@Transactional(rollbackFor = {Throwable.class})
@Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
@Action( displayName = "Create", label = "Confirm", summary = "Add", bindingType = {ViewTypeEnum.FORM})
@Function(name = FunctionConstants.create)
@Function.fun(FunctionConstants.create)
public TestModel create(TestModel data) {
    if (null == data) {
        return null;
    }
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs.
    log.info("doSomething 4 TestModel create");
    // Only perform its own creation operation, without automatically processing associated fields based on creation strategies.
    data.create();
    // Then save one2many, many2many relationship fields
    data.fieldSave(TestModel::getPartners);
    return data;
}
```

::: danger Warning

@Action.Advanced(check = true), if not configured, validation constraints (Validation configuration) will not be performed

:::
#### Delete (delete) Overloading

```java
@Transactional(rollbackFor = Throwable.class)
@Action.Advanced(name = FunctionConstants.delete, type = FunctionTypeEnum.DELETE, managed = true, priority = 66)
@Action(displayName = "Delete", label = "Delete", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
@Function(name = FunctionConstants.delete)
@Function.fun(FunctionConstants.deleteWithFieldBatch)
public List<TestModel> delete(List<TestModel> dataList) {
    if (CollectionUtils.isEmpty(dataList)) {
        return dataList;
    }
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs to customarily control related data or processes before and after the delete operation, achieving more flexible and business-scenario-appropriate function settings.
    log.info("doSomething 4 TestModel delete");
    // Only perform its own delete operation, without automatically processing associated fields based on delete strategies.
    new TestModel().deleteByPks(dataList);
    new TestModel().listRelationDelete(dataList, TestModel::getPartners);
    return dataList;
}
```

#### Update (update) Overloading

```java
@Transactional(rollbackFor = {Throwable.class} )
@Action.Advanced(name = FunctionConstants.update, type = {FunctionTypeEnum.UPDATE}, managed = true, invisible = ExpConstants.idValueNotExist, check = true)
@Action(displayName = "Update", label = "Confirm", summary = "Modify", bindingType = {ViewTypeEnum.FORM})
@Function(name = FunctionConstants.update)
@Function.fun(FunctionConstants.update)
public TestModel update(TestModel data) {
    if (null == data) {
        return null;
    }
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs.
    log.info("doSomething 4 TestModel update");
    // Only perform its own update operation, without automatically processing associated fields based on update strategies.
    data.updateById();
    // saveOnCascade adds or updates associated relationship fields (full volume) and processes old relationship data according to field cascade strategies (e.g., delete, SET_NULL). Using the fieldSave method requires self-handling of relationship deltas, such as deleting old records
    data.fieldSaveOnCascade(TestModel::getPartners);
    return data;
}
```
::: danger Warning

@Action.Advanced(check = true), if not configured, validation constraints (Validation configuration) will not be performed
:::
#### Paged Query (queryPage) Overloading

```java
/**
 * When the table view clicks search, the frontend will default to calling the queryPage of the given model
 */
@Function.Advanced(displayName = "Query record list and total count by conditions", type = {FunctionTypeEnum.QUERY}, category = FunctionCategoryEnum.QUERY_PAGE)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<TestModel> queryPage(Pagination<TestModel> page, IWrapper<TestModel> queryWrapper) {
    if (null == page) {
        return null;
    }
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs.
    log.info("doSomething 4 TestModel queryPage");
    return new TestModel().queryPage(page, queryWrapper);
}
```

#### Single Query (queryOne) Overloading

```java
@Function.Advanced(displayName = "Query a single record", type = {FunctionTypeEnum.QUERY}, category = FunctionCategoryEnum.QUERY_ONE)
@Function.fun(FunctionConstants.queryByEntity)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public TestModel queryOne(TestModel query) {
    if (null == query) {
        return null;
    }
    // TODO doSomething, additional specific business logic can be appended here based on actual business needs.
    log.info("doSomething 4 TestModel queryOne");
    return query.queryOne();
}
```

### 4、Determination of Namespace and Function Code

- **Namespace**

  - Use `@Model.model` or `@Fun` annotations to configure the function namespace.
  - Prefer the `@Model.model` annotation value. First, look for this annotation in the current class. If not configured or the annotation value is empty, look for it in the parent class or interface; if still empty, take the `@Fun` annotation value, first in the current class, then in the parent class or interface if the current class is not configured or empty; if both are empty, take the fully qualified class name.

- **Function Code**

  - Use the `@Function.fun` annotation to configure the function code.
  - First, look for this annotation in the current class method to obtain the function code. If not configured or the annotation value is empty in the current class method, look for it in the parent class or interface method; if both are empty, take the method name.

### 5、Function Open Levels

In daily development, to ensure security, we often set different open levels for methods or manage interfaces to be opened to the Web through application layering, placing them in independent applications. Oinone adopts a similar strategy, managing all logic through `Function`. `Function` supports defining three open levels: `API`, `REMOTE`, and `LOCAL`, with configurable multi-selection, described as follows:

- **Local Call (LOCAL)**: Supports invocation within the same application, commonly used for other modules within the application to invoke model-related logic.
- **Remote Call (REMOTE)**: Enabled by default, supports invocation through remote services, suitable for interaction between different services in a distributed system.
- **Open (API)**: Supports exposure to external systems through public interfaces, suitable for scenarios where services are provided externally.

::: warning

Function open level rules: Enabling `API` implies default support for `LOCAL` and `REMOTE`; enabling `REMOTE` implies default support for `LOCAL`; `LOCAL` is optional for local use only.
:::
::: warning

For server actions (ServerAction), their corresponding functions are automatically set to the `API` open level. This is because such functions are associated with operation buttons on the frontend interface, and `API` must be opened to ensure frontend invocability.
:::
### 6、Naming Conventions

| **Model Attribute** | **Default Value Convention**                          | **Naming Rule Convention**                                     |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| namespace            | Configurable via `@Model.model` or `@Fun` annotation  | Length ≤ 128 characters                                      |
| name                 | Defaults to Java method name                          | Contains only numbers and letters, starts with a letter, length ≤ 128 characters, does not start with `get`, `set`, `unSet` |
| fun                  | Defaults to `name`                                    | Length ≤ 128 characters                                      |
| summary              | Defaults to `displayName`                             | No semicolons, length ≤ 500 characters                       |
| Advanced.displayName | Defaults to `name`                                    | Length ≤ 128 characters                                      |

### 7、Annotation Configuration

#### @Fun Function Declaration

└── value Namespace

#### @Model

└── model Namespace

#### @Function

├── name Technical name

├── scene Available scenarios

├── summary Description summary

├── openLevel Open level

├── Advanced More configurations

│   ├── displayName Display name

│   ├── type Function type, default FunctionTypeEnum.UPDATE

│   ├── managed Data manager function, default false

│   ├── check Validation, default false

│   ├── language Language, default FunctionLanguageEnum.JAVA

│   ├── builtin Whether built-in function, default no

│   ├── category Category, FunctionCategoryEnum.OTHER

│   ├── group System group, default: pamirs

│   ├── version System version, default: 1.0.0

│   ├── timeout Timeout, default: 5000

│   ├── retries Number of retries, default: 0

│   ├── isLongPolling Whether supports long polling, default false

│   ├── longPollingKey Supports obtaining fields from context as key, default userId

│   └── longPollingTimeout Long polling timeout, default value 1

└── fun

└── value

#### @PamirsTransactional

├── value @AliasFor("transactionManager")

├── transactionManager @AliasFor("value") default value: ""

├── propagation Transaction propagation type default value: Propagation.REQUIRED

├── isolation Transaction isolation level default value: Isolation.DEFAULT

├── timeout Expiration time default: -1

├── readOnly Read-only default: false

├── rollbackFor Rollback exception classes

├── rollbackForClassName Rollback exception class names

├── rollbackForExpCode Rollback exception codes

├── noRollbackFor Ignored exception classes

├── noRollbackForClassName Ignored exception class names

├── noRollbackForExpCode Ignored exception codes

└── enableXa Distributed transaction default is false

## (Ⅳ) Function Metadata

### 1、FunctionDefinition

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1600px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">Element Data Composition</th>
      <th style="text-align: left; font-weight: bold;">Meaning</th>
      <th style="text-align: left; font-weight: bold;">Corresponding Annotation</th>
      <th style="text-align: left; font-weight: bold;">Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>namespace</td>
      <td>Function namespace</td>
      <td>@Fun("")<br/>@Model.model("")</td>
      <td>@Fun or @Model.model</td>
    </tr>
    <tr>
      <td>name</td>
      <td>Technical name</td>
      <td rowspan="4">@Function(<br/>name="",<br/>scene={},<br/>summary="",<br/>openLevel=FunctionOpenEnum.REMOTE<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>scene</td>
      <td>Available scenarios</td>
      <td>See: FunctionSceneEnum</td>
    </tr>
    <tr>
      <td>description</td>
      <td>Description</td>
      <td></td>
    </tr>
    <tr>
      <td>openLevel</td>
      <td>Open level</td>
      <td>See: FunctionOpenEnum</td>
    </tr>
    <tr>
      <td>fun</td>
      <td>Code</td>
      <td>@Function.fun("")</td>
      <td></td>
    </tr>
    <tr>
      <td>displayName</td>
      <td>Display name</td>
      <td rowspan="13">@Function.Advanced(<br/>displayName="",<br/>type=FunctionTypeEnum.UPDATE,<br/>dataManager=false,<br/>language=FunctionLanguageEnum.JAVA,<br/>isBuiltin=false,<br/>category=FunctionCategoryEnum.OTHER,<br/>group="pamirs",<br/>version="1.0.0",<br/>timeout=5000,<br/>retries=0,<br/>isLongPolling=false,<br/>longPollingKey="userId"<br/>longPollingTimeout=1<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>type</td>
      <td>Function type<br/>Default: 4 (update)</td>
      <td>See: FunctionTypeEnum</td>
    </tr>
    <tr>
      <td>dataManager</td>
      <td>Data manager function<br/>Default: false</td>
      <td></td>
    </tr>
    <tr>
      <td>language</td>
      <td>Function language<br/>Default: DSL</td>
      <td>See: FunctionLanguageEnum</td>
    </tr>
    <tr>
      <td>isBuiltin</td>
      <td>Whether built-in function<br/>Default: false</td>
      <td></td>
    </tr>
    <tr>
      <td>category</td>
      <td>Category<br/>Default: OTHER</td>
      <td>See: FunctionCategoryEnum</td>
    </tr>
    <tr>
      <td>group</td>
      <td>System group<br/>Default: pamirs</td>
      <td></td>
    </tr>
    <tr>
      <td>version</td>
      <td>System version<br/>Default: 1.0.0</td>
      <td></td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>Timeout<br/>Default: 5000</td>
      <td></td>
    </tr>
    <tr>
      <td>retries</td>
      <td>Number of retries<br/>Default: 0</td>
      <td></td>
    </tr>
    <tr>
      <td>isLongPolling</td>
      <td>Whether supports long polling, default false</td>
      <td></td>
    </tr>
    <tr>
      <td>longPollingKey</td>
      <td>Supports obtaining fields from context as key</td>
      <td></td>
    </tr>
    <tr>
      <td>longPollingTimeout</td>
      <td>Long polling timeout<br/>Default value is 1</td>
      <td></td>
    </tr>
    <tr>
      <td>transactionConfig</td>
      <td>Transaction configuration<br/>JSON storage</td>
      <td></td>
      <td>See: TransactionConfig<br/>Configuration<br/>@PamirsTransactional</td>
    </tr>
    <tr>
      <td>source</td>
      <td>Source</td>
      <td></td>
      <td>System inferred value, see: FunctionSourceEnum</td>
    </tr>
    <tr>
      <td>extPointList</td>
      <td>Function includes extension points</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>module</td>
      <td>所属模块 (Affiliated module)</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>bitOptions</td>
      <td>Bit</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>Attributes</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>imports</td>
      <td>Context references</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>context</td>
      <td>Context variables</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>codes</td>
      <td>Function content</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>beanName</td>
      <td>Bean name</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>rule</td>
      <td>Frontend rules</td>
      <td></td>
      <td>System inferred value, generally passed down by Action.rule</td>
    </tr>
    <tr>
      <td>clazz</td>
      <td>Function location</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>method</td>
      <td>Function method</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>argumentList</td>
      <td>Function parameters</td>
      <td></td>
      <td>System inferred value, List<`Argument`></td>
    </tr>
    <tr>
      <td>returnType</td>
      <td>Return value type</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
  </tbody>
</table>

### 2、TransactionConfig

Transaction configuration for function transaction management

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">Element Data Composition</th>
      <th style="text-align: left; font-weight: bold;">Meaning</th>
      <th style="text-align: left; font-weight: bold;">Corresponding Annotation</th>
      <th style="text-align: left; font-weight: bold;">Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>transactionManager</td>
      <td>Transaction manager</td>
      <td rowspan="8">@PamirsTransactional(<br/>transactionManager="",<br/>enableXa=false,<br/>isolation=Isolation.DEFAULT,<br/>propagation=Propagation.REQUIRED,<br/>timeout=-1,<br/>readOnly=false,<br/>rollbackFor={},<br/>rollbackForClassName={},<br/>noRollbackFor={},<br/>noRollbackForClassName={},<br/>rollbackForExpCode={},<br/>noRollbackForExpCode={}<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>enableXa</td>
      <td>Distributed transaction<br/>Default is false</td>
      <td></td>
    </tr>
    <tr>
      <td>isolation</td>
      <td>Transaction isolation level</td>
      <td></td>
    </tr>
    <tr>
      <td>propagation</td>
      <td>Transaction propagation type</td>
      <td></td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>Expiration time<br/>Default: -1</td>
      <td></td>
    </tr>
    <tr>
      <td>readOnly</td>
      <td>Read-only<br/>Default: false</td>
      <td></td>
    </tr>
    <tr>
      <td>rollbackForExpCode</td>
      <td>Rollback exception codes</td>
      <td></td>
    </tr>
    <tr>
      <td>rollbackForExpCode</td>
      <td>Ignored exception codes</td>
      <td></td>
    </tr>
    <tr>
      <td>namespace</td>
      <td>Function namespace</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>fun</td>
      <td>Function code</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
    <tr>
      <td>active</td>
      <td>Effective<br/>Default is true</td>
      <td></td>
      <td>System inferred value</td>
    </tr>
  </tbody>
</table>

# II. Extpoint Extension Points

## (Ⅰ) Default Extension Points

All functions in Oinone provide default pre-extension points, override extension points, and post-extension points. Their technical names follow the rule of adding "Before", "Override", and "After" suffixes to the **function code fun** of the extended function. For example:

### 1、Extension Point Definition Example

```java
@Ext(TestModel.class)
public interface TestModelExtpoint {
    @ExtPoint(displayName = "Pre-extension point for TestModel's create function")
    public TestModel createBefore(TestModel data);
}
@Ext(TestModel.class)
public class TestModelExtpointImpl implements TestModelExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "Implementation of TestModel's create function pre-extension point", expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("Implementation of TestModel's create function pre-extension point");
        return data;
    }
}
```

Use `@Ext(TestModel.class)` to mark the class where the extended function is located, thereby clarifying the namespace. Use `@ExtPoint` to define the extension point and `@ExtPoint.Implement` to define the extension point implementation. Set the extension point's activation condition and priority through `expression` and `priority`. In the expression, you can use `context` and function parameters (such as `data` in the example) as variables, where `context`'s `requestFromModule` represents the module that initiated the request.

### 2、Quick Definition Method:

```java
@Ext(TestModel.class)
public class TestModelExtpointImpl implements CreateBeforeExtPoint<TestModel> {
    @Override
    @ExtPoint.Implement(displayName = "Implementation of TestModel's create function pre-extension point", expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("Implementation of TestModel's create function pre-extension point");
        return data;
    }
}
```

### 3、Model Extension Point Quick Definition List

| Extension Point                | Name (name)                                          | Description                    |
| ------------------------------ | ---------------------------------------------------- | ------------------------------ |
| CountBeforeExtPoint            | countBefore                                          | Pre-extension point for getting count |
| CreateAfterExtPoint            | createAfter                                          | Post-extension point for creation    |
| CreateBatchAfterExtPoint       | createBatchAfter                                     | Post-extension point for batch creation |
| CreateBatchBeforeExtPoint      | createBatchBefore                                    | Pre-extension point for batch creation |
| CreateBeforeExtPoint           | createBefore                                         | Pre-extension point for creation    |
| DeleteAfterExtPoint            | Java method: deleteAfter name: deleteWithFieldBatchAfter | Post-extension point for deletion    |
| DeleteBeforeExtPoint           | Java method: deleteBefore name: deleteWithFieldBatchBefore | Pre-extension point for deletion    |
| PageAfterExtPoint              | queryPageAfter                                       | Post-extension point for paged query |
| PageBeforeExtPoint             | queryPageBefore                                      | Pre-extension point for paged query |
| QueryByPkAfterExtPoint         | queryByPkAfter                                       | Post-extension point for query by primary key |
| QueryByPkBeforeExtPoint        | queryByPkBefore                                      | Pre-extension point for query by primary key |
| QueryListAfterExtPoint         | Java method: queryListAfter name: queryListByEntityAfter | Post-extension point for list query |
| QueryListBeforeExtPoint        | Java method: queryListBefore name: queryListByWrapperBefore | Pre-extension point for list query |
| QueryOneAfterExtPoint          | Java method: queryOneAfter name: queryByEntityAfter    | Post-extension point for single query |
| QueryOneBeforeExtPoint         | Java method: queryOneBefore name: queryByEntityBefore  | Pre-extension point for single query |
| UpdateAfterExtPoint            | updateAfter                                          | Post-extension point for update    |
| UpdateBatchAfterExtPoint       | updateBatchAfter                                     | Post-extension point for batch update |
| UpdateBatchBeforeExtPoint      | updateBatchBefore                                    | Pre-extension point for batch update |
| UpdateBeforeExtPoint           | updateBefore                                         | Pre-extension point for update    |
| UpdateConditionAfterExtPoint   | Java method: updateConditionAfter name: updateByWrapperAfter | Post-extension point for conditional update |
| UpdateConditionBeforeExtPoint  | Java method: updateConditionBefore name: updateByWrapperBefore | Pre-extension point for conditional update |

::: danger Warning

Extension points implemented using the quick method do not support remote invocation
:::

## (Ⅱ) Custom Extension Points

During daily development, as our understanding of business deepens, we often reserve extension points in certain logic to flexibly replace local logic to meet various future needs.

### 1、Define Custom Extension Points

```java
@Ext
public interface TestModelDoSomethingExtpoint {

    @ExtPoint(displayName = "doSomething")
    List<TestModel> doSomething();

}
@Ext(TestModelDoSomethingExtpoint.class)
public class TestModelDoSomethingExtpointImpl implements TestModelDoSomethingExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "doSomething")
    public List<TestModel> doSomething() {
        // Specific business logic processing
        return null;
    }
}
```

### 2、Invoke Custom Extension Points

In business methods, use `Ext.run` to trigger extension point logic through functional interfaces:

```java
// Trigger using Ext.run
public List<TestModel> includeCallExtpoint(){
    // Pre-business logic
    // Invoke extension point logic
    List<TestModel> testModels = Ext.run(TestModelDoSomethingExtpoint::doSomething, new Object[]{});
    // Subsequent business processing
    return testModels;
}
```

Through the above steps, you can complete the creation and invocation of custom extension points to achieve dynamic extension and flexible replacement of business logic.

## (Ⅲ) Override Original Extension Points

An extension point can have multiple extension point implementations, and Oinone will ultimately select only one to execute based on conditions and priority. The default priority is 99, and the smaller the number, the higher the priority. For example:

```java
@Ext(TestModelDoSomethingExtpoint.class)
public class TestModelDoSomethingExtpointImpl2 implements TestModelDoSomethingExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "doSomething2", priority = 66 )
    public List<TestModel> doSomething() {
        // New business logic processing
        return null;
    }
}
```

## (Ⅳ) Notes

::: warning

Extension points can configure activation conditions through the `expression` attribute, which takes effect automatically when left empty. An extension point can have multiple extension point implementations, and Oinone will ultimately select only one to execute based on conditions and priority.
:::
::: warning

Sub-models not only inherit fields and functions from the parent model but also synchronously inherit the extension points of the inherited functions when inheriting functions.
:::
::: info Note

Backend programming-invoked function extension points are not enabled by default. You can manually set meta directives to enable them, as shown in the example:
:::
```java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, parameters);
}, SystemDirectiveEnum.EXT_POINT);
```

::: danger Warning

Do not name function parameters `context`, as this naming conflicts with Oinone's built-in context, causing expression execution exceptions.

:::

# III. Hook Interceptors

As an important part of the platform, interceptors can extend corresponding logic before and after function execution for functions that meet specific conditions in a non-intrusive manner.

## (Ⅰ) Interceptor Usage Method

By adding the `@Hook` annotation to a method, you can mark the method as an interceptor. Specifically, pre-extension points need to implement the `HookBefore` interface, while post-extension points need to implement the `HookAfter` interface. Their input parameters include the definition of the intercepted function and the function's input parameters, allowing interceptors to flexibly process execution logic based on function definitions and input parameters.

## (Ⅱ) Interceptor Classification and Characteristics

Interceptors are mainly divided into two categories: pre-interceptors and post-interceptors, which differ in function and data processing:

### 1、Pre-Interceptor:

Its input and output parameters are the input parameters of the intercepted function. By implementing the `HookBefore` interface, logic processing is performed before function execution. For example:

```java
@Component
public class BeforeXXXHook implements HookBefore {

    @Hook
    @Override
    public Object run(Function function, Object... args) {
        // Process input parameters and execute interceptor logic here
        return args;
    }

}
```

### 2、**Post-Interceptor**:

Its input and output parameters are the output parameters of the intercepted function. By implementing the `HookAfter` interface, the return value is processed after function execution. For example:

```java
@Component
public class AfterXXXHook implements HookAfter {

    @Hook
    @Override
    public Object run(Function function, Object ret) {
        // Process the return value and execute interceptor logic here
        return ret;
    }

}
```

## (Ⅲ) Interceptor Filtering and Activation Rules

You can use the non-mandatory fields `module`, `model`, `fun`, function type, and `active` of the `@Hook` annotation to filter interceptors that need to take effect for the current intercepted method. If no filtering attributes are configured, the interceptor will take effect for all functions.

## (Ⅳ) Interceptor Execution Order Adjustment

The execution order of interceptors can be flexibly adjusted according to the interceptor's `priority` attribute. The smaller the `priority` number, the earlier the interceptor executes. For example, when there are multiple pre-interceptors, the pre-interceptor with the smallest `priority` value will execute its logic first. This mechanism allows developers to finely control the logical extension of functions at different stages based on business needs, thereby improving system flexibility and maintainability.

## (Ⅴ) Notes

::: danger Warning

Since interceptors intercept all functions, if there are too many interceptors, it will inevitably lead to performance degradation.

:::
::: info Note

Backend programming-invoked function interceptors are not enabled by default. You can manually set meta directives to enable them, as shown in the example:
:::
```java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, parameters);
}, SystemDirectiveEnum.HOOK);
```

# IV. Trigger Triggers

A trigger is a mechanism that drives logic execution based on function execution events. The following details configuration, task types, etc.

## (Ⅰ) Enable Trigger Configuration

### 1、YMAL Configuration

Complete [event configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#3、配置中心-pamirs-zookeeper), [data record configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#ⅹ-data-record-configuration-pamirsrecordsql), and add dependencies on the `sql_record` and `trigger` modules. The specific configuration is as follows:

```yaml
spring:
  rocketmq:
    name-server: 127.0.0.1:9876 # RocketMQ NameServer address for producers and consumers to locate the cluster
    producer:
      enableMsgTrace: true       # Enable message trace tracking for troubleshooting message sending issues
      customizedTraceTopic: TRACE_PRODUCER # Custom message trace topic
    consumer:
      enableMsgTrace: true       # Enable message trace tracking on the consumer side
      customizedTraceTopic: TRACE_CONSUMER # Consumer-side custom trace topic
pamirs:
  event:
    enabled: true       # Globally control the enable status of the event function, default is true, true for enable, false for disable
    topic-prefix: oinone # Uniform prefix for all event topics to facilitate standardized topic name management
    notify-map:
      system: ROCKETMQ  # Message queue type for system messages,可选 (optional) ROCKETMQ, KAFKA, or RABBITMQ
      biz: ROCKETMQ     # Message queue type for business messages,可选 (optional) ROCKETMQ, KAFKA, or RABBITMQ
      logger: ROCKETMQ  # Message queue type for log messages,可选 (optional) ROCKETMQ, KAFKA, or RABBITMQ
    schedule:
      enabled: true    # Trigger switch, default is true
  record:
    sql:
      # This path specifies the storage directory for SQL log files and can be modified as needed
      store: /oinone/sql/record
  boot:
    modules:
      - sql_record
      - trigger
```

::: warning

The example uses rocketmq as the message queue, which can be switched to other message queues like Kafka or RabbitMQ.
:::
### 2、Dependency Addition

Introduce the following dependencies in the startup project:

```xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-sql-record-core</artifactId>
</dependency>
```
```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-bridge-tbschedule</artifactId>
</dependency>
```

## (Ⅱ) Triggered Tasks

### 1、Trigger Annotation

**Prerequisites**:

1. The function must be successfully registered with the system through the `Function` annotation in the program.
2. The input and output parameters of the function definition must be of the same model type.

**Usage Example**:

```java
@Fun("test.TestModel")
public class TestModelFunction {

    @Trigger(name = "Trigger on create", condition = TriggerConditionEnum.ON_CREATE)
    @Function
    public TestModel onCreate(TestModel data) {
        return data;
    }

    @Trigger(name = "Trigger on update", condition = TriggerConditionEnum.ON_UPDATE)
    @Function
    public TestModel onUpdate(TestModel before, TestModel after) {
        return data;
    }

    @Trigger(name = "Trigger on delete", condition = TriggerConditionEnum.ON_DELETE)
    @Function
    public TestModel onDelete(TestModel data) {
        return data;
    }
}
```

**Explanation**:

- Line 1: Register the function via annotation, used to define the function namespace, which is currently the model code.
- Lines 5, 11, 17: Register specific functions via annotation, marking functions to be registered with the system.
- Line 4: Register a trigger task via annotation, where the `name` attribute corresponds to the `displayName` in the model; the `condition` attribute corresponds to the `condition` in the model; the `active` attribute corresponds to the `active` in the model;

### 2、Business Module Configuration

The business module project needs to introduce the api package of the `trigger` module:

```xml
<dependency>
		<groupId>pro.shushi.pamirs.core</groupId>
		<artifactId>pamirs-trigger-api</artifactId>
</dependency>
```

## (Ⅲ) Scheduled Tasks

### 1、Definition of Scheduled Tasks

Oinone XSchedule is a functional module provided by the Oinone framework for implementing scheduled task scheduling, allowing developers to easily define and execute scheduled tasks in applications. The following is the usage description of Oinone XSchedule:

Define scheduled tasks by adding the `@XSchedule` annotation to methods. The `@XSchedule` annotation currently only supports configuring task execution time through the `cron` attribute, as shown in the example:

```java
@Component
@Fun(CronJobExample.FUN_NAMESPACE)
public class CronJobExample {
    String FUN_NAMESPACE = "test.CronJobExample";

    @XSchedule(cron = "0 0 10 * * *") // Execute at 10 AM daily
    @Function
    public void cronJob() {
        System.out.println("Cron job is running...");
    }
}
```

The above is the basic usage of Oinone XSchedule. Through these steps, you can easily implement scheduled task scheduling in Oinone applications.

::: warning

Oinone XSchedule has distributed characteristics and can automatically allocate a machine from the cluster to execute scheduled tasks. There is no need to manually handle task allocation and coordination in a distributed environment, making it suitable for complex systems with multi-node deployments, ensuring efficient and orderly task execution and reducing development and operation costs.
:::
::: info Note

Oinone XSchedule requires scheduled task functions to be **Oinone functions without input parameters**. When defining functions, be sure to follow this rule; otherwise, tasks will not execute normally, affecting the stability of the system scheduling function.
:::


### 2、Cron Expression Details

A Cron expression is a string used to define the execution time of scheduled tasks, composed of **6 mandatory fields** (seconds, minutes, hours, day of month, month, day of week) and **1 optional field** (year), with fields separated by spaces. Complex time rules can be flexibly configured through special character combinations, as described in detail below:

#### Expression Structure and Value Range

| **Field Name**         | **Value Range**                  | **Example**         |
| -------------------- | ----------------------------- | ---------------- |
| Seconds (Seconds)        | 0 - 59                        | 0 (0th second of the hour) |
| Minutes (Minutes)      | 0 - 59                        | 15 (15th minute)      |
| Hours (Hours)        | 0 - 23 (0 represents midnight)          | 8 (8 AM)   |
| Day of month (Day of month) | 1 - 31                        | 1 (1st day of each month)   |
| Month (Month)        | 1 - 12 or English abbreviations             | JAN (January)      |
| Day of week (Day of week)  | 0 - 6 (0 represents Sunday) or English abbreviations | SUN (Sunday)      |
| Year (Year)         | 1970 - 2099 (can be omitted)         | 2024 (specified year) |

#### Core Special Characters

| **Character** | **Meaning and Usage**                                               | **Example and Explanation**                                               |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `*`      | Wildcard, representing all possible values for the field                                 | `* * * * * *`: Execute every minute and second; `0 0 * * * *`: Execute at the 0th second of every hour |
| `,`      | Separate multiple values                                               | `0 0 8,12,16 * * *`: Execute at 8 AM, 12 PM, and 4 PM daily           |
| `-`      | Specify a continuous range                                               | `0 0 9-17 * * *`: Execute once every hour from 9 AM to 5 PM           |
| `/`      | Define interval frequency                                               | `0 0/15 * * * ?`: Execute every 15 minutes (starting from the 0th minute, i.e., 0, 15, 30, 45 minutes) |
| `?`      | Only used in **date** and **week** fields, indicating no specified value (both cannot set specific values simultaneously) | `0 0 12 * * ?`: Execute at 12 PM daily, no specified week; `0 0 12 1 * ?`: Execute at 12 PM on the 1st day of each month |
| `#`      | Only used in the **week** field, specifying the nth week X of the month                   | `0 0 12 ? * 1#3`: Execute at 12 PM on the third Monday of each month               |
| `L`      | Only used in **date** and **week** fields, representing "last"                | Date: `0 0 12 L * *`: Execute at 12 PM on the last day of each month; Week: `0 0 12 ? * 6L`: Execute at 12 PM on the last Saturday of each month |

#### Common Application Scenarios

| **Cron Expression**  | **Execution Rule**                   | **Application Scenario**             |
| ---------------- | ------------------------------ | ------------------------ |
| `0 0 12 * * *`   | Execute at 12 PM daily             | Daily data statistics, regular backups   |
| `0 15 10 * * *`  | Execute at 10:15 AM daily         | Morning task triggering             |
| `0 0 0 1 1 *`    | Execute at 12 AM on January 1st each year    | Annual data initialization, cross-year tasks |
| `0 0 12 ? * WED` | Execute at 12 PM every Wednesday           | Periodic maintenance, weekly report generation |
| `0 0 12 L * ?`   | Execute at 12 PM on the last day of each month     | End-of-month data settlement             |
| `0 0 12 ? * 2#3` | Execute at 12 PM on the third Tuesday of each month | Task scheduling for specific weeks         |

::: info Usage Notes

- **System Differences**: There are subtle differences in Cron expression support between different frameworks (e.g., Spring, Linux Cron), so refer to the corresponding documentation.
- **Date and Week Conflicts**: When setting both **date** and **week** fields, one must be replaced with `?` to avoid logical contradictions.
- **Time Zone Impact**: Expression time calculations depend on the server time zone, and cross-regional tasks require additional time zone conversion processing.
- **Complex Rule Verification**: Use online tools (e.g., [CronMaker](https://www.cronmaker.com/)) to verify expression accuracy and prevent configuration errors.
:::
By reasonably combining special characters, Cron expressions can meet various定时 (scheduled) requirements from simple to complex, widely used in automated task scenarios such as database maintenance, log cleanup, and data synchronization.

## (Ⅳ) Asynchronous Tasks

Asynchronous tasks are commonly used patterns in distributed development, widely applied in high-concurrency processing, time-consuming task decoupling, and other scenarios. The following is a detailed usage description of asynchronous tasks in Oinone:

### 1、Definition of Asynchronous Tasks

Define asynchronous tasks through annotations and interface implementations, as shown in the example:

```java
@Fun(XAsyncService.FUN_NAMESPACE)
public interface XAsyncService {
    String FUN_NAMESPACE = "test.XAsyncService";
    @Function
    public void testXAsync(TestModel testModel);
}



@Fun(XAsyncService.FUN_NAMESPACE)
@Component
public class XAsyncServiceImpl implements XAsyncService {
    @Override
    @Function
    @XAsync(displayName = "Asynchronous example", limitRetryNumber = 3, nextRetryTimeValue = 60)
    public void testXAsync(TestModel testModel) {
        // do something
    }
}
```

**Annotation Parameter Description**:

- `displayName`: Define the display name of the asynchronous task for easy identification and management.
- `limitRetryNumber`: Set the maximum number of retries after task failure, with a default value of `-1` (infinite retries).
- `nextRetryTimeValue`: Specify the interval duration for task retries after failure, with a default value of `60`.
- `nextRetryTimeUnit`: Define the time unit for retry intervals, with a default value of `TimeUnitEnum.SECOND` (seconds).
- `delayTime`: Set the duration for delayed task execution, with a default value of `0` (immediate execution).
- `delayTimeUnit`: Define the time unit for delayed execution, with a default value of `TimeUnitEnum.SECOND` (seconds).

### 2、Execution Unit Isolation in Multi-Application Scenarios

In a distributed environment with multiple modules started independently (boot), to avoid repeated execution of asynchronous tasks, implement task data isolation through configuration:

```yaml
pamirs:
  event:
    schedule:
      ownSign: demo
```

By setting the `pamirs.event.schedule.ownSign` parameter, different applications can isolate task data based on custom identifiers (e.g., `demo`). After configuration, each application only processes its own asynchronous tasks, ensuring task execution uniqueness and accuracy, and improving system operation efficiency and stability.

# V. Built-in Functions

Built-in functions are pre-defined functions in the system, supporting direct invocation in expressions, covering various functional types, as follows:

## (Ⅰ) General Functions

### 1、Mathematical Functions

| **Expression**  | **Name** | **Description**                               | **Example**            |
| ----------- | -------- | -------------------------------------- | ------------------- |
| ABS         | Absolute value   | Get the absolute value of a number                       | ABS(number)         |
| FLOOR       | Floor        | Round a number down                         | FLOOR(number)       |
| CEIL        | Ceiling        | Round a number up                         | CEIL(number)        |
| ROUND       | Round        | Round a number to the nearest integer                     | ROUND(number)       |
| MOD         | Modulo       | Calculate the remainder of A divided by B                   | MOD(A, B)           |
| SQRT        | Square root    | Calculate the square root of a number                       | SQRT(number)        |
| SIN         | Sine         | Calculate the sine value of a number                       | SIN(number)         |
| COS         | Cosine       | Calculate the cosine value of a number                       | COS(number)         |
| PI          | Pi           | Return the value of pi                         | PI()                |
| ADD         | Add          | Calculate the sum of A and B                       | ADD(A, B)           |
| SUBTRACT    | Subtract     | Calculate the difference between A and B                       | SUBTRACT(A, B)      |
| MULTIPLY    | Multiply     | Calculate the product of A and B                     | MULTIPLY(A, B)      |
| DIVIDE      | Divide       | Calculate the quotient of A divided by B                     | DIVIDE(A, B)        |
| MAX         | Max          | Return the maximum value in a collection (parameter is a collection or array) | MAX(collection)     |
| MIN         | Min          | Return the minimum value in a collection (parameter is a collection or array) | MIN(collection)     |
| SUM         | Sum          | Return the total of a collection (parameter is a collection or array) | SUM(collection)     |
| AVG         | Average      | Return the average of a collection (parameter is a collection or array) | AVG(collection)     |
| COUNT       | Count        | Return the total number of elements in a collection (parameter is a collection or array) | COUNT(collection)   |
| UPPER_MONEY | Uppercase amount | Convert a number or numeric string to uppercase amount format | UPPER_MONEY(number) |
| POW  | Power Operation | Calculate the power of number A to number B | POW(A, B) |
| LOG  | Logarithmic Operation | Calculate the logarithm of number A with base number B | LOG(A, B) |

### 2、Text Functions

| **Expression**  | **Name**             | **Description**                                            | **Example**                        |
| ----------- | -------------------- | --------------------------------------------------- | ------------------------------- |
| TRIM        | Empty string filter         | Remove leading and trailing spaces from a text string, return empty for empty string              | TRIM(text)                      |
| IS_BLANK    | Is empty string       | Determine if a text string is empty                              | IS_BLANK(text)                  |
| STARTS_WITH | Starts with specified string | Determine if text starts with start string, handle empty text as empty string | STARTS_WITH(text, start)        |
| ENDS_WITH   | Ends with specified string | Determine if text ends with end string, handle empty text as empty string   | ENDS_WITH(text, end)            |
| CONTAINS    | Contains               | Determine if text contains subtext, handle empty text as empty string      | CONTAINS(text, subtext)         |
| LOWER       | Lowercase              | Convert text string to lowercase, handle empty text as empty string            | LOWER(text)                     |
| UPPER       | Uppercase              | Convert text string to uppercase, handle empty text as empty string            | UPPER(text)                     |
| REPLACE     | Replace string           | Replace oldtext with newtext in text                   | REPLACE(text, oldtext, newtext) |
| LEN         | Get string length       | Get the length of a text string, handle empty text as empty string                | LEN(text)                       |
| JOIN        | Join strings           | Join text with join string, handle empty text as empty string        | JOIN(text, join)                |
| PARSE       | Deserialize JSON string | Convert a JSON string to a collection or Map                      | PARSE(text)                     |
| JSON        | Serialize to JSON string | Convert an object to a JSON string                            | JSON(object)                    |
| NOT_CONTAINS  | Not Contain | Determine whether the text string "text" does not contain the text string "subtext". When "text" is empty, it is treated as an empty string | NOT_CONTAINS(text, subtext) |
| SUBSTRING_END | Extract Substring from Specified Position to End | Extract the substring of the "Hello" string from position 1 to the end, returning "ello" | SUBSTRING_END("Hello", 1)      |
| SUBSTRING     | Extract Substring from Specified Positions       | Extract the substring of the "Hello" string from position 1 to position 3, returning "el" | SUBSTRING("Hello", 1, 3)       |

### 3、Regular Expression Functions

| Expression                 | Name                         | Description                                                         |
| ---------------------- | ---------------------------- | ------------------------------------------------------------ |
| MATCHES                | Regular expression matching                     | Function scenario: Expression function example: MATCHES(text, regex) Function description: Verify if a string meets regular expression matching, e.g., regex is [a-zA-Z][a-zA-Z0-9]*$ to verify if text matches |
| CHECK_PHONE            | Phone number verification                   | Function scenario: Expression function example: CHECK_PHONE(text) Function description: Verify if a phone number is correct |
| CHECK_EMAIL            | Email verification                     | Function scenario: Expression function example: CHECK_EMAIL(text) Function description: Verify if an email is correct |
| CHECK_USER_NAME        | User name verification                   | Function scenario: Expression function example: CHECK_USER_NAME(text) Function description: Verify if a user name is correct |
| CHECK_PWD              | Password strength verification                 | Function scenario: Expression function example: CHECK_PWD(text) Function description: Determine if a password meets strength verification |
| CHECK_INTEGER          | Integer verification                     | Function scenario: Expression function example: CHECK_INTEGER(text) Function description: Verify if it is an integer |
| CHECK_ID_CARD          | ID card verification                   | Function scenario: Expression function example: CHECK_ID_CARD(text) Function description: Verify if an ID card is correct |
| CHECK_URL              | Legal URL verification                  | Function scenario: Expression function example: CHECK_URL(text) Function description: Verify if a URL is correct |
| CHECK_CHINESE          | Chinese verification                     | Function scenario: Expression function example: CHECK_CHINESE(text) Function description: Verify if it is Chinese text |
| CHECK_NUMBER           | Pure number verification                   | Function scenario: Expression function example: CHECK_NUMBER(text) Function description: Verify if it is a pure number |
| CHECK_TWO_DIG          | Verify if two decimal places             | Function scenario: Expression function example: CHECK_TWO_DIG(text) Function description: Verify if two decimal places |
| CHECK_IP               | IP address verification                   | Function scenario: Expression function example: CHECK_IP(text) Function description: Verify if an IP address is correct |
| CHECK_CONTAINS_CHINESE | Contains Chinese verification                 | Function scenario: Expression function example: CHECK_CONTAINS_CHINESE(text) Function description: Verify if it contains Chinese |
| CHECK_SIZE_MAX         | Only input n characters              | Function scenario: Expression function example: CHECK_SIZE_MAX(text,n) Function description: Only input n characters |
| CHECK_SIZE_MIN         | At least input n characters              | Function scenario: Expression function example: CHECK_SIZE_MIN(text,n) Function description: At least input n characters |
| CHECK_SIZE             | Input m-n characters                | Function scenario: Expression function example: CHECK_SIZE(text,m,n) Function description: Input m-n characters |
| CHECK_CODE             | Can only be composed of English, numbers, and underscores | Function scenario: Expression function example: CHECK_CODE(text) Function description: Can only be composed of English, numbers, and underscores |
| CHECK_ENG_NUM          | Can only contain English and numbers           | Function scenario: Expression function example: CHECK_ENG_NUM(text) Function description: Can only contain English and numbers |

### 4、Time Functions

| **Expression**   | **Name**             | **Description**                                        | **Example**                 |
| ------------ | -------------------- | ------------------------------------------------- | ------------------------ |
| NOW          | Return current time         | Get the current system time                                | NOW()                    |
| NOW_STR      | Return current time string   | Get the current time string (format: yyyy-MM-dd hh:mm:ss) | NOW_STR()                |
| TODAY_STR    | Return today's date string | Get the current date string (format: yyyy-MM-dd)          | TODAY_STR()              |
| ADD_DAY      | Add/subtract specified days         | Add or subtract specified days from a date (negative for subtraction)              | ADD_DAY(date, days)      |
| ADD_MONTH    | Add/subtract specified months       | Add or subtract specified months from a date (negative for subtraction)            | ADD_MONTH(date, months)  |
| ADD_YEAR     | Add/subtract specified years        | Add or subtract specified years from a date (negative for subtraction)            | ADD_YEAR(date, years)    |
| TO_DATE      | Convert to time           | Convert a string to a time object according to a specified format                | TO_DATE(date, pattern)   |
| ADD_WORK_DAY | Add/subtract working days       | Add or subtract working days from a date (automatically skip weekends)          | ADD_WORK_DAY(date, days) |
| YEAR  | Extract Year | Extract the year from the date | YEAR(date)  |
| MONTH | Extract Month | Extract the month from the date | MONTH(date) |
| DAY   | Extract Day | Extract the day from the date | DAY(date)   |

### 5、Collection Functions

| **Expression**                 | **Name**                 | **Description**                                                     | **Example**                                         |
| -------------------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| LIST_GET                   | Get collection element             | Get the element at the specified index in the collection                                 | LIST_GET(list, index)                            |
| LIST_IS_EMPTY              | Determine if collection is empty         | Determine if the collection is empty                                             | LIST_IS_EMPTY(list)                              |
| LIST_CONTAINS              | Determine if collection contains element     | Determine if the collection contains the specified element                                   | LIST_CONTAINS(list, item)                        |
| LIST_ADD                   | Add element to collection           | Add an element to the end of the collection                                       | LIST_ADD(list, item)                             |
| LIST_ADD_BY_INDEX          | Add element to specified position       | Add an element to the specified index in the collection                               | LIST_ADD_BY_INDEX(list, index, item)             |
| LIST_REMOVE                | Remove collection element           | Remove the specified element from the collection                                       | LIST_REMOVE(list, item)                          |
| LIST_COUNT                 | Get collection element count         | Return the total number of elements in the collection                                   | LIST_COUNT(list)                                 |
| LIST_IDS                   | Get collection all ids          | Get a list of ids of all objects in the collection                                   | LIST_IDS(list)                                   |
| LIST_FIELD_VALUES          | Convert attribute collection        | Convert an object collection to a collection of specified attribute values                     | LIST_FIELD_VALUES(list, model, field)            |
| LIST_FIELD_EQUALS          | Determine attribute value match       | Determine if attribute values in the object collection match the specified value, returning a boolean collection           | LIST_FIELD_EQUALS(list, model, field, value)     |
| LIST_FIELD_NOT_EQUALS      | Determine attribute value mismatch     | Determine if attribute values in the object collection do not match the specified value, returning a boolean collection         | LIST_FIELD_NOT_EQUALS(list, model, field, value) |
| LIST_FIELD_IN              | Determine attribute value in collection   | Determine if attribute values in the object collection are in the specified collection, returning a boolean collection         | LIST_FIELD_IN(list, model, field, list)          |
| LIST_FIELD_NOT_IN          | Determine attribute value not in collection | Determine if attribute values in the object collection are not in the specified collection, returning a boolean collection       | LIST_FIELD_NOT_IN(list, model, field, list)      |
| LIST_AND                   | Boolean collection logical AND        | Perform logical AND operation on a boolean collection, returning a boolean value                     | LIST_AND(list)                                   |
| LIST_OR                    | Boolean collection logical OR         | Perform logical OR operation on a boolean collection, returning a boolean value                      | LIST_OR(list)                                    |
| STRING_LIST_TO_NUMBER_LIST | Character collection to numeric collection | Convert a character collection to a numeric collection, returning the original collection on conversion failure               | STRING_LIST_TO_NUMBER_LIST(list)                 |
| COMMA                      | Collection element comma concatenation    | Concatenate collection elements with commas (elements must be Number or String)            | COMMA(list)                                      |
| CONCAT                     | Collection element specified symbol concatenation | Concatenate collection elements with a specified symbol (elements must be Number or String)        | CONCAT(list, split)                             |

### 6、Key-Value Pair Functions

| **Expression**   | **Name**           | **Description**                 | **Example**                 |
| ------------ | ------------------ | ------------------------ | ------------------------ |
| MAP_GET      | Get key-value pair value     | Get the value of a specified key from a key-value pair       | MAP_GET(map, key)        |
| MAP_IS_EMPTY | Determine if key-value pair is empty | Determine if a key-value pair is empty             | MAP_IS_EMPTY(map)        |
| MAP_PUT      | Add key-value to key-value pair   | Add a new key-value pair to the key-value pair         | MAP_PUT(map, key, value) |
| MAP_REMOVE   | Remove key-value pair element   | Remove a specified key from the key-value pair         | MAP_REMOVE(map, key)     |
| MAP_COUNT    | Get key-value pair count     | Return the total number of key-value pairs in the key-value pair | MAP_COUNT(map)           |


### 7、Object Functions

| **Expression** | **Name**       | **Description**                        | **Example**                      |
| ---------- | -------------- | ------------------------------- | ----------------------------- |
| IS_NULL    | Is Null        | Determine if an object is null, return true if null | IS_NULL(object)                |
| EQUALS     | Equals         | Determine if two objects are equal            | EQUALS(A, B)                  |
| FIELD_GET  | Get Object Attribute | Get attribute value from an object via dot expression  | FIELD_GET(obj, dotExpression) |

### 8、Logical Functions

| **Expression** | **Name**   | **Description**                       | **Example**                  |
| ---------- | ---------- | ------------------------------ | ------------------------- |
| IF         | If Condition | Return different results based on conditions, supports nesting | IF(condition, result1, result2) |
| AND        | Logical AND  | Return the logical AND result of two conditions       | AND(condition1, condition2)      |
| OR         | Logical OR   | Return the logical OR result of two conditions        | OR(condition1, condition2)       |
| NOT        | Logical NOT  | Return the logical NOT result of a condition           | NOT(condition)                |

## (Ⅱ) Scenario-Specific Functions

### 1、Business Functions

| **Expression**      | **Name**            | **Description**                  | **Example**          |
| --------------- | ------------------- | ------------------------- | ----------------- |
| CURRENT_CORP_ID | Get Current User Company ID | Get the ID of the company to which the current user belongs | CURRENT_CORP_ID() |
| CURRENT_CORP    | Get Current User Company    | Get the company object of the current user  | CURRENT_CORP()    |
| CURRENT_SHOP_ID | Get Current User Shop ID   | Get the ID of the shop to which the current user belongs | CURRENT_SHOP_ID() |
| CURRENT_SHOP    | Get Current User Shop     | Get the shop object of the current user    | CURRENT_SHOP()    |

View implementation code: pro.shushi.pamirs.framework.faas.fun.builtin.business.BusinessFunctions, which requires implementing the corresponding SPI.

### 2、Context Functions

| **Expression**         | **Name**                 | **Description**                      | **Example**             |
| ------------------ | ------------------------ | ----------------------------- | -------------------- |
| CURRENT_UID        | Get Current User ID          | Get the ID of the currently logged-in user         | CURRENT_UID()        |
| CURRENT_USER_NAME  | Get Current User Name           | Get the user name of the currently logged-in user      | CURRENT_USER_NAME()  |
| CURRENT_USER       | Get Current User             | Get the user object of the currently logged-in user          | CURRENT_USER()       |
| CURRENT_ROLE_IDS   | Get Current User Role IDs List | Get all role IDs of the current user     | CURRENT_ROLE_IDS()   |
| CURRENT_ROLES      | Get Current User Roles List    | Get all roles of the current user        | CURRENT_ROLES()      |
| CURRENT_PARTNER_ID | Get Current User Partner ID  | Get the ID of the partner to which the current user belongs | CURRENT_PARTNER_ID() |
| CURRENT_PARTNER    | Get Current User Partner     | Get the partner object of the current user    | CURRENT_PARTNER()    |

View implementation code: pro.shushi.pamirs.framework.faas.fun.builtin.ContextFunctions.

## (Ⅲ) Extending Built-in Functions

Developing expression functions in Oinone follows a similar process to defining regular functions, with the key difference being the specification of the **function namespace**: the `namespace` must be set to `NamespaceConstants.expression` to clarify that the function is for expression calculation scenarios. The specific example is as follows:

```java
@Fun(NamespaceConstants.expression)
public class TestExpressionFunctions {
    // Get current user language
    @fun("CURRENT_USER_LANG")
    @Function(
        name = "CURRENT_USER_LANG",
        scene = {FunctionSceneEnum.EXPRESSION},
        openLevel = {FunctionOpenEnum.LOCAL},
        summary = "Function example: CURRENT_USER_LANG()\nFunction description: Get current user language"
    )
    public static ResourceLang currentUserLang() {
        return CommonApiFactory.getApi(UserService.class).queryById((Long)PamirsSession.getUserId()).getLang();
    }
}
```

# VI. Expressions

An expression is a combination of numbers, operators, functions, number grouping symbols (parentheses), free variables, and bound variables, arranged meaningfully to obtain a numerical value. Bound variables have specified values within the expression, while free variables can have values specified outside the expression.

Expressions can use operators (+, -, *, /, &&, ||, !, ==, !=), dot expressions (e.g., ModelA.fieldC.relatedModelFieldA), and built-in functions. The expression format is like: IF(ISNULL(ModelA.fieldX), ModelA.fieldY.relatedModelFieldZ, ModelA.fieldM).

In expressions, the front-end display of model fields uses the display name `displayName`, while the original expression content uses the technical name `name`.

## (Ⅰ) Dot Expressions

A dot expression is a subset of expressions, composed of a variable name and a dot. The variable before the dot and the variable after the dot have a subordinate relationship, with the variable after the dot being subordinate to the one before. Dot expressions can be used to obtain the value of the variable after the last dot determined by the full expression.

## (Ⅱ) Regular Expressions

| Corresponding Built-in Function           | Description                         | Regular Expression                                                   |
| ---------------------- | ---------------------------- | ------------------------------------------------------------ |
| CHECK_PHONE            | Phone Number Validation                   | ^(1[3-9])\\\d{9}$                                             |
| CHECK_EMAIL            | Email Validation                     | ^[a-z0-9A-Z]+[-\|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\\.)+[a-z]{2,}$ |
| CHECK_USER_NAME        | User Name Validation                   | Non-empty validation                                                     |
| CHECK_PWD              | Password Strength Validation (Strong Password)     | ^(?=.\*[a-z])(?=.\*[A-Z])[a-zA-Z0-9~!@&%#_(.)]{8,16}$          |
| CHECK_INTEGER          | Integer Validation                     | ^-{0,1}[1-9]\d*$                                             |
| CHECK_ID_CARD          | ID Card Validation                   | \^\d{15}$)\|(\^\d{18}$)\|(^\d{17}(\d\|X\|x)$                   |
| CHECK_URL              | Valid URL Validation                  | ^(?\:(?:https?)\://)(?\:(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|[1-9])(?:\\.(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|\d)){2}(?:\\.(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|\d))\|(?\:(?:[a-z\u00a1-\uffff0-9]-\*)\*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]-\*)\*[a-z\u00a1-\uffff0-9]+)\*)(?:\:([1-9]\|[1-9]\d\|[1-9]\d{2}\|[1-9]\d{3}\|[1-5]\d{4}\|6[0-4]\d{3}\|65[0-4]\d{2}\|655[0-2]\d\|6553[0-5]))?(?\:/\S*)?$ |
| CHECK_CHINESE          | Chinese Validation                     | ^[\u4e00-\u9fa5]{0,}$                                        |
| CHECK_NUMBER           | Pure Number Validation                   | ^[0-9]*$                                                     |
| CHECK_TWO_DIG          | Verify Two Decimal Places             | ^[0-9]+(\\.[0-9]{2})?$                                        |
| CHECK_IP               | IP Address Validation                   | ^((2[0-4]\d\|25[0-5]\|[01]?\d\d?)\\.){3}(2[0-4]\d\|25[0-5]\|[01]?\d\d?)$ |
| CHECK_CONTAINS_CHINESE | Contains Chinese Validation                 | ^.?[\u4e00-\u9fa5]{0,}.?$                                    |
| CHECK_SIZE             | Only Input n Characters              | ^.{n}$                                                       |
| CHECK_SIZE_MIN         | At Least Input n Characters              | ^.{n,}$                                                      |
| CHECK_SIZE_MAX         | At Most Input n Characters              | ^.{0,n}$                                                     |
| CHECK_SIZE_RANGE       | Input m-n Characters                | ^.{m,n}$                                                     |
| CHECK_CODE             | Only Composed of English, Numbers, and Underscores | ^[a-z0-9A-Z_]*$                                              |
| CHECK_ENG_NUM          | Only Contains English and Numbers           | ^[a-z0-9A-Z]*$                                               |

## (Ⅲ) Built-in Variables

In expressions, dot expressions can be used to obtain attributes of built-in variables and attributes of their sub-attributes. For example, use `activeRecord` to get the current record, and `activeRecord.id` to get the ID of the currently selected row record.

### 1、Data Variables

| Variable         | Name             | Description                                                         |
| ------------ | ---------------- | ------------------------------------------------------------ |
| activeRecord | Current Selection Value       | When initializing the view after selecting a single row record, the value is the single selected record; when initializing after selecting multiple row records, the value is the list of selected records; during full form validation, the value is the submitted record of the current form; during single field validation, the value is the current field value. When used as an action filtering condition, the value is the action model definition data. |
| activeModel  | Model of Current Selection Value | The model of the currently selected record, which may be empty                                 |
| activeField  | Field of Current Selection Value | The field of the currently selected record, which may be empty                                 |

### 2、Context Variables

| Variable              | Name         | Description                                                         |
| ----------------- | ------------ | ------------------------------------------------------------ |
| module            | Module         | Usage example: context.module Example description: Execution module in the request context     |
| requestFromModule | Request Initiating Module | Usage example: context.requestFromModule Example description: Request initiating module in the request context |
| lang              | Language         | Usage example: context.lang Example description: Language in the request context           |
| country           | Country         | Usage example: context.country Example description: Country in the request context        |
| env               | Environment         | Usage example: context.env Example description: Environment in the request context            |
| extend            | Extended Information     | Usage example: context.extend.extendedVariableName Example description: Extended information in the request context |

## (Ⅳ) Built-in Functions

The built-in functions described in the built-in functions section can be used in expressions. For example, use `ABS(activeRecord.amount)` to get the absolute value of the amount in the currently selected record.

# VII. Transaction Control

In the Oinone platform, transaction management is a core function to ensure data consistency and reliability. Its design is deeply compatible with the Spring transaction mechanism while being enhanced for multi-data source scenarios to ensure stable operation in high-concurrency environments.

## (Ⅰ) Function-Level Transaction Configuration

Transaction configuration for functions (`Function`) follows the principle of **minimal intrusion**, with transactions disabled by default:

- `isTransaction`: Transaction switch, default off (`false`)
- `propagationBehavior`: Transaction propagation behavior, default `PROPAGATION_SUPPORTS`, which prefers to use an existing transaction or execute in non-transactional mode if none exists
- `isolationLevel`: Transaction isolation level, default inherits the database's native configuration

The platform also provides global transaction configuration capabilities, supporting unified adjustment of transaction strategies to meet project-level customization needs.

## (Ⅱ) Transaction Management Capabilities

In Oinone's transaction management system, multi-mode compatibility and multi-data source enhancement are two core advantages, jointly providing solid guarantees for data consistency and system stability in complex business scenarios.

Oinone seamlessly integrates with Spring's declarative and programmatic transactions, providing developers with rich and flexible transaction management methods.

### 1、Declarative Transactions

Developers can easily apply transaction management to classes or methods through the `@PamirsTransactional` annotation, which is fully compatible with Spring's `@Transactional` annotation. The following is an example:

```java
@Fun(TestModelHelloService.FUN_NAMESPACE)
@Component
public class TestModelHelloServiceImpl implements TestModelHelloService {

    @Override
    @PamirsTransactional
    //@Transactional // Fully compatible with Spring's annotation
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public TestModel sayHello(TestModel data) {
        // Business logic processing
        return data;
    }
}
```

### 2、Programmatic Transactions

Oinone's `PamirsTransactionTemplate` has a consistent programming interface with Spring's `TransactionTemplate`. In high-concurrency scenarios, the programmatic transaction development mode has significant performance advantages, allowing developers to finely control the duration of transaction opening and complete time-consuming query work and data preparation as much as possible before transaction opening. The basic usage pattern is as follows:

```java
Tx.build(new TxConfig().setPropagation(Propagation.REQUIRED.value())).executeWithoutResult(status -> {
    // Execution logic
});
```

In this way, developers can more flexibly control transaction boundaries, thereby improving overall system performance.

### 3、Multi-Data Source Enhancement

Oinone's transaction management demonstrates strong adaptability and reliability in multi-data source environments.

- Multi-Database Transaction Support

A key difference between `PamirsTransactional` and Spring's `Transactional` is that `PamirsTransactional` supports multi-database transactions. Although such multi-database transactions are not strictly distributed multi-database transactions, they can meet the needs of most practical business scenarios.

- Intelligent Lock Mechanism

Oinone supports nested independent transactions for multiple data sources and effectively avoids deadlock risks through an intelligent lock mechanism. This mechanism ensures stable system operation in complex multi-data source environments and prevents system failures caused by deadlocks.

- Built-in Isolation Strategy

To ensure data consistency in multi-data source and table sharding scenarios, Oinone has built-in powerful isolation strategies to eliminate dirty reads. This strategy guarantees data accuracy and integrity during concurrent operations, providing a strong guarantee for normal business operations.

## (Ⅲ) Core Transaction Characteristics

| **Characteristic** | **Definition**                                             | **Application Value**                 |
| -------- | ---------------------------------------------------- | ---------------------------- |
| Atomicity   | Transaction operations are indivisible; all operations are either all committed or all rolled back | Avoid data inconsistency caused by partial success |
| Consistency   | Data integrity remains consistent before and after transaction execution                       | Ensure business logic correctness           |
| Isolation   | Concurrent transactions are isolated from each other and do not interfere                         | Improve data access reliability           |
| Durability   | Data is permanently saved to disk after transaction commit                           | Ensure data security and no loss           |

## (Ⅳ) Transaction Isolation Levels

### 1、Concurrent Access Risks

Without configured isolation mechanisms, concurrent transactions may cause the following issues:

| **Issue Type** | **Description**                           | **Typical Scenario**               |
| ------------ | ---------------------------------- | -------------------------- |
| Dirty Read         | A transaction reads updated data from other uncommitted transactions | Balance query during an uncommitted bank transfer |
| Non-Repeatable Read   | Inconsistent query results within the same transaction       | Data modification during order query   |
| Phantom Read         | New or disappearing data occurs during transaction execution | Change in the number of data rows during batch operations   |

### 2、Supported Isolation Levels

| **Isolation Level**       | **Description**                                                  | **Risk Mitigation**   | **Performance Impact** |
| ------------------ | --------------------------------------------------------- | -------------- | ------------ |
| `DEFAULT`          | Adopts the database's default isolation (Read Committed for Oracle, Repeatable Read for MySQL) | Basic protection       | Low           |
| `READ_UNCOMMITTED` | The lowest level, allowing dirty reads                                        | No protection         | Lowest         |
| `READ_COMMITTED`   | Only reads committed data, with risks of non-repeatable reads and phantom reads                | Avoids dirty reads       | Medium           |
| `REPEATABLE_READ`  | Ensures consistent query results within the same transaction, but phantom reads are still possible                  | Solves non-repeatable reads | Medium-high         |
| `SERIALIZABLE`     | The highest level, completely eliminating all concurrency issues through serialization                  | Full protection       | Highest         |

## (Ⅴ) Transaction Propagation Behavior

Transaction propagation behavior defines the transaction processing strategy for method calls:

### 1、Same Transaction Scenarios

- `PROPAGATION_REQUIRED`: The default strategy; if no transaction exists, create a new one; if existing, reuse it
- `PROPAGATION_SUPPORTS`: Prefers to use an existing transaction; if none exists, execute in non-transactional mode
- `PROPAGATION_MANDATORY`: Must execute in a transaction environment; otherwise, throw an exception

### 2、Independent Transaction Scenarios

- `PROPAGATION_REQUIRES_NEW`: Suspend the current transaction and create a brand-new independent transaction
- `PROPAGATION_NOT_SUPPORTED`: Force non-transactional execution and suspend existing transactions
- `PROPAGATION_NEVER`: Prohibit transaction environments; throw an exception if a transaction exists
- `PROPAGATION_NESTED`: Create a nested transaction within the existing transaction

### 3、Special Notes on Nested Transactions

When method A nests method B's transaction (`PROPAGATION_REQUIRES_NEW`), method B must be in a different class from A to avoid potential invocation conflicts. The rollback strategies for different exception scenarios are as follows:

| **Scenario**       | `PROPAGATION_REQUIRES_NEW`                    | `PROPAGATION_NESTED` | `PROPAGATION_REQUIRED` |
| -------------- | ------------------------------------------------- | ------------------------ | -------------------------- |
| A exceptions, B normal | A rolls back, B commits                                    | A and B roll back together          | A and B roll back together            |
| A normal, B exceptions | ①A catches: B rolls back, A commits ②A does not catch: B rolls back, A rolls back | B rolls back, A commits           | A and B roll back together            |
| Both A and B exceptions  | B rolls back, A rolls back                                    | A and B roll back together          | A and B roll back together            |
| Both A and B normal  | B commits first, A commits later                                | A and B commit together          | A and B commit together            |

Through the complete transaction management system described above, the Oinone platform provides developers with flexible and reliable transaction processing solutions, effectively addressing data consistency challenges in complex business scenarios.