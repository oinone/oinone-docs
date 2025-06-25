---
title: 外部集成：企微集成OAuth2.0
index: true
category:
  - 常见解决方案
order: 8
---

# 一、引言
在企业数字化办公场景中，将业务系统与企业微信进行集成是实现统一身份认证、消息推送等的关键手段。本文基于 Java 技术栈，使用开源项目 `weixin-java-cp` 完成对接。

**核心功能**

+ **统一登录与身份认证**：员工可通过企业微信扫码或免密方式登录系统。
+ **用户信息获取**：通过 OAuth2.0 协议，获取用户的基本信息，并同步到本地数据库。

:::info 说明：

本篇文档主要讲解如何使用 OAuth2.0 打通企业微信的免登流程，包括用户信息的获取。其他接口如发送通知等，请参考企业微信官方文档，并推荐使用 Oinone 集成平台（EIP）的方式进行对接。

:::

# 二、接入准备
## （一）了解企业微信身份验证（免登）
服务端 API 身份验证（免登）使用教程实现登录第三方网站：[企业微信OAuth2.0](https://work.weixin.qq.com/api/doc/90000/90135/91437)

## （二）创建企业微信应用
1. 登录 [企业微信管理后台](https://work.weixin.qq.com/wework_admin/loginpage_wx)
2. 进入“应用管理” --> “自建应用”，创建新的应用
3. 记录以下参数：
    - CorpID（企业ID）
    - Secret（应用凭证密钥）
    - AgentId（应用代理ID）

## （三）引入企业微信 SDK 依赖
```xml
<dependency>
  <groupId>com.github.binarywang</groupId>
  <artifactId>weixin-java-cp</artifactId>
  <version>4.5.0</version>
</dependency>
```

# 三、具体对接步骤
## （一）项目中增加企业微信的配置
1、项目中application.yml配置（本文示例采用）

```yaml
pamirs:
  wxcp:
    corpId: 应用的corpId
    agentId: 应用的agentId
    agentKey: 应用的agentKey
    # 登录后跳转到本地应用的首页（根据实际情况修改）
    appUrl: https://2z98098t60.zicp.fun
```

2、后端配置方式参考钉钉对接中的说明

## （二）初始化企业微信客户端（WxCpService）
```java
@Slf4j
@Service
public class WxBaseConfig {

    @Autowired
    private WxCpConfig wxCpConfig;
    @Autowired
    private StringRedisTemplate redisTemplate;

    // 配置企业微信服务
    public WxCpService getWxCpService() {
        WxCpService wxCpService = new WxCpServiceImpl();
        WxCpDefaultConfigImpl config = new WxCpDefaultConfigImpl();
        config.setAgentId(Integer.valueOf(wxCpConfig.getAgentId()));
        config.setCorpSecret(wxCpConfig.getAgentKey());
        config.setCorpId(wxCpConfig.getCorpId());
        resetTokenAndJsApi(wxCpService, config, Integer.valueOf(wxCpConfig.getAgentId()));
        return wxCpService;
    }

    // 重置token
    public void resetTokenAndJsApi(WxCpService wxCpService, WxCpDefaultConfigImpl wxCpDefaultConfig, int agentId) {
        // 配置redis
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
                log.error("===>> 获取企微AccessToken异常", e);
                e.printStackTrace();
            }
        }
        if (wxCpDefaultConfig.isJsapiTicketExpired()) {
            String jsApi = null;
            try {
                jsApi = wxCpService.getJsapiTicket();
                wxCpDefaultConfig.setJsapiTicket(jsApi);
            } catch (WxErrorException e) {
                log.error("===>> 获取企微JsapiTicket异常", e);
                e.printStackTrace();
            }
        }
        redisTemplate.opsForValue().set(wxAccessToken, JSON.toJSONString(wxCpDefaultConfig));
    }
}
```

## （三）构建授权链接（跳转企业微信）
```java
/**
 * 获取重定向url，让企业微信跳到oauth2url并带上code参数
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
        log.error("企业微信oauth异常", e);
        try {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "oauth重定向失败！");
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
```

## （四）处理企业微信回调
获取 code 并换取用户 UserTicket；用 UserTicket 获取用户信息

```java
/**
 * 根据企业微信的code获取用户信息
 *
 * @param code
 * @return
 */
@GetMapping(value = "/wxCpAuth/oauth2url")
public void oauth2url(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
    log.info(" ===>>> WxCpApiController oauth2url code：【{}】<<<=== ", code);
    try {
        WxCpOauth2UserInfo userInfo = this.getWxCpOauth2UserInfoCache(code);
        if (userInfo == null) {
            try {
                userInfo = tpWxCpOAuth2Service.getUserInfo(code);
                log.info(" ===>>> getUserInfo【{}】<<<=== ", JSON.toJSONString(userInfo));
                // getUserInfo【{"accessTokenInvalid":false,"errorCode":0,"errorMsg":"请求成功","json":"{\"userid\":\"OPENID\",\"errcode\":0,\"errmsg\":\"ok\",
                // \"user_ticket\":\"ICprXqB0myY74-ouv2n_HvDdxGpJgjq5gj6rMgr5YgCnM_1DTZUvgZXwN6wTP5-rAMDGb4QVoUzA1jOYMI9_ZylZ1cLPJLnFmWSbdfHSims\",\"expires_in\":1800}","succeed":true}】
                if (userInfo != null) {
                    this.petWxCpOauth2UserInfoCache(code, userInfo);
                }
            } catch (WxErrorException e) {
                log.error("获取企微用户异常", e);
                throw PamirsException.construct(ThirdPartyExpEnum.WX_AUTH_GET_USER_ERROR).errThrow();
            }
        }

        WxCpUserDetail userDetail = null;
        try {
            userDetail = tpWxCpOAuth2Service.getUserDetail(userInfo.getUserTicket());
            log.info(" ===>>> getUserDetail【{}】<<<=== ", JSON.toJSONString(userDetail));
        } catch (WxErrorException e) {
            log.error("获取企微用户敏感信息异常", e);
            // 允许失败
        }

        //获取用户信息
        PamirsUser pamirsUser = handleUserInfo(userInfo, userDetail, response);
        if (pamirsUser != null) {
            UserToken token = new UserToken(pamirsUser.getPhone(), pamirsUser.getCode(), "", "", System.currentTimeMillis());
            log.info("token:{}", token);
            String tokenStr = UserToken.token2String(token);
            // token放在Cookie中(是否放置根据需求确定)
            CookieUtil.set(response, X_WECHAT_QY_TOKEN, tokenStr);
            log.info("AppUrl:{}", wxCpConfig.getAppUrl());
            response.sendRedirect(wxCpConfig.getAppUrl());
        } else {
            log.error("错误！{}", "根据手机号获取用户信息失败");
            response.sendRedirect(wxCpConfig.getAppUrl() + "/notice?msg=getProfile失败!" + "根据手机号获取用户信息失败");
        }
    } catch (Exception e) {
        log.error("auth error", e);
        response.sendRedirect(wxCpConfig.getAppUrl() + "/notice?msg=" + URLEncoder.QUERY.encode(e.getMessage(), Charsets.UTF_8));
    }
}
```

## （五）处理用户信息并设置登录态（Session + Cookie）
```java
    private PamirsUser handleUserInfo(WxCpOauth2UserInfo userInfo, WxCpUserDetail userDetail, HttpServletResponse response) {
        if (userDetail == null) {
            return null;
        }

        // 用户表
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
        // 初始化密码表
        if (needInitPwd) {
            passwordService.encodingCreate(user.getId(), "123456@Abc!");
        }

        // 第三方用户三方登录表
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
        // 用户信息更新后清空缓存
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

# 四、企微开放平台应用配置
略

# 五、三方用户访问系统权限
默认情况下，首次通过第三方免登录方式进入系统的用户，初始状态不具有任何应用的访问权限。为了确保用户能够通过钉钉工作台入口顺利访问应用，可以通过以下两种方式为用户赋予相应的访问权限。

## （一）配置第三方用户角色
1. 在系统中创建一个特定的角色，用于第三方用户的使用。该角色应具有明确的标识符，例如：`THIRD_PARTY_USER`。
2. 根据业务需求，为上述角色分配相应的访问权限。

## （二）在创建第三方用户时赋权
在对接流程中的第六步：处理用户信息阶段，即根据第三方用户信息创建平台用户（如 `PamirsUser`）时，可通过调用系统接口，将上述定义好的角色直接分配给该用户，实现权限的静态绑定。

```java
private void bindUserRole(PamirsUser pamirsUser) {
    AuthRole authRole = new AuthRole().setCode(THIRD_PARTY_USER_ROLE_CODE).queryOne();
    if (authRole != null) {
        // 给用户绑定角色
        CommonApiFactory.getApi(UserService.class).bindUserRole(Collections.singletonList(pamirsUser), Collections.singletonList(authRole));
    }
}
```

## （三）运行时动态赋权
若未在用户创建阶段完成角色分配，也可以通过运行时动态权限扩展机制，在用户首次访问系统时，动态地为其分配“第三方用户”角色。

本文示例采用的就是此方案，完整实现请参考附件中的代码文件：`ThirdPartyRoleCustom.java`

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

# 六、源代码下载
+ 企微对接示例代码包[企微微信对接示例.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/%E4%BC%81%E5%BE%AE%E5%BE%AE%E4%BF%A1%E5%AF%B9%E6%8E%A5%E7%A4%BA%E4%BE%8B.zip)
+ 三方用户运行时动态赋权[ThirdPartyRoleCustom.java](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/ThirdPartyRoleCustom.java)





