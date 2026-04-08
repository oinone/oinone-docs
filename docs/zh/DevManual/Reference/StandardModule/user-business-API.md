---
title: 用户与商业主体 API（User & Business API）
index: true
category:
  - 研发手册
  - Reference
  - 标准模块
order: 1
prev:
  text: UI icons
  link: /zh/DevManual/Reference/UserInterface/UI-icons.md
---
# 一、概述

## （一）名词解释

+ **商业主体（PamirsPartner）**：指参与商业活动的独立实体，延续社会化概念，代表自然人或法人，作为商业关系与交易行为的主体（如签约、合同履约）。
  - 指参与商业活动的独立实体，延续社会化概念，代表自然人或法人，作为商业关系与交易行为的主体（如签约、合同履约）。
+ **商业关系（PamirsPartnerRelation）**：指商业主体之间的关联类型，用于明确双方在特定场景下的角色（如 “供应商 - 采购方”“母公司 - 子公司”“总代 - 分销商” 等）。
  - **关键要素**：
    * **关系类型**：定义关系的性质（如供货关系、控股关系、代理关系）。
    * **双向性**：关系通常具有双向视角（如 A 是 B 的供应商 → B 是 A 的客户）。
    * **业务规则**：关系可关联业务逻辑（如限制交易范围、自动匹配流程）。
+ **用户（PamirsUser）**：聚焦 “系统使用者”，指拥有账号（含用户名、密码或第三方登录凭证）、通过界面交互操作的实体，强调操作行为主体（如登录、数据编辑）。

## （二）**商业主体**与用户的设计逻辑

二者在底层独立，通过上层业务逻辑关联（如登录时通过用户账号绑定客户主体）：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/1635235910168-1d3e76ad-486f-41fc-9bf7-960729481122.jpeg)

### 1、商业主体：商业关系的主体建模

+ **基础模型**：`PamirsPartner` 作为商业主体抽象，派生两个子类：
  - `PamirsCompany`（法人客户）：关联多个 `PamirsDepartment`（部门）和 `PamirsEmployee`（员工），支持企业组织架构管理。
  - `PamirsPerson`（自然人客户）：直接对应个体客户，聚焦个人信息管理。
+ **关联关系**：
  - 一个 `PamirsCompany` 包含多个部门和员工，部门隶属于唯一客户，员工可属于多个部门或客户（支持主客户关联）。

### 2、用户设计：操作行为的主体建模

+ `PamirsUser` 作为操作主体，核心特征包括：
  - 绑定登录账号（用户名 / 密码），支持多 `PamirsUserThirdParty`（第三方登录账户，如微信、钉钉）。
  - 独立于客户体系，通过上层业务逻辑（如会话管理）与一个或多个客户主体关联（例如：员工账号可操作所属公司的多个客户业务）。

## （三）Oinone的商业关系（合作伙伴关系）

在 Oinone 平台中，通过**关系设计模式 + 多表继承**的组合，可高效构建灵活、可扩展的合作伙伴关系体系，为供应链管理、分销网络、集团化业务等场景提供底层支撑。在企业级系统架构中，商业关系建模是核心挑战之一。主流设计模式主要分为**角色模式**与**关系模式**，Oinone 选择关系模式的决策背后，是对扩展性、业务灵活性和系统复杂度的综合权衡。

### 1、角色设计模式（基于主体扩展）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/1694848958081-2b76d396-ebbd-46bd-a559-f47c955e21e3.jpeg)

+ **思路**：枚举商业角色（如经销商、供应商），每个角色对应独立的主体子类，通过字段或关系表维护主体间关系。
+ **优缺点**：角色与主体强绑定，业务语义明确。
+ **实现痛点**：
  - 主体与关系需同步扩展（新增角色需创建子类，维护 M2O/O2M/M2M 关系表），复杂度高。
  - 场景限制：例如创建合同时，若要求乙方必须是甲方的 “经销商”，需预先维护大量角色关联关系，灵活性差。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/1635327300661-2a1082a1-b118-418c-ac40-9e639f6d75f2.jpeg)

### 2、关系设计模式（Oinone 选择）

+ **思路**：统一抽象 “商业关系”，通过独立模型描述主体间关联（如 “合作关系”“母子公司关系”），不依赖主体子类。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/1747660831784-4dca467d-7bad-4b2d-930f-4b1f89d2406a.jpeg)

+ **实现优势**：
  - 只需维护**关系模型扩展**，主体模型保持稳定，降低复杂度。
  - 统一管理所有商业关系（如合作类型、有效期、权限范围），支持灵活的场景组合（如跨行业合作、多层级关联）。
