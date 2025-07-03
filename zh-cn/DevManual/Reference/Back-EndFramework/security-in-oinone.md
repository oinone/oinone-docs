---
title: 安全机制（Security in Oinone）
index: true
category:
  - 研发手册
  - Reference
  - 后端API
order: 6
next:
  text: 网关协议 API（Protocol API）
  link: /zh-cn/DevManual/Reference/Back-EndFramework/AdvanceAPI/protocol-API.md
---
在学习这篇文章之前，你首先需要对 Oinone 安全相关内容进行一个初步了解，以便于理解本文所介绍的自定义相关内容。参考：[后端框架 - 安全简介](/zh-cn/DevManual/Tutorials/Back-endFramework/chapter4-a-brief-introduction-to-security.md)

在 Oinone 中，采用 `RBAC` 标准权限控制体系，这在大多数管理信息系统中是较为通用的权限体系。不仅如此，除了对资源的访问控制外，Oinone 还提供了基于角色的数据访问控制。

对于管理后台来说，使用内置的权限操作页面进行权限管理是足够了的，但在一些特殊场景中，我们不得不对权限进行一些改造，以此来满足我们的实际业务需求，例如：

+ To C 移动端的权限控制
+ 使用内置 “白名单” 来控制部分页面的权限
+ 动态构建权限树进行授权

总的来说，权限扩展只有两个接口：`权限节点扩展（PermissionNodeLoadExtendApi）` 和 `权限过滤（AuthFilterService）`。

# 一、概念介绍

## （一）RBAC 权限控制体系

基于角色的访问控制（RBAC）是较为通用的权限体系，其包括用户、角色、资源项三个实体模型和用户和角色关系、角色和资源项关系两个实体关系模型（M2M）。如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/SecurityInOinone/1748924950380-13d299d7-8247-417e-8f9e-61188b9bd4f3.jpeg)

## （二）资源与权限项

在 Oinone 中，以下这些元数据称为资源，每个资源都有与之对应的权限项对其进行标准化描述：

+ 资源权限项（AuthResourcePermission）
  - 应用（module）
  - 菜单（menu）
  - 动作（action）
  - 函数（function）
+ 模型权限项（AuthModelPermission）
  - 模型（model）
+ 字段权限项（AuthFieldPermission）
  - 字段（field）
+ 行权限项（AuthRowPermission）

## （三）权限树及资源访问路径

我们在之前的教程中可以看到，不论是 “系统权限” 页面还是 “角色管理 - 权限配置” 页面，都有一个从应用开始的 “权限树” 进行权限配置。这就是根据页面元数据的拓扑结构生成的资源权限项，每一个权限项都有其对应的资源访问路径，只有符合规则的访问路径才可以进行鉴权。

### 1、权限树

在 “系统权限” 页面，树的层级由以下元数据构成：

+ 应用：顶级树节点
+ 首页/菜单：第二级树节点（自关联）
+ 权限组 - 动作权限：页面上的所有动作，递归解析所有跳转动作形成子节点。

在 “角色管理 - 权限配置” 页面，树的层级由以下元数据构成：

+ 应用：顶级树节点
+ 首页/菜单：第二级树节点（自关联）
+ 动作：第三级树节点并递归解析所有跳转动作形成子节点。

### 2、资源访问路径

让我们来看一个 “国家分组 - 创建动作” 的访问路径，如下图所示：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/SecurityInOinone/1748938838174-dbaba116-409e-44a4-b513-ae5826e480b1.png)

通过 `viewAction#load` 接口获取的 `DSL` 中 的 `sessionPath` 属性：

```shell
/resource/国家分组/ACTION#resource.ResourceCountryGroup#redirectCreatePage/ACTION#$$#create
```

通过 “/” 分隔，我们可以看到一个清晰的 “资源访问路径” 结构：

+ resource：资源模块编码。
+ 国家分组：菜单名称。
+ ACTION#resource.ResourceCountryGroup#redirectCreatePage：表格页面的 “创建” 跳转动作。
+ ACTION#$$#create：创建页面的 “创建” 提交动作。

PS：“$$” 是指模型编码与上一级模型编码相同，由于路径过长会对存储及请求产生性能影响，我们在这里进行了简化处理。

### 3、注意事项

由于资源权限是基于资源访问路径进行授权和鉴权的，有一些事项需要在开发或迭代过程中需要特别注意的：

