---
title: Login Extension:Oinone Login Extension:Docking with SSO
index: true
category:
  - Common Solutions
order: 62
---

# 一、Overview

In an enterprise internal environment, if a complete Single Sign-On (SSO) system has been built, it is often required to integrate all internal systems into this SSO system based on considerations of improving enterprise information management efficiency and user experience. This article focuses on explaining the specific implementation methods and steps for projects developed using Oinone to dock with the SSO system.

# 二、Docking Steps

1. The project customizes the implementation of `UserCookieLogin`, which can refer to the example: `pro.shushi.pamirs.user.api.login.UserCookieLoginFree`

2. Example of docking with SSO

```java
package pro.shushi.pamirs.demo.core.sso;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import pro.shushi.pamirs.demo.core.sso.constant.HttpConstant;
import pro.shushi.pamirs.demo.core.sso.constant.SessionUserTypeEnum;
import pro.shushi.pamirs.demo.core.sso.model.ApiCommonTransient;
import pro.shushi.pamirs.demo.core.sso.model.PermissionInfoResp;
import pro.shushi.pamirs.demo.core.sso.utils.AuthenticateUtils;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;
import pro.shushi.pamirs.meta.api.dto.model.PamirsUserDTO;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.meta.common.exception.PamirsException;
import pro.shushi.pamirs.meta.common.spring.BeanDefinitionUtils;
import pro.shushi.pamirs.resource.api.enmu.UserSignUpType;
import pro.shushi.pamirs.user.api.cache.UserCache;
import pro.shushi.pamirs.user.api.constants.UserConstant;
import pro.shushi.pamirs.user.api.enmu.UserExpEnumerate;
import pro.shushi.pamirs.user.api.enmu.UserLoginTypeEnum;
import pro.shushi.pamirs.user.api.login.IUserLoginChecker;
import pro.shushi.pamirs.user.api.login.UserCookieLogin;
import pro.shushi.pamirs.user.api.login.UserCookieLoginSimple;
import pro.shushi.pamirs.user.api.model.PamirsUser;
import pro.shushi.pamirs.user.api.model.tmodel.PamirsUserTransient;
import pro.shushi.pamirs.user.api.service.UserService;
import pro.shushi.pamirs.user.api.utils.CookieUtil;

import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author shushi
 *
 *  Fully customized login process
 *  Needs to implement the login part login and the interception part fetchUserIdByReq
 *  If the return value of fetchUserIdByReq is null, it will be intercepted
 */
@Slf4j
@Order(0)
@Component
public class DemoUserSSOCookieLogin extends UserCookieLogin<PamirsUser>  {

    // Refresh token
    private static String REFRESH_TOKEN = "refreshToken";
    // System ID
    private static String CLIENT_ID = "client-id";
    // Access token
    private static String AUTHORIZATION = "Authorization";

    private IUserLoginChecker checker;

    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public String type() {
        return UserLoginTypeEnum.COOKIE.value();
    }

    @Override
    public PamirsUser resolveAndVerification(PamirsUserTransient user) {
        if (checker == null) {
            checker = BeanDefinitionUtils.getBean(IUserLoginChecker.class);
        }
        return checker.check4login(user);
    }

    /**
     * Override the login interception function
     * The main role of this function is to pass third-party permission verification.
     * @return
     */
    // Needs to be modified for version upgrade
    @Override
    public PamirsUserDTO fetchUserIdByReq() {
        String sessionId = PamirsSession.getSessionId();
        PamirsUserDTO pamirsUserDTO = UserCache.get(sessionId);
        if (pamirsUserDTO ==null) {
            // H5-Enterprise WeChat login, other SSO logins. Get the identifier
            String accessToken = (String) PamirsSession.getRequestVariables().getVariables().get("accessToken");
            ApiCommonTransient permissionInfo = AuthenticateUtils.getPermissionInfo(accessToken);
            // *******Login success condition judgment, each SSO modifies it according to the situation********
            if(HttpConstant.SUCCESS.equals(permissionInfo.getCode())) {
                // SSO user to Oinone user
                PamirsUser pamirsUser = setUserInfoToCookiesAndSetUserIdToCache(permissionInfo,accessToken);
                return new PamirsUserDTO().setUserId(pamirsUser.getId()).setPhone(pamirsUser.getPhone())
                .setUserCode(pamirsUser.getCode()).setLogin(pamirsUser.getLogin()).setEmail(pamirsUser.getEmail()).setUserName(pamirsUser.getName());
            } else {
                // The user is not logged in, and the token fails to get the user null (modify according to the actual situation)
                return null;
            }
        } else {
            return fetchUserIdByReq4Pamirs();
        }
    }

    /**
     * Open a user login setCookies function for login and jump verification
     * @param permissionInfo
     * @param accessToken
     * @return
     */
    public PamirsUser setUserInfoToCookiesAndSetUserIdToCache(ApiCommonTransient permissionInfo, String accessToken) {
        PermissionInfoResp ssoResponseTransient = JSON.parseObject(permissionInfo.getData().toString(), PermissionInfoResp.class);
        // *********Example: Association between SSO and user ID in the business system; please process other association conditions according to data conditions*******
        PamirsUser pamirsUser = userService.queryById(ssoResponseTransient.getUserInfo().getId());
        if (pamirsUser == null) {
            // ********What to do if there is user data in SSO but not in Oinone's system************/
            // ********This is just an example. Create a user in the above case. Please handle it according to the actual situation. Please handle it according to the actual situation*****/
            pamirsUser = createOrUpdatePamirsUser(ssoResponseTransient);
        }

        HttpServletResponse httpServletResponse = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        UserCookieLoginSimple userCookieLoginSimple = new UserCookieLoginSimple();
        String sessionId = PamirsSession.getSessionId();
        String cacheKey = userCookieLoginSimple.parseSessionId(sessionId);
        UserCache.putCache(cacheKey, userCookieLoginSimple.coverToUserDTO(pamirsUser));
        PamirsSession.setSessionId(sessionId);
        try {
            CookieUtil.set(httpServletResponse, UserConstant.USER_SESSION_ID, sessionId);
        } catch (Exception e) {
            log.error("SSO Login Cookie Set Err", e);
        }
        // set accessToken to cookies
        /**
        String userCodeCacheKey = SSOConstant.USER_REDIS_CACHE + pamirsUser.getId();
        redisTemplate.opsForValue().set(userCodeCacheKey,accessToken,3600, TimeUnit.SECONDS);
        **/
        return pamirsUser;
    }

    // ********This is just an example. Create a user in the above case. Please handle it according to the actual situation. Please handle it according to the actual situation*****/
    private PamirsUser createOrUpdatePamirsUser(PermissionInfoResp ssoResponseTransient) {
        PamirsUser pamirsUser;
        pamirsUser = new PamirsUser();
        pamirsUser.unsetEmail();
        pamirsUser.unsetPhone() ;
        pamirsUser.setId(ssoResponseTransient.getUserInfo().getId());
        pamirsUser.setUserType(SessionUserTypeEnum.COMPANY_ADMIN.displayName());
        pamirsUser.setSignUpType(UserSignUpType.BACKSTAGE);
        pamirsUser.setName(ssoResponseTransient.getUserInfo().getUsername());
        pamirsUser.setLogin(ssoResponseTransient.getUserInfo().getUsername());
        pamirsUser.setNickname(ssoResponseTransient.getUserInfo().getNickname());
        pamirsUser.setRealname(ssoResponseTransient.getUserInfo().getNickname());
        pamirsUser.setId(ssoResponseTransient.getUserInfo().getId());
        userService.createOrUpdate(pamirsUser);
        return pamirsUser;
    }

    /**
     * Function call after the original user logs in
     * @return
     */
    private PamirsUserDTO fetchUserIdByReq4Pamirs() {
        PamirsUserDTO pamirsUserDTO = super.fetchUserIdByReq();
        if (pamirsUserDTO == null || pamirsUserDTO.getUserId() == null) {
            return pamirsUserDTO;
        }
        PamirsUser user = new PamirsUser().setId(pamirsUserDTO.getUserId()).queryById();
        if (user != null && !Boolean.TRUE.equals(user.getActive())) {
            // Clear the login cookie
            logout();
            log.error("{}The current user is {},{}", UserExpEnumerate.USER_CAN_NOT_ACTIVE_ERROR, pamirsUserDTO.getUserId(), pamirsUserDTO.getLogin());
            throw PamirsException.construct(UserExpEnumerate.USER_CAN_NOT_ACTIVE_ERROR).errThrow();
        }

        return pamirsUserDTO;
    }

}
```

# 三、SSO Docking Example Code Package

Example code package download: [SSO Docking Demo Example](https://doc.oinone.top/wp-content/uploads/2024/04/2024053012472822.zip)