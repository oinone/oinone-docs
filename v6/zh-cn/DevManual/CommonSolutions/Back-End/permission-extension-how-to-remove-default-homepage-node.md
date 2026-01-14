---
title: 权限扩展：如何删除系统权限中默认的首页节点
index: true
category:
  - 常见解决方案
order: 45
---
# 一、场景概述

并没有设置过首页的配置，为什么在系统权限这里的配置菜单中却有首页的配置。而且显示当前资源未完成初始化设置，无法配置。这个文章将帮助你删除这个节点。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-31_10-36-45-20250530144822756.jpg)

---

:::info 注意

如果添加了以下代码，后续如果需要使用首页的配置，则需要删除该代码。

:::

# 二、扩展权限加载节点：

遍历权限加载的节点，找到需要删除的模块首页节点。删除节点。

```java
@Component
@Order(88)
@SPI.Service
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        //删除 TopModule.MODULE_MODULE 的首页节点。
        String homepage = TranslateUtils.translateValues(PermissionNodeLoaderConstants.HOMEPAGE_DISPLAY_VALUE);
        for (PermissionNode node : nodes) {
            //如果需要删除多个模块的首页，在这里多加一个逻辑与条件即可。
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
                    //如果是删除多个模块首页，这里的return改为break；
                    return nodes;
                }
            }
        }
        return nodes;
    }
}
```

---

看效果：首页节点成功删除。
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-12-31_11-01-32-20250530144822847.jpg)

