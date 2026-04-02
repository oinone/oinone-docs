---
title: External Integration：DingTalk Integration with OAuth2.0
index: true
category:
  - Common Solutions
order: 9
---

# Ⅰ. Introduction
In the scenario of enterprise digital office, integrating business systems with DingTalk is a key means to achieve unified identity authentication, organizational structure synchronization, message pushing, and page embedding. This article is based on the Java technology stack and uses the official [DingTalk Open Platform SDK](https://help.aliyun.com/document_detail/163984.html) to complete the docking.

1. **Unified Login and Identity Authentication**
Employees can log in to the system via DingTalk QR code scanning or password-free methods.
2. **Automatic Organizational Structure Synchronization**
Automatically obtain department structures and employee information, reducing manual maintenance costs.
3. **Real-time Message Notification Pushing**
The system can send critical information such as approval reminders and task notifications to users.
4. **Page Embedding and JS API Calling**
Embed business pages into the DingTalk workbench and call functions such as photo taking and positioning.

:::info Note:

This article mainly explains how Oinone applications connect with DingTalk's OAuth2 to achieve single sign-on, including user information acquisition. For other interfaces such as organizational structure, obtaining department members, and sending DingTalk notifications, refer to DingTalk's docking documentation, and it is recommended to use the Oinone Integration Platform (EIP) for docking.

:::

# Ⅱ. Access Preparation
## \(Ⅰ\) Understanding DingTalk Identity Authentication (Single Sign-On)
Tutorial on using server-side API identity authentication (single sign-on) to implement logging in to third-party websites: [https://open.dingtalk.com/document/orgapp/tutorial-obtaining-user-personal-information](https://open.dingtalk.com/document/orgapp/tutorial-obtaining-user-personal-information)

## \(Ⅱ\) Creating a DingTalk Application
1. Log in to [DingTalk Open Platform](https://open-dev.dingtalk.com/fe/app?hash=%23%2Fcorp%2Fapp#/corp/app)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746684768497-0864e8f5-5f3f-4ee7-9904-9f426e0a45ee-20250530144829568.png)

2. Go to "Application Development" → "Enterprise Internal Development" → Create Application.

3. Record the following parameters:
- `AppKey(Client ID)`
- `AppSecret(Client Secret)`
- `AgentId` (Micro Application ID)

## \(Ⅲ\) Introducing DingTalk SDK Dependencies
``` xml
<dependency>
    <groupId>com.aliyun</groupId>
    <artifactId>dingtalk</artifactId>
    <version>2.2.12</version>
</dependency>
```

# Ⅲ. Specific Docking Steps
## \(Ⅰ\) Adding DingTalk Configuration to the Project
1. Project application.yml configuration (example used in this article)

``` yaml
pamirs:
  # DingTalk Auth docking (DingTalk unified identity authentication)
  dingtalk:
    # AppKey in Application Information - Application Basics, please replace with your development application AppKey
    clientId: yourAppKey
    # AppSecret in Application Information - Application Basics, please replace with your development application AppSecret
    clientSecret: yourAppSecret
    # Home page of the local application after login (modify according to actual situation)
    appUrl: http://2z98098t60.zicp.fun
```

2. Backend configuration method

``` java
/**
 * DingTalk docking configuration (configurable on the page); can also be changed to yml file configuration form
 */
@Model.model(SimpleDingTalkConfig.MODEL_MODEL)
@Model(displayName = "DingTalk Docking Configuration", summary = "DingTalk Docking Configuration")
public class SimpleDingTalkConfig extends IdModel implements SingletonModel<SimpleDingTalkConfig> {

    private static final long serialVersionUID = -8813811110743840983L;

    public static final String MODEL_MODEL = "hr.dingtalk.SimpleDingTalkConfig";

    @Field.String
    @Field(displayName = "Application AppKey", required = true)
    private String clientId;

    @Field.String
    @Field(displayName = "Application Password", required = true)
    private String clientSecret;

    @Field.String
    @Field(required = true, displayName = "Application Access Address")
    private String appUrl;

    @Function(openLevel = FunctionOpenEnum.API, summary = "System basic configuration information construction method")
    @Function.Advanced(type = FunctionTypeEnum.QUERY)
    public SimpleDingTalkConfig construct(SimpleDingTalkConfig config) {
        SimpleDingTalkConfig config1 = config.singletonModel();
        if (config1 != null) {
            return config1;
        }
        return config.construct();
    }

    @Override
    public void initSystem() {
    }
}
```

+ The backend configuration method needs to inherit SingletonModel, which is a singleton with automatic caching functionality;
+ Attach a menu to the configuration model SimpleDingTalkConfig;
+ Code reference for obtaining attribute values from the configuration SimpleDingTalkConfig class

``` java
SimpleDingTalkConfig dingTalkConfig = new SimpleDingTalkConfig().singletonModel();
……
dingTalkConfig.getAppUrl();
```

## \(Ⅱ\) Initializing the DingTalk Client
DingTalk client classes and functions. The following two clients are official encapsulations provided by the Alibaba Cloud SDK, corresponding to different API capability modules:

| **Client Class** | **Function** |
| --- | --- |
| `com.aliyun.dingtalkoauth2_1_0.Client` | For OAuth2 authentication processes to obtain user tokens |
| `com.aliyun.dingtalkcontact_1_0.Client` | For calling contact interfaces to obtain detailed user information |


``` java
package pro.shushi.pamirs.thirdparty.core.dingtalk.helper;

import com.aliyun.teaopenapi.models.Config;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;

@Slf4j
public class DingTalkHelper {

    // Use volatile keyword to ensure visibility
    private static volatile com.aliyun.dingtalkoauth2_1_0.Client authClient = null;
    private static volatile com.aliyun.dingtalkcontact_1_0.Client contactClient = null;

    // Private constructor to prevent external instantiation
    private DingTalkHelper() {}

    private static Config createConfig() {
        Config config = new Config();
        config.protocol = "https";
        config.regionId = "central";
        // More configurations such as timeout settings can be added here
        return config;
    }

    public static com.aliyun.dingtalkoauth2_1_0.Client authClient() {
        if (authClient == null) {
            synchronized (DingTalkHelper.class) {
                if (authClient == null) {
                    try {
                        Config config = createConfig();
                        authClient = new com.aliyun.dingtalkoauth2_1_0.Client(config);
                    } catch (Exception e) {
                        log.error("Failed to initialize authClient", e);
                        throw new RuntimeException("Failed to initialize authClient", e);
                    }
                }
            }
        }
        return authClient;
    }

    public static com.aliyun.dingtalkcontact_1_0.Client contactClient() {
        if (contactClient == null) {
            synchronized (DingTalkHelper.class) {
                if (contactClient == null) {
                    try {
                        Config config = createConfig();
                        contactClient = new com.aliyun.dingtalkcontact_1_0.Client(config);
                    } catch (Exception e) {
                        log.error("Failed to initialize contactClient", e);
                        throw new RuntimeException("Failed to initialize contactClient", e);
                    }
                }
            }
        }

        return contactClient;
    }

}
```

## \(Ⅲ\) Building the Authorization Link (Jumping to DingTalk)
The oauth method is responsible for generating the DingTalk OAuth authorization link and redirecting to it.

``` java
@RequestMapping(value = "/ddAuth/oauth", method = RequestMethod.GET)
public void oauth(HttpServletResponse response) throws IOException {
    String url = "https://login.dingtalk.com/oauth2/auth?" +
            "redirect_uri=" + appUrl + "/pamirs/ddAuth/oauth2url" +
            "&response_type=code" +
            "&client_id=" + clientId +  // Application AppKey
            "&scope=openid" + // Keep openId unchanged here
            "&state=dd1" +    // Returned as is with authCode.
            "&prompt=consent";
    response.sendRedirect(url);
}
```

+ This constructs the DingTalk OAuth2 authorization URL;
+ After clicking, the user will be redirected to DingTalk's QR code scanning page;
+ After successful authorization, DingTalk will redirect the user to `/pamirs/ddAuth/oauth2url` with an `authCode` parameter.

## \(Ⅳ\) Handling DingTalk Callback, Obtaining authCode and Exchanging for accessToken
+ The `handleCallback` method processes the DingTalk callback request, obtains the `authCode` from the request parameters, then exchanges the `authCode` for an `accessToken`, and calls the `getUserinfo` method to further obtain detailed user information.

``` java
@RequestMapping(value = "/ddAuth/oauth2url", method = RequestMethod.GET)
public void handleCallback(@RequestParam(value = "authCode") String authCode, HttpServletResponse response) throws Exception {
    // Get AccessToken
    Client oauthClient = DingTalkHelper.authClient();
    GetUserTokenRequest getUserTokenRequest = new GetUserTokenRequest()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .setCode(authCode)
            .setGrantType("authorization_code");
    GetUserTokenResponse getUserTokenResponse = oauthClient.getUserToken(getUserTokenRequest);
    String accessToken = getUserTokenResponse.getBody().getAccessToken();

    // Use AccessToken to get user information
    getUserinfo(accessToken);

    // Redirect back to the application home page
    response.sendRedirect(appUrl);
}
```

## \(Ⅴ\) Using accessToken to Get User Personal Information
``` java
/**
 * Use accessToken to get user personal information
 */
public void getUserinfo(String accessToken) throws Exception {
    Client contactClient = DingTalkHelper.contactClient();
    GetUserHeaders getUserHeaders = new GetUserHeaders();
    getUserHeaders.xAcsDingtalkAccessToken = accessToken;
    GetUserResponseBody userResponseBody = contactClient.getUserWithOptions("me", getUserHeaders, new RuntimeOptions()).getBody();

    // Process user information and synchronize to the local database
    handleUserInfoAndCookie(userResponseBody, accessToken);
    log.debug("Personal information：{}", JSON.toJSONString(userResponseBody));
}
```

## \(Ⅵ\) Processing User Information and Setting Login Status (Session + Cookie)
Process user information, including creating or updating local user records, initializing the password table, setting third-party login records, and setting the user's login status (Session and Cookie).

``` java
/**
 * Step 4: Process user information and set login status (Session + Cookie)
 */
public void handleUserInfoAndCookie(GetUserResponseBody userResponseBody, String accessToken) {
    if (userResponseBody == null) {
        return;
    }
    PamirsUser user = new PamirsUser().setLogin(userResponseBody.getMobile()).queryOne();
    boolean needInitPwd = false;
    if (user == null) {
        user = new PamirsUser();
        needInitPwd = true;
    }
    user.setLogin(userResponseBody.getMobile());
    user.setPhone(userResponseBody.getMobile());
    user.setNickname(userResponseBody.getNick());
    user.setName(userResponseBody.getNick());
    user.setAvatarUrl(userResponseBody.getAvatarUrl());
    user.setEmail(userResponseBody.getEmail());
    user.setActive(Boolean.TRUE);
    user.setSource(UserSourceEnum.THIRD_PARTY);
    user.setSignUpType(UserSignUpType.BACKSTAGE);
    user.setUserType("dingtalk");
    user.createOrUpdate();

    // Initialize the password table
    if (needInitPwd) {
        passwordService.encodingCreate(user.getId(), "123456@Abc!");
    }

    // Third-party user third-party login table
    PamirsUserThirdParty userThirdParty = new PamirsUserThirdParty().setThirdPartyType(UserThirdPartyTypeEnum.DINGTALK)
    .setUnionId(userResponseBody.getUnionId()).queryOne();
    if (userThirdParty == null) {
        PamirsUserThirdParty thirdParty = new PamirsUserThirdParty();
        thirdParty.setUserId(user.getId());
        thirdParty.setOpenid(userResponseBody.getOpenId());
        thirdParty.setUnionId(userResponseBody.getUnionId());
        thirdParty.setThirdPartyType(UserThirdPartyTypeEnum.DINGTALK);
        thirdParty.createOrUpdate();
    }

    // Clear the cache after user information is updated
    UserInfoCache.clearUserById(user.getId());

    PamirsUserDTO pamirsUser = new PamirsUserDTO();
    pamirsUser.setUserId(user.getId());
    pamirsUser.setUserCode(user.getCode());
    pamirsUser.setUserName(user.getName());
    pamirsUser.setEmail(user.getEmail());
    pamirsUser.setPhone(user.getPhone());
    pamirsUser.setLangCode("zh-CN");

    String sessionId = PamirsSession.getSessionId();
    HttpServletResponse httpServletResponse = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
    UserCookieLoginSimple userCookieLoginSimple = new UserCookieLoginSimple();
    if (StringUtils.isBlank(sessionId)) {
        sessionId = userCookieLoginSimple.createSessionId();
    }
    String cacheKey = userCookieLoginSimple.parseSessionId(sessionId);
    UserCache.putCache(cacheKey, pamirsUser);
    try {
        CookieUtil.set(httpServletResponse, UserConstant.USER_SESSION_ID, sessionId);
        // When the user is stored in the database, ddtoken can be set to the Cookie or not.
        // CookieUtil.set(httpServletResponse, "ddtoken", accessToken);
    } catch (Exception e) {
        log.error("SSO Login Cookie Set Err", e);
    }
}
```

# Ⅳ. DingTalk Open Platform Application Configuration
H5 application configuration information, configure the application's home page address and PC home page address. The URL in the following figure: pamirs/ddAuth/oauth corresponds to the RequestMapping in the DingTalk integration Controller class in the business code.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746685835445-348bf42d-8025-494f-a1d7-cf77c6119f0d-20250530144829627.png)

# Ⅴ. Access Permissions for Third-party Users
By default, users who first enter the system through third-party single sign-on do not have access to any applications in their initial state. To ensure that users can successfully access applications through the DingTalk workbench entry, you can grant users corresponding access permissions through the following two methods.

## \(Ⅰ\) Configuring Third-party User Roles
1. Create a specific role in the system for third-party users, with a clear identifier, such as: `THIRD_PARTY_USER`.
2. Assign corresponding access permissions to the above role according to business needs.

## \(Ⅱ\) Granting Permissions When Creating Third-party Users
In the sixth step of the docking process: during the user information processing stage, that is, when creating platform users (such as `PamirsUser`) based on third-party user information, you can call system interfaces to directly assign the above-defined roles to the user, achieving static binding of permissions.

``` java
private void bindUserRole(PamirsUser pamirsUser) {
    AuthRole authRole = new AuthRole().setCode(THIRD_PARTY_USER_ROLE_CODE).queryOne();
    if (authRole != null) {
        // Bind the role to the user
        CommonApiFactory.getApi(UserService.class).bindUserRole(Collections.singletonList(pamirsUser), Collections.singletonList(authRole));
    }
}
```

## \(Ⅲ\) Runtime Dynamic Permission Granting
If role assignment is not completed during user creation, you can also use the runtime dynamic permission extension mechanism to dynamically assign the "third-party user" role to users when they first access the system.

This article's example uses this solution. For the complete implementation, please refer to the attached code file: `ThirdPartyRoleCustom.java`

``` java
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

# Ⅵ. Source Code Download
+ DingTalk single sign-on example [DingTalkHelper.java](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/DingTalkHelper.java)
+ Initialize DingTalk Client [DingTalkAuthController.java](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/DingTalkAuthController.java)
+ Runtime dynamic permission granting for third-party users [ThirdPartyRoleCustom.java](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/file-source/ThirdPartyRoleCustom%20(1).java)