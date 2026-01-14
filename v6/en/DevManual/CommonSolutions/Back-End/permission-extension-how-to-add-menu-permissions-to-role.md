---
title: Permission Extension：How to Add Menu Permissions to Roles
index: true
category:
  - Common Solutions
order: 47
---

# Ⅰ. Overview

During permission docking with third parties, the third party will transmit menu items to this platform. In this case, authorization operations need to be carried out on this platform based on these transmitted menu items. To meet this requirement, code implementation can be used to create corresponding permissions for specified menus.

# Ⅱ. Code Implementation

Code example:

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

        // Load all resource permissions for the specified role
        ResourcePermissionNodeLoader loader = permissionNodeLoader.getManagementLoader();
        List<PermissionNode> nodes = loader.buildRootPermissions();
        List<AuthRbacResourcePermissionItem> authRbacRolePermissionProxies = new ArrayList<>();

        // Create permissions for the specified role. For multiple roles, batch execute authRbacRolePermissionService.update(authRbacRolePermissionProxy)
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
        // Filter by specified menus: set menu items as inaccessible if not specified, accessible if specified
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

Execution effect:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2024-11-14_10-10-46-20250530144822471.jpg)