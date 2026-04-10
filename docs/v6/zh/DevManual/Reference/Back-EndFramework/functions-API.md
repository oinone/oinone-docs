---
title: 函数 API（Functions API）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
order: 3

---
# 一、函数定义

Oinone 提供了多种环境配置和方法注解，用于规范模型方法行为及数据交互逻辑。以下是核心注解的详细说明：

## （一）函数来源类型

### 1、常规函数 Function

#### 模型类中的函数定义

在模型类中定义函数时，需通过注解明确其功能属性：

``` java
@Model.model(TestModel.MODEL_MODEL)
@Model(displayName = "TestModel")
public class TestModel extends IdModel {
    public static final String MODEL_MODEL = "test.TestModel";

    // 函数开放级别设为API，将基于graphQL协议构建HTTP服务接口
    // 操作语义为QUERY，对应接口将归类到graphQL的query字段下，否则归到mutation
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public TestModel sayHello(TestModel data) {
        // 业务逻辑处理
        return data;
    }
}
```

#### 接口与实现类配置

**接口定义**：在接口方法上添加 `@Function` 注解，确保其他模块依赖 API 包时，自动注册远程服务消费者。

``` java
@Fun(TestModel.MODEL_MODEL)
// 可二选一使用@Model.model注解指定命名空间
// @Model.model(TestModel.MODEL_MODEL)
public interface TestModelHelloService {
    @Function
    PetShop sayHello(TestModel data);
}
```

**实现类配置**：实现类需同步添加 `@Fun` 和 `@Function` 注解，继承接口功能属性：

``` java
@Fun(TestModel.MODEL_MODEL)
// 可二选一使用@Model.model注解指定命名空间
// @Model.model(TestModel.MODEL_MODEL)
@Component
public class TestModelHelloServiceImpl implements TestModelHelloService {
    @Override
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public PetShop sayHello(TestModel data) {
        // 业务逻辑处理
        return data;
    }
}
```

这类函数独立于模型定义，但通过绑定关系与模型产生联系，可用于补充或扩展模型功能。

#### 独立函数接口与实现

若函数作为独立公共逻辑单元，可通过命名空间区分：

``` java
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
        // 业务逻辑处理
        return data;
    }
}
```

此类函数作为通用的公共逻辑存在，不与特定模型绑定，常用于处理多个业务场景中重复的逻辑代码

**核心要点**：

- 通过 `@Function` 系列注解控制函数开放级别、操作语义及接口构建规则；
- 接口方法必须添加 `@Function` 注解以支持远程服务自动注册；
- 实现类需同步注解，确保与接口配置一致，避免服务调用异常。

### 2、扩展点函数 Extpoint

扩展点函数用于对已有功能进行扩展，通过接口和实现类实现。

``` java
@Ext(TestModel.class)
public interface TestModelExtpoint {
    @ExtPoint(displayName = "TestModel的create函数前置扩展点")
    public TestModel createBefore(TestModel data);
}

@Ext(TestModel.class)
public class TestModelExtpointImpl implements TestModelExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "TestModel的create函数前置扩展点实现",expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("TestModel的create函数前置扩展点实现");
        return data;
    }
}
```

### 3、拦截器函数 Hook

拦截器函数可在函数执行前后进行拦截处理。

``` java
@Component
public class TestModelCreateBeforeHook implements HookBefore {

    @Override
    @Hook(model = {TestModel.MODEL_MODEL},fun = {"create"},priority = 1)
    public Object run(Function function, Object... args) {
        PamirsSession.getMessageHub().info("TestModel的create函数BeforeHook");
        return args;
    }

}
```

### 4、服务端动作函数 ServerAction

服务器动作函数可在页面上触发特定操作。

``` java
@Model.model(TestActionModel.MODEL_MODEL)
public class TestActionModelAction {

    @Action.Advanced(invisible = ExpConstants.idValueNotExist)//页面上Id为空是隐藏
    @Action(displayName = "actionDoSomething", bindingType = {ViewTypeEnum.FORM,ViewTypeEnum.TABLE})
    public TestActionModel actionDoSomething(TestActionModel testActionModel){
        //do something
        return testActionModel;
    }
}
```

## （二）函数调用方式

在系统中，函数的调用方式丰富多样，主要涵盖以下几种：

1. **使用函数管理器通过命名空间和函数编码调用**：借助函数管理器，依据命名空间和函数编码来实现函数调用，具体方式为 `Fun.run(namespace, fun, 参数)`。
2. **使用函数管理器通过函数配置调用**：通过函数管理器，按照函数配置执行调用操作，即 `Fun.run(function, 参数)`。
3. **使用函数管理器通过函数式接口调用**：利用函数管理器，通过函数式接口达成函数调用，例如 `Fun.run(函数式接口, 参数)`。
4. **使用 Spring bean 调用**：运用 Spring bean 来调用函数，首先通过 `@Resource` 注解注入 `FunctionInterface` 实例，然后通过 `functionInterface.方法调用(参数)` 进行调用。

::: info 注意

对于后端编程调用的函数拦截器和扩展点，默认不生效，可通过手动设置元位指令使其生效，示例如下：

:::

``` java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, 参数);
}, SystemDirectiveEnum.HOOK, SystemDirectiveEnum.EXT_POINT);
```

此外，函数管理器（Fun）的函数调用兼容 Spring bean 与反射调用。若函数所在类未托管给 Spring，使用反射调用；若已托管，则使用 Spring bean 调用。

## （三）函数的配置

### 1、非模型带函数类的标识

对于非模型但带有函数的类，必须使用 `@Fun` 注解来明确标识。若要提供远程服务，需在 API 包中声明使用了 `@Fun` 注解的函数接口。

### 2、函数操作语义类型

函数操作语义采用二进制多选枚举，涵盖以下四种核心操作类型：

- **增**：用于数据新增操作。
- **删**：用于数据删除操作。
- **改**：用于数据更新操作。
- **查**：用于数据查询操作。

系统默认将函数操作语义设置为 **“改”（Update）**。若函数仅涉及数据读取、不执行任何写操作（即只读函数），必须通过注解明确指定其操作语义为“**查**” ，以确保系统正确识别和处理函数行为。


::: warning 提示

函数类型语义有增、删、改、查。当 `Function` 级别为 `API` 时，生成 `GraphQL` 的 `Schema` 会受其影响。“查” 类型函数在生成 `GraphQL` 的 `Schema` 时归到 `query` 字段下，“增”“删”“改” 类型函数则归到 `mutation` 字段下。

:::
### 3、函数重载规则与常用举例

- 命名空间和函数编码相同的重载函数，仅有一个会生效。
- 在模型类中定义的函数，优先级高于在模型类外定义的函数；在模型类中，靠后的定义优先级更高。

#### 数据构造函数 construct 重载

``` java
/**
 * 在打开新增页面的时候，前端默认会调用给定模型的 construct
 */
@Function.Advanced( displayName = "初始化数据",type = {FunctionTypeEnum.QUERY})
@Function(summary = "数据构造函数", openLevel = {FunctionOpenEnum.LOCAL,FunctionOpenEnum.API, FunctionOpenEnum.REMOTE})
public TestModel construct(TestModel data) {
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
    log.info("doSomething 4 TestModel construct");
    data.construct();
    return data;
}
```

#### 创建（create）重载

``` java
@Transactional(rollbackFor = {Throwable.class})
@Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
@Action( displayName = "创建", label = "确定", summary = "添加", bindingType = {ViewTypeEnum.FORM})
@Function(name = FunctionConstants.create)
@Function.fun(FunctionConstants.create)
public TestModel create(TestModel data) {
    if (null == data) {
        return null;
    }
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
    log.info("doSomething 4 TestModel create");
    //仅执行自身的创建操作，不涉及对关联字段依据创建策略进行的自动处理 。
    data.create();
    //再保存one2many,many2many的关系字段
    data.fieldSave(TestModel::getPartners);
    return data;
}
```

::: danger 警告

@Action.Advanced(check = true)，如果不配置，则不进行校验约束（Validation配置失效）

:::
#### 删除（delete）重载

``` java
@Transactional(rollbackFor = Throwable.class)
@Action.Advanced(name = FunctionConstants.delete, type = FunctionTypeEnum.DELETE, managed = true, priority = 66)
@Action(displayName = "删除", label = "删除", contextType = ActionContextTypeEnum.SINGLE_AND_BATCH)
@Function(name = FunctionConstants.delete)
@Function.fun(FunctionConstants.deleteWithFieldBatch)
public List<TestModel> delete(List<TestModel> dataList) {
    if (CollectionUtils.isEmpty(dataList)) {
        return dataList;
    }
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求，对删除操作前后的相关数据或流程进行自定义管控，从而实现更为灵活且贴合业务场景的功能设置 。
    log.info("doSomething 4 TestModel delete");
    //仅执行自身的删除操作，不涉及对关联字段依据删除策略进行的自动处理 。
    new TestModel().deleteByPks(dataList);
    new TestModel().listRelationDelete(dataList,TestModel::getPartners);
    return dataList;
}
```

#### 更新（update）重载

