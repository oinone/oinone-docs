---
title: Permission Extension:How to Skip Permission Interception for Functions
index: true
category:
  - Common Solutions
order: 44
---
# I. Invoking Interfaces Directly Without Login

## (Ⅰ) Example:
+ Skip permission validation for `queryTea`

``` java
@Action(displayName = "queryTea", bindingType = ViewTypeEnum.FORM)
@Action.Advanced(type = FunctionTypeEnum.UPDATE)
public Teacher queryTea(Teacher data) {
}
```

+ Configure the function's `namespace` (model code) and function name in the YAML file:

``` yaml
pamirs:
  auth:
    fun-filter:
      - namespace: user.PamirsUserTransient
        fun: login # Login
      - namespace: top.Teacher
        fun: queryTea
```

# II. Invoking Interfaces Directly with Login (Without Skipping Login)

## (Ⅰ) Example:
+ Configure the function's `namespace` (model code) and function name in the YAML file:

``` yaml
pamirs:
  auth:
    fun-filter-only-login: # After login, skip permission validation for this function
      - namespace: top.Teacher
        fun: queryTea
```

# III. Setting Permission Filters by Package

+ How to batch skip permission validation? The above two methods provide ways to configure permission filters in the YML file, but if a large number of permissions need to be filtered, configuration becomes tedious. Therefore, the following mainly introduces controlling permissions through code extension.

## (Ⅰ) Example:
+ The following example skips permissions by controlling the package path.
+ Inherit the `pro.shushi.pamirs.auth.api.spi.AuthFilterService` interface:

``` java
@Order(88)
@Component
public class CustomAuthFilterService implements AuthFilterService {

    public static final String skipClass = "pro.shushi.pamirs.top.core.action";

    @Override
    public Boolean isAccessAction(String model, String name) {
        // Retrieve the function from the cache
        Action cacheAction = PamirsSession.getContext().getExtendCache(ActionCacheApi.class).get(model, name);
        if (cacheAction instanceof ServerAction) {
            ServerAction serverAction = (ServerAction) cacheAction;
            Function function = PamirsSession.getContext().getFunction(serverAction.getModel(), serverAction.getFun());
            String clazz = function.getClazz();
            // Return true to indicate validation passed
            if (clazz != null && clazz.startsWith(skipClass)) {
                return true;
            }
        }
        return null;
    }
}
```

Actions under the `pro.shushi.pamirs.top.core.action` path can pass validation.