+ **技术实现**：
  - 采用**多表继承**：父模型 `PamirsPartnerRelation` 定义核心字段（如主体 A、主体 B、关系类型），子模型扩展个性化属性（如合同有效期、合作条款）。
  - 收敛关系类型，通过统一接口管理，避免重复开发。

![画板](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/StandardModule/BestParadigm/1635320927409-8b3c0d27-9068-4ffa-bba2-8be50dd5442c.jpeg)

# 二、常见示例

## （一）示例设计：用户 - 员工 - 公司关联建模与 Session 集成

### 1、场景目标

实现用户登录后自动关联所属公司，并在创建业务对象（如店铺）时自动填充公司主体信息，基于 Oinone 框架演示多模型关联与 Session 上下文管理。

### 2、准备工作

**目标**：引入基础业务模块，建立模型继承关系。

+ **添加 Maven 依赖**

``` xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-business-api</artifactId>
</dependency>
```

**说明**：`pamirs-business-api`包含`PamirsCompany`（公司）、`PamirsEmployee`（员工）等基础模型。

+ **声明模块依赖**

``` java
@Module(
    dependencies = { BusinessModule.MODULE_MODULE }
)
public class TestModule { /* ... */ }
```

### 3、场景示例

#### 步骤 1：新建业务模型与服务

**目标**：扩展基础模型，定义用户 - 员工 - 公司关联关系。

**员工模型（TestEmployee）**

``` java
@Model.model(TestEmployee.MODEL_MODEL)
@Model(displayName = "公司员工", labelFields = "name")
public class TestEmployee extends PamirsEmployee {
    public static final String MODEL_MODEL = "test.TestEmployee";

    @Field(displayName = "用户")
    private PamirsUser user; // 关联用户模型
}
```

**公司模型（TestCompany）**

``` java
@Model.model(TestCompany.MODEL_MODEL)
@Model(displayName = "公司", labelFields = "name")
public class TestCompany extends PamirsCompany {
    public static final String MODEL_MODEL = "test.TestCompany";

    @Field.Text
    @Field(displayName = "简介")
    private String introduction; // 扩展公司简介字段
}
```

**员工查询服务**

``` java
@Fun(TestEmployeeQueryService.FUN_NAMESPACE)
public interface TestEmployeeQueryService {
    String FUN_NAMESPACE = "test.TestEmployeeQueryService";

    @Function
    TestEmployee queryByUserId(Long userId); // 通过用户ID查询员工
}
```

**实现类**：

``` java
@Fun(TestEmployeeQueryService.FUN_NAMESPACE)
@Component
public class TestEmployeeQueryServiceImpl implements TestEmployeeQueryService {
    @Override
    public TestEmployee queryByUserId(Long userId) {
        if (userId == null) return null;
        return new TestEmployee()
            .queryOneByWrapper(new QueryWrapper<TestEmployee>()
                .from(TestEmployee.MODEL_MODEL)
                .eq("user_id", userId)
            );
    }
}
```

**公司查询服务**

``` java
@Fun(TestCompanyQueryService.FUN_NAMESPACE)
public interface TestCompanyQueryService {
    String FUN_NAMESPACE = "test.TestCompanyQueryService";

    @Function
    TestCompany queryByCode(String code); // 通过公司编码查询
}
```

**实现类**：

``` java
@Fun(TestCompanyQueryService.FUN_NAMESPACE)
@Component
public class TestCompanyQueryServiceImpl implements TestCompanyQueryService {
    @Override
    public TestCompany queryByCode(String code) {
        return StringUtils.isBlank(code) ? null : new TestCompany().queryByCode(code);
    }
}
```

#### 步骤 2：Session 上下文集成

