---
title: Network Request:Forced Password Change on First Login
index: true
category:
  - Common Solutions
order: 64
---
# I. Scenario Overview

In some scenarios, there may be a need to implement the function of forcing users to change their passwords on their first login, or to enforce validation rules such as modifying the platform's default password. This article will explain how to achieve these functional requirements without modifying the platform code.

# II. Forced Password Change on First Login

## (I) Solution Overview

Customize the User model to add an attribute indicating whether it is the first login, and execute an extension point after login. Check if it is the first login; if so, return the corresponding status code, and the frontend will redirect to the password change page based on the status code. After completion, reset the first login flag.

:::warning Tip

The first login flag is already implemented by default in the platform frontend.

:::

## (II) Extend PamirsUser (e.g., DemoUser)

```java
/**
 * @author wangxian
 */
@Model.model(DemoUser.MODEL_MODEL)
@Model(displayName = "User", labelFields = {"nickname"})
@Model.Advanced(index = {"companyId"})
public class DemoUser extends PamirsUser {
    public static final String MODEL_MODEL = "demo.DemoUser";

    @Field.Integer
    @Field.Advanced(columnDefinition = "bigint DEFAULT '0'")
    @Field(displayName = "Company ID", invisible = true)
    private Long companyId;

    /**
     * Default true->1
     */
    @Field.Boolean
    @Field.Advanced(columnDefinition = "tinyint(1) DEFAULT '1'")
    @Field(displayName = "First Login")
    private Boolean firstLogin;
}
```

## (III) Write Extension Point (e.g., DemoUserLoginExtPoint)

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
        // Password change required for first login
        Long userId = PamirsSession.getUserId();

        if (userId == null) {
            return user;
        }

        DemoUser companyUser = new DemoUser().queryById(userId);
        // Check if it is the first login, return error code for redirect if true
        Boolean isFirst = companyUser.getFirstLogin();
        if (isFirst) {
            // Return flag to frontend for first login
            // First login flag is implemented by the platform by default
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
        // Update first login flag to false after password change
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

# III. Modify Platform Password Rules

## (I) Platform Built-in SPI for Password Rules

The platform provides a built-in SPI: UserPatternCheckApi, which supports custom password, user Nick, email, and other validation rules. The built-in SPI interface is defined as follows:

```java
@SPI(factory = SpringServiceLoaderFactory.class)
public interface UserPatternCheckApi {

    default Boolean userPatternCheck(PamirsUser pamirsUser) {
        // Exclude system users (password changes for system users are not affected by extension points) 8848:eip_system.; 10088L:workflow_system; 10086L:trigger_system
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

## (II) Custom Password Rule Example in Projects

The following example implements custom validation:
1. User accounts do not check format, only ensure login is not empty;
2. Passwords do not check format, only ensure length is 3 to 8 characters;

```java
@Slf4j
@SPI.Service
@Order(50) // Default lowest priority, business configuration needs higher priority
@Component
public class DemoUserPatternCheckApi implements UserPatternCheckApi {

    /**
     * Customize password validation rules as needed (no need to implement if no special logic)
     **/
    @Override
    public Boolean checkPassword(String password) {
        // Custom validation logic
        checkPasswordPattern(password);
        return Boolean.TRUE;
    }

    /**
     * Customize login validation rules as needed (no need to implement if no special logic)
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