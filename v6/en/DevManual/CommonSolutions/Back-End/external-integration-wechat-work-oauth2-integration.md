---
title: External Integration:Enterprise WeChat OAuth2.0 Integration
index: true
category:
  - Common Solutions
order: 8
---

# Ⅰ、Introduction
In the scenario of enterprise digital office, integrating business systems with Enterprise WeChat is a key means to achieve unified identity authentication, message push, etc. This article is based on the Java technology stack and uses the open-source project `weixin-java-cp` to complete the docking.

**Core Functions**

+ **Unified Login and Identity Authentication**: Employees can log in to the system by scanning the code of Enterprise WeChat or without a password.
+ **User Information Acquisition**: Through the OAuth2.0 protocol, obtain the basic information of users and synchronize it to the local database.

:::info Note:

This document mainly explains how to use OAuth2.0 to打通 (open up) the password-free login process of Enterprise WeChat, including the acquisition of user information. For other interfaces such as sending notifications, please refer to the official documentation of Enterprise WeChat, and it is recommended to use the docking method of the Oinone Integration Platform (EIP).

:::

# Ⅱ、Access Preparation
## （Ⅰ）Understand Enterprise WeChat Identity Authentication (Password-Free Login)
For the tutorial on using server-side API identity authentication (password-free login) to implement logging in to third-party websites: [Enterprise WeChat OAuth2.0](https://work.weixin.qq.com/api/doc/90000/90135/91437)

## （Ⅱ）Create an Enterprise WeChat Application
1. Log in to the [Enterprise WeChat Management Console](https://work.weixin.qq.com/wework_admin/loginpage_wx)
2. Go to "Application Management" --> "Self-Built Application" and create a new application
3. Record the following parameters:
    - CorpID (Enterprise ID)
    - Secret (Application Credential Key)
    - AgentId (Application Proxy ID)

## （Ⅲ）Introduce Enterprise WeChat SDK Dependencies
```xml
<dependency>
  <groupId>com.github.binarywang</groupId>
  <artifactId>weixin-java-cp</artifactId>
  <version>4.5.0</version>
</dependency>
```

# Ⅲ、Specific Docking Steps
## （Ⅰ）Add Enterprise WeChat Configuration to the Project
1. Application.yml configuration in the project (adopted in this example)

```yaml
pamirs:
  wxcp:
    corpId: Application's corpId
    agentId: Application's agentId
    agentKey: Application's agentKey
    # Redirect to the home page of the local application after login (modify according to actual situation)
    appUrl: https://2z98098t60.zicp.fun
```

2. The backend configuration method refers to the instructions in the DingTalk docking.

## （Ⅱ）Initialize the Enterprise WeChat Client (WxCpService)
```java
@Slf4j
@Service
public class WxBaseConfig {

    @Autowired
    private WxCpConfig wxCpConfig;
    @Autowired
    private StringRedisTemplate redisTemplate;

    // Configure the Enterprise WeChat service
    public WxCpService getWxCpService() {
        WxCpService wxCpService = new WxCpServiceImpl();
        WxCpDefaultConfigImpl config = new WxCpDefaultConfigImpl();
        config.setAgentId(Integer.valueOf(wxCpConfig.getAgentId()));
        config.setCorpSecret(wxCpConfig.getAgentKey());
        config.setCorpId(wxCpConfig.getCorpId());
        resetTokenAndJsApi(wxCpService, config, Integer.valueOf(wxCpConfig.getAgentId()));
        return wxCpService;
    }

    // Reset the token
    public void resetTokenAndJsApi(WxCpService wxCpService, WxCpDefaultConfigImpl wxCpDefaultConfig, int agentId) {
        // Configure Redis
        wxCpService.setWxCpConfigStorage(wxCpDefaultConfig);
        String wxAccessToken = "wx-config-info:" + agentId;
        String json = redisTemplate.opsForValue().get(wxAccessToken);
        if (!StringUtils.isEmpty(json)) {
            wxCpDefaultConfig = JSON.parseObject(json, WxCpDefaultConfigImpl.class);
            if (log.isDebugEnabled()) {
                log.debug("===>> wxCpDefaultConfig:{}", JSON.toJSONString(wxCpDefaultConfig));
            }
        }
        if (wxCpDefaultConfig.isAccessTokenExpired()) {
            try {
                String accessToken = null;
                accessToken = wxCpService.getAccessToken(false);
                wxCpDefaultConfig.setAccessToken(accessToken);
            } catch (WxErrorException e) {
                log.error("===>> Exception in obtaining Enterprise WeChat AccessToken", e);
                e.printStackTrace();
            }
        }
        if (wxCpDefaultConfig.isJsapiTicketExpired()) {
            String jsApi = null;
            try {
                jsApi = wxCpService.getJsapiTicket();
                wxCpDefaultConfig.setJsapiTicket(jsApi);
            } catch (WxErrorException e) {
                log.error("===>> Exception in obtaining Enterprise WeChat JsapiTicket", e);
                e.printStackTrace();
            }
        }
        redisTemplate.opsForValue().set(wxAccessToken, JSON.toJSONString(wxCpDefaultConfig));
    }
}
```

## （Ⅲ）Build the Authorization Link (Jump to Enterprise WeChat)
```java
/**
 * Get the redirect URL to make Enterprise WeChat jump to the oauth2url and bring the code parameter
 *
 * @param request
 * @return
 */
@GetMapping(value = "/wxCpAuth/oauth")
public void oauth(HttpServletRequest request, HttpServletResponse response) {
    String returnUrl = wxCpConfig.getAppUrl() + "/pamirs/wxCpAuth/oauth2url";
    String result = tpWxCpOAuth2Service.buildAuthorizationUrl(returnUrl, null, "snsapi_privateinfo");
    try {
        log.info("oauth redirect:{}", result);
        response.sendRedirect(result);
    } catch (IOException e) {
        log.error("Enterprise WeChat oauth exception", e);
        try {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "oauth redirection failed!");
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
```

## （Ⅳ）Handle the Enterprise WeChat Callback
Obtain the code and exchange it for the user's UserTicket; use the UserTicket to obtain user information

```java
/**
 * Obtain user information based on the code of Enterprise WeChat
 *
 * @param code
 * @return
 */
@GetMapping(value = "/wxCpAuth/oauth2url")
public void oauth2url(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
    log.info(" ===>>> WxCpApiController oauth2url code: [{}] <<<===", code);
    try {
        WxCpOauth2UserInfo userInfo = this.getWxCpOauth2UserInfoCache(code);
        if (userInfo == null) {
            try {
                userInfo = tpWxCpOAuth2Service.getUserInfo(code);
                log.info(" ===>>> getUserInfo [{}] <<<===", JSON.toJSONString(userInfo));
                // getUserInfo [{"accessTokenInvalid":false,"errorCode":0,"errorMsg":"request successful","json":"{\"userid\":\"OPENID\",\"errcode\":0,\"errmsg\":\"ok\",
                // \"user_ticket\":\"ICprXqB0myY74-ouv2n_HvDdxGpJgjq5gj6rMgr5YgCnM_1DTZUvgZXwN6wTP5-rAMDGb4QVoUzA1jOYMI9_ZylZ1cLPJLnFmWSbdfHSims\",\"expires_in\":1800}","succeed":true}]
                if (userInfo != null) {
                    this.petWxCpOauth2UserInfoCache(code, userInfo);
                }
            } catch (WxErrorException e) {
                log.error("Exception in obtaining Enterprise WeChat user", e);
                throw PamirsException.construct(ThirdPartyExpEnum.WX_AUTH_GET_USER_ERROR).errThrow();
            }
        }

        WxCpUserDetail userDetail = null;
        try {
            userDetail = tpWxCpOAuth2Service.getUserDetail(userInfo.getUserTicket());
            log.info(" ===>>> getUserDetail [{}] <<<===", JSON.toJSONString(userDetail));
        } catch (WxErrorException e) {
            log.error("Exception in obtaining sensitive information of Enterprise WeChat user", e);
            // Allow failure
        }

        // Obtain user information
        PamirsUser pamirsUser = handleUserInfo(userInfo, userDetail, response);
        if (pamirsUser != null) {
            UserToken token = new UserToken(pamirsUser.getPhone(), pamirsUser.getCode(), "", "", System.currentTimeMillis());
            log.info("token:{}", token);
            String tokenStr = UserToken.token2String(token);
            // Place the token in the Cookie (determine whether to place it according to requirements)
            CookieUtil.set(response, X_WECHAT_QY_TOKEN, tokenStr);
            log.info("AppUrl:{}", wxCpConfig.getAppUrl());
            response.sendRedirect(wxCpConfig.getAppUrl());
        } else {
            log.error("Error! {}", "Failed to obtain user information based on the phone number");
            response.sendRedirect(wxCpConfig.getAppUrl() + "/notice?msg=getProfile failed!" + "Failed to obtain user information based on the phone number");
        }
    } catch (Exception e) {
        log.error("auth error", e);
        response.sendRedirect(wxCpConfig.getAppUrl() + "/notice?msg=" + URLEncoder.QUERY.encode(e.getMessage(), Charsets.UTF_8));
    }
}
```

## （Ⅴ）Process User Information and Set the Login State (Session + Cookie)
```java
    private PamirsUser handleUserInfo(WxCpOauth2UserInfo userInfo, WxCpUserDetail userDetail, HttpServletResponse response) {
        if (userDetail == null) {
            return null;
        }

        // User table
        PamirsUser user = new PamirsUser().setLogin(userDetail.getUserId()).queryOne();
        boolean needInitPwd = false;
        if (user == null) {
            user = new PamirsUser();
            needInitPwd = true;
        }
        user.setLogin(userDetail.getUserId());
        user.setPhone(userDetail.getMobile());
        user.setNickname(userDetail.getName());
        user.setName(Optional.ofNullable(userDetail.getName()).orElse(userDetail.getUserId()));
        user.setAvatarUrl(userDetail.getAvatar());
        user.setEmail(userDetail.getEmail());
        String gender = userDetail.getGender();
        if (StringUtils.isNotEmpty(gender)) {
            if ("0".equals(gender)) {
                user.setGender(GenderEnum.NULL);
            } else if ("1".equals(gender)) {
                user.setGender(GenderEnum.MALE);
            } else if ("2".equals(gender)) {
                user.setGender(GenderEnum.FEMALE);
            }
        }
        user.setActive(Boolean.TRUE);
        user.setSource(UserSourceEnum.THIRD_PARTY);
        user.setSignUpType(UserSignUpType.BACKSTAGE);
        user.setUserType("work_weixin");
        user.createOrUpdate();
        // Initialize the password table
        if (needInitPwd) {
            passwordService.encodingCreate(user.getId(), "123456@Abc!");
        }

        // Third-party user three-party login table
        PamirsUserThirdParty userThirdParty = new PamirsUserThirdParty().setThirdPartyType(UserThirdPartyTypeEnum.WORK_WEIXIN)
                .setUnionId(userDetail.getUserId()).queryOne();
        if (userThirdParty == null) {
            PamirsUserThirdParty thirdParty = new PamirsUserThirdParty();
            thirdParty.setUserId(user.getId());
            thirdParty.setOpenid(userInfo.getOpenId());
            thirdParty.setUnionId(userDetail.getUserId());
            thirdParty.setThirdPartyType(UserThirdPartyTypeEnum.WORK_WEIXIN);
            thirdParty.createOrUpdate();
        }
        // Clear the cache after the user information is updated
        UserInfoCache.clearUserById(user.getId());

        PamirsUserDTO pamirsUser = new PamirsUserDTO();
        pamirsUser.setUserId(user.getId());
        pamirsUser.setUserCode(user.getCode());
        pamirsUser.setUserName(user.getName());
        pamirsUser.setEmail(user.getEmail());
        pamirsUser.setPhone(user.getPhone());
        pamirsUser.setLangCode("zh-CN");

        String sessionId = PamirsSession.getSessionId();
        UserCookieLoginSimple userCookieLoginSimple = new UserCookieLoginSimple();
        if(StringUtils.isBlank(sessionId)){
            sessionId = userCookieLoginSimple.createSessionId();
        }
        String cacheKey = userCookieLoginSimple.parseSessionId(sessionId);
        UserCache.putCache(cacheKey, pamirsUser);
        try {
            CookieUtil.set(response, UserConstant.USER_SESSION_ID, sessionId);
        } catch (Exception e) {
            log.error("SSO Login Cookie Set Err", e);
        }

        return user;
    }
```

# Ⅳ、Enterprise WeChat Open Platform Application Configuration
Omitted

# Ⅴ、Access Permissions for Third-Party Users to the System
By default, users who first enter the system through third-party password-free login do not have any access permissions to applications in the initial state. To ensure that users can smoothly access applications through the DingTalk workbench entry, you can grant users the corresponding access permissions through the following two methods.

## （Ⅰ）Configure Third-Party User Roles
1. Create a specific role in the system for the use of third-party users. This role should have a clear identifier, such as: `THIRD_PARTY_USER`.
2. Assign corresponding access permissions to the above role according to business needs.

## （Ⅱ）Grant Permissions When Creating Third-Party Users
In the sixth step of the docking process: the user information processing stage, that is, when creating platform users (such as `PamirsUser`) based on third-party user information, you can directly assign the above-defined role to the user by calling the system interface to achieve static binding of permissions.

```java
private void bindUserRole(PamirsUser pamirsUser) {
    AuthRole authRole = new AuthRole().setCode(THIRD_PARTY_USER_ROLE_CODE).queryOne();
    if (authRole != null) {
        // Bind the role to the user
        CommonApiFactory.getApi(UserService.class).bindUserRole(Collections.singletonList(pamirsUser), Collections.singletonList(authRole));
    }
}
```

## （Ⅲ）Dynamic Permission Granting at Runtime
If role assignment is not completed during the user creation stage, you can also use the runtime dynamic permission extension mechanism to dynamically assign the "third-party user" role to users when they first access the system.

This example uses this solution. For the complete implementation, please refer to the code file in the attachment: `ThirdPartyRoleCustom.java`

```java
@Override
public Set<Long> get() {
    Set<Long> roleIds = super.get();
    if (CollectionUtils.isEmpty(roleIds)) {
        roleIds = new HashSet<>();
    }
    AuthRole role = fetchTpRole();
    if (role != null) {
        roleIds.add(role.getId());
    }

    return roleIds;
}
```

# Ⅵ、Source Code Download
+ Enterprise WeChat Docking Example Code Package [Enterprise WeChat Docking Example.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/%E4%BC%81%E5%BE%AE%E5%BE%AE%E4%BF%A1%E5%AF%B9%E6%8E%A5%E7%A4%BA%E4%BE%8B.zip)
+ Runtime Dynamic Permission Granting for Third-Party Users [ThirdPartyRoleCustom.java](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/ThirdPartyRoleCustom.java)