``` java
@Transactional(rollbackFor = {Throwable.class} )
@Action.Advanced(name = FunctionConstants.update,type = {FunctionTypeEnum.UPDATE},managed = true, invisible = ExpConstants.idValueNotExist, check = true)
@Action(displayName = "更新",label = "确定",summary = "修改",bindingType = {ViewTypeEnum.FORM})
@Function(name = FunctionConstants.update)
@Function.fun(FunctionConstants.update)
public TestModel update(TestModel data) {
    if (null == data) {
        return null;
    }
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
    log.info("doSomething 4 TestModel update");
    //仅执行自身的更新操作，不涉及对关联字段依据更新策略进行的自动处理 。
    data.updateById();
    //saveOnCascade 新增或更新关联关系字段（全量），并按照字段级联策略处理旧关系数据（如：删除、SET_NULL），使用fieldSave方法需要自行处理关系差量如：旧记录删除
    data.fieldSaveOnCascade(TestModel::getPartners);
    return data;
}
```
::: danger 警告

@Action.Advanced(check = true)，如果不配置，则不进行校验约束（Validation配置失效）
:::
#### 分页查询（queryPage）重载

``` java
/**
 * 在表格视图在点击搜索时，前端默认会调用给定模型的 queryPage
 */
@Function.Advanced(displayName = "根据条件分页查询记录列表和总数",type = {FunctionTypeEnum.QUERY},category = FunctionCategoryEnum.QUERY_PAGE)
@Function.fun(FunctionConstants.queryPage)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<TestModel> queryPage(Pagination<TestModel> page, IWrapper<TestModel> queryWrapper) {
    if (null == page) {
        return null;
    }
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
    log.info("doSomething 4 TestModel queryPage");
    return new TestModel().queryPage(page,queryWrapper);
}
```

#### 单条查询（queryOne）重载

``` java
@Function.Advanced(displayName = "查询单条记录", type = {FunctionTypeEnum.QUERY}, category = FunctionCategoryEnum.QUERY_ONE)
@Function.fun(FunctionConstants.queryByEntity)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public TestModel queryOne(TestModel query) {
    if (null == query) {
        return null;
    }
    //TODO doSomething, 在此基础上可额外追加特定业务逻辑，以便依据实际业务需求。
    log.info("doSomething 4 TestModel queryOne");
    return query.queryOne();
}
```

### 4、命名空间与函数编码的确定

- **命名空间**

  - 可使用 `@Model.model` 或 `@Fun` 注解来配置函数的命名空间。
  - 优先取 `@Model.model` 注解值，先在本类查找该注解，若本类未配置或注解值为空，则在父类或接口上查找；若仍为空，则取 `@Fun` 注解值，同样先在本类查找，若本类未配置或注解值为空，再在父类或接口上查找；若两者皆为空，则取全限定类名。

- **函数编码**

  - 可使用 `@Function.fun` 注解配置函数编码。
  - 先在本类方法中查找该注解获取函数编码，若本类方法未配置或注解值为空，则在父类或接口方法上查找；若皆为空，则取方法名。

### 5、函数的开放级别

在日常开发中，为保障安全性，我们常为方法设定不同开放层级，或通过应用分层，将需对 Web 开放的接口统一放在独立应用中管理。oinone 采用类似策略，通过 `Function` 统一管理所有逻辑。`Function` 支持定义三种开放级别，分别是 `API`、`REMOTE` 和 `LOCAL`，且配置可多选，描述如下：

- **本地调用 (LOCAL)**：支持在同一应用内部进行调用，常用于应用内其他模块调用模型相关逻辑。
- **远程调用 (REMOTE)**：默认支持，可通过远程服务调用，适合分布式系统中不同服务间交互。
- **开放 (API)**：支持通过公开接口暴露给外部系统调用，适用于对外提供服务场景。

::: warning

函数开放级别规则：支持`API`则默认支持`LOCAL`和`REMOTE`；支持`REMOTE`默认支持`LOCAL`；仅本地使用可选`LOCAL`。
:::
::: warning

对于服务端动作（ServerAction），其对应函数会自动设置为 `API` 开放级别。这是因为此类函数关联前端界面的操作按钮，为保证前端可调用，必须开放 `API`。
:::
### 6、命名规范

| **模型属性**         | **默认取值规范**                                         | **命名规则规范**                                             |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| namespace            | 可使用 `@Model.model` 或 `@Fun` 注解来配置函数的命名空间 | 长度 ≤ 128 字符                                              |
| name                 | 默认用 Java 方法名                                       | 仅含数字、字母，以字母开头，长度 ≤ 128 字符，不以 `get`、`set`、`unSet`开头 |
| fun                  | 默认用 `name`                                            | 长度 ≤ 128 字符                                              |
| summary              | 默认用 `displayName`                                     | 不用分号，长度 ≤ 500 字符                                    |
| Advanced.displayName | 默认用 `name`                                            | 长度 ≤ 128 字符                                              |

### 7、注解配置

#### @Fun 函数申明

└── value 命名空间

#### @Model

└── model 命名空间

#### @Function

├── name 技术名称

├── scene 可用场景

├── summary 描述摘要

├── openLevel 开放级别

├── Advanced 更多配置

│   ├── displayName 显示名称

│   ├── type 函数类型，默认 FunctionTypeEnum.UPDATE

│   ├── managed 数据管理器函数，默认false

│   ├── check Validation校验，默认false

│   ├── language 语言，默认 FunctionLanguageEnum.JAVA

│   ├── builtin 是否内置函数，默认否

│   ├── category 分类，FunctionCategoryEnum.OTHER

│   ├── group 系统分组，默认：pamirs

│   ├── version 系统版本，默认：1.0.0

│   ├── timeout 超时时间，默认：5000

│   ├── retries 重试次数，默认：0

│   ├── isLongPolling 是否支持long polling ，默认false

│   ├── longPollingKey 支持从上下文中获取字段作为key，默认 userId

│   └── longPollingTimeout long polling超时时间，默认值为1

└── fun

└──value

#### @PamirsTransactional

├── value @AliasFor("transactionManager")

├── transactionManager @AliasFor("value") 默认值：""

├── propagation 事务传递类型 默认值：Propagation.REQUIRED

├── isolation 事务隔离级别 默认值：Isolation.DEFAULT

├── timeout 过期时间 默认：-1

├── readOnly 只读 默认：false

├── rollbackFor 回滚异常类

├── rollbackForClassName 回滚异常类名

├── rollbackForExpCode 回滚异常编码

├── noRollbackFor 忽略异常类

├── noRollbackForClassName 忽略异常类名

├── noRollbackForExpCode 忽略异常编码

└── enableXa 分布式事务 默认为false

## （四）函数元信息

