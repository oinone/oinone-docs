---
title: Permission Extension:How to Extend Action Permissions
index: true
category:
  - Common Solutions
order: 46
---
# I. Overview

Under the permission control strategy of this system, permission regulation for an action can only be carried out in the management center when the action interacts with a page. Currently, authorization operations cannot be performed on actions that have no interaction with pages. Therefore, this article aims to elaborate on how to integrate such actions without page interaction into the system permission management system.

# II. Menu Page for Extending System Permissions

## (一) Implementation Steps

1. Create an authorization node
Implement the permission node extension interface: `pro.shushi.pamirs.auth.api.extend.load.PermissionNodeLoadExtendApi#buildRootPermissions`

```java
@Component
@Order(88)
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    public static final String MODEL = AuthTest.MODEL_MODEL;
    public static final String MODULE = TopModule.MODULE_MODULE;
    public static final String FUN = "dataStatus";

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        // Create an authorization root node
        PermissionNode root = createMyNode();
        List<PermissionNode> newNodes = new ArrayList<>();
        // Read the Action that needs authorization from the cache
        Action cacheAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(MODEL, FUN);
        if (cacheAction != null) {
            // Put this Action into the permission tree
            // The path for permission authentication is spliced according to [cacheAction.getModel() + cacheAction.getName()], which has nothing to do with MODULE. Here, MODULE can be customized.
            AuthNodeHelper.addNode(newNodes, root, AuthNodeHelper.createActionNode(MODULE, cacheAction, root));
        }
        nodes.add(0, root);
        return newNodes;
    }

    private PermissionNode createMyNode() {
        return AuthNodeHelper.createNodeWithTranslate("MyNode", "Custom Node");
    }
}
```

2. In the management center, we can see the authorization nodes created in the code.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-28-30-20250530144820945.jpg)
3. Assign permissions for this action to a role, and call the `dataStatus` action of the `AuthTest` model we configured to see the effect.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-31-43-20250530100006800-20250530144821254.jpg)

# III. Action Permissions under the Extended Menu

## (一) Implementation Steps:

1. Create a `viewAction` for use as a permission menu
"permissionExtension" is the `name` of the custom `viewAction`, used for splicing the `path` for authentication below.
Because here we only need to use this `viewAction` to create authorization nodes in the system permissions. Therefore, the "permission extension form" can be named arbitrarily, and the system will use the default view.

```java
@Model.model(AuthTest.MODEL_MODEL)
@Component
@UxRouteButton(
    action = @UxAction(name = "permissionExtension", displayName = "Permission Extension", label = "Permission Extension", contextType = ActionContextTypeEnum.CONTEXT_FREE),
    value = @UxRoute(model = AuthTest.MODEL_MODEL, viewName = "Permission Extension Form", openType = ActionTargetEnum.ROUTER))
public class AuthTestAction {

    @Action(displayName = "Enable", contextType = ActionContextTypeEnum.SINGLE)
    public AuthTest dataStatus(AuthTest data) {
        data.setOrgName("Assign a value");
        return data;
    }
}
```

2. Create authorization nodes
Implement the permission node extension interface: `pro.shushi.pamirs.auth.api.extend.load.PermissionNodeLoadExtendApi#buildRootPermissions`

```java
@Component
@Order(88)
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    // Create an authorization root node
    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {

        PermissionNode root = AuthNodeHelper.createNodeWithTranslate("CustomNode", "Custom Node");
        List<PermissionNode> newNodes = new ArrayList<>();
        newNodes.add(root);
        ViewAction viewAction = new ViewAction().setModel(AuthTest.MODEL_MODEL).setName("permissionExtension").queryOne();
        // Put this Action into the permission tree
        // The path for permission authentication is spliced according to [viewAction.getModel(), viewAction.getName()], which has nothing to do with MODULE. Here, MODULE can be customized.
        if (viewAction != null) {
            root.getNodes().add(AuthNodeHelper.createViewActionNode(TopModule.MODULE_MODULE, viewAction, root));
        }
        nodes.add(0, root);
        return newNodes;
    }

    // Create action permission nodes in the permission group
    @Override
    public List<PermissionNode> buildNextPermissions(PermissionNode selected, List<PermissionNode> nodes) {
        // Need to use the path of viewAction to determine whether the currently selected node is our created custom node. Returning null means not processing the authorization node downward. The path is spliced according to [viewAction.getModel(), viewAction.getName()]
        String path = "/" + AuthTest.MODEL_MODEL + "/" + "permissionExtension";
        if (!path.equals(selected.getPath())){
            return null;
        }
        List<PermissionNode> newNodes = new ArrayList<>();
        // Read the Actions that need authorization from the cache
        List<Action> actions = new ArrayList<>();
        actions.add(PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(AuthTest.MODEL_MODEL, "dataStatus"));
        actions.add(PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(Teacher.MODEL_MODEL, "queryTea"));
        // Put these Actions into the action permission tree for authorization
        // The path for permission authentication is spliced according to [action.getModel(), action.getName()], which has nothing to do with TopModule.MODULE_MODULE. Here, TopModule.MODULE_MODULE can be customized.
        for (Action action : actions) {
            newNodes.add(AuthNodeHelper.createActionNode(TopModule.MODULE_MODULE, action, selected));
        }
        nodes.addAll(newNodes);
        return newNodes;
    }
}
```

2. In the management center, we can see the authorization nodes created in the code.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-08_10-13-24-20250530144821110.jpg)
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-08_10-14-26-20250530144821184.jpg)
3. Assign permissions for this action to a role, and call the `dataStatus` action of the `AuthTest` model we configured to see the effect.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-06_16-31-43-20250530100006800-20250530144821254.jpg)