+ 当动作的相对路径发生变化导致资源访问路径发生变化时，对应动作需要重新进行授权才可以正常访问。
+ 当设计器在页面上添加新的动作时，需要授权才可以正常访问。

# 二、模块过滤

以移动端模块不需要鉴权这个场景为例，让我们来看一下如何通过模块编码将整个模块的访问设置为不需要鉴权。

:::info 目标：在本节结束时，你应该成功过滤了移动端整个模块的权限，并学会如何使用 AccessResourceInfo 对象**

:::

## （一）准备工作

### 1、创建移动端应用

基于 Oinone 对于模块的定义，我们需要将移动端应用作为一个独立应用进行定义。这样我们对于一个模块的权限过滤才不会意外的过滤那些需要权限控制的模块。

让我们先通过之前的教程内容创建一个 `移动端应用（mobile_demo）`。参考：[后端框架 - 新建一个应用](/zh-cn/DevManual/Tutorials/Back-endFramework/chapter2-a-new-application.md)

:::warning 提示：

关于模块化设计的相关内容可参考：[研发范式：模块化设计](/zh-cn/DevManual/R&DParadigm/R&D-paradigm-modular-design.md)

:::

### 2、创建用户和对应角色

为了便于我们接下来自定义权限时可以看到具体效果，我们需要创建一个独立的用户和一个独立的角色，并且这个角色我们不给它授予任何权限。

通过页面登录这个用户时会出现 “未找到入口应用或无权限访问” 的异常提示。

## （二）通过模块编码进行过滤

将自定义的权限过滤服务注册为 `Spring Bean` ，并重写 `所有资源访问控制` 方法即可完成模块过滤。例如：

```java
@Order(88)
@Component
public class CustomAuthFilterService implements AuthFilterService {

    @Override
    public Boolean isAccessModule(String module) {
        if ("mobile_demo".equals(module)) {
            return true;
        }
        return null;
    }

    @Override
    public Boolean isAccessHomepage(String module) {
        return isAccessModule(module);
    }

    @Override
    public Boolean isAccessMenu(String module, String name) {
        return isAccessModule(module);
    }

    @Override
    public Boolean isAccessFunction(String namespace, String fun) {
        return isAccessMobileModule();
    }

    @Override
    public Boolean isAccessAction(String model, String name) {
        return isAccessMobileModule();
    }

    private Boolean isAccessMobileModule() {
        AccessResourceInfo accessInfo = AccessResourceInfoSession.getInfo();
        if (accessInfo == null) {
            return null;
        }
        return isAccessModule(accessInfo.getModule());
    }
}
```

**返回值说明**

+ 当 返回 true 时，表示权限验证通过，将不再验证其他资源访问权限。
+ 当 返回 false 时，表示权限验证不通过，用户无法访问该模块下的任何资源。
+ 当 返回 null 时，表示交由其他权限过滤服务继续判断。

## （三）验证用户是否登录

用上面提供的 `模块过滤` 时，我们发现这个模块中所有接口都可以进行访问，且无需用户登录。显然这是非常不安全的一种操作。

让我们在之前的示例代码基础之上，要求这个模块的所有接口都需要通过登录才能访问。可以这样处理一下：

```java
@Override
public Boolean isAccessModule(String module) {
    if ("mobile_demo".equals(module)) {
        AuthVerificationHelper.checkLogin();
        return true;
    }
    return null;
}
```

`AuthVerificationHelper#checkLogin` 方法会在用户未登录的情况下抛出前后端约定的异常信息，前端收到这样的异常信息之后，会自动跳转至登录页面要求用户登录。

## （四）AccessResourceInfo

你几乎可以在任何地方使用下面的方法获得访问资源信息：

```java
AccessResourceInfoSession.getInfo()
```

在访问资源信息中，对于当前任何一个请求，都有一些较为关键的元数据信息可以对权限进行判断。下面列出了一些常用属性：

+ module：模块编码，当前请求访问的模块编码。
+ model：模型编码。
+ homepage：首页动作名称。同 `ViewAction#name` 属性。
+ actionName：动作/函数名称。当前请求接口的名称。
+ originPath：请求传入的 `variables#path` 参数。

# 三、动作/函数过滤

当我们需要对某些动作/函数不需要鉴权时，我们可以通过 `yaml` 配置对一些动作/函数进行过滤，我们将这些 “白名单” 动作/函数分为两类，一类是不需要登录就能访问，另一类是需要登录才能访问。

