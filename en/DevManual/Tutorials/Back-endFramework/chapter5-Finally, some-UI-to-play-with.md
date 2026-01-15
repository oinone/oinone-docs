---
title: Chapter 5:Finally, Some UI To Play With
index: true
category:
  - Development Manual
  - Tutorials
  - Back-end Framework
order: 5

---
Now that we have created new models, access entries, and corresponding access permissions, we have also experienced interacting with the user interface. It's not difficult to find that as long as a model configures a menu entry, the Oinone system will provide a default interactive page for it.

:::info Objective: By the end of this section:

The project code field should be read-only, and the personnel input scale should have a default value. Additionally, in the table view, search conditions should only include project code, project name, year, and whether it is a key project.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/Tutorial/BackendFramework/chapter-5/interaction.gif)

:::

So far, we have only used generic views in expense management, but in most cases, we want to fine-tune the views. There are many areas for fine-tuning in Oinone, but the usual first step is to ensure:

+ Some fields have default values
+ Some fields are read-only
+ Some fields appear in searches

In our expense management scenario, we want:

+ Code should be read-only (automatically filled later)
+ Search should include: project code, project name, year, and whether it is a key project
+ The default quantity for personnel input scale should be 1

# I. New Attributes of Fields
Before proceeding with view design, let's revisit our model definitions. We see attributes like `required=true` that affect the mandatory property of fields during interaction. Other attributes will affect views or provide default values.

## (Ⅰ) Default Values
Any field can be given a default value. In the field definition, add the `defaultValue=X` option, where `X` can accept a Java literal (boolean, integer, floating-point number, string), and other requirements can use functions:

``` python
@Field(displayName = "名称", required = true, defaultValue = "Unknown")
private String name;

@Field(displayName = "日期字段", required = true, defaultValue = "${NOW()}")
@Field.Date(type = DateTypeEnum.DATE, format = DateFormatEnum.DATE)
private Date date;
```

The `defaultValue` attribute of a field only takes effect on the backend and is not reflected in the default view's XML file. In contrast, the UX attributes to be introduced later are used to build the default view.

The backend default value takes effect because when the frontend page loads, the system calls the model's `construct` method, which calculates and returns the default value of the field to the frontend. However, when the frontend发起请求 and the submitted field already has a value, the `construct` method ignores the `defaultValue` attribute. This indicates that the frontend XML configuration has a higher priority than the backend field attribute configuration.

## (Ⅱ) Field Code Generator
``` python
@Field.String
@Field(displayName = "编码", unique = true)
@Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
private String code;
```

The code field is set as a unique key (for more information on constraints, refer to the tutorial: [Constraints](/en/DevManual/Tutorials/Back-endFramework/chapter10-constraints.md)). When its value is empty, it is automatically generated according to the rules. In the example, `sequence` is set to `SEQ`, indicating the rule is an auto-incrementing serial number; `prefix` sets the code prefix to start with `C`; `size` is the serial number length (only the effective length of the serial number); `step` is the step size set to 1 (effective step size of the serial number); `initial` is the starting value of the serial number set to 10000.

# II. UX Attributes
Reference: Documentation related to this topic can be found in "[UX API](/en/DevManual/Reference/Back-EndFramework/UX-API.md)".

In the Oinone backend framework, the shortcut attributes related to model and field interaction are limited, but Oinone provides a complete set of UX annotations for interaction, which can fully describe frontend interaction and display logic.

:::warning Tip: Attribute Priority

In Oinone: view XML attributes > UX annotation attributes > field attributes.

1. All field attributes related to interaction can be overridden by UX annotation attributes.
2. UX annotation attributes only affect the generation of the default view XML and will not be automatically supplemented when custom view attributes are empty.
3. View XML can define all UX interaction attributes, and the final operation is subject to the XML.

:::

``` python
@UxTableSearch.FieldWidget(@UxWidget())
@UxForm.FieldWidget(@UxWidget(config = {
        @Prop(name = "defaultValue", value = "Ux默认值优先于Unknown，但不支持函数")}))
@Field(displayName = "名称", required = true, defaultValue = "Unknown")
private String name;

@UxForm.FieldWidget(@UxWidget(readonly = "true", hint = "为空时自动生成"))
@Field.String
@Field(displayName = "编码", unique = true)
@Field.Sequence(sequence = "SEQ", prefix = "C", size = 5, step = 1, initial = 10000)
private String code;
```

@Ux series annotations can be used to configure the default visual and interaction rules of the frontend, and the following configurations can also be overridden in the XML file.

+ `@UxTableSearch.FieldWidget(@UxWidget())` is used to indicate the rules for displaying related fields in the search function of the table view. When all fields in the model are not specifically configured, the table view search will display all fields; once any field is configured, the search area will only show the configured fields.
+ @UxForm.FieldWidget(@UxWidget()), used for the interaction presentation rules of fields in the form view:
    - widget: The display component. If not specified, the corresponding default component is selected based on the current field type.
    - readonly: Read-only setting, default is false.
    - hint: Field prompt.
    - config: Pass all attributes to the component through @Prop, supporting multiple values.

:::warning Tip: Default Value Calculation

In addition to passing the defaultValue attribute to the component through @Prop, the [compute](/en/DevManual/Tutorials/Back-endFramework/chapter8-field-interlinkage.md#i-compute) attribute can also be used to handle more complex scenarios.

:::

> Exercise
>
> + Set Ux attributes for existing fields.
>     - Set name to: support search.
>     - Set code to: support search, read-only, and configure the code generator rules.
>     - Set projectYear to: support search.
>     - Set isKeyProject to: support search.
>     - Set staffSize to: configure the default value as 1.


Now, with the default view, we can interact with the user interface. The next step is clear: we want to define our own views.