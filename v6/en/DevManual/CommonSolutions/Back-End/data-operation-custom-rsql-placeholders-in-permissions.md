---
title: Data Operations:Custom RSQL Placeholders and Their Usage in Permissions
index: true
category:
  - Common Solutions
order: 34
---

# I. Common Scenarios for Custom RSQL Placeholders
+ Unified data permission configuration
+ Context variable extension for query expressions

# II. Custom RSQL Template
```java
/**
 * Demonstrate the basic definition of Placeholder
 *
 * @author Adamancy Zhang at 13:53 on 2024-03-24
 */
@Component
public class DemoPlaceHolder extends AbstractPlaceHolderParser {

    private static final String PLACEHOLDER_KEY = "${thisPlaceholder}";

    /**
     * Placeholder
     *
     * @return placeholder
     */
    @Override
    public String namespace() {
        return PLACEHOLDER_KEY;
    }

    /**
     * Placeholder replacement value
     *
     * @return the value to replace the placeholder
     */
    @Override
    protected String value() {
        return PamirsSession.getUserId().toString();
    }

    /**
     * Priority
     *
     * @return execution order of placeholders, in ascending order
     */
    @Override
    public Integer priority() {
        return 0;
    }

    /**
     * Activation status
     *
     * @return whether the placeholder is activated
     */
    @Override
    public Boolean active() {
        return true;
    }
}
```

:::info Note:
+ In some older versions, `priority` and `active` may not function. To ensure compatibility during upgrades, please ensure these attributes are configured correctly.
+ The `PLACEHOLDER_KEY` variable represents the keyword used for the custom placeholder, which should be defined correctly based on the specific business scenario and contextual semantics.
+ To ensure placeholders can be correctly replaced and executed, all placeholders should be unique, especially not repeating system-built-in ones.
:::

# III. Priority Issues When Using Placeholders
When replacing multiple placeholders, they will be executed in ascending order based on `priority`. To specify the replacement order, use Spring's `Order` annotation for sorting.

```java
import org.springframework.core.annotation.Order;

@Order(0)
```

# IV. Built-in Placeholders in Oinone Platform
| Placeholder | Data Type | Meaning | Remarks |
| --- | --- | --- | --- |
| `${currentUser}` | `String` | Current user ID | Unavailable when not logged in |
| `${currentRoles}` | `Set<String>` | Set of current user role IDs | Unavailable when not logged in |

# V. How to Override Built-in Placeholders?
By specifying the placeholder's priority and defining the same `namespace`, you can prioritize replacement.

# VI. How to Define Session-Level Context Variables?
In the above template, we used the built-in context variables of the Oinone platform for demonstration. Usually, we need to add context variables based on actual business scenarios to achieve required functions.

Below, we will demonstrate defining a context variable to get the `current employee ID` based on the `current user`.

```java
/**
 * Employee session
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

:::info Note:
+ Use `HookBefore` to set `employeeId` in the context when a request is initiated, and use `EmployeeSession.getEmployeeId()` to retrieve it.
+ Set the `HookBefore` priority to `priority = 1`, ensuring this `Hook` executes after the platform's built-in `UserHook` to ensure the value in `PamirsSession.getUserId()` is correctly set.
+ The `DemoEmployeeService` should be implemented using the platform's `@Fun` and `@Function` annotations to ensure this `Session` works correctly in a distributed environment.
+ The `getEmployeeIdByCache` method needs to be implemented independently, and using caching at runtime can effectively improve performance.
:::

# VII. Using Employee Session in Placeholder
Modify `DemoPlaceHolder` to use `${currentEmployeeId}` to get the `employeeId` saved in the employee session.

```java
/**
 * Demonstrate using employee session in Placeholder
 *
 * @author Adamancy Zhang at 15:02 on 2024-03-24
 */
@Component
public class DemoPlaceHolder extends AbstractPlaceHolderParser {

    private static final String PLACEHOLDER_KEY = "${currentEmployeeId}";

    /**
     * Placeholder
     *
     * @return placeholder
     */
    @Override
    public String namespace() {
        return PLACEHOLDER_KEY;
    }

    /**
     * Placeholder replacement value
     *
     * @return the value to replace the placeholder
     */
    @Override
    protected String value() {
        return EmployeeSession.getEmployeeId();
    }

    /**
     * Priority
     *
     * @return execution order of placeholders, in ascending order
     */
    @Override
    public Integer priority() {
        return 0;
    }

    /**
     * Activation status
     *
     * @return whether the placeholder is activated
     */
    @Override
    public Boolean active() {
        return true;
    }
}
```

So far, we have completed an employee ID placeholder.

# VIII. Using This Placeholder as a Filter Condition in Permission Configuration
Below, we will simulate a simple business scenario to detail how this placeholder is used in business.

## (Ⅰ) Scenario Description
The current system includes two models: `Department` and `Employee`, with basic definitions as follows:

### 1. Department
```java
/**
 * Demo department
 *
 * @author Adamancy Zhang at 15:18 on 2024-03-24
 */
@Model.model(DemoDepartment.MODEL_MODEL)
@Model(displayName = "Demo Department", labelFields = "name")
public class DemoDepartment extends IdModel {

    private static final long serialVersionUID = -300189841334506668L;

    public static final String MODEL_MODEL = "demo.DemoDepartment";

    @Field(displayName = "Department Name")
    private String name;

    @Field(displayName = "Manager")
    private DemoEmployee manager;

}
```

### 2. Employee
```java
/**
 * Demo employee
 *
 * @author Adamancy Zhang at 15:17 on 2024-03-24
 */
@Model.model(DemoEmployee.MODEL_MODEL)
@Model.Advanced(unique = {"bindingUserId"})
@Model(displayName = "Demo Employee", labelFields = "name")
public class DemoEmployee extends IdModel {

    private static final long serialVersionUID = -6237083162460091500L;

    public static final String MODEL_MODEL = "demo.DemoEmployee";

    @Field(displayName = "Employee Name")
    private String name;

    @Field.Relation(relationFields = {"bindingUserId"}, referenceFields = {"id"})
    @Field(displayName = "Bound User")
    private PamirsUser bindingUser;

    @Field(displayName = "Bound User ID")
    private Long bindingUserId;

}
```

We require that the currently logged-in user can only view departments where they serve as managers. Therefore, we need to use the filter condition `managerId == ${currentEmployeeId}` in permission configuration to make it effective.

The data preparation process is omitted here, only showing the configuration of key pages and final effects.

## (Ⅱ) Permission Item Configuration
Switch to the `Permissions` module in the application, select `Permission Item List`, create a data permission item, and configure it as shown in the figure below.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032407371552-20250530144824939.png)

## (Ⅲ) Role Permission Configuration
Select `Role List`, click the `Permission Configuration` button for the specified role in the role table, enter the `Permission Configuration` page, and configure it as shown in the figure below.

PS: Action permission configuration is omitted here. Configured permissions should ensure the role can correctly access the `Demo Department` page to view the effect.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032407464515-20250530144825046.png)

## (Ⅳ) Bind the Specified Role to the User (Skip if Already Bound)
Switch to the `User Center` module in the application, select the specified user, and bind the specified role.

## (Ⅴ) View Permission Configuration Effects on the `Demo Department` Page
### 1. Page Effect Without Permission Configuration
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032408343797-20250530144825203.png)

### 2. Page Effect After Permission Configuration
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024032408351540-20250530144825250.png)