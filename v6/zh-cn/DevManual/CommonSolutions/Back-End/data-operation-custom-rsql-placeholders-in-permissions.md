---
title: 数据操作：自定义RSQL占位符(placeholder)及在权限中使用
index: true
category:
  - 常见解决方案
order: 34
---

# 一、自定义RSQL占位符常用场景
+ 统一的数据权限配置
+ 查询表达式的上下文变量扩展

# 二、自定义 RSQL 模板
```java
/**
 * 演示Placeholder占位符基本定义
 *
 * @author Adamancy Zhang at 13:53 on 2024-03-24
 */
@Component
public class DemoPlaceHolder extends AbstractPlaceHolderParser {

    private static final String PLACEHOLDER_KEY = "${thisPlaceholder}";

    /**
     * 占位符
     *
     * @return placeholder
     */
    @Override
    public String namespace() {
        return PLACEHOLDER_KEY;
    }

    /**
     * 占位符替换值
     *
     * @return the placeholder replace to the value
     */
    @Override
    protected String value() {
        return PamirsSession.getUserId().toString();
    }

    /**
     * 优先级
     *
     * @return execution order of placeholders, ascending order.
     */
    @Override
    public Integer priority() {
        return 0;
    }

    /**
     * 是否激活
     *
     * @return the placeholder is activated
     */
    @Override
    public Boolean active() {
        return true;
    }
}
```

:::info 注意：

+ 在一些旧版本中，`priority`和`active`可能不起作用，为保证升级时不受影响，请保证该属性配置正确。
+ `PLACEHOLDER_KEY`变量表示自定义占位符使用的关键字，需按照所需业务场景的具体功能并根据上下文语义正确定义。
+ 为保证占位符可以被正确替换并执行，所有占位符都不应该出现重复，尤其是不能与系统内置的重复。

:::

# 三、占位符使用时的优先级问题
多个占位符在进行替换时，会根据`优先级`按升序顺序执行，如需要指定替换顺序，可使用`Spring`的`Order`注解对其进行排序。

```java
import org.springframework.core.annotation.Order;

@Order(0)
```

# 四、`Oinone`平台内置的占位符
| 占位符 | 数据类型 | 含义 | 备注 |
| --- | --- | --- | --- |
| `${currentUser}` | `String` | 当前用户ID | 未登录时无法使用 |
| `${currentRoles}` | `Set<String>` | 当前用户的角色ID集合 | 未登录时无法使用 |


# 五、如何覆盖平台内置的占位符？
通过指定占位符的优先级，并定义相同的`namespace`可优先替换。

# 六、如何定义会话级别的上下文变量？
在上述模板中，我们使用的是`Oinone`平台内置的上下文变量进行演示，通常情况下，我们需要根据实际业务场景增加上下文变量，以此来实现所需功能。

下面，我们将根据`当前用户`获取`当前员工ID`定义该上下文变量进行演示。

```java
/**
 * 员工Session
 *
 * @author Adamancy Zhang at 14:33 on 2024-03-24
 */
@Component
public class EmployeeSession implements HookBefore {

    private static final String SESSION_KEY = "CUSTOM_EMPLOYEE_ID";

    @Autowired
    private DemoEmployeeService demoEmployeeService;

    public static String getEmployeeId() {
        return PamirsSession.getTransmittableExtend().get(SESSION_KEY);
    }

    @Override
    @Hook(priority = 1)
    public Object run(Function function, Object... args) {
        Long userId = PamirsSession.getUserId();
        if (userId == null) {
            return function;
        }
        if (StringUtils.isBlank(EmployeeSession.getEmployeeId())) {
            PamirsSession.getTransmittableExtend().put(SESSION_KEY, getCurrentEmployeeId());
        }
        return function;
    }

    private String getCurrentEmployeeId() {
        String employeeId = getEmployeeIdByCache();
        if (employeeId == null) {
            employeeId = demoEmployeeService.getCurrentEmployeeId();
        }
        return employeeId;
    }

    private String getEmployeeIdByCache() {
        // do something.
        return null;
    }
}
```

:::info 注意：

