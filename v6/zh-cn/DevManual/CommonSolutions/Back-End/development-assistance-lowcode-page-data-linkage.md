---
title: 开发辅助：低代码中实现页面数据联动
index: true
category:
  - 常见解决方案
order: 15
---

在项目开发中，通常有页面数据联动的需求。常见场景包括：

1. **级联选择**：如选择公司后，部门下拉框仅显示该公司下属部门；
2. **输入计算**：如根据库存和单价自动计算总价；
3. **动态计算与更新**：用户输入变化后，前端可调用后端逻辑进行计算或校验，并将结果反馈到页面。

这些联动机制通过前后端协同，实现数据的动态响应与一致性，增强交互效率与准确性。

# 一、实现方式
## （一）配置 domain 表达式
下面示例中，页面交互中部门`department`下拉列表中的数据，是所选择公司下的部门列表

```java
@Field.many2one
@Field.Relation(relationFields = {"corporationCode"}, referenceFields = {"code"})
@Field(displayName = "公司", required = true)
private Corporation corporation;

@Field.String
@Field(displayName = "公司编码", invisible = true)
private String corporationCode;

@Field.many2one
@Field.Relation(relationFields = {"departmentCode"}, referenceFields = {"code"}, domain = "corporationCode==${activeRecord.corporation.code}")
@Field(displayName = "部门", required = true)
private Department department;

@Field.String
@Field(displayName = "部门编码", invisible = true)
private String departmentCode;
```

:::info 说明：

+ 配置了 domain 属性的字段，该字段对应的模型在数据加载时候会拼接 domain 到数据的查询条件中；可在界面设计器中进行可视化配置,界面设计器表单->选择字段->「查询条件」
+ domain 表达式是 rsql 语法

:::

## （二）配置 compute 属性
示例1： 总成本 = 库存数 * 单价 计算得出；

总成本`totalCost`配置 compute 属性，`value = MULTIPLY(activeRecord.stock, activeRecord.unitPrice)`

```java
@Field.Integer
@Field(displayName = "采购数量",required = true)
private Integer stock;

@Field.Money(D = 4)
@Field(displayName = "单价(元)",required = true)
private BigDecimal unitPrice;

// 库存数 * 单价 计算得出
@Field.Money(D = 4)
@UxForm.FieldWidget(@UxWidget(readonly = "true",hint = "库存数 * 单价 计算得出",
        config = {@Prop(name = "compute", value = "MULTIPLY(activeRecord.stock, activeRecord.unitPrice)")}))
@Field(displayName = "总成本(元)",required = true)
private BigDecimal totalCost;
```

示例2： 单价 = 总成本 / 库存数量 计算得出；单价`unitPrice`配置compute属性，

`value = "IF((activeRecord.stock=='0' || IS_NULL(activeRecord.stock)), 0, DIVIDE(activeRecord.totalCost, activeRecord.stock))"`，计算逻辑中考虑到了库存为0的特殊情况

```java
@Field.Integer
@Field(displayName = "库存数量",required = true)
private Integer stock;

@Field.Money(D = 4)
@Field(displayName = "总成本(元)",required = true)
private BigDecimal totalCost;

// 总成本 / 库存数量 计算得出，保留4位小数
@UxForm.FieldWidget(@UxWidget(readonly = "true",hint = "总成本 / 库存数量 计算得出",
        config = {@Prop(name = "compute", value = "IF((activeRecord.stock=='0' || IS_NULL(activeRecord.stock)), 0, DIVIDE(activeRecord.totalCost, activeRecord.stock))")}))
@Field.Money(D = 4)
@Field(displayName = "单价(元)",required = true)
private BigDecimal unitPrice;
```

:::info 说明：

配置了 Prop(compute) 属性的字段，前端会自动执行表达式计算出该字段对应的 value；

可在界面设计器中进行可视化配置,界面设计器表单->选择字段->「计算公式」

:::

## （三）调用后端联动函数
下面示例中，根据身份证号`idCard`计算生日和性别； 为字段身份证号`idCard`配置了联动函数`constructIdCardChange`，通过调用后端函数的方式实现数据联动

