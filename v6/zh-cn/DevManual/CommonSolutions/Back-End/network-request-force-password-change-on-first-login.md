---
title: 网络请求：第一次登录强制修改密码
index: true
category:
  - 常见解决方案
order: 64
---
# 一、场景概述

在某些场景下，可能需要实现 `用户首次登录`强制修改密码的功能，或者存在修改平台默认密码等校验规则等需求；本文将讲解不改变平台代码的情况下，如何实现这些功能需求。

# 二、首次登录修改密码

## （一）方案概述

自定义 User 增加是否是第一次登录的属性，登录后执行一个扩展点。 判断是否是一次登录，如果是则返回对应的状态码，前端根据状态码重定向到修改密码的页面。修改完成则充值第一次登录的标识。

:::warning 提示

首次登录的标识平台前端已默认实现

:::

## （二）扩展PamirsUser(例如：DemoUser)

```java
/**
 * @author wangxian
 */
@Model.model(DemoUser.MODEL_MODEL)
@Model(displayName = "用户", labelFields = {"nickname"})
@Model.Advanced(index = {"companyId"})
public class DemoUser extends PamirsUser {
    public static final String MODEL_MODEL = "demo.DemoUser";

    @Field.Integer
    @Field.Advanced(columnDefinition = "bigint DEFAULT '0'")
    @Field(displayName = "公司ID", invisible = true)
    private Long companyId;

    /**
     * 默认true->1
     */
    @Field.Boolean
    @Field.Advanced(columnDefinition = "tinyint(1) DEFAULT '1'")
    @Field(displayName = "是否首次登录")
    private Boolean firstLogin;
}
```

## （三）编写扩展点(例如：DemoUserLoginExtPoint)

```java
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

# 三、修改平台密码规则

## （一）密码规则平台内置 SPI

平台已提供内置SPI：UserPatternCheckApi 支持用户自定义密码、用户 Nick、邮箱等指定以校验规则。内置 SPI 接口定义如下：

```java
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

## （二）项目上密码规则自定义示例

下面的示例实现自定义校验：
1、用户账号不检验格式，只检验登录 login 不为空；
2、密码不检验格式，只校验长度是 3 到 8位；

```java
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

