---
title: Permission Extension:How to Delete the Default Homepage Node in System Permissions
index: true
category:
  - Common Solutions
order: 45
---
# I. Scenario Overview

You may wonder why there is a homepage configuration in the system permission menu even though you haven't set it up. It also displays that the current resource is not initialized and cannot be configured. This article will help you delete this node.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-31_10-36-45-20250530144822756.jpg)

---

:::info Note

If you add the following code, you will need to remove it later if you need to use the homepage configuration.

:::

# II. Extend Permission Loading Nodes:

Traverse the loaded permission nodes, find the homepage node of the module to be deleted, and remove it.

```java
@Component
@Order(88)
@SPI.Service
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        // Delete the homepage node of TopModule.MODULE_MODULE.
        String homepage = TranslateUtils.translateValues(PermissionNodeLoaderConstants.HOMEPAGE_DISPLAY_VALUE);
        for (PermissionNode node : nodes) {
            // If you need to delete homepages of multiple modules, add more logical AND conditions here.
            if (!(node instanceof ModulePermissionNode) || !TopModule.MODULE_MODULE.equals(((ModulePermissionNode) node).getModule())) {
                continue;
            }
            List<PermissionNode> permissionNodes = node.getNodes();
            Iterator<PermissionNode> iterator = permissionNodes.iterator();
            while (iterator.hasNext()) {
                PermissionNode permissionNode = iterator.next();
                if (ResourcePermissionSubtypeEnum.HOMEPAGE.equals(permissionNode.getNodeType())
                    && homepage.equals(permissionNode.getDisplayValue())) {
                    iterator.remove();
                    // If deleting homepages of multiple modules, change 'return' to 'break' here;
                    return nodes;
                }
            }
        }
        return nodes;
    }
}
```

---

Effect: The homepage node is successfully deleted.
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-31_11-01-32-20250530144822847.jpg)