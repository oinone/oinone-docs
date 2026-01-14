---
title: 权限扩展：函数如何跳过权限拦截
index: true
category:
  - 常见解决方案
order: 44
---
# 一、跳过登录直接调用接口

## （一）示例：

+ 跳过 queryTea 的权限验证

```java
@Action(displayName = "queryTea", bindingType = ViewTypeEnum.FORM)
@Action.Advanced(type = FunctionTypeEnum.UPDATE)
public Teacher queryTea(Teacher data) {
}
```

+ 在 yaml 文件里面配置上该函数的 namespace（模型编码）以及函数名字

```yaml
pamirs:
  auth:
    fun-filter:
      - namespace: user.PamirsUserTransient
        fun: login #登录
      - namespace: top.Teacher
        fun: queryTea
```

# 二、不跳过登录直接调用接口

## （一）示例：

+ 在 yaml 文件里面配置上该函数的 namespace（模型编码）以及函数名字

```yaml
pamirs:
  auth:
    fun-filter-only-login: #登录后不再校验该函数的权限
      - namespace: top.Teacher
        fun: queryTea
```

# 三、按包设置权限过滤

+ 如何批量跳过权限验证？以上两种方式提供了在 yml 文件里面配置权限过滤的方式，但如果需要大量过滤权限，配置就变得很繁琐，所以下面主要介绍通过代码扩展的方式去控制权限。

## （一）示例：

+ 以下示例通过控制包路径来跳过权限。
+ 继承`pro.shushi.pamirs.auth.api.spi.AuthFilterService`接口

```java
@Order(88)
@Component
public class CustomAuthFilterService implements AuthFilterService {

    public static final String skipClass = "pro.shushi.pamirs.top.core.action";

    @Override
    public Boolean isAccessAction(String model, String name) {
        //从缓存中取函数
        Action cacheAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(model, name);
        if (cacheAction instanceof ServerAction) {
            ServerAction serverAction = (ServerAction) cacheAction;
            Function function = PamirsSession.getContext().getFunction(serverAction.getModel(), serverAction.getFun());
            String clazz = function.getClazz();
            //返回true就代表通过验证
            if (clazz != null && clazz.startsWith(skipClass)) {
                return true;
            }
        }
        return null;
    }
}
```

请求`pro.shushi.pamirs.top.core.action`路径下的动作可以通过验证。

