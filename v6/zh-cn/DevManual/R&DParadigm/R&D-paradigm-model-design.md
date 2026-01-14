---
title: 研发范式：模型设计
index: true
category:
  - 研发手册
  - 最佳范式
order: 3

---
# 一、引言

Oinone 作为特定的业务系统或框架，其模型设计的优劣直接影响系统的性能和扩展性。数据库设计的第三范式（3NF）是一种经过实践检验的数据建模准则，它要求数据库表中的非主属性既不部分依赖于主键，也不传递依赖于主键。将第三范式融入 Oinone 模型设计，有助于构建出结构清晰、高效稳定的模型体系，从而更好地满足业务需求。

# 二、数据库设计第三范式基础

## （一）第一范式（1NF）

第一范式强调数据库表中的每个字段都必须是原子性的，即不可再分。在 Oinone 模型设计里，这意味着每个字段应当只存储单一、独立的数据值。例如，在一个商品信息模型中，“商品规格” 字段不应同时包含尺寸、颜色等多种信息，而应拆分成多个独立的字段，如 “商品尺寸”“商品颜色” 等。

## （二）第二范式（2NF）

第二范式要求数据库表中的非主属性完全依赖于主键。若 Oinone 模型存在复合主键，那么每个非主键字段都应与整个主键相关联，而非仅依赖于主键的一部分。以订单明细模型为例，若主键由 “订单编号” 和 “商品编号” 组成，那么 “商品数量”“商品单价” 等非主键字段应完全依赖于这个复合主键。

## （三）第三范式（3NF）

第三范式规定数据库表中的非主属性既不能部分依赖于主键，也不能传递依赖于主键。也就是说，一个非主属性不能通过其他非主属性间接依赖于主键。在 Oinone 模型设计中，遵循第三范式可以避免数据冗余和更新异常。比如，在一个员工信息模型中，如果 “部门名称” 和 “部门主管” 都存储在员工模型中，而 “部门主管” 依赖于 “部门名称”，就会产生传递依赖。更好的做法是将部门信息单独设计成一个模型，员工模型通过关联字段引用该部门模型。

# 三、第三范式在 Oinone 模型设计中的应用

## （一）消除数据冗余

在 Oinone 模型设计中，遵循第三范式能够有效避免数据冗余。以一个客户关系管理系统为例，若每个销售记录都存储客户的详细信息（如地址、联系方式等），当客户信息发生变更时，需要对所有相关销售记录进行更新，这不仅增加了维护成本，还容易导致数据不一致。按照第三范式，应将客户信息单独设计为一个客户模型，销售记录模型通过关联字段引用客户模型。模型设计示例代码如下：

```java
@Model.model(Customer.MODEL_MODEL)
@Model
public class Customer extends IdModel {
    public static final String MODEL_MODEL="test.Customer";

    @Field(displayName = "客户姓名")
    private String name;

    @Field(displayName = "客户地址")
    private String address;

    @Field(displayName = "联系方式")
    private String contact;
}
```

```java
@Model.model(SalesRecord.MODEL_MODEL)
@Model
public class SalesRecord extends IdModel {
    public static final String MODEL_MODEL="test.SalesRecord";
    @Field.many2one
    @Field(displayName = "客户")
    private Customer customer;

    @Field(displayName = "销售日期")
    private Date saleDate;

    @Field(displayName = "销售金额")
    private BigDecimal amount;
}
```

## （二）确保数据一致性

遵循第三范式有助于提高数据的一致性。当数据发生变化时，只需更新一处，所有关联的数据都会自动保持一致。在上述客户和销售记录模型中，若客户的地址发生改变，只需更新客户模型中的地址字段，所有与该客户相关的销售记录的数据也会随之保持最新状态。

## （三）提升模型扩展性与维护性

规范的 Oinone 模型设计使得系统更易于扩展和维护。当需要添加新功能或修改现有功能时，由于数据结构清晰，不会对其他部分产生过多影响。例如，若要添加客户的电子邮件信息，只需在客户模型中添加一个新的字段即可。

# 四、实际设计案例

## （一）设计一个项目管理系统的 Oinone 模型

假设要设计一个项目管理系统，包含项目、任务和成员三个模型。

项目管理系统 Oinone 模型设计示例代码

```java
@Model.model(Member.MODEL_MODEL)
@Model
public class Member extends IdModel {
    public static final String MODEL_MODEL="test.Member";

    @Field(displayName = "名称")
    private String name;

    @Field(displayName = "成员角色")
    private String role;

    @Field(displayName = "成员邮箱")
    private String email;
}
```

