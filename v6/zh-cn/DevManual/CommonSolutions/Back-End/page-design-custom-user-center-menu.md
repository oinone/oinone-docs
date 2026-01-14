---
title: 页面设计：自定义用户中心菜单
index: true
category:
  - 常见解决方案
order: 71
---

使用扩展点实现用户中心菜单替换

# 一、工程中引起 pamirs-user-api
```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-user-api</artifactId>
</dependency>

```

# 二、实现 TopBarUserBlockAction 的后置扩展
+ 实现 HookAfter 后置扩展接口
+ `@Hook(model = {TopBarUserBlock.MODEL_MODEL}, fun = {"construct"})`添加Hook注解注明是`TopBarUserBlock`模型的`construct`函数的后置扩展。

## （一）增加用户中心菜单
```java
@Component
@Order(1)
@SPI.Service
public class MyTopBarActionExt implements TopBarActionExtendApi {

    public void edit(List<TopBarAction> list) {
        list.add(new TopBarAction("top_demo", "top.Teacher", "uiView9a0caf1d574a42c9847a057a0c4a4ad1", ActionTypeEnum.VIEW, 1)
                 .setDisplayName("商品管理")
                 .setIcon("oinone-gongzuotai")
                );
    }

}
```

实现效果

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1747135080203-3ad3a8a8-0fe7-483d-b5d6-33119ff63db7-20250530144821319.png)

## （二）替换原有的用户中心菜单
1. 替换原有的菜单跳转

```java
@Component
public class DemoTopBarUserBlockDataHookAfter implements HookAfter {

    @Override
    @Hook(model = {TopBarUserBlock.MODEL_MODEL}, fun = {"construct"})
    public Object run(Function function, Object ret) {
        if (ret == null) {
            return null;
        }
        TopBarUserBlock result = null;
        if (ret instanceof Object[]) {
            Object[] rets = (Object[]) ((Object[]) ret);
            if (rets.length == 1) {
                result = (TopBarUserBlock) rets[0];
                //例：替换用户中心：修改密码菜单
                //使用name和model查询出模型的ViewAction替换修改密码ViewAction
                ViewAction demoViewAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(Dog.MODEL_MODEL, "changePassword");
                //设置菜单的icon
                Map<String, Object> attributes = Optional.ofNullable(demoViewAction.getAttributes()).orElse(new HashMap<>());
                attributes.put("icon", "oinone-xiugaimima");
                demoViewAction.setAttributes(attributes);
                //UserViewAction第0个是修改密码ViewAction，使用自定义的ViewAction就可以实现替换
                result.getUserViewAction().set(0, demoViewAction);
            }
        } else {
            result = (TopBarUserBlock) ret;
        }
        return result;
    }
}
```

2. 使用`@UxRouteButton`方式新增`ViewAction`

```java
@Model.model(Dog.MODEL_MODEL)
@Component
@UxRouteButton(
        action = @UxAction(name = "changePassword", displayName = "修改密码"),
        value = @UxRoute(model = Dog.MODEL_MODEL, openType = ActionTargetEnum.DIALOG))
public class DogAction {
}
```

# 三、替换原有的个人设置头像跳转
1. 修改点击头像绑定的跳转逻辑

```java
@Order(10)
@Component
@SPI.Service
public class DemoTopBarUserBlockDataApi implements TopBarUserBlockDataApi {

    @Override
    public TopBarUserBlock extendData(TopBarUserBlock data) {
        //例如增加一个菜单, PamirsDemo.MODEL_MODEL: 模型。 MenuuiMenu31f22466735a4abe8e0544b428ed88ac：viewAction的name。
        Action demoViewAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(PamirsDemo.MODEL_MODEL, "MenuuiMenu31f22466735a4abe8e0544b428ed88ac");
        if (demoViewAction != null){
            AccessResourceInfo info = PageLoadHelper.generatorAccessResourceInfo(TopModule.MODULE_MODULE, demoViewAction);
            AccessResourceInfoSession.setInfo(info);
            String path = ResourcePath.generatorPath(demoViewAction.getModel(), demoViewAction.getName());
            demoViewAction.setSessionPath(path);
            data.setUserAvatarAction(demoViewAction);
        }
        return data;
    }
}
```

2. 添加权限节点，用于控制权限。

```java
@Component
@Order(88)
@SPI.Service
public class MyTestNodeLoadExtend implements PermissionNodeLoadExtendApi {

    @Override
    public List<PermissionNode> buildRootPermissions(PermissionLoadContext loadContext, List<PermissionNode> nodes) {
        PermissionNode root = AuthNodeHelper.createNodeWithTranslate("CustomNode", "自定义节点");
        List<PermissionNode> newNodes = new ArrayList<>();
        newNodes.add(root);
        Action demoViewAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(PamirsDemo.MODEL_MODEL, "MenuuiMenu31f22466735a4abe8e0544b428ed88ac");

        if (demoViewAction != null) {
            //将该Action放入权限树
            //权限鉴权的path路径是根据【cacheAction.getModel() + cacheAction.getName()】拼接的。和MODULE没有关系，这里MODULE可以自定义。
            AuthNodeHelper.addNode(newNodes, root, AuthNodeHelper.createActionNode(TopModule.MODULE_MODULE, demoViewAction, root));
        }
        nodes.add(0, root);
        return newNodes;
    }
}
```

3. 管理中心控制个人设置头像权限
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/Snipaste_2025-02-28_10-51-56-20250530144821763.jpg)