```java
@Model.model(Employee.MODEL_MODEL)
@Model(displayName = "标品-员工", labelFields = "name")
@Model.Advanced(index = {"code", "departmentCode"})
public class Employee extends AbstractCopyModel {

    public static final String MODEL_MODEL = "hr.simple.Employee";

    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "姓名", required = true)
    private String name;

    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "工号", required = true)
    private String code;

    @Field.many2one
    @Field.Relation(relationFields = {"corporationCode"}, referenceFields = {"code"})
    @Field(displayName = "公司", required = true)
    private Corporation corporation;

    @Field.String
    @Field(displayName = "公司编码", invisible = true)
    private String corporationCode;

    @Field.many2one
    @Field.Relation(relationFields = {"departmentCode"}, referenceFields = {"code"}, domain = "corporationCode==${activeRecord.corporation.code}")
    @Field(displayName = "部门", required = true)
    private Department department;

    @Field.String
    @Field(displayName = "部门编码", invisible = true)
    private String departmentCode;

    @Field.Enum
    @Field(displayName = "枚举职级", required = true)
    private EmployeeLevelEnum level;

    @Field.many2one
    @Field.Relation(relationFields = "positionCode", referenceFields = "code", domain = "departmentCode==${activeRecord.department.code}")
    @Field(displayName = "主岗位", summary = "主岗位从当前部门下的岗位列表中选择", required = true)
    private Position position;

    @Field.String
    @Field(displayName = "主岗位编码", invisible = true)
    private String positionCode;

    // 根据身份证号计算生日和性别
    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "身份证号", required = true)
    @UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "constructData", value = "true"), @Prop(name = "constructSubmitType", value = "CURRENT"),
            @Prop(name = "constructFun", value = "constructIdCardChange")}))
    private String idCard;

    @Field.Enum
    @Field(displayName = "性别", required = true)
    private SimpleGenderEnum gender;

    @Field.Date(type = DateTypeEnum.DATE, format = DateFormatEnum.DATE)
    @Field(displayName = "生日", required = true)
    private Date birthday;

    // 其他属性

}
```

```java
@Slf4j
@Component
@Model.model(Employee.MODEL_MODEL)
public class EmployeeAction {

    @Function(openLevel = FunctionOpenEnum.API, summary = "身份证输入联动")
    @Function.Advanced(displayName = "身份证输入联动", type = FunctionTypeEnum.QUERY)
    public Employee constructIdCardChange(Employee data) {
        // 根据身份证计算出生日期、性别、年龄
        computeIdCard(data);
        return data;
    }


    public void computeIdCard(Employee data) {
        String idCard = data.getIdCard();
        if (StringUtils.isEmpty(idCard)) {
            data.setBirthday(null);
            data.setGender(null);
            // setAge(null);
        } else {
            // 校验身份证格式
            if (!IDCardHelper.isValidIdCard(idCard)) {
                throw PamirsException.construct(HrSimpleExpEnum.IDCARD_VALID_ERROR).errThrow();
            }

            Map<String, Object> map = IDCardHelper.parseIDCard(idCard);
            if (map != null) {
                // setAge(Integer.parseInt(map.get("age").toString()));
                // 将 LocalDate 转换为 java.util.Date
                Object birthDateObj = map.get("birthDate");
                if (birthDateObj instanceof LocalDate) {
                    LocalDate birthDate = (LocalDate) birthDateObj;
                    Date utilDate = Date.from(birthDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
                    data.setBirthday(utilDate);
                } else if (birthDateObj instanceof Date) {
                    data.setBirthday((Date) birthDateObj);
                } else {
                    throw new IllegalArgumentException("Unexpected type for birthDate: " + birthDateObj.getClass());
                }
                data.setGender((SimpleGenderEnum) map.get("gender"));
            }
        }
    }
}
```

:::info 说明：

配置了联动函数的字段，该字段变更时前端会自动发起联动函数的调用；可在界面设计器中进行可视化配置,界面设计器表单->选择字段->字段变更联动->「提交数据」

:::

