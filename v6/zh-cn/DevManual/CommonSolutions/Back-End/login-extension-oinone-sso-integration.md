---
title: 登录扩展：Oinone登录扩展：对接SSO
index: true
category:
  - 常见解决方案
order: 62
---
# 一、概述

在企业内部环境中，若已构建一套完备的单点登录系统（SSO），基于提升企业信息化管理效率与用户体验的考量，往往会要求将所有内部系统接入该 SSO 体系。本文着重阐释运用 Oinone 进行开发的项目，与 SSO 系统实现对接的具体实施方法与步骤。

# 二、对接步骤

1、项目自定义实现`UserCookieLogin`，可参考示例说明：`pro.shushi.pamirs.user.api.login.UserCookieLoginFree`

2、对接SSO示例

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
 *  完全自定义login的过程
 *  需要实现登陆部分login 以及拦截部分fetchUserIdByReq
 *  如果fetchUserIdByReq返回值为null的时候 将会被拦截
 */
@Slf4j
@Order(0)
@Component
public class DemoUserSSOCookieLogin extends UserCookieLogin<PamirsUser>  {

    //刷新令牌
    private static String REFRESH_TOKEN = "refreshToken";
    //系统id
    private static String CLIENT_ID = "client-id";
    //访问令牌
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
     * 重写登录拦截功能
     * 该函数主要作用,通过三方权限校验.
     * @return
     */
    // 版本升级需要修改
    @Override
    public PamirsUserDTO fetchUserIdByReq() {
        String sessionId = PamirsSession.getSessionId();
        PamirsUserDTO pamirsUserDTO = UserCache.get(sessionId);
        if (pamirsUserDTO ==null) {
            //H5-企业微信登录，其他SSO登录。获取标识
            String accessToken = (String) PamirsSession.getRequestVariables().getVariables().get("accessToken");
            ApiCommonTransient permissionInfo = AuthenticateUtils.getPermissionInfo(accessToken);
            // *******登录成功的条件判断，各SSO根据情况自行修改********
            if(HttpConstant.SUCCESS.equals(permissionInfo.getCode())) {
                // SSO用户 换 Oinone用户
                PamirsUser pamirsUser = setUserInfoToCookiesAndSetUserIdToCache(permissionInfo,accessToken);
                return new PamirsUserDTO().setUserId(pamirsUser.getId()).setPhone(pamirsUser.getPhone())
                .setUserCode(pamirsUser.getCode()).setLogin(pamirsUser.getLogin()).setEmail(pamirsUser.getEmail()).setUserName(pamirsUser.getName());
            } else {
                //用户未登录,并且token未获取到用户null（根据实际情况修改）
                return null;
            }
        } else {
            return fetchUserIdByReq4Pamirs();
        }
    }

    /**
     * 开放一个用户登录setCookies函数 供登录和跳转校验
     * @param permissionInfo
     * @param accessToken
     * @return
     */
    public PamirsUser setUserInfoToCookiesAndSetUserIdToCache(ApiCommonTransient permissionInfo, String accessToken) {
        PermissionInfoResp ssoResponseTransient = JSON.parseObject(permissionInfo.getData().toString(), PermissionInfoResp.class);
        // *********示例：SSO跟业务系统中用户ID关联；其他关联条件请根据数据情况处理*******
        PamirsUser pamirsUser = userService.queryById(ssoResponseTransient.getUserInfo().getId());
        if (pamirsUser == null) {
            // ********SSO中有用户数据，Oinone的系统中没有需要怎么处理************/
            // ********这里仅仅是一个示例，在上述情况下创建用户，请根据实际情况处理，请根据实际情况处理*****/
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
        //set accessToken to cookies
        /**
        String userCodeCacheKey = SSOConstant.USER_REDIS_CACHE + pamirsUser.getId();
        redisTemplate.opsForValue().set(userCodeCacheKey,accessToken,3600, TimeUnit.SECONDS);
        **/
        return pamirsUser;
    }

    // ********这里仅仅是一个示例，在上述情况下创建用户，请根据实际情况处理，请根据实际情况处理*****/
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
     * 原始用户登陆后函数调用
     * @return
     */
    private PamirsUserDTO fetchUserIdByReq4Pamirs() {
        PamirsUserDTO pamirsUserDTO = super.fetchUserIdByReq();
        if (pamirsUserDTO == null || pamirsUserDTO.getUserId() == null) {
            return pamirsUserDTO;
        }
        PamirsUser user = new PamirsUser().setId(pamirsUserDTO.getUserId()).queryById();
        if (user != null && !Boolean.TRUE.equals(user.getActive())) {
            //清理下登录的cookie
            logout();
            log.error("{}当前用户是{},{}", UserExpEnumerate.USER_CAN_NOT_ACTIVE_ERROR, pamirsUserDTO.getUserId(), pamirsUserDTO.getLogin());
            throw PamirsException.construct(UserExpEnumerate.USER_CAN_NOT_ACTIVE_ERROR).errThrow();
        }

        return pamirsUserDTO;
    }

}

```

# 三、对接SSO示例代码包

示例代码包下载：[SS0对接Demo示例](https://doc.oinone.top/wp-content/uploads/2024/04/2024053012472822.zip)