+ 使用`HookBefore`在请求发起时向上下文中设置`employeeId`，使用`EmployeeSession.getEmployeeId()`获取即可。
+ 将`HookBefore`的优先级设置为`priority = 1`，需要该`Hook`在平台内置的`UserHook`之后执行，以确保`PamirsSession.getUserId()`中的值已经被正确设置。
+ `DemoEmployeeService`服务应使用平台`@Fun`及`@Function`注解进行实现，以确保该`Session`可在分布式环境中正确运行。
+ `getEmployeeIdByCache`方法需自行实现，在运行时使用缓存可有效提高性能。

:::

# 七、`员工Session`在`placeholder`中使用
将`DemoPlaceHolder`改写，使用`${currentEmployeeId}`获取`员工Session`中保存的`employeeId`。

```java
/**
 * 演示Placeholder占位符使用员工Session
 *
 * @author Adamancy Zhang at 15:02 on 2024-03-24
 */
@Component
public class DemoPlaceHolder extends AbstractPlaceHolderParser {

    private static final String PLACEHOLDER_KEY = "${currentEmployeeId}";

    /**
     * 占位符
     *
     * @return placeholder
     */
    @Override
    public String namespace() {
        return PLACEHOLDER_KEY;
    }

    /**
     * 占位符替换值
     *
     * @return the placeholder replace to the value
     */
    @Override
    protected String value() {
        return EmployeeSession.getEmployeeId();
    }

    /**
     * 优先级
     *
     * @return execution order of placeholders, ascending order.
     */
    @Override
    public Integer priority() {
        return 0;
    }

    /**
     * 是否激活
     *
     * @return the placeholder is activated
     */
    @Override
    public Boolean active() {
        return true;
    }
}
```

至此，我们已完成了一个`员工ID`占位符。

# 八、在权限配置时使用该占位符作为过滤条件
下面，我们将模拟一个简单业务场景，详细介绍该占位符如何在业务中使用。

## （一）场景描述
当前系统中包含`部门`和`员工`两个模型，模型的基本定义如下所示：

### 1、部门
```java
/**
 * 演示部门
 *
 * @author Adamancy Zhang at 15:18 on 2024-03-24
 */
@Model.model(DemoDepartment.MODEL_MODEL)
@Model(displayName = "演示部门", labelFields = "name")
public class DemoDepartment extends IdModel {

    private static final long serialVersionUID = -300189841334506668L;

    public static final String MODEL_MODEL = "demo.DemoDepartment";

    @Field(displayName = "部门名称")
    private String name;

    @Field(displayName = "管理员")
    private DemoEmployee manager;

}
```

### 2、员工
```java
/**
 * 演示员工
 *
 * @author Adamancy Zhang at 15:17 on 2024-03-24
 */
@Model.model(DemoEmployee.MODEL_MODEL)
@Model.Advanced(unique = {"bindingUserId"})
@Model(displayName = "演示员工", labelFields = "name")
public class DemoEmployee extends IdModel {

    private static final long serialVersionUID = -6237083162460091500L;

    public static final String MODEL_MODEL = "demo.DemoEmployee";

    @Field(displayName = "员工名称")
    private String name;

    @Field.Relation(relationFields = {"bindingUserId"}, referenceFields = {"id"})
    @Field(displayName = "绑定用户")
    private PamirsUser bindingUser;

    @Field(displayName = "绑定用户ID")
    private Long bindingUserId;

}
```

我们要求当前登录用户仅能查看其作为管理员的所在部门，因此，我们需要使用`managerId == ${currentEmployeeId}`这一过滤条件，在权限中进行配置并使其生效。

此处忽略数据准备过程，仅展示关键页面的配置及最终效果。

## （二）权限项配置
从应用中切换至`权限`模块，并选择`权限项列表`，创建一个数据权限项，并按照下图内容进行配置。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032407371552-20250530144824939.png)

## （三）角色权限配置
选择`角色列表`，并选择角色表格中指定角色的`权限配置`按钮，进入`权限配置`页面，并按照下图内容进行配置。

PS：这里省略了动作权限相关配置，配置的权限应保证该角色可以正确进入`演示部门`页面查看效果。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032407464515-20250530144825046.png)

## （四）为用户绑定指定角色（如已绑定可忽略该步骤）
从应用中切换至`用户中心`模块，选择指定用户，绑定指定角色。

## （五）在`演示部门`页面查看权限配置效果
### 1、未配置权限页面效果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032408343797-20250530144825203.png)

### 2、权限配置后页面效果
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032408351540-20250530144825250.png)

