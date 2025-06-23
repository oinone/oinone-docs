---
title: Development Aid:Implementing Page Data Linkage in Low-Code
index: true
category:
  - Common Solutions
order: 15
---

In project development, there is often a need for page data linkage. Common scenarios include:

1. **Cascading Selection**: For example, after selecting a company, the department drop-down list only displays departments under that company;
2. **Input Calculation**: For example, automatically calculating the total price based on inventory and unit price;
3. **Dynamic Calculation and Update**: After user input changes, the front-end can call back-end logic for calculation or validation and feedback the result to the page.

These linkage mechanisms achieve dynamic response and consistency of data through front-end and back-end collaboration, enhancing interaction efficiency and accuracy.

# Ⅰ、Implementation Methods
## （Ⅰ）Configuring domain Expressions
In the following example, the data in the department `department` drop-down list during page interaction is the list of departments under the selected company.

```java
@Field.many2one
@Field.Relation(relationFields = {"corporationCode"}, referenceFields = {"code"})
@Field(displayName = "Company", required = true)
private Corporation corporation;

@Field.String
@Field(displayName = "Company Code", invisible = true)
private String corporationCode;

@Field.many2one
@Field.Relation(relationFields = {"departmentCode"}, referenceFields = {"code"}, domain = "corporationCode==${activeRecord.corporation.code}")
@Field(displayName = "Department", required = true)
private Department department;

@Field.String
@Field(displayName = "Department Code", invisible = true)
private String departmentCode;
```

:::info Explanation:

- For fields configured with the domain attribute, the model corresponding to the field will append the domain to the data query conditions when loading data; it can be visually configured in the UI designer, UI Designer Form -> Select Field -> "Query Conditions"
- The domain expression uses rsql syntax

:::

## （Ⅱ）Configuring the compute Attribute
Example 1: Total cost = stock quantity * unit price;

The total cost `totalCost` is configured with the compute attribute, `value = MULTIPLY(activeRecord.stock, activeRecord.unitPrice)`

```java
@Field.Integer
@Field(displayName = "Purchase Quantity", required = true)
private Integer stock;

@Field.Money(D = 4)
@Field(displayName = "Unit Price (Yuan)", required = true)
private BigDecimal unitPrice;

// Calculated as stock quantity * unit price
@Field.Money(D = 4)
@UxForm.FieldWidget(@UxWidget(readonly = "true", hint = "Calculated as stock quantity * unit price",
        config = {@Prop(name = "compute", value = "MULTIPLY(activeRecord.stock, activeRecord.unitPrice)")}))
@Field(displayName = "Total Cost (Yuan)", required = true)
private BigDecimal totalCost;
```

Example 2: Unit price = total cost / stock quantity; the unit price `unitPrice` is configured with the compute attribute,

`value = "IF((activeRecord.stock=='0' || IS_NULL(activeRecord.stock)), 0, DIVIDE(activeRecord.totalCost, activeRecord.stock))", and the calculation logic considers the special case where stock is 0.

```java
@Field.Integer
@Field(displayName = "Stock Quantity", required = true)
private Integer stock;

@Field.Money(D = 4)
@Field(displayName = "Total Cost (Yuan)", required = true)
private BigDecimal totalCost;

// Calculated as total cost / stock quantity,保留4位小数 (retaining 4 decimal places)
@UxForm.FieldWidget(@UxWidget(readonly = "true", hint = "Calculated as total cost / stock quantity",
        config = {@Prop(name = "compute", value = "IF((activeRecord.stock=='0' || IS_NULL(activeRecord.stock)), 0, DIVIDE(activeRecord.totalCost, activeRecord.stock))")}))
@Field.Money(D = 4)
@Field(displayName = "Unit Price (Yuan)", required = true)
private BigDecimal unitPrice;
```

:::info Explanation:

For fields configured with the Prop(compute) attribute, the front-end will automatically execute the expression to calculate the corresponding value of the field;

It can be visually configured in the UI designer, UI Designer Form -> Select Field -> "Calculation Formula"

:::

## （Ⅲ）Calling Back-end Linkage Functions
In the following example, the birthday and gender are calculated based on the ID card number `idCard`; the linkage function `constructIdCardChange` is configured for the ID card number `idCard` field, and data linkage is achieved by calling the back-end function.

```java
@Model.model(Employee.MODEL_MODEL)
@Model(displayName = "Standard Product - Employee", labelFields = "name")
@Model.Advanced(index = {"code", "departmentCode"})
public class Employee extends AbstractCopyModel {

    public static final String MODEL_MODEL = "hr.simple.Employee";

    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "Name", required = true)
    private String name;

    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "Employee Number", required = true)
    private String code;

    @Field.many2one
    @Field.Relation(relationFields = {"corporationCode"}, referenceFields = {"code"})
    @Field(displayName = "Company", required = true)
    private Corporation corporation;

    @Field.String
    @Field(displayName = "Company Code", invisible = true)
    private String corporationCode;

    @Field.many2one
    @Field.Relation(relationFields = {"departmentCode"}, referenceFields = {"code"}, domain = "corporationCode==${activeRecord.corporation.code}")
    @Field(displayName = "Department", required = true)
    private Department department;

    @Field.String
    @Field(displayName = "Department Code", invisible = true)
    private String departmentCode;

    @Field.Enum
    @Field(displayName = "Enumerated Job Level", required = true)
    private EmployeeLevelEnum level;

    @Field.many2one
    @Field.Relation(relationFields = "positionCode", referenceFields = "code", domain = "departmentCode==${activeRecord.department.code}")
    @Field(displayName = "Main Position", summary = "The main position is selected from the list of positions in the current department", required = true)
    private Position position;

    @Field.String
    @Field(displayName = "Main Position Code", invisible = true)
    private String positionCode;

    // Calculate birthday and gender based on ID card number
    @UxTableSearch.FieldWidget(@UxWidget())
    @Field.String
    @Field(displayName = "ID Card Number", required = true)
    @UxForm.FieldWidget(@UxWidget(config = {@Prop(name = "constructData", value = "true"), @Prop(name = "constructSubmitType", value = "CURRENT"),
            @Prop(name = "constructFun", value = "constructIdCardChange")}))
    private String idCard;

    @Field.Enum
    @Field(displayName = "Gender", required = true)
    private SimpleGenderEnum gender;

    @Field.Date(type = DateTypeEnum.DATE, format = DateFormatEnum.DATE)
    @Field(displayName = "Birthday", required = true)
    private Date birthday;

    // Other attributes

}
```

```java
@Slf4j
@Component
@Model.model(Employee.MODEL_MODEL)
public class EmployeeAction {

    @Function(openLevel = FunctionOpenEnum.API, summary = "ID Card Input Linkage")
    @Function.Advanced(displayName = "ID Card Input Linkage", type = FunctionTypeEnum.QUERY)
    public Employee constructIdCardChange(Employee data) {
        // Calculate birth date, gender, and age based on ID card
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
            // Validate ID card format
            if (!IDCardHelper.isValidIdCard(idCard)) {
                throw PamirsException.construct(HrSimpleExpEnum.IDCARD_VALID_ERROR).errThrow();
            }

            Map<String, Object> map = IDCardHelper.parseIDCard(idCard);
            if (map != null) {
                // setAge(Integer.parseInt(map.get("age").toString()));
                // Convert LocalDate to java.util.Date
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

:::info Explanation:

For fields configured with linkage functions, the front-end will automatically initiate a call to the linkage function when the field changes; it can be visually configured in the UI designer, UI Designer Form -> Select Field -> Field Change Linkage -> "Submit Data"

:::