```java
@Model.model(Project.MODEL_MODEL)
@Model
public class Project extends IdModel {
    public static final String MODEL_MODEL="test.Project";

    @Field(displayName = "项目名称")
    private String name;

    @Field(displayName = "项目开始日期")
    private Date startDate;

    @Field(displayName = "项目结束日期")
    private Date endDate;
}

```

```java
@Model.model(Task.MODEL_MODEL)
@Model
public class Task extends IdModel {
    public static final String MODEL_MODEL="test.Task";

    @Field.many2one
    @Field(displayName = "所属项目")
    private Project project;

    @Field(displayName = "任务名称")
    private String taskName;

    @Field.many2one
    @Field(displayName = "负责人")
    private Member assignee;

    @Field(displayName = "任务状态")
    private DataStatusEnum status;
}
```

在这个案例中，每个模型都遵循了第三范式。项目模型存储项目的基本信息，任务模型通过关联字段引用项目模型和成员模型，成员模型存储成员的基本信息，避免了数据冗余和传递依赖。

## （二）**Oinone实践中常见的反范式设计**

### 场景1：冗余字段优化查询

+ **问题**：频繁查询订单总金额时，若每次通过关联的订单行计算，性能低。
+ **解决方案**：在订单模型中添加冗余字段`totalAmount`，通过计算字段或触发器更新。

```java
@Model.model(SaleOrder.MODEL_MODEL)
@Model
public class SaleOrder extends IdModel {
    public static final String MODEL_MODEL="test.SaleOrder";

    @Field.one2many
    @Field(displayName = "订单行列表")
    private List<OrderLine> orderLines;

    @Field(displayName = "总金额")
    private BigDecimal totalAmount;

}

@Model.model(OrderLine.MODEL_MODEL)
@Model
public class OrderLine extends IdModel {
    public static final String MODEL_MODEL="test.OrderLine";

    @Field(displayName = "金额")
    private BigDecimal amount;

}
//重写销售订单的创建逻辑
@Model.model(SaleOrder.MODEL_MODEL)
@Component
@Slf4j
public class SaleOrderAction {

    @Transactional(rollbackFor = {Throwable.class})
    @Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
    @Action( displayName = "创建", label = "确定", summary = "添加", bindingType = {ViewTypeEnum.FORM})
    @Function(name = FunctionConstants.create)
    @Function.fun(FunctionConstants.create)
    public SaleOrder create(SaleOrder data) {
        if (null == data) {
            return null;
        }
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderLine> orderLines = data.getOrderLines();
        for(OrderLine orderLine:orderLines){
            totalAmount =  totalAmount.add(orderLine.getAmount());
        }
        data.setTotalAmount(totalAmount);
        //仅执行自身的创建操作，不涉及对关联字段依据创建策略进行的自动处理 。
        data.create();
        //再保存one2many,many2many的关系字段
        data.fieldSave(SaleOrder::getOrderLines);
        return data;
    }
}
```

### 场景2：宽表简化报表

+ **问题**：生成报表需跨多表关联（如销售订单+客户+产品）。
+ **解决方案**：通过反范式化设计预计算字段或使用数据库视图（Oinone暂不支持视图，可通过存储计算字段模拟）。

### 场景3：继承与扩展

+ **扩展继承**（直接添加字段）可能违反范式，但更高效。

```java
@Model.model(CustomProduct.MODEL_MODEL)
@Model
public class CustomProduct extends Product {
    public static final String MODEL_MODEL="test.CustomProduct";
    //直接扩展原模型，可能导致冗余
    @Field(displayName = "客户编码")
    private String customCode;

}
```

# 五、实际建议

## （一）优先遵循3NF的场景：

+ 核心主数据（如客户、产品）需严格避免冗余。
+ 高频写操作的字段（如库存数量）需保证一致性。

## （二）合理反范式的场景：

+ 高频读操作的报表字段（如统计金额）。
+ 需要简化复杂查询的业务逻辑（如合并常用关联字段）。
+ 历史数据归档表（如日志记录允许冗余）。

# 六、结论

## （一）性能权衡

虽然遵循第三范式可以减少数据冗余，但在某些情况下，为了提高查询性能，可能需要适当引入一些数据冗余。例如，在一个经常需要统计每个项目任务数量的系统中，可以在项目模型中添加一个 “任务数量” 字段，并在任务记录发生变化时更新该字段，以避免每次查询都进行复杂的统计计算。

## （二）业务需求导向

在进行 Oinone 模型设计时，业务需求是首要考虑因素。有时候，为了满足特定的业务需求，可能需要对第三范式进行适当调整。例如，在某些业务场景中，可能需要将一些相关的数据存储在同一个模型中，以便于业务处理。