:::info 目标：在本节结束时，你应该成功配置了权限过滤指定的动作/函数，并学会如何使用自定义配置对权限功能进行扩展**

:::

## （一）不需要登录进行访问

在 `yaml` 中配置 `pamirs.auth.fun-filter` 属性让 “国家分组 - 创建” 动作可以在没有登录的情况下直接访问：

```yaml
pamirs:
  auth:
    fun-filter:
     - namespace: resource.ResourceCountryGroup
       fun: create
```

## （二）需要登录进行访问

在 `yaml` 中配置 `pamirs.auth.fun-filter-only-login` 属性让 “国家分组 - 创建” 动作可以在登录后直接访问而不关心是否配置相应的权限：

```yaml
pamirs:
  auth:
    fun-filter-only-login:
     - namespace: resource.ResourceCountryGroup
       fun: create
```

## （三）自定义 “黑名单”

内置的白名单配置有时并不能覆盖大多数业务场景，或者说配置起来不是那么方便。比如，在使用 `模块过滤` 时，对该模块的指定动作/函数要求使用权限控制呢？

### 1、使用 yaml 配置黑名单动作或函数

使用 `Spring Configuration` 为 `yaml` 增加配置项：（通常我们建议这样管理配置项，也可以使用其他方式）

```java
@Configuration
@ConfigurationProperties(prefix = "demo.auth.blacklist")
public class AuthBlacklistConfiguration {

    private List<AuthConfiguration.FunFilter> funFilter;

    public List<AuthConfiguration.FunFilter> getFunFilter() {
        return funFilter;
    }

    public void setFunFilter(List<AuthConfiguration.FunFilter> funFilter) {
        this.funFilter = funFilter;
    }
}
```

### 2、在 AuthFilterService 中使用配置

让我们尝试实现一下以下内容：

1. 当访问模块为 `mobile_demo` 时，使用黑名单进行过滤。
2. 在黑名单列表中的动作需要在页面上配置权限并进行权限验证。

下面是重写了上面部分方法的过滤服务后的一种实现方式：

```java
@Order(88)
@Component
public class CustomAuthFilterService implements AuthFilterService {

    @Autowired
    private AuthBlacklistConfiguration authBlacklistConfiguration;

    @Override
    public Boolean isAccessFunction(String namespace, String fun) {
        return isAccessMobileAction(namespace, fun);
    }

    @Override
    public Boolean isAccessAction(String model, String name) {
        return isAccessMobileAction(model, name);
    }

    private Boolean isAccessMobileAction(String model, String name) {
        AccessResourceInfo accessInfo = AccessResourceInfoSession.getInfo();
        if (accessInfo == null) {
            return null;
        }
        if (Boolean.TRUE.equals(isAccessModule(accessInfo.getModule()))) {
            if (authBlacklistConfiguration.getFunFilter()
                    .stream()
                    .anyMatch(v -> model.equals(v.getNamespace()) && name.equals(v.getFun()))) {
                // 交由其他权限过滤服务继续判断
                return null;
            }
            // 可访问指定动作
            return true;
        }
        return null;
    }
}
```

# 四、自定义权限树并通过页面授权

当我们在移动端模块没有通过代码或设计器添加任何菜单或动作的情况下，我们如何对一些服务端API进行鉴权呢？

一般我们有两个方案可以正常实施：（其他方案可自行联想）

方案一：通过设计器将移动端需要的页面和动作都通过菜单暴露在系统中，以便于在管理后台进行授权。在发起请求时携带对应的资源访问路径就可以顺利通过鉴权。

方案二：通过扩展权限树进行指定动作的授权。

## （一）方案一：使用内置授权和鉴权

当我们使用 “方案一” 时，后端无需做任何特殊处理和改造，只需要前端携带对应的资源访问路径即可，这也就是我们通常使用的 “权限埋点” 方案。这种方案较为简单，我们就不在这里展开描述了。

## （二）方案二：扩展权限树

让我们先来看一下 `PermissionNodeLoadExtendApi` 的部分定义：