参考：与此主题相关的文档可在 “[扩展PamirsSession](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md#二-扩展pamirssession)” 中找到。

**目标**：登录时建立用户→员工→公司的关联，存储于 Session。

**扩展 Session 数据模型**

修改`DemoSessionData`，增加公司属性：

``` java
public class DemoSessionData {
    private PamirsUser user;
    private TestCompany company; // 新增公司属性
    // getters and setters
}
```

**修改 DemoSessionCache 缓存逻辑**

``` java
public class DemoSessionCache {
    private static final ThreadLocal<DemoSessionData> BIZ_DATA_THREAD_LOCAL = new ThreadLocal<>();

    // 获取当前用户
    public static PamirsUser getUser() { /* ... */ }

    // 获取当前公司
    public static TestCompany getCompany() { /* ... */ }


    // 初始化上下文
    public static void init() {
        Long uid = PamirsSession.getUserId();
        if (uid == null) return;

        // 1. 查询用户
        PamirsUser user = CommonApiFactory.getApi(UserService.class).queryById(uid);
        if (user == null) return;

        // 2. 通过用户查询员工
        TestEmployee employee = CommonApiFactory.getApi(TestEmployeeQueryService.class).queryByUserId(uid);
        if (employee == null) return;

        // 3. 通过员工公司编码查询公司
        TestCompany company = CommonApiFactory.getApi(TestCompanyQueryService.class).queryByCode(employee.getCompanyCode());

        // 4. 存储至Session
        TestSessionData data = new TestSessionData();
        data.setUser(user);
        data.setCompany(company);
        BIZ_DATA_THREAD_LOCAL.set(data);
    }
}
```

#### 步骤 3：业务模型关联与自动填充

**重写业务模型的创建方法**

``` java
@Component
@Model.model(TestShop.MODEL_MODEL)
public class TestShopAction {
    @Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true,check = true)
    public TestShop create(TestShop data) {
        // 从Session获取当前公司
        TestCompany company = DemoSessionCache.getCompany();
        if (company != null) {
            data.setPartner(company); // 自动填充所属主体
        }
        data.create();
        return data;
    }
}
```

**逻辑**：创建店铺时，若未手动选择主体，则从 Session 中获取当前用户关联的公司。

### 4、注意事项与优化点

+ **员工创建逻辑**
  - 需重写`TestEmployee`的`create`方法，确保`employeeType`字段非空（基础模型必填）：

``` java
@Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true,check = true)
public TestEmployee create(TestEmployee data) {
    data.setEmployeeType(EmployeeTypeEnum.COMMON); // 手动赋值
    return data.create();
}
```

+ **多员工场景**
  - 当前`queryByUserId`方法未处理 “一用户多员工” 场景，需调整为返回列表或指定主员工：****

``` java
// 修改服务接口
List<TestEmployee> queryByUserId(Long userId);
```

### **5、总结**

本示例通过**用户→员工→公司**的三层关联，演示了 Oinone 框架中模型继承、Session 上下文管理和业务逻辑自动填充的核心能力。关键技术点包括：

+ 模型扩展
+ ThreadLocal 实现请求级上下文管理
+ 业务动作（Action）对 Session 数据的调用
+ 自动填充规则在创建场景中的应用

通过此类设计，可实现用户登录后自动关联商业主体，减少人工操作并提升数据一致性，适用于权限控制、组织架构管理等企业级场景。

# 三、更多常用 API

描述 Oinone 平台用户登录、密码管理及信息维护相关 API，包含核心模型、接口定义、扩展机制及示例代码，适用于二次开发和功能扩展。

## （一）PamirsUserTransient（用户临时模型）

**类路径**：`pro.shushi.pamirs.user.api.model.tmodel.PamirsUserTransient`
**功能**：处理用户登录、注册、信息修改等临时数据，包含加密字段和业务状态标识。

### 1、成员变量

| **字段名**        | **类型**              | **注释**                     | **示例值**          |
| :---------------- | :-------------------- | :--------------------------- | :------------------ |
| login             | String                | 登录账号（加密字段），必填   | "user123"           |
| password          | String                | 密码（加密字段），必填       | "******"            |
| verificationCode  | String                | 验证码，必填                 | "123456"            |
| errorCode         | Integer               | 错误代码，用于扩展逻辑返回   | 40001               |
| broken            | Boolean               | 是否中断流程（默认 false）   | true                |
| autoLogin         | Boolean               | 自动登录标识                 | true                |
| userBehaviorEvent | UserBehaviorEventEnum | 用户行为事件（如登录、注册） | LOGIN_BY_PHONE_CODE |


其他字段详见源码

### 2、关键方法

| **方法名**             | **描述**                 | **参数** | **返回值** | **异常处理**         |
| :--------------------- | :----------------------- | :------- | :--------- | :------------------- |
| getBroken()            | 获取中断状态             | 无       | Boolean    | 若未设置则返回 false |
| setLogin(String login) | 设置登录账号（自动加密） | login    | void       | 加密异常由框架处理   |


## （二）PamirsUserAction（用户信息维护）

**类路径**：`pro.shushi.pamirs.user.view.action.PamirsUserAction`
**功能**：处理用户创建、修改、查询等持久化操作，支持 API 接口调用。

**关键方法如下：**

| **方法名**              | **功能描述**     | **参数**                         | **返回值** |
| :---------------------- | :--------------- | :------------------------------- | :--------- |
| create(PamirsUser data) | 创建用户         | data：用户实体（含 login、name） | PamirsUser |
| update(PamirsUser data) | 修改用户信息     | data：需更新的字段（ID 必填）    | PamirsUser |
| userInfo()              | 查询当前用户信息 | 无                               | PamirsUser |
| active(PamirsUser user) | 激活用户         | user：含 ID 的用户实体           | PamirsUser |


## （三）UserBehaviorAction（用户行为处理）

**类路径**：`pro.shushi.pamirs.user.view.action.UserBehaviorAction`
**功能**：处理登录、登出、密码修改、验证码发送等核心行为，支持多种登录方式（Cookie、Token、验证码）。

**关键方法如下：**

| **方法名**                      | **功能描述**        | **参数**                         | **返回值**          |
| :------------------------------ | :------------------ | :------------------------------- | :------------------ |
| login(PamirsUserTransient user) | Cookie 登录         | user：含 login/password          | PamirsUserTransient |
| tokenLoginByVerificationCode    | 验证码 + Token 登录 | user：含 phone/verificationCode  | PamirsUserTransient |
| modifyCurrentUserPassword       | 修改当前用户密码    | user：含 rawPassword/newPassword | PamirsUserTransient |
| firstResetPassword              | 首次登录重置密码    | user：含初始密码和新密码         | PamirsUserTransient |


## （四）常见示例

对用户相关的API进行扩展，可以利用Oinone的 “[ 默认扩展点](/zh/DevManual/Reference/Back-EndFramework/functions-API.md#一-默认扩展点)”和 [SPI](/zh/DevManual/Reference/common-extension-points-and-SPI-list.md#一、spi-机制) 机制进行。

### 1、首次登录修改密码

自定义User增加是否是第一次登录的属性，登录后执行一个扩展点。 判断是否是一次登录，如果是则返回对应的状态码，前端根据状态码重定向到修改密码的页面。修改完成则重置第一次登录的标识。

``` java
/**
 * @author wangxian
 */
@Model.model(DemoUser.MODEL_MODEL)
@Model(displayName = "用户", labelFields = {"nickname"})
@Model.Advanced(index = {"companyId"})
public class DemoUser extends PamirsUser {
    public static final String MODEL_MODEL = "demo.DemoUser";

    /**
     * 默认true->1
     */
    @Field.Boolean
    @Field.Advanced(columnDefinition = "tinyint(1) DEFAULT '1'")
    @Field(displayName = "是否首次登录")
    private Boolean firstLogin;
}
```

``` java
@Order(0)
@Component
@Ext(PamirsUserTransient.class)
@Slf4j
public class DemoUserLoginExtPoint implements PamirsUserTransientExtPoint {

    @Override
    @ExtPoint.Implement
    public PamirsUserTransient loginAfter(PamirsUserTransient user) {
        return checkFirstLogin(user);
    }

    private PamirsUserTransient checkFirstLogin(PamirsUserTransient user) {
        //首次登录需要修改密码
        Long userId = PamirsSession.getUserId();

        if (userId == null) {
            return user;
        }

        DemoUser companyUser = new DemoUser().queryById(userId);
        // 判断用户是否是第一次登录，如果是第一次登录，需要返回错误码，页面重新向登录
        Boolean isFirst = companyUser.getFirstLogin();
        if (isFirst) {
            //如果是第一次登录，返回一个标识给前端。
            // 首次登录的标识平台已默认实现
            user.setBroken(Boolean.TRUE);
            user.setErrorCode(UserExpEnumerate.USER_FIRST_LOGIN_ERROR.code());
            return user;
        }

        return user;
    }

    @Override
    public PamirsUserTransient loginCustomAfter(PamirsUserTransient user) {
        return checkFirstLogin(user);
    }

    @Override
    @ExtPoint.Implement
    public PamirsUserTransient firstResetPasswordAfter(PamirsUserTransient user) {
        return updateFirstLogin(user);
    }

    private PamirsUserTransient updateFirstLogin(PamirsUserTransient user) {
        Long userId = PamirsSession.getUserId();
        if (userId == null) {
            return user;
        }
        //修改密码后 将首次登录标识改为false
        Integer update = new DemoUser().updateByWrapper(new DemoUser().setFirstLogin(Boolean.FALSE),
                Pops.<DemoUser>lambdaUpdate()
                        .from(DemoUser.MODEL_MODEL)
                        .eq(IdModel::getId, userId)
        );
        if (update != 1) {
            user.setBroken(Boolean.TRUE);
            user.setErrorCode(UserExpEnumerate.USER_CHANGE_PWD_NO_USER.code());
        }

        return user;
    }

    @Override
    @ExtPoint.Implement
    public PamirsUserTransient modifyCurrentUserPasswordAfter(PamirsUserTransient user) {
        return updateFirstLogin(user);
    }
}
```

### 2、修改平台密码规则

平台已提供内置SPI：UserPatternCheckApi 支持用户自定义密码、用户Nick、邮箱等指定以校验规则。内置SPI接口定义如下：

``` java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface UserPatternCheckApi {

    default Boolean userPatternCheck(PamirsUser pamirsUser) {
        // 过滤掉系统用户（即系统用户的密码修改不受扩展点影响）8848:eip_system.; 10088L:workflow_system; 10086L:trigger_system
        if (pamirsUser.getId()!=null && (8848L==pamirsUser.getId() || 10086L==pamirsUser.getId() || 10088L==pamirsUser.getId())) {
            return Boolean.TRUE;
        }

        UserPatternCheckApi checkApi = Spider.getLoader(UserPatternCheckApi.class).getDefaultExtension();
        Boolean result ;
        result = checkApi.checkInitialPassword(pamirsUser.getInitialPassword());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkPassword(pamirsUser.getPassword());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkEmail(pamirsUser.getEmail());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkContactEmail(pamirsUser.getContactEmail());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkPhone(pamirsUser.getPhone());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkLogin(pamirsUser.getLogin());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkName(pamirsUser.getName());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkNickName(pamirsUser.getNickname());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkRealName(pamirsUser.getRealname());
        if(Boolean.FALSE.equals(result)){
            return result;
        }

        result = checkApi.checkIdCard(pamirsUser.getIdCard());
        if(Boolean.FALSE.equals(result)){
            return result;
        }
        return result;
    }

    default Boolean checkInitialPassword(String initPassword) {
        UserPatternCheckUtils.checkPassword(initPassword, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkPassword(String password) {
        UserPatternCheckUtils.checkPassword(password, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkEmail(String email) {
        UserPatternCheckUtils.checkEmail(email, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkContactEmail(String contactEmail) {
        UserPatternCheckUtils.checkEmail(contactEmail, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkLogin(String login) {
        UserPatternCheckUtils.checkLogin(login, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkPhone(String phone) {
        UserPatternCheckUtils.checkPhone(phone, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkName(String name) {
        UserPatternCheckUtils.checkName(name, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkNickName(String nickname) {
        UserPatternCheckUtils.checkNickName(nickname, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkRealName(String realname) {
        UserPatternCheckUtils.checkRealName(realname, Boolean.TRUE);
        return Boolean.TRUE;
    }

    default Boolean checkIdCard(String idCard) {
        UserPatternCheckUtils.checkIdCard(idCard, Boolean.TRUE);
        return Boolean.TRUE;
    }
}
```

下面的示例实现自定义校验：

+ 用户账号不检验格式，只检验登录login不为空；
+ 密码不检验格式，只校验长度是 3 到 8位；

``` java
@Slf4j
@SPI.Service
@Order(50) //默认优先级最低，业务配置需要配置成为优先级高
@Component
public class DemoUserPatternCheckApi implements UserPatternCheckApi {

    /**
     * 按需（无特殊逻辑无需实现），修改密码的校验规则
     **/
    @Override
    public Boolean checkPassword(String password) {
        //自定义校验逻辑
        checkPasswordPattern(password);
        return Boolean.TRUE;
    }

    /**
     * 按需（无特殊逻辑无需实现），修改Login的校验规则
     **/
    @Override
    public Boolean checkLogin(String login) {
        if (StringUtils.isBlank(login)) {
            throw PamirsException.construct(EMPLOYEE_LOGIN_NOT_BLANK).errThrow();
        }
        return Boolean.TRUE;
    }

    private static void checkPasswordPattern(String password) {
        if (StringUtils.isBlank(password)) {
            throw PamirsException.construct(EMPLOYEE_PASSWORD_NOT_BLANK).errThrow();
        }
        int length = password.length();
        boolean mark = length >= 3 && length <= 8;
        if (!mark) {
            throw PamirsException.construct(EMPLOYEE_PASSWORD_CHECK_RULE).errThrow();
        }
    }
}
```

