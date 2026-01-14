---
title: 权限扩展：如何扩展行为权限
index: true
category:
  - 常见解决方案
order: 46
---
# 一、概述

在本系统权限控制策略下，仅当动作与页面产生交互行为时，方可于管理中心针对该动作的权限展开调控。对于那些在页面上不存在交互的动作，当前无法执行授权操作。因此，本文旨在详细阐述如何将此类缺乏页面交互的动作，融入系统权限管理体系之中。

# 二、扩展系统权限的菜单页面

## （一）实现步骤

1. 创建授权节点
   实现权限节点扩展接口：`pro.shushi.pamirs.auth.api.extend.load.PermissionNodeLoadExtendApi#buildRootPermissions`

```java
@Component
@Order(88)
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    public static final String MODEL = AuthTest.MODEL_MODEL;
    public static final String MODULE = TopModule.MODULE_MODULE;
    public static final String FUN = "dataStatus";

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        //创建授权根节点
        PermissionNode root = createMyNode();
        List<PermissionNode> newNodes = new ArrayList<>();
        //从缓存中读取需要授权的Action
        Action cacheAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(MODEL, FUN);
        if (cacheAction != null) {
            //将该Action放入权限树
            //权限鉴权的path路径是根据【cacheAction.getModel() + cacheAction.getName()】拼接的。和MODULE没有关系，这里MODULE可以自定义。
            AuthNodeHelper.addNode(newNodes, root, AuthNodeHelper.createActionNode(MODULE, cacheAction, root));
        }
        nodes.add(0, root);
        return newNodes;
    }

    private PermissionNode createMyNode() {
        return AuthNodeHelper.createNodeWithTranslate("MyNode", "自定义节点");
    }
}
```

2. 在管理中心中我们可以看到代码里创建的授权节点。
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-28-30-20250530144820945.jpg)
3. 给角色分配该动作的权限，调用我们配置的`AuthTest`模型的`dataStatus`动作看效果。
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-31-43-20250530100006800-20250530144821254.jpg)

# 三、扩展菜单下的动作权限

## （一）实现步骤：

1. 创建`viewAction`用于作为权限菜单
   "permissionExtension"是自定义的`viewAction`的`name`，用于下面拼`path`路径鉴权。
   因为这里只需要在系统权限那边利用这个`viewAction`创建出授权节点。所以”权限扩展form“可以随意定义名字，系统会拿默认视图。

```java
@Model.model(AuthTest.MODEL_MODEL)
@Component
@UxRouteButton(
    action = @UxAction(name = "permissionExtension", displayName = "权限扩展", label = "权限扩展", contextType = ActionContextTypeEnum.CONTEXT_FREE),
    value = @UxRoute(model = AuthTest.MODEL_MODEL, viewName = "权限扩展form", openType = ActionTargetEnum.ROUTER))
public class AuthTestAction {

    @Action(displayName = "启用", contextType = ActionContextTypeEnum.SINGLE)
    public AuthTest dataStatus(AuthTest data) {
        data.setOrgName("给个值");
        return data;
    }
}
```

2. 创建授权节点
   实现权限节点扩展接口：`pro.shushi.pamirs.auth.api.extend.load.PermissionNodeLoadExtendApi#buildRootPermissions`

```java
@Component
@Order(88)
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    //创建授权根节点
    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {

        PermissionNode root = AuthNodeHelper.createNodeWithTranslate("CustomNode", "自定义节点");
        List<PermissionNode> newNodes = new ArrayList<>();
        newNodes.add(root);
        ViewAction viewAction = new ViewAction().setModel(AuthTest.MODEL_MODEL).setName("permissionExtension").queryOne();
        //将该Action放入权限树
        //权限鉴权的path路径是根据【viewAction.getModel(), viewAction.getName()】拼接的。和MODULE没有关系，这里MODULE可以自定义。
        if (viewAction != null) {
            root.getNodes().add(AuthNodeHelper.createViewActionNode(TopModule.MODULE_MODULE, viewAction, root));
        }
        nodes.add(0, root);
        return newNodes;
    }

    //创建权限组里的动作权限节点
    @Override
    public List<PermissionNode> buildNextPermissions(PermissionNode selected, List<PermissionNode> nodes) {
        //需要利用viewAction的path路径去判断当前选中节点是否是我们创建的自定义节点，返回为空则不向下处理授权节点。path路径是根据【viewAction.getModel(), viewAction.getName()】拼接的
        String path = "/" + AuthTest.MODEL_MODEL + "/" + "permissionExtension";
        if (!path.equals(selected.getPath())){
            return null;
        }
        List<PermissionNode> newNodes = new ArrayList<>();
        //从缓存中读取需要授权的Action
        List<Action> actions = new ArrayList<>();
        actions.add(PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(AuthTest.MODEL_MODEL, "dataStatus"));
        actions.add(PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(Teacher.MODEL_MODEL, "queryTea"));
        //将这些Action放入动作权限树用于授权
        //权限鉴权的path路径是根据【action.getModel(), action.getName()】拼接的。和TopModule.MODULE_MODULE没有关系，这里TopModule.MODULE_MODULE可以自定义。
        for (Action action : actions) {
            newNodes.add(AuthNodeHelper.createActionNode(TopModule.MODULE_MODULE, action, selected));
        }
        nodes.addAll(newNodes);
        return newNodes;
    }
}
```

2. 在管理中心中我们可以看到代码里创建的授权节点。
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-08_10-13-24-20250530144821110.jpg)
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-08_10-14-26-20250530144821184.jpg)
3. 给角色分配该动作的权限，调用我们配置的`AuthTest`模型的`dataStatus`动作看效果。
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-31-43-20250530100006800-20250530144821254.jpg)