### 1、FunctionDefinition

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1600px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">元素数据构成</th>
      <th style="text-align: left; font-weight: bold;">含义</th>
      <th style="text-align: left; font-weight: bold;">对应注解</th>
      <th style="text-align: left; font-weight: bold;">备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>namespace</td>
      <td>函数命名空间</td>
      <td>@Fun("")<br/>@Model.model("")</td>
      <td>@Fun或@Model.model</td>
    </tr>
    <tr>
      <td>name</td>
      <td>技术名称</td>
      <td rowspan="4">@Function(<br/>name="",<br/>scene={},<br/>summary="",<br/>openLevel=FunctionOpenEnum.REMOTE<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>scene</td>
      <td>可用场景</td>
      <td>见：FunctionSceneEnum</td>
    </tr>
    <tr>
      <td>description</td>
      <td>描述</td>
      <td></td>
    </tr>
    <tr>
      <td>openLevel</td>
      <td>开放级别</td>
      <td>见：FunctionOpenEnum</td>
    </tr>
    <tr>
      <td>fun</td>
      <td>编码</td>
      <td>@Function.fun("")</td>
      <td></td>
    </tr>
    <tr>
      <td>displayName</td>
      <td>显示名称</td>
      <td rowspan="13">@Function.Advanced(<br/>displayName="",<br/>type=FunctionTypeEnum.UPDATE,<br/>dataManager=false,<br/>language=FunctionLanguageEnum.JAVA,<br/>isBuiltin=false,<br/>category=FunctionCategoryEnum.OTHER,<br/>group="pamirs",<br/>version="1.0.0",<br/>timeout=5000,<br/>retries=0,<br/>isLongPolling=false,<br/>longPollingKey="userId"<br/>longPollingTimeout=1<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>type</td>
      <td>函数类型<br/>默认：4(改)</td>
      <td>见：FunctionTypeEnum</td>
    </tr>
    <tr>
      <td>dataManager</td>
      <td>数据管理器函数<br/>默认：false</td>
      <td></td>
    </tr>
    <tr>
      <td>language</td>
      <td>函数语言<br/>默认：DSL</td>
      <td>见：FunctionLanguageEnum</td>
    </tr>
    <tr>
      <td>isBuiltin</td>
      <td>是否内置函数<br/>默认：false</td>
      <td></td>
    </tr>
    <tr>
      <td>category</td>
      <td>分类<br/>默认：OTHER</td>
      <td>见：FunctionCategoryEnum</td>
    </tr>
    <tr>
      <td>group</td>
      <td>系统分组<br/>默认：pamirs</td>
      <td></td>
    </tr>
    <tr>
      <td>version</td>
      <td>系统版本<br/>默认：1.0.0</td>
      <td></td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>超时时间<br/>默认：5000</td>
      <td></td>
    </tr>
    <tr>
      <td>retries</td>
      <td>重试次数<br/>默认：0</td>
      <td></td>
    </tr>
    <tr>
      <td>isLongPolling</td>
      <td>是否支持long polling，默认false</td>
      <td></td>
    </tr>
    <tr>
      <td>longPollingKey</td>
      <td>支持从上下文中获取字段作为key</td>
      <td></td>
    </tr>
    <tr>
      <td>longPollingTimeout</td>
      <td>long polling超时时间<br/>默认值为1</td>
      <td></td>
    </tr>
    <tr>
      <td>transactionConfig</td>
      <td>事务配置<br/>JSON存储</td>
      <td></td>
      <td>见：TransactionConfig<br/>配置<br/>@PamirsTransactional</td>
    </tr>
    <tr>
      <td>source</td>
      <td>来源</td>
      <td></td>
      <td>系统推断值，见：FunctionSourceEnum</td>
    </tr>
    <tr>
      <td>extPointList</td>
      <td>函数包含扩展点</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>module</td>
      <td>所属模块</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>bitOptions</td>
      <td>位</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>attributes</td>
      <td>属性</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>imports</td>
      <td>上下文引用</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>context</td>
      <td>上下文变量</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>codes</td>
      <td>函数内容</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>beanName</td>
      <td>bean名称</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>rule</td>
      <td>前端规则</td>
      <td></td>
      <td>系统推断值，一般Action.rule传递下来的</td>
    </tr>
    <tr>
      <td>clazz</td>
      <td>函数位置</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>method</td>
      <td>函数方法</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>argumentList</td>
      <td>函数参数</td>
      <td></td>
      <td>系统推断值，List<`Argument`></td>
    </tr>
    <tr>
      <td>returnType</td>
      <td>返回值类型</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
  </tbody>
</table>

### 2、TransactionConfig

函数事务管理之配置项事务

<table cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 1400px; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f5f5f5;">
      <th style="text-align: left; font-weight: bold;">元素数据构成</th>
      <th style="text-align: left; font-weight: bold;">含义</th>
      <th style="text-align: left; font-weight: bold;">对应注解</th>
      <th style="text-align: left; font-weight: bold;">备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>transactionManager</td>
      <td>事务管理器</td>
      <td rowspan="8">@PamirsTransactional(<br/>transactionManager="",<br/>enableXa=false,<br/>isolation=Isolation.DEFAULT,<br/>propagation=Propagation.REQUIRED,<br/>timeout=-1,<br/>readOnly=false,<br/>rollbackFor={},<br/>rollbackForClassName={},<br/>noRollbackFor={},<br/>noRollbackForClassName={},<br/>rollbackForExpCode={},<br/>noRollbackForExpCode={}<br/>)</td>
      <td></td>
    </tr>
    <tr>
      <td>enableXa</td>
      <td>分布式事务<br/>默认为false</td>
      <td></td>
    </tr>
    <tr>
      <td>isolation</td>
      <td>事务隔离级别</td>
      <td></td>
    </tr>
    <tr>
      <td>propagation</td>
      <td>事务传递类型</td>
      <td></td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>过期时间<br/>默认：-1</td>
      <td></td>
    </tr>
    <tr>
      <td>readOnly</td>
      <td>只读<br/>默认：false</td>
      <td></td>
    </tr>
    <tr>
      <td>rollbackForExpCode</td>
      <td>回滚异常编码</td>
      <td></td>
    </tr>
    <tr>
      <td>rollbackForExpCode</td>
      <td>忽略异常编码</td>
      <td></td>
    </tr>
    <tr>
      <td>namespace</td>
      <td>函数命名空间</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>fun</td>
      <td>函数编码</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
    <tr>
      <td>active</td>
      <td>生效<br/>默认为true</td>
      <td></td>
      <td>系统推断值</td>
    </tr>
  </tbody>
</table>

# 二、Extpoint 扩展点

## （一）默认扩展点

Oinone所有的函数都提供了默认的前置扩展点、重载扩展点和后置扩展点，其技术名称的规则是所扩展函数的**函数编码fun**加上“Before”、“Override”和“After”后缀；如：

### 1、扩展点定义示例

``` java
@Ext(TestModel.class)
public interface TestModelExtpoint {
    @ExtPoint(displayName = "TestModel的create函数前置扩展点")
    public TestModel createBefore(TestModel data);
}
@Ext(TestModel.class)
public class TestModelExtpointImpl implements TestModelExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "TestModel的create函数前置扩展点实现",expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("TestModel的create函数前置扩展点实现");
        return data;
    }
}
```

使用 `@Ext(TestModel.class)` 标记扩展点所扩展函数所在的类，以此明确命名空间。借助 `@ExtPoint` 来定义扩展点，利用 `@ExtPoint.Implement` 定义扩展点的实现。通过 `expression` 和 `priority` 分别设定扩展点的生效条件与优先级。在表达式里，可使用 `context` 与函数参数（如示例中的 `data`）作为变量，其中 `context` 的 `requestFromModule` 代表请求发起的模块。

### 2、快捷定义方式：

``` java
@Ext(TestModel.class)
public class TestModelExtpointImpl implements CreateBeforeExtPoint<TestModel> {
    @Override
    @ExtPoint.Implement(displayName = "TestModel的create函数前置扩展点实现",expression = "context.requestFromModule==\"ce_expenses\"")
    public TestModel createBefore(TestModel data) {
        PamirsSession.getMessageHub().info("TestModel的create函数前置扩展点实现");
        return data;
    }
}
```

### 3、模型扩展点快捷定义列表

| 扩展点                        | 名称(name)                                                 | 描述                           |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------ |
| CountBeforeExtPoint           | countBefore                                                | 获取数量前置扩展点             |
| CreateAfterExtPoint           | createAfter                                                | 新增后置扩展点                 |
| CreateBatchAfterExtPoint      | createBatchAfter                                           | 批量新增后置扩展点             |
| CreateBatchBeforeExtPoint     | createBatchBefore                                          | 批量新增前置扩展点             |
| CreateBeforeExtPoint          | createBefore                                               | 新增前置扩展点                 |
| DeleteAfterExtPoint           | Java方法：deleteAftername：deleteWithFieldBatchAfter       | 删除后置扩展点                 |
| DeleteBeforeExtPoint          | Java方法：deleteBeforename：deleteWithFieldBatchBefore     | 删除前置扩展点                 |
| PageAfterExtPoint             | queryPageAfter                                             | 分页查询后置扩展点             |
| PageBeforeExtPoint            | queryPageBefore                                            | 分页查询前置扩展点             |
| QueryByPkAfterExtPoint        | queryByPkAfter                                             | 根据主键查询单条记录后置扩展点 |
| QueryByPkBeforeExtPoint       | queryByPkBefore                                            | 根据主键查询单条记录后置扩展点 |
| QueryListAfterExtPoint        | Java方法：queryListAftername：queryListByEntityAfter       | 查询列表后置扩展点             |
| QueryListBeforeExtPoint       | Java方法：queryListBeforename：queryListByWrapperBefore    | 查询列表前置扩展点             |
| QueryOneAfterExtPoint         | Java方法：queryOneAftername：queryByEntityAfter            | 查询单条记录后置扩展点         |
| QueryOneBeforeExtPoint        | Java方法：queryOneBeforename：queryByEntityBefore          | 查询单条记录前置扩展点         |
| UpdateAfterExtPoint           | updateAfter                                                | 更新后置扩展点                 |
| UpdateBatchAfterExtPoint      | updateBatchAfter                                           | 批量更新后置扩展点             |
| UpdateBatchBeforeExtPoint     | updateBatchBefore                                          | 批量更新前置扩展点             |
| UpdateBeforeExtPoint          | updateBefore                                               | 更新前置扩展点                 |
| UpdateConditionAfterExtPoint  | Java方法：updateConditionAftername：updateByWrapperAfter   | 条件更新后置扩展点             |
| UpdateConditionBeforeExtPoint | Java方法：updateConditionBeforename：updateByWrapperBefore | 条件更新前置扩展点             |

::: danger 警告

使用快捷方式实现的扩展点，不支持远程调用
:::

## （二）自定义扩展点

在日常开发过程中，随着对业务理解的不断深入，为了能更灵活地应对日后各种不同需求，我们常常会在某些逻辑中预留扩展点，方便对局部逻辑进行灵活替换。

### 1、定义自定义扩展点

``` java
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
        // 具体业务逻辑处理
        return null;
    }
}
```

### 2、调用自定义扩展点

在业务方法中，使用`Ext.run`通过函数式接口触发扩展点逻辑：

``` java
//通过Ext.run 去掉用
public List<TestModel> includeCallExtpoint(){
    //前置业务逻辑
    // 调用扩展点逻辑
    List<TestModel> testModels = Ext.run(TestModelDoSomethingExtpoint::doSomething, new Object[]{});
    //后续业务处理
    return testModels;
}
```

通过上述步骤，即可完成自定义扩展点的创建与调用，实现业务逻辑的动态扩展与灵活替换。

## （三）覆盖原扩展点

一个扩展点可设多个扩展点实现，Oinone最终会按条件与优先级，只选择一个执行。其中，优先级默认值为 99，数字越小优先级越高。例如：

``` java
@Ext(TestModelDoSomethingExtpoint.class)
public class TestModelDoSomethingExtpointImpl2 implements TestModelDoSomethingExtpoint {
    @Override
    @ExtPoint.Implement(displayName = "doSomething2", priority = 66 )
    public List<TestModel> doSomething() {
        // 新的业务逻辑处理
        return null;
    }
}
```

## （四）注意事项

::: warning

扩展点可通过 `expression` 属性配置生效条件，默认留空时即自动生效。一个扩展点可设多个扩展点实现，Oinone最终会按条件与优先级，只选择一个执行。
:::
::: warning

子模型不仅继承父模型的字段与函数，在继承函数时，还会同步继承函数的扩展点。
:::
::: info 注意

对于后端编程调用的函数扩展点，默认不生效，可通过手动设置元位指令使其生效，示例如下：
:::
``` java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, 参数);
}, SystemDirectiveEnum.EXT_POINT);
```

::: danger 警告

函数参数请勿命名为 `context`，该命名会与 Oinone 内置上下文产生冲突，致使表达式执行异常。

:::

# 三、Hook 拦截器

拦截器作为平台的重要组成部分，能够以非侵入的方式为满足特定条件的函数，在执行前和执行后扩展相应的逻辑。

## （一）拦截器的使用方法

通过在方法上添加 `@Hook` 注解，即可将该方法标识为拦截器。具体而言，前置扩展点需实现 `HookBefore` 接口，而后置扩展点则需实现 `HookAfter` 接口。其入参分别包含当前被拦截函数的定义以及该函数的入参。这样，拦截器便能够依据函数定义和入参来灵活处理执行逻辑。

## （二）拦截器的分类及特点

拦截器主要分为前置拦截器和后置拦截器两类，它们在功能和数据处理上有所不同：

### 1、前置拦截器：

其出入参为所拦截函数的入参。通过实现 `HookBefore` 接口，在函数执行前进行逻辑处理。例如：

``` java
@Component
public class BeforeXXXHook implements HookBefore {

    @Hook
    @Override
    public Object run(Function function, Object... args) {
        // 在此处处理入参与执行拦截器逻辑
        return args;
    }

}
```

### 2、**后置拦截器**：

其出入参为所拦截函数的出参。通过实现 `HookAfter` 接口，在函数执行后对返回值进行处理。例如：

``` java
@Component
public class AfterXXXHook implements HookAfter {

    @Hook
    @Override
    public Object run(Function function, Object ret) {
        // 在此处处理返回值与执行拦截器逻辑
        return ret;
    }

}
```

## （三）拦截器的筛选与生效规则

可以使用 `@Hook` 注解的非必填字段 `module`、`model`、`fun`、函数类型、`active` 来筛选出对当前拦截方法需要生效的拦截器。若未配置任何过滤属性，拦截器将对所有函数生效。

## （四）拦截器的执行顺序调整

根据拦截器的优先级 `priority` 属性，可以对拦截器的执行顺序进行灵活调整。`priority` 数字越小，该拦截器越先执行。例如，当存在多个前置拦截器时，`priority` 值最小的前置拦截器将最先执行其逻辑。这种机制使得开发者能够根据业务需求，精细地控制函数在不同阶段的逻辑扩展，从而提高系统的灵活性和可维护性。

## （五）注意事项

::: danger 警告

由于拦截器会对所有函数进行拦截，若拦截器数量过多，将不可避免地导致性能下降。

:::
::: info 注意

对于后端编程调用的函数拦截器，默认不生效，可通过手动设置元位指令使其生效，示例如下：
:::
``` java
Models.directive().run(() -> {
    return Fun.run(namespace, fun, 参数);
}, SystemDirectiveEnum.HOOK);
```

# 四、Trigger 触发器

触发器是一种基于函数执行事件来驱动逻辑执行的机制。以下将从配置、任务类型等方面详细介绍。

## （一）启用触发器配置

### 1、YMAL配置

需完成[事件配置](/zh/DevManual/Reference/Back-EndFramework/module-API.md#fd47cf3e)，[数据记录配置](/zh/DevManual/Reference/Back-EndFramework/module-API.md#2195c1d2)，并添加 `sql_record` 和 `trigger` 两个模块依赖，具体配置如下：

``` yaml
spring:
  rocketmq:
    name-server: 127.0.0.1:9876 # RocketMQ NameServer地址，用于生产者与消费者定位集群
    producer:
      enableMsgTrace: true       # 开启消息轨迹追踪功能，便于排查消息发送问题
      customizedTraceTopic: TRACE_PRODUCER # 自定义消息轨迹主题
    consumer:
      enableMsgTrace: true       # 开启消费者端消息轨迹追踪
      customizedTraceTopic: TRACE_CONSUMER # 消费者端自定义轨迹主题
pamirs:
  event:
    enabled: true       # 全局控制event功能的启用状态，默认为true，true为开启，false为关闭
    topic-prefix: oinone # 所有事件主题的统一前缀，便于主题名称的规范化管理
    notify-map:
      system: ROCKETMQ  # 系统消息的消息队列类型，可选择ROCKETMQ、KAFKA或RABBITMQ
      biz: ROCKETMQ     # 业务消息的消息队列类型，可选择ROCKETMQ、KAFKA或RABBITMQ
      logger: ROCKETMQ  # 日志消息的消息队列类型，可选择ROCKETMQ、KAFKA或RABBITMQ
    schedule:
      enabled: true    # trigger开关 默认为true
  record:
    sql:
      # 此路径用于指定 SQL 日志文件的存储目录，可根据实际需求修改
      store: /oinone/sql/record
  boot:
    modules:
      - sql_record
      - trigger
```

::: warning

示例中以rocketmq为消息队列，可以切换成Kafka、RabbitMQ其他消息队列。
:::
### 2、依赖添加

在启动工程中引入以下依赖：

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-sql-record-core</artifactId>
</dependency>
```
``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-trigger-bridge-tbschedule</artifactId>
</dependency>
```

## （二）触发式任务

### 1、Trigger 注解

**使用前提**：

1. 函数必须在程序中通过 `Function` 注解成功注册到系统。
2. 函数定义的入参和出参必须是同一模型类型。

**使用示例**：

``` java
@Fun("test.TestModel")
public class TestModelFunction {

    @Trigger(name = "创建时触发", condition = TriggerConditionEnum.ON_CREATE)
    @Function
    public TestModel onCreate(TestModel data) {
        return data;
    }

    @Trigger(name = "更新时触发", condition = TriggerConditionEnum.ON_UPDATE)
    @Function
    public TestModel onUpdate(TestModel before, TestModel after) {
        return data;
    }

    @Trigger(name = "删除时触发", condition = TriggerConditionEnum.ON_DELETE)
    @Function
    public TestModel onDelete(TestModel data) {
        return data;
    }
}
```

**解释说明**：

- 第 1 行：通过注解方式注册函数，用于定义函数命名空间，目前函数命名空间均为模型编码。
- 第 5、11、17 行：使用注解方式注册具体函数，标记需要注册到系统的函数。
- 第 4 行：使用注解方式注册触发任务，`name` 属性对应模型中的 `displayName`；`condition` 属性对应模型中的 `condition`；`active` 属性对应模型中的 `active`；

### 2、业务模块配置

业务模块工程需引入 `trigger` 模块的 api 包：

``` xml
<dependency>
		<groupId>pro.shushi.pamirs.core</groupId>
		<artifactId>pamirs-trigger-api</artifactId>
</dependency>
```

## （三）定时任务

### 1、定时任务的定义

Oinone XSchedule 是 Oinone 框架提供的一个用于实现定时任务调度的功能模块，它允许开发者方便地在应用程序中定义和执行定时任务。以下是关于 Oinone XSchedule 的使用说明：

通过在方法上添加 `@XSchedule` 注解来定义定时任务。`@XSchedule` 注解目前只支持通过 `cron` 属性来配置任务的执行时间，示例如下：

``` java
@Component
@Fun(CronJobExample.FUN_NAMESPACE)
public class CronJobExample {
    String FUN_NAMESPACE = "test.CronJobExample";

    @XSchedule(cron = "0 0 10 * * *") // 每天上午10点执行
    @Function
    public void cronJob() {
        System.out.println("Cron job is running...");
    }
}
```

以上就是 Oinone XSchedule 的基本使用方法，通过这些步骤，你可以在 Oinone 应用中轻松实现定时任务的调度。

::: warning

Oinone XSchedule具备分布式特性，可自动从集群中分配一台机器执行定时任务。无需手动处理分布式环境下的任务分配与协调，适用于多节点部署的复杂系统，能确保任务高效、有序执行，降低开发和运维成本。
:::
::: info 注意

Oinone XSchedule 要求定时任务函数为**无入参的 Oinone 函数**。定义函数时务必遵循此规则，否则任务将无法正常执行，影响系统调度功能的稳定性。
:::


### 2、Cron 表达式详解

Cron 表达式是用于定义定时任务执行时间的字符串，由 **6 个必选字段**（秒、分、时、日、月、周）和 **1 个可选字段**（年）组成，字段间以空格分隔。通过特殊字符组合，可灵活配置复杂的时间规则，以下为详细说明：

#### 表达式结构与取值范围

| **字段名称**         | **取值范围**                  | **示例**         |
| -------------------- | ----------------------------- | ---------------- |
| 秒（Seconds）        | 0 - 59                        | 0（整点第 0 秒） |
| 分钟（Minutes）      | 0 - 59                        | 15（15 分）      |
| 小时（Hours）        | 0 - 23（0 代表午夜）          | 8（上午 8 点）   |
| 日期（Day of month） | 1 - 31                        | 1（每月 1 日）   |
| 月份（Month）        | 1 - 12 或英文缩写             | JAN（1 月）      |
| 星期（Day of week）  | 0 - 6（0 代表周日）或英文缩写 | SUN（周日）      |
| 年份（Year）         | 1970 - 2099（可省略）         | 2024（指定年份） |

#### 核心特殊字符

| **字符** | **含义及用法**                                               | **示例与解释**                                               |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `*`      | 通配符，表示该字段所有可能值                                 | `* * * * * *`：每分钟每一秒执行；`0 0 * * * *`：每小时的第 0 秒执行 |
| `,`      | 分隔多个值                                                   | `0 0 8,12,16 * * *`：每天 8 点、12 点、16 点整执行           |
| `-`      | 指定连续区间                                                 | `0 0 9-17 * * *`：每天 9 点到 17 点整，每小时执行一次        |
| `/`      | 定义间隔频率                                                 | `0 0/15 * * * ?`：每 15 分钟执行一次（从第 0 分钟开始，即 0 分、15 分、30 分、45 分） |
| `?`      | 仅用于 **日期** 和 **星期** 字段，表示不指定值（二者不能同时设置具体值） | `0 0 12 * * ?`：每天 12 点执行，不指定星期；`0 0 12 1 * ?`：每月 1 日 12 点执行 |
| `#`      | 仅用于 **星期** 字段，指定每月第几个星期 X                   | `0 0 12 ? * 1#3`：每月第三个星期一的 12 点执行               |
| `L`      | 仅用于 **日期** 和 **星期** 字段，代表 “最后”                | 日期：`0 0 12 L * *`：每月最后一天 12 点执行；星期：`0 0 12 ? * 6L`：每月最后一个星期六 12 点执行 |

#### 常见应用场景

| **Cron 表达式**  | **执行规则**                   | **适用场景**             |
| ---------------- | ------------------------------ | ------------------------ |
| `0 0 12 * * *`   | 每天中午 12 点执行             | 日常数据统计、定时备份   |
| `0 15 10 * * *`  | 每天上午 10 点 15 分执行       | 早间任务触发             |
| `0 0 0 1 1 *`    | 每年 1 月 1 日凌晨 0 点执行    | 年度数据初始化、跨年任务 |
| `0 0 12 ? * WED` | 每周三中午 12 点执行           | 周期性维护、周报生成     |
| `0 0 12 L * ?`   | 每月最后一天中午 12 点执行     | 月末数据结算             |
| `0 0 12 ? * 2#3` | 每月第三个星期二中午 12 点执行 | 特定周次的任务调度       |

::: info 使用注意事项

- **系统差异**：不同框架（如 Spring、Linux Cron）对 Cron 表达式的支持存在细微差别，需参考对应文档。
- **日期与星期冲突**：同时设置 **日期** 和 **星期** 字段时，必须用 `?` 替代其中一个，避免逻辑矛盾。
- **时区影响**：表达式的时间计算依赖服务器时区，跨地域任务需额外处理时区转换。
- **复杂规则验证**：使用在线工具（如 [CronMaker](https://www.cronmaker.com/)）校验表达式准确性，防止配置错误。
:::
通过合理组合特殊字符，Cron 表达式可满足从简单到复杂的各类定时需求，广泛应用于数据库维护、日志清理、数据同步等自动化任务场景。

## （四）异步任务

异步任务是分布式开发中常用的模式，广泛应用于高并发处理、耗时任务解耦等场景。以下为 Oinone 中异步任务的详细使用说明：

### 1、异步任务的定义

通过注解与接口实现定义异步任务，示例如下：

``` java
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
    @XAsync(displayName = "异步示例",limitRetryNumber = 3,nextRetryTimeValue = 60)
    public void testXAsync(TestModel testModel) {
        //do something
    }
}
```

**注解参数说明**：

- `displayName`：定义异步任务的展示名称，便于识别和管理。
- `limitRetryNumber`：设置任务失败后的最大重试次数，默认值为 `-1`（即无限重试）。
- `nextRetryTimeValue`：指定任务失败后再次重试的间隔时长，默认值为 `60`。
- `nextRetryTimeUnit`：定义重试间隔的时间单位，默认值为 `TimeUnitEnum.SECOND`（秒）。
- `delayTime`：设置任务延迟执行的时长，默认值为 `0`（即立即执行）。
- `delayTimeUnit`：定义延迟执行的时间单位，默认值为 `TimeUnitEnum.SECOND`（秒）。

### 2、多应用场景下执行单元隔离

在多模块独立启动（boot）的分布式环境中，为避免异步任务重复执行，需通过配置实现任务数据隔离：

``` yaml
pamirs:
  event:
    schedule:
      ownSign: demo
```

通过设置 `pamirs.event.schedule.ownSign` 参数，不同应用可基于自定义标识（如 `demo`）隔离任务数据。配置后，各应用仅处理自身产生的异步任务，确保任务执行的唯一性和准确性，提升系统运行效率与稳定性。

# 五、内置函数

内置函数是系统预先定义好的函数，支持在表达式中直接调用，涵盖多种功能类型，具体如下：

## （一）通用函数

### 1、数学函数

| **表达式**  | **名称** | **说明**                               | **示例**            |
| ----------- | -------- | -------------------------------------- | ------------------- |
| ABS         | 绝对值   | 获取数值的绝对值                       | ABS(number)         |
| FLOOR       | 向下取整 | 对数值向下取整                         | FLOOR(number)       |
| CEIL        | 向上取整 | 对数值向上取整                         | CEIL(number)        |
| ROUND       | 四舍五入 | 对数值进行四舍五入                     | ROUND(number)       |
| MOD         | 取余     | 计算 A 除以 B 的余数                   | MOD(A, B)           |
| SQRT        | 平方根   | 计算数值的平方根                       | SQRT(number)        |
| SIN         | 正弦     | 计算数值的正弦值                       | SIN(number)         |
| COS         | 余弦     | 计算数值的余弦值                       | COS(number)         |
| PI          | 圆周率   | 返回圆周率数值                         | PI()                |
| ADD         | 相加     | 计算 A 与 B 的和                       | ADD(A, B)           |
| SUBTRACT    | 相减     | 计算 A 与 B 的差                       | SUBTRACT(A, B)      |
| MULTIPLY    | 相乘     | 计算 A 与 B 的乘积                     | MULTIPLY(A, B)      |
| DIVIDE      | 相除     | 计算 A 除以 B 的商                     | DIVIDE(A, B)        |
| MAX         | 取最大值 | 返回集合中的最大值（参数为集合或数组） | MAX(collection)     |
| MIN         | 取最小值 | 返回集合中的最小值（参数为集合或数组） | MIN(collection)     |
| SUM         | 求和     | 返回集合的总和（参数为集合或数组）     | SUM(collection)     |
| AVG         | 取平均值 | 返回集合的平均值（参数为集合或数组）   | AVG(collection)     |
| COUNT       | 计数     | 返回集合的元素总数（参数为集合或数组） | COUNT(collection)   |
| UPPER_MONEY | 大写金额 | 将数值或数值型字符串转换为大写金额格式 | UPPER_MONEY(number) |
| POW  | 幂运算   | 计算数字A的数字B次方       | POW(A, B) |
| LOG  | 对数运算 | 计算以数字B为底数字A的对数 | LOG B(A)  |

### 2、文本函数

| **表达式**  | **名称**             | **说明**                                            | **示例**                        |
| ----------- | -------------------- | --------------------------------------------------- | ------------------------------- |
| TRIM        | 空字符串过滤         | 去除文本字符串首尾空格，空字符串返回空              | TRIM(text)                      |
| IS_BLANK    | 是否为空字符串       | 判断文本字符串是否为空                              | IS_BLANK(text)                  |
| STARTS_WITH | 是否以指定字符串开始 | 判断 text 是否以 start 字符串开始，空文本按空串处理 | STARTS_WITH(text, start)        |
| ENDS_WITH   | 是否以指定字符串结束 | 判断 text 是否以 end 字符串结束，空文本按空串处理   | ENDS_WITH(text, end)            |
| CONTAINS    | 包含                 | 判断 text 是否包含 subtext，空 text 按空串处理      | CONTAINS(text, subtext)         |
| LOWER       | 小写                 | 将文本字符串转换为小写，空文本按空串处理            | LOWER(text)                     |
| UPPER       | 大写                 | 将文本字符串转换为大写，空文本按空串处理            | UPPER(text)                     |
| REPLACE     | 替换字符串           | 用 newtext 替换 text 中的 oldtext                   | REPLACE(text, oldtext, newtext) |
| LEN         | 获取字符串长度       | 获取文本字符串长度，空文本按空串处理                | LEN(text)                       |
| JOIN        | 连接字符串           | 将 text 与 join 字符串连接，空文本按空串处理        | JOIN(text, join)                |
| PARSE       | 反序列化 JSON 字符串 | 将 JSON 字符串转换为集合或 Map                      | PARSE(text)                     |
| JSON        | 序列化为 JSON 字符串 | 将对象转换为 JSON 字符串                            | JSON(object)                    |
| NOT_CONTAINS  | 不包含 | 判断文本字符串text是否不包含文本字符串subtext，文本text为空时，按照空字符串处理 | NOT_CONTAINS(text,subtext) |
| SUBSTRING_END | 截取从指定位置到末尾子字符串 | 截取Hello字符串从1位置到末尾子字符串，返回 "ello"            | SUBSTRING_END("Hello", 1)      |
| SUBSTRING     | 从指定位置截取子字符串       | 截取Hello字符串从1位到3位，返回 "el"                         | SUBSTRING("Hello", 1, 3)       |

### 3、正则函数

| 表达式                 | 名称                         | 说明                                                         |
| ---------------------- | ---------------------------- | ------------------------------------------------------------ |
| MATCHES                | 正则匹配                     | 函数场景: 表达式函数示例: MATCHES(text,regex)函数说明: 校验字符串是否满足正则匹配，例如regex为[a-zA-Z][a-zA-Z0-9]*$，来校验text是否匹配 |
| CHECK_PHONE            | 手机号校验                   | 函数场景: 表达式函数示例: CHECK_PHONE(text)函数说明: 校验手机号是否正确 |
| CHECK_EMAIL            | 邮箱校验                     | 函数场景: 表达式函数示例: CHECK_EMAIL(text)函数说明: 校验邮箱是否正确 |
| CHECK_USER_NAME        | 用户名校验                   | 函数场景: 表达式函数示例: CHECK_USER_NAME(text)函数说明: 校验用户名是否正确 |
| CHECK_PWD              | 密码强弱校验                 | 函数场景: 表达式函数示例: CHECK_PWD(text)函数说明: 判断密码是否满足强弱校验 |
| CHECK_INTEGER          | 整数校验                     | 函数场景: 表达式函数示例: CHECK_INTEGER(text)函数说明: 校验是否为整数 |
| CHECK_ID_CARD          | 身份证校验                   | 函数场景: 表达式函数示例: CHECK_ID_CARD(text)函数说明: 校验身份证是否正确 |
| CHECK_URL              | 合法URL校验                  | 函数场景: 表达式函数示例: CHECK_URL(text)函数说明: 校验URL是否正确 |
| CHECK_CHINESE          | 中文校验                     | 函数场景: 表达式函数示例: CHECK_CHINESE(text)函数说明: 校验是否为中文文本 |
| CHECK_NUMBER           | 纯数字校验                   | 函数场景: 表达式函数示例: CHECK_NUMBER(text)函数说明: 校验是否为纯数字 |
| CHECK_TWO_DIG          | 验证是否两位小数             | 函数场景: 表达式函数示例: CHECK_TWO_DIG(text)函数说明: 校验是否两位小数 |
| CHECK_IP               | IP地址校验                   | 函数场景: 表达式函数示例: CHECK_IP(text)函数说明: 校验IP地址是否正确 |
| CHECK_CONTAINS_CHINESE | 包含中文校验                 | 函数场景: 表达式函数示例: CHECK_CONTAINS_CHINESE(text)函数说明: 校验是否包含中文 |
| CHECK_SIZE_MAX         | 只能输入n个字符              | 函数场景: 表达式函数示例: CHECK_SIZE_MAX(text,n)函数说明: 只能输入n个字符 |
| CHECK_SIZE_MIN         | 至少输入n个字符              | 函数场景: 表达式函数示例: CHECK_SIZE_MIN(text,n)函数说明: 至少输入n个字符 |
| CHECK_SIZE             | 输入m-n个字符                | 函数场景: 表达式函数示例: CHECK_SIZE(text,m,n)函数说明: 输入m-n个字符 |
| CHECK_CODE             | 只能由英文、数字、下划线组成 | 函数场景: 表达式函数示例: CHECK_CODE(text)函数说明: 只能由英文、数字、下划线组成 |
| CHECK_ENG_NUM          | 只能包含英文和数字           | 函数场景: 表达式函数示例: CHECK_ENG_NUM(text)函数说明: 只能包含英文和数字 |

### 4、时间函数

| **表达式**   | **名称**             | **说明**                                        | **示例**                 |
| ------------ | -------------------- | ----------------------------------------------- | ------------------------ |
| NOW          | 返回当前时间         | 获取当前系统时间                                | NOW()                    |
| NOW_STR      | 返回当前时间字符串   | 获取当前时间字符串（格式：yyyy-MM-dd hh:mm:ss） | NOW_STR()                |
| TODAY_STR    | 返回今天的日期字符串 | 获取当前日期字符串（格式：yyyy-MM-dd）          | TODAY_STR()              |
| ADD_DAY      | 加减指定天数         | 对指定日期加减指定天数（负数为减）              | ADD_DAY(date, days)      |
| ADD_MONTH    | 加减指定月数         | 对指定日期加减指定月数（负数为减）              | ADD_MONTH(date, months)  |
| ADD_YEAR     | 加减指定年数         | 对指定日期加减指定年数（负数为减）              | ADD_YEAR(date, years)    |
| TO_DATE      | 转换为时间           | 将字符串按指定格式转换为时间对象                | TO_DATE(date, pattern)   |
| ADD_WORK_DAY | 工作日加减天数       | 对指定日期加减工作日天数（自动跳过周末）        | ADD_WORK_DAY(date, days) |
| YEAR  | 提取年 | 提取date中的年份 | YEAR(date)  |
| MONTH | 提取月 | 提取date中的月份 | MONTH(date) |
| DAY   | 提取日 | 提取date中的日   | DAY(date)   |

### 5、集合函数

| **表达式**                 | **名称**                 | **说明**                                                     | **示例**                                         |
| -------------------------- | ------------------------ | ------------------------------------------------------------ | ------------------------------------------------ |
| LIST_GET                   | 获取集合元素             | 获取集合中指定索引位置的元素                                 | LIST_GET(list, index)                            |
| LIST_IS_EMPTY              | 判断集合是否为空         | 判断集合是否为空                                             | LIST_IS_EMPTY(list)                              |
| LIST_CONTAINS              | 判断集合是否包含元素     | 判断集合是否包含指定元素                                     | LIST_CONTAINS(list, item)                        |
| LIST_ADD                   | 添加元素到集合           | 将元素添加到集合末尾                                         | LIST_ADD(list, item)                             |
| LIST_ADD_BY_INDEX          | 添加元素到指定位置       | 将元素添加到集合指定索引位置                                 | LIST_ADD_BY_INDEX(list, index, item)             |
| LIST_REMOVE                | 移除集合元素             | 从集合中移除指定元素                                         | LIST_REMOVE(list, item)                          |
| LIST_COUNT                 | 获取集合元素数量         | 返回集合的元素总数                                           | LIST_COUNT(list)                                 |
| LIST_IDS                   | 获取集合所有 id          | 获取集合中所有对象的 id 组成的列表                           | LIST_IDS(list)                                   |
| LIST_FIELD_VALUES          | 转换属性集合             | 将对象集合转换为指定属性值的集合                             | LIST_FIELD_VALUES(list, model, field)            |
| LIST_FIELD_EQUALS          | 判断属性值匹配           | 判断对象集合中属性值是否匹配指定值，返回布尔集合             | LIST_FIELD_EQUALS(list, model, field, value)     |
| LIST_FIELD_NOT_EQUALS      | 判断属性值不匹配         | 判断对象集合中属性值是否不匹配指定值，返回布尔集合           | LIST_FIELD_NOT_EQUALS(list, model, field, value) |
| LIST_FIELD_IN              | 判断属性值是否在集合中   | 判断对象集合中属性值是否在指定集合中，返回布尔集合           | LIST_FIELD_IN(list, model, field, list)          |
| LIST_FIELD_NOT_IN          | 判断属性值是否不在集合中 | 判断对象集合中属性值是否不在指定集合中，返回布尔集合         | LIST_FIELD_NOT_IN(list, model, field, list)      |
| LIST_AND                   | 布尔集合逻辑与           | 对布尔集合进行逻辑与运算，返回布尔值                         | LIST_AND(list)                                   |
| LIST_OR                    | 布尔集合逻辑或           | 对布尔集合进行逻辑或运算，返回布尔值                         | LIST_OR(list)                                    |
| STRING_LIST_TO_NUMBER_LIST | 字符集合转数值集合       | 将字符集合转换为数值集合，转换失败返回原集合                 | STRING_LIST_TO_NUMBER_LIST(list)                 |
| COMMA                      | 集合元素逗号拼接         | 将集合元素用逗号拼接为字符串（元素需为 Number 或 String）    | COMMA(list)                                      |
| CONCAT                     | 集合元素指定符号拼接     | 将集合元素用指定符号拼接为字符串（元素需为 Number 或 String） | CONCAT(list, split)                              |

### 6、键值对函数

| **表达式**   | **名称**           | **说明**                 | **示例**                 |
| ------------ | ------------------ | ------------------------ | ------------------------ |
| MAP_GET      | 获取键值对的值     | 从键值对中获取指定键的值 | MAP_GET(map, key)        |
| MAP_IS_EMPTY | 判断键值对是否为空 | 判断键值对是否为空       | MAP_IS_EMPTY(map)        |
| MAP_PUT      | 向键值对添加键值   | 向键值对中添加新的键值对 | MAP_PUT(map, key, value) |
| MAP_REMOVE   | 移除键值对元素     | 从键值对中移除指定键     | MAP_REMOVE(map, key)     |
| MAP_COUNT    | 获取键值对数量     | 返回键值对中的键值对总数 | MAP_COUNT(map)           |

### 7、对象函数

| **表达式** | **名称**       | **说明**                        | **示例**                      |
| ---------- | -------------- | ------------------------------- | ----------------------------- |
| IS_NULL    | 判断是否为空   | 判断对象是否为空，为空返回 true | IS_NULL (对象)                |
| EQUALS     | 判断是否相等   | 判断两个对象是否相等            | EQUALS(A, B)                  |
| FIELD_GET  | 获取对象属性值 | 从对象中根据点表达式获取属性值  | FIELD_GET(obj, dotExpression) |

### 8、逻辑函数

| **表达式** | **名称**   | **说明**                       | **示例**                  |
| ---------- | ---------- | ------------------------------ | ------------------------- |
| IF         | 条件表达式 | 根据条件返回不同结果，支持嵌套 | IF (条件，结果 1, 结果 2) |
| AND        | 逻辑与     | 返回两个条件的逻辑与结果       | AND (条件 1, 条件 2)      |
| OR         | 逻辑或     | 返回两个条件的逻辑或结果       | OR (条件 1, 条件 2)       |
| NOT        | 逻辑非     | 返回条件的逻辑非结果           | NOT (条件)                |

## （二）特定场景函数

### 1、商业函数

| **表达式**      | **名称**            | **说明**                  | **示例**          |
| --------------- | ------------------- | ------------------------- | ----------------- |
| CURRENT_CORP_ID | 获取当前用户公司 id | 获取当前用户所属公司的 id | CURRENT_CORP_ID() |
| CURRENT_CORP    | 获取当前用户公司    | 获取当前用户所属公司对象  | CURRENT_CORP()    |
| CURRENT_SHOP_ID | 获取当前用户店铺 id | 获取当前用户所属店铺的 id | CURRENT_SHOP_ID() |
| CURRENT_SHOP    | 获取当前用户店铺    | 获取当前用户所属店铺对象  | CURRENT_SHOP()    |

查看实现代码：pro.shushi.pamirs.framework.faas.fun.builtin.business.BusinessFunctions，需要自行实现对应的SPI。

### 2、上下文函数

| **表达式**         | **名称**                 | **说明**                      | **示例**             |
| ------------------ | ------------------------ | ----------------------------- | -------------------- |
| CURRENT_UID        | 获取当前用户 id          | 获取当前登录用户的 id         | CURRENT_UID()        |
| CURRENT_USER_NAME  | 获取当前用户名           | 获取当前登录用户的用户名      | CURRENT_USER_NAME()  |
| CURRENT_USER       | 获取当前用户             | 获取当前登录用户对象          | CURRENT_USER()       |
| CURRENT_ROLE_IDS   | 获取当前用户角色 id 列表 | 获取当前用户的所有角色 id     | CURRENT_ROLE_IDS()   |
| CURRENT_ROLES      | 获取当前用户角色列表     | 获取当前用户的所有角色        | CURRENT_ROLES()      |
| CURRENT_PARTNER_ID | 获取当前用户合作伙伴 id  | 获取当前用户所属合作伙伴的 id | CURRENT_PARTNER_ID() |
| CURRENT_PARTNER    | 获取当前用户合作伙伴     | 获取当前用户所属合作伙伴对象  | CURRENT_PARTNER()    |

查看实现代码：pro.shushi.pamirs.framework.faas.fun.builtin.ContextFunctions。

## （三）扩展内置函数

在 Oinone 中开发表达式函数，其基本流程与定义普通函数类似，唯一关键区别在于**函数命名空间**的指定：需将`namespace`设置为`NamespaceConstants.expression`，以此明确该函数用于表达式计算场景。以下为具体示例：

``` java
@Fun(NamespaceConstants.expression)
public class TestExpressionFunctions {
    //获取当前用户语言
    @fun("CURRENT_USER_LANG")
    @Function(
        name = "CURRENT_USER_LANG",
        scene = {FunctionSceneEnum.EXPRESSION},
        openLevel = {FunctionOpenEnum.LOCAL},
        summary = "函数示例: CURRENT_USER_LANG()\n函数说明: 获取当前用户语言"
    )
    public static ResourceLang currentUserLang() {
        return CommonApiFactory.getApi(UserService.class).queryById((Long)PamirsSession.getUserId()).getLang();
    }
}
```

# 六、表达式

表达式，是由数字、算符、函数、数字分组符号（括号）、自由变量和约束变量等以能求得数值的有意义排列方法所得的组合。约束变量在表达式中已被指定数值，而自由变量则可以在表达式之外另行指定数值。

表达式可以使用运算符（+、-、*、/、&&、||、!、==、!=）、点表达式（例如：模型A.字段C.关联模型字段A）和内置函数。表达式格式如：IF(ISNULL(模型A.字段x),模型A.字段y.关联模型字段z,模型A.字段m)

表达式中模型字段的前端展现使用展示名称displayName，表达式原始内容使用技术名称name。

## （一）点表达式

点表达式是表达式的子集，由变量名与点组成。点前的变量与点后的变量为从属关系，点后的变量从属于点前的变量。可以使用点表达式获取由全表达式确定的最后一个点后变量的值。

## （二）正则表达式

| 对应内置函数           | 说明                         | 正则表达式                                                   |
| ---------------------- | ---------------------------- | ------------------------------------------------------------ |
| CHECK_PHONE            | 手机号校验                   | ^(1[3-9])\\\d{9}$                                             |
| CHECK_EMAIL            | 邮箱校验                     | ^[a-z0-9A-Z]+[-\|a-z0-9A-Z._]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\\.)+[a-z]{2,}$ |
| CHECK_USER_NAME        | 用户名校验                   | 非空校验                                                     |
| CHECK_PWD              | 密码强弱校验(强密码校验)     | ^(?=.\*[a-z])(?=.\*[A-Z])[a-zA-Z0-9~!@&%#_(.)]{8,16}$          |
| CHECK_INTEGER          | 整数校验                     | ^-{0,1}[1-9]\d*$                                             |
| CHECK_ID_CARD          | 身份证校验                   | \^\d{15}$)\|(\^\d{18}$)\|(^\d{17}(\d\|X\|x)$                   |
| CHECK_URL              | 合法URL校验                  | ^(?\:(?:https?)\://)(?\:(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|[1-9])(?:\\.(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|\d)){2}(?:\\.(?:1\d{2}\|2[0-4]\d\|25[0-5]\|[1-9]\d\|\d))\|(?\:(?:[a-z\u00a1-\uffff0-9]-\*)\*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]-\*)\*[a-z\u00a1-\uffff0-9]+)\*)(?:\:([1-9]\|[1-9]\d\|[1-9]\d{2}\|[1-9]\d{3}\|[1-5]\d{4}\|6[0-4]\d{3}\|65[0-4]\d{2}\|655[0-2]\d\|6553[0-5]))?(?\:/\S*)?$ |
| CHECK_CHINESE          | 中文校验                     | ^[\u4e00-\u9fa5]{0,}$                                        |
| CHECK_NUMBER           | 纯数字校验                   | ^[0-9]*$                                                     |
| CHECK_TWO_DIG          | 验证是否两位小数             | ^[0-9]+(\\.[0-9]{2})?$                                        |
| CHECK_IP               | IP地址校验                   | ^((2[0-4]\d\|25[0-5]\|[01]?\d\d?)\\.){3}(2[0-4]\d\|25[0-5]\|[01]?\d\d?)$ |
| CHECK_CONTAINS_CHINESE | 包含中文校验                 | ^.?[\u4e00-\u9fa5]{0,}.?$                                    |
| CHECK_SIZE             | 只能输入n个字符              | ^.{n}$                                                       |
| CHECK_SIZE_MIN         | 至少输入n个字符              | ^.{n,}$                                                      |
| CHECK_SIZE_MAX         | 最多输入n个字符              | ^.{0,n}$                                                     |
| CHECK_SIZE_RANGE       | 输入m-n个字符                | ^.{m,n}$                                                     |
| CHECK_CODE             | 只能由英文、数字、下划线组成 | ^[a-z0-9A-Z_]*$                                              |
| CHECK_ENG_NUM          | 只能包含英文和数字           | ^[a-z0-9A-Z]*$                                               |

## （三）内置变量

在表达式中可以使用点表达式来获取内置变量的属性及子属性的属性。例如，使用activeRecord来获取当前记录。activeRecord.id来获取当前选中行记录的id。

### 1、数据变量

| 变量         | 名称             | 说明                                                         |
| ------------ | ---------------- | ------------------------------------------------------------ |
| activeRecord | 当前选中值       | 选中单行记录跳转视图初始化时，值为单条当前选中记录；选中多行记录跳转视图初始化时，值为当前选中记录列表；整表单校验时，值为当前表单提交记录；单字段校验时，值为当前字段值。作为动作筛选条件时，值为动作模型定义数据。 |
| activeModel  | 当前选中值的模型 | 当前选中记录的模型，可能为空                                 |
| activeField  | 当前选中值的字段 | 当前选中记录的字段，可能为空                                 |

### 2、上下文变量

| 变量              | 名称         | 说明                                                         |
| ----------------- | ------------ | ------------------------------------------------------------ |
| module            | 模块         | 使用示例: context.module示例说明：请求上下文中的执行模块     |
| requestFromModule | 请求发起模块 | 使用示例: context.requestFromModule示例说明：请求上下文中的请求发起模块 |
| lang              | 语言         | 使用示例: context.lang示例说明：请求上下文中的语言           |
| country           | 国家         | 使用示例: context.country示例说明：请求上下文中的国家        |
| env               | 环境         | 使用示例: context.env示例说明：请求上下文中的环境            |
| extend            | 扩展信息     | 使用示例: context.extend.扩展变量名示例说明：请求上下文中的扩展信息 |

## （四）内置函数

内置函数章节介绍的内置函数可以在表达式中使用。例如，使用ABS(activeRecord.amount)来获取当前选中记录金额的绝对值。

# 七、事务控制

在 Oinone 平台中，事务管理是保障数据一致性与可靠性的核心功能，其设计深度兼容 Spring 事务机制，同时针对多数据源场景进行强化，确保高并发环境下的稳定运行。

## （一）函数级事务配置

函数`Function`的事务配置遵循**最小化侵入原则**，默认不启用事务：

- `isTransaction`：事务开关，默认关闭（`false`）
- `propagationBehavior`：事务传播行为，默认采用`PROPAGATION_SUPPORTS`，即优先使用现有事务，若无则以非事务模式执行
- `isolationLevel`：事务隔离级别，默认继承数据库原生配置

平台同时提供全局事务配置能力，支持统一调整事务策略，满足项目级定制需求。

## （二）事务管理能力

在 Oinone 平台的事务管理体系中，多模式兼容与多数据源增强是两大核心优势，它们共同为复杂业务场景下的数据一致性和系统稳定性提供了坚实保障。

Oinone 无缝对接 Spring 的声明式与编程式事务，为开发者提供了丰富且灵活的事务管理方式。

### 1、声明式事务

通过`@PamirsTransactional`注解，开发者可以轻松地将事务管理应用到类或方法上。该注解与 Spring 的`@Transactional`功能完全兼容，以下是一个示例：

``` java
@Fun(TestModelHelloService.FUN_NAMESPACE)
@Component
public class TestModelHelloServiceImpl implements TestModelHelloService {

    @Override
    @PamirsTransactional
    //@Transactional // 与Spring的注解功能完全兼容
    @Function(openLevel = FunctionOpenEnum.API)
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public TestModel sayHello(TestModel data) {
        // 业务逻辑处理
        return data;
    }
}
```

### 2、编程式事务

Oinone 提供的`PamirsTransactionTemplate`与 Spring 的`TransactionTemplate`具有一致的编程接口。在高并发场景下，编程式事务开发模式具有显著的性能优势，它允许开发者对事务的开启长度进行精细化控制，尽可能在事务开启前完成费时的查询工作和数据准备。以下是基本的使用套路：

``` java
Tx.build(new TxConfig().setPropagation(Propagation.REQUIRED.value())).executeWithoutResult(status -> {
    // 执行逻辑
});
```

通过这种方式，开发者可以更加灵活地控制事务的边界，从而提升系统的整体性能。

### 3、多数据源增强

在多数据源环境下，Oinone 的事务管理展现出了强大的适应性和可靠性。

- 多库事务支持

`PamirsTransactional`与 Spring 的`Transactional`的一个重要区别在于，`PamirsTransactional`支持多库事务。尽管这种多库事务并非严格意义上的分布式多库事务，但它能够满足大多数实际业务场景的需求。

- 智能锁机制

Oinone 支持多数据源嵌套独立事务，并通过智能锁机制有效地规避了死锁风险。这一机制确保了在复杂的多数据源环境下，系统能够稳定运行，避免了因死锁而导致的系统故障。

- 内置隔离策略

为了确保多数据源及分表操作场景下的数据一致性，Oinone 内置了强大的隔离策略，杜绝了脏读问题的发生。这一策略保证了在并发操作时，数据的准确性和完整性，为业务的正常运行提供了有力保障。

## （三）事务核心特性

| **特性** | **定义**                                             | **应用价值**                 |
| -------- | ---------------------------------------------------- | ---------------------------- |
| 原子性   | 事务操作不可分割，所有操作要么全部提交，要么全部回滚 | 避免部分成功导致的数据不一致 |
| 一致性   | 事务执行前后数据完整性保持一致                       | 保障业务逻辑正确性           |
| 隔离性   | 并发事务间相互隔离，互不干扰                         | 提升数据访问可靠性           |
| 持久性   | 事务提交后数据永久落盘保存                           | 确保数据安全不丢失           |

## （四）事务隔离级别

### 1、并发访问风险

在未配置隔离机制时，并发事务可能引发以下问题：

| **问题类型** | **描述**                           | **典型场景**               |
| ------------ | ---------------------------------- | -------------------------- |
| 脏读         | 事务读取到其他未提交事务的更新数据 | 银行转账未提交时的余额查询 |
| 不可重复读   | 同一事务内多次查询结果不一致       | 订单查询过程中数据被修改   |
| 幻读         | 事务执行过程中出现新增或消失的数据 | 批量操作时数据行数量变化   |

### 2、支持的隔离级别

| **隔离级别**       | **描述**                                                  | **风险规避**   | **性能影响** |
| ------------------ | --------------------------------------------------------- | -------------- | ------------ |
| `DEFAULT`          | 采用数据库默认隔离（Oracle 为读已提交，MySQL 为可重复读） | 基础防护       | 低           |
| `READ_UNCOMMITTED` | 最低级别，允许脏读                                        | 无防护         | 最低         |
| `READ_COMMITTED`   | 仅读取已提交数据，存在不可重复读和幻读风险                | 规避脏读       | 中           |
| `REPEATABLE_READ`  | 保证同一事务内查询结果一致，仍有幻读可能                  | 解决不可重复读 | 中高         |
| `SERIALIZABLE`     | 最高级别，通过串行化彻底消除所有并发问题                  | 完全防护       | 最高         |

## （五）事务传播行为

事务传播行为定义了方法调用时的事务处理策略：

### 1、同事务场景

- `PROPAGATION_REQUIRED`：默认策略，若无事务则新建，存在则复用
- `PROPAGATION_SUPPORTS`：优先使用现有事务，无事务则非事务执行
- `PROPAGATION_MANDATORY`：必须在事务环境中执行，否则抛出异常

### 2、独立事务场景

- `PROPAGATION_REQUIRES_NEW`：挂起当前事务，创建全新独立事务
- `PROPAGATION_NOT_SUPPORTED`：强制非事务执行，挂起现有事务
- `PROPAGATION_NEVER`：禁止事务环境，存在事务则抛出异常
- `PROPAGATION_NESTED`：在现有事务中创建嵌套事务

### 3、嵌套事务特别说明

当 A 方法嵌套 B 事务（`PROPAGATION_REQUIRES_NEW`）时，B 方法需与 A 处于不同类，避免潜在调用冲突。不同异常场景下的回滚策略如下：

| **场景**       | `PROPAGATION_REQUIRES_NEW`                    | `PROPAGATION_NESTED` | `PROPAGATION_REQUIRED` |
| -------------- | ------------------------------------------------- | ------------------------ | -------------------------- |
| A 异常，B 正常 | A 回滚，B 提交                                    | A 与 B 共同回滚          | A 与 B 共同回滚            |
| A 正常，B 异常 | ①A 捕获：B 回滚，A 提交 ②A 未捕获：B 回滚，A 回滚 | B 回滚，A 提交           | A 与 B 共同回滚            |
| A 与 B 均异常  | B 回滚，A 回滚                                    | A 与 B 共同回滚          | A 与 B 共同回滚            |
| A 与 B 均正常  | B 先提交，A 后提交                                | A 与 B 共同提交          | A 与 B 共同提交            |

通过上述完整的事务管理体系，Oinone 平台为开发者提供了灵活、可靠的事务处理方案，有效应对复杂业务场景下的数据一致性挑战。