```java
/**
 * 权限节点扩展API
 *
 * @author Adamancy Zhang at 09:21 on 2024-02-28
 */
@SPI(factory = SpringServiceLoaderFactory.class)
public interface PermissionNodeLoadExtendApi {

    /**
     * 加载全部权限项扩展
     *
     * @param loadContext 加载上下文
     * @param nodes       已加载节点集合
     * @param roleIds     角色ID集合
     * @return 新加入的节点集合
     */
    default List<PermissionNode> buildAllPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes, Set<Long> roleIds) {
        return buildRootPermissions(loadContext, nodes);
    }

    /**
     * 加载根权限项扩展
     *
     * @param loadContext 加载上下文
     * @param nodes       已加载节点集合
     * @return 新加入的节点集合
     */
    default List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        return null;
    }

    /**
     * 加载下级权限项扩展
     *
     * @param selected 当前选中节点
     * @param nodes    已加载节点集合
     * @return 新加入的节点集合
     */
    default List<PermissionNode> buildNextPermissions(PermissionNode selected, List<PermissionNode> nodes) {
        return null;
    }
}
```

+ buildAllPermissions：构建完整权限树，用于 “角色管理 - 权限配置” 权限树的构建。
+ buildRootPermissions：构建 “应用-菜单” 权限树，用于 “系统权限” 权限树的构建。
+ buildNextPermissions：构建菜单对应的动作权限项，用于 “权限组 - 动作权限” 权限树的构建。

我们需要根据实际场景的需求选择合适的方法进行重写。

### 1、在应用下展示指定的提交动作

以 `mobile_demo` 应用为例，如果需要将对应的提交动作添加在这个应用下，我们可以这样处理：

```java
@Order(88)
@Component
public class CustomPermissionNodeLoadExtend implements PermissionNodeLoadExtendApi {

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        List<PermissionNode> newNodes = new ArrayList<>();

        final String module = "mobile_demo";
        ModulePermissionNode mobileDemoModuleNode = findModulePermissionNode(nodes, module);
        if (mobileDemoModuleNode == null) {
            return newNodes;
        }

        QueryActions<ServerAction> serverActionQuery = new QueryActions<>(ActionTypeEnum.SERVER);
        serverActionQuery.add(ResourceCountryGroup.MODEL_MODEL, "create");
        List<ServerAction> serverActions = serverActionQuery.query();

        for (ServerAction serverAction : serverActions) {
            PermissionNode node = AuthNodeHelper.createServerActionNode(module, serverAction, mobileDemoModuleNode);
            // 默认动作名称是确定，这里需要稍加修改
            node.setDisplayValue("国家分组 - 创建");
            AuthNodeHelper.addNode(newNodes, mobileDemoModuleNode, node);
        }

        return newNodes;
    }

    private ModulePermissionNode findModulePermissionNode(List<PermissionNode> nodes, String module) {
        for (PermissionNode node : nodes) {
            if (node instanceof ModulePermissionNode) {
                if (module.equals(((ModulePermissionNode) node).getModule())) {
                    return (ModulePermissionNode) node;
                }
            }
        }
        return null;
    }
}
```

对于上述代码添加的 “国家分组 - 创建” 提交动作，对应的资源访问路径是：

```plain
/resource.ResourceCountryGroup/create
```

通过 “/” 分隔，我们可以看到一个只有两级的 “资源访问路径” 结构：

+ resource.ResourceCountryGroup：模型编码
+ create：动作名称

前端在发起请求时，variables 不需要传递任何 path 参数即可完成权限鉴权。

为了模拟前端请求，我们可以通过 GQL 可视化工具发起这个请求，这与实际前端发起的请求完全一致：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/SecurityInOinone/1748945472640-6921656f-cb44-4f22-badd-0c854db8bb58.png)

### 2、在应用下展示指定的跳转动作

与提交动作的添加类似，我们只需要将动作的名称换成跳转动作对应的名称即可，让我们将 “国家分组 - 创建” 跳转动作加入到节点中进行授权，看看资源访问路径有什么不同。

```java
@Override
public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
    List<PermissionNode> newNodes = new ArrayList<>();

    final String module = "mobile_demo";
    ModulePermissionNode mobileDemoModuleNode = findModulePermissionNode(nodes, module);
    if (mobileDemoModuleNode == null) {
        return newNodes;
    }

    // 注意这里的动作类型和动作名称的变化
    QueryActions<ViewAction> viewActionQuery = new QueryActions<>(ActionTypeEnum.VIEW);
    viewActionQuery.add(ResourceCountryGroup.MODEL_MODEL, "redirectCreatePage");
    List<ViewAction> viewActions = viewActionQuery.query();

    for (ViewAction viewAction : viewActions) {
        PermissionNode node = AuthNodeHelper.createViewActionNode(module, viewAction, mobileDemoModuleNode);
        // 默认动作名称是创建，这里需要稍加修改
        node.setDisplayValue("国家分组 - 创建");
        AuthNodeHelper.addNode(newNodes, mobileDemoModuleNode, node);
    }

    return newNodes;
}
```

