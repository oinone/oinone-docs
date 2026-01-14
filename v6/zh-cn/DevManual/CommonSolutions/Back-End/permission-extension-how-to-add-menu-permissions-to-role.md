---
title: 权限扩展：如何给角色增加菜单权限
index: true
category:
  - 常见解决方案
order: 47
---
# 一、概述

在与第三方进行权限对接的过程中，第三方会传送菜单项至本平台。此时，需依据这些传过来的菜单项，在本平台开展授权操作。针对此需求，可采用代码实现的方式，为指定的菜单创建相应权限。

# 二、代码实现

代码示例：

```java
public class demo {

    @Autowired
    private PermissionNodeLoader permissionNodeLoader;

    @Autowired
    private AuthRbacRolePermissionServiceImpl authRbacRolePermissionService;

    public void roleAuthorization() {
        ArrayList<Menu> menus = new ArrayList<>();
        menus.add(new Menu().queryOneByWrapper(Pops.<Menu>lambdaQuery()
                                               .from(Menu.MODEL_MODEL)
                                               .eq(Menu::getName, "uiMenu90dd10ae7cc4459bacd2845754b658a8")
                                               .eq(Menu::getModule, TopModule.MODULE_MODULE)));
        menus.add(new Menu().queryOneByWrapper(Pops.<Menu>lambdaQuery()
                                               .from(Menu.MODEL_MODEL)
                                               .eq(Menu::getName, "TopMenus_shoppMenu_Shop3Menu_ShopSayHello52eMenu")
                                               .eq(Menu::getModule, TopModule.MODULE_MODULE)));

        //加载指定角色的全部资源权限项
        ResourcePermissionNodeLoader loader = permissionNodeLoader.getManagementLoader();
        List<PermissionNode> nodes = loader.buildRootPermissions();
        List<AuthRbacResourcePermissionItem> authRbacRolePermissionProxies = new ArrayList<>();

        //给指定角色创建权限，如果需要多个角色，可以批量执行authRbacRolePermissionService.update(authRbacRolePermissionProxy)
        AuthRole authRole = new AuthRole().queryOneByWrapper(Pops.<AuthRole>lambdaQuery()
                                                             .from(AuthRole.MODEL_MODEL)
                                                             .eq(AuthRole::getCode, "R003")
                                                             .eq(AuthRole::getName, "R003"));
        AuthRbacRolePermissionProxy authRbacRolePermissionProxy = new AuthRbacRolePermissionProxy();
        AuthRole.transfer(authRole, authRbacRolePermissionProxy);

        for (PermissionNode node : nodes) {
            traverse(node, authRbacRolePermissionProxies, menus);
        }
        authRbacRolePermissionProxy.setResourcePermissions(authRbacRolePermissionProxies);

        authRbacRolePermissionService.update(authRbacRolePermissionProxy);

    }

    private void traverse(PermissionNode node, List<AuthRbacResourcePermissionItem> authRbacRolePermissionProxies, ArrayList<Menu> menus) {
        if (node == null) {
            return;
        }
        //按照指定菜单进行过滤，如果不是指定菜单，则设置菜单项不可访问，如果是指定菜单，则设置可访问
        Set<Long> menuIds = new HashSet<>();
        for (Menu menu : menus) {
            menuIds.add(menu.getId());
        }
        if (node instanceof MenuPermissionNode) {
            AuthRbacResourcePermissionItem item = new AuthRbacResourcePermissionItem();
            if (menuIds.contains(Long.parseLong(node.getId()))) {
                item.setCanAccess(Boolean.TRUE);
            } else {
                item.setCanAccess(Boolean.FALSE);
            }
            item.setCanManagement(node.getCanManagement());
            item.setPath(node.getPath());
            item.setSubtype(node.getNodeType());
            item.setType(AuthEnumerationHelper.getResourceType(node.getNodeType()));
            item.setDisplayName(node.getDisplayValue());
            item.setResourceId(node.getResourceId());
            authRbacRolePermissionProxies.add(item);
        }
        List<PermissionNode> childNodes = node.getNodes();
        if (CollectionUtils.isNotEmpty(childNodes)) {
            for (PermissionNode child : childNodes) {
                traverse(child, authRbacRolePermissionProxies, menus);
            }
        }
    }
}
```

执行看效果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-14_10-10-46-20250530144822471.jpg)