对于上述代码添加的 “国家分组 - 创建” 跳转动作，对应的资源访问路径是：

```plain
/resource.ResourceCountryGroup/redirectCreatePage
```

按照我们的路径规则，创建 提交动作，对应的资源访问路径是：

```plain
/resource.ResourceCountryGroup/redirectCreatePage/ACTION#resource.ResourceCountryGroup#create
```

通过 “/” 分隔，我们可以看到一个三级的 “资源访问路径” 结构：

+ resource.ResourceCountryGroup：模型编码。
+ redirectCreatePage：表格页面的 “创建” 跳转动作名称。
+ ACTION#resource.ResourceCountryGroup#create：创建页面的 “创建” 提交动作。

让我们通过 GQL 可视化工具发起这个请求：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/SecurityInOinone/1748946255303-be8d1287-6068-4276-b875-c66304ac6505.png)

:::warning 提示：

这里有三个问题需要注意：

+ 当我们测试鉴权是否通过时，需要将之前小节中的自定义逻辑稍加修改，只需要对应用、首页和菜单进行过滤，移除动作和函数的自定义逻辑，否则你可能无法看到 “无权限进行该操作” 的异常信息，也就无法测试权限授权是否生效。
+ 当展示指定的动作发生变化时，原有权限的授权不会自动取消，用户仍然可以通过之前的授权进行访问。
+ 之前通过接口创建的数据不会主动删除，连续调用编码相同的创建接口时，需要手动删除之前已经创建的数据，否则会出现 “数据重复，业务处理失败” 的异常信息，但这并不影响我们的鉴权测试。

:::

### 3、缺省最末级动作名称

在上一节我们使用了完整的资源访问路径对请求进行访问，权限在鉴权时首先会对资源访问路径进行有效性的校验：

+ 最末级动作名称与当前访问动作名称必须完全一致
+ 如果最末级动作名称不一致，则强制追加当前访问动作名称到路径中进行校验。

那么，类似的请求可以是：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Reference/BackendAPI/SecurityInOinone/1748947059482-0dbf229b-f69d-4233-a2fc-2c410e9ffa34.png)

我们可以看到，虽然我们使用了这样的路径，但鉴权还是通过的：

```shell
/resource.ResourceCountryGroup/redirectCreatePage
```

# 五、自定义数据过滤

与 动作/函数过滤类似，数据过滤仍然通过 AuthFilterService 进行实现。让我们尝试实现一下下面这些需求：

+ 对 “国家分组” 通过创建人进行过滤
+ 用户只能看到自己创建的数据

下面是一种实现逻辑仅供参考：

```java
@Order(88)
@Component
public class CustomAuthFilterService implements AuthFilterService {

    @Autowired
    private DefaultAuthFilterService defaultAuthFilterService;

    @Override
    public AuthResult<String> fetchModelFilterForRead(String model) {
        // 检查用户是否登录，并获取用户ID
        Long userId = PamirsSession.getUserId();
        if (userId == null) {
            return null;
        }
        if (ResourceCountryGroup.MODEL_MODEL.equals(model)) {
            // 获取模型已配置的过滤条件
            AuthResult<String> result = defaultAuthFilterService.fetchModelFilterForRead(model);
            if (result.isFetch()) {
                String rsql = result.getData();
                // 追加过滤条件
                if (StringUtils.isBlank(rsql)) {
                    rsql = "createUid == " + userId;
                } else {
                    rsql = "(" + rsql + ") and createUid == " + userId;
                }
                return AuthResult.success(rsql);
            }
            return result;
        }
        return null;
    }
}
```

# 六、结束语

到了这里，我们关于自定义权限的所有内容就介绍完了。在 Oinone 权限体系中，无疑只有授权和鉴权两个概念，且都是围绕着基于角色的权限控制（RBAC）体系进行设计的。我们只需要对两个接口（`权限节点扩展（PermissionNodeLoadExtendApi）` 和 `权限过滤（AuthFilterService）`）灵活使用，就可以完成几乎任何业务形式的权限管理方案。


