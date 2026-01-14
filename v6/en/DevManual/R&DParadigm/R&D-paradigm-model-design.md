---
title: R&D Paradigm:Model Design
index: true
category:
  - Development Manual
  - Best Paradigms
order: 3

---
# I. Introduction

As a specific business system or framework, the quality of model design in Oinone directly affects the system's performance and extensibility. The Third Normal Form (3NF) in database design is a proven data modeling principle, requiring that non-primary attributes in a database table neither partially depend on the primary key nor transitively depend on it. Integrating the Third Normal Form into Oinone model design helps construct a clear, efficient, and stable model system to better meet business requirements.

# II. Basics of Database Design Third Normal Form

## (Ⅰ) First Normal Form (1NF)

The First Normal Form emphasizes that each field in a database table must be atomic, meaning it cannot be further divided. In Oinone model design, this means each field should store only a single, independent data value. For example, in a product information model, the "product specifications" field should not contain multiple information such as size and color simultaneously but should be split into independent fields like "product size" and "product color".

## (Ⅱ) Second Normal Form (2NF)

The Second Normal Form requires that non-primary attributes in a database table fully depend on the primary key. If an Oinone model has a composite primary key, each non-primary key field should be associated with the entire primary key rather than just part of it. Take an order detail model as an example: if the primary key consists of "order number" and "product number", non-primary key fields like "product quantity" and "product unit price" should fully depend on this composite primary key.

## (Ⅲ) Third Normal Form (3NF)

The Third Normal Form stipulates that non-primary attributes in a database table should neither partially depend on the primary key nor transitively depend on it through other non-primary attributes. In Oinone model design, following the Third Normal Form avoids data redundancy and update anomalies. For instance, in an employee information model, if both "department name" and "department supervisor" are stored in the employee model, and "department supervisor" depends on "department name", a transitive dependency arises. A better approach is to design department information as a separate model, with the employee model referencing it through an association field.

# III. Application of Third Normal Form in Oinone Model Design

## (Ⅰ) Eliminating Data Redundancy

Following the Third Normal Form in Oinone model design effectively avoids data redundancy. Take a customer relationship management system as an example: if each sales record stores detailed customer information (such as address and contact details), updating all related sales records when customer information changes increases maintenance costs and prone to data inconsistency. According to the Third Normal Form, customer information should be designed as a separate customer model, with the sales record model referencing it through an association field. Sample code for model design is as follows:

```java
@Model.model(Customer.MODEL_MODEL)
@Model
public class Customer extends IdModel {
    public static final String MODEL_MODEL="test.Customer";

    @Field(displayName = "Customer Name")
    private String name;

    @Field(displayName = "Customer Address")
    private String address;

    @Field(displayName = "Contact Information")
    private String contact;
}
```

```java
@Model.model(SalesRecord.MODEL_MODEL)
@Model
public class SalesRecord extends IdModel {
    public static final String MODEL_MODEL="test.SalesRecord";
    @Field.many2one
    @Field(displayName = "Customer")
    private Customer customer;

    @Field(displayName = "Sales Date")
    private Date saleDate;

    @Field(displayName = "Sales Amount")
    private BigDecimal amount;
}
```

## (Ⅱ) Ensuring Data Consistency

Adhering to the Third Normal Form helps improve data consistency. When data changes, updating it in one place keeps all associated data automatically consistent. In the customer and sales record models above, if a customer's address changes, only the address field in the customer model needs to be updated, and all related sales records will remain up-to-date.

## (Ⅲ) Enhancing Model Extensibility and Maintainability

Standardized Oinone model design makes the system easier to extend and maintain. When adding new features or modifying existing ones, the clear data structure minimizes impacts on other parts. For example, adding a customer's email only requires adding a new field to the customer model.

# IV. Practical Design Cases

## (Ⅰ) Designing Oinone Models for a Project Management System

Suppose we need to design a project management system with three models: project, task, and member.

Sample code for Oinone model design of the project management system:

```java
@Model.model(Member.MODEL_MODEL)
@Model
public class Member extends IdModel {
    public static final String MODEL_MODEL="test.Member";

    @Field(displayName = "Name")
    private String name;

    @Field(displayName = "Member Role")
    private String role;

    @Field(displayName = "Member Email")
    private String email;
}
```

```java
@Model.model(Project.MODEL_MODEL)
@Model
public class Project extends IdModel {
    public static final String MODEL_MODEL="test.Project";

    @Field(displayName = "Project Name")
    private String name;

    @Field(displayName = "Project Start Date")
    private Date startDate;

    @Field(displayName = "Project End Date")
    private Date endDate;
}

```java
@Model.model(Task.MODEL_MODEL)
@Model
public class Task extends IdModel {
    public static final String MODEL_MODEL="test.Task";

    @Field.many2one
    @Field(displayName = "Project")
    private Project project;

    @Field(displayName = "Task Name")
    private String taskName;

    @Field.many2one
    @Field(displayName = "Assignee")
    private Member assignee;

    @Field(displayName = "Task Status")
    private DataStatusEnum status;
}
```

In this case, each model follows the Third Normal Form. The project model stores basic project information, the task model references the project and member models through association fields, and the member model stores basic member information, avoiding data redundancy and transitive dependencies.

## (Ⅱ) Common Denormalization Designs in Oinone Practice

### Scenario 1: Redundant Fields for Query Optimization

+ **Problem**: When frequently querying the total order amount, calculating it through associated order lines each time is inefficient.
+ **Solution**: Add a redundant field `totalAmount` to the order model, updated via computed fields or triggers.

```java
@Model.model(SaleOrder.MODEL_MODEL)
@Model
public class SaleOrder extends IdModel {
    public static final String MODEL_MODEL="test.SaleOrder";

    @Field.one2many
    @Field(displayName = "Order Lines")
    private List<OrderLine> orderLines;

    @Field(displayName = "Total Amount")
    private BigDecimal totalAmount;

}

@Model.model(OrderLine.MODEL_MODEL)
@Model
public class OrderLine extends IdModel {
    public static final String MODEL_MODEL="test.OrderLine";

    @Field(displayName = "Amount")
    private BigDecimal amount;

}
// Override the creation logic of the sales order
@Model.model(SaleOrder.MODEL_MODEL)
@Component
@Slf4j
public class SaleOrderAction {

    @Transactional(rollbackFor = {Throwable.class})
    @Action.Advanced(name = FunctionConstants.create, type = {FunctionTypeEnum.CREATE}, managed = true, invisible = ExpConstants.idValueExist, check = true)
    @Action( displayName = "Create", label = "Confirm", summary = "Add", bindingType = {ViewTypeEnum.FORM})
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
        // Only execute the creation operation of itself, without involving automatic processing of associated fields based on creation strategies.
        data.create();
        // Then save the one2many and many2many relationship fields
        data.fieldSave(SaleOrder::getOrderLines);
        return data;
    }
}
```

### Scenario 2: Wide Tables for Simplified Reporting

+ **Problem**: Generating reports requires cross-table associations (such as sales orders + customers + products).
+ **Solution**: Use denormalized design with precomputed fields or database views (Oinone does not currently support views, but computed fields can simulate this).

### Scenario 3: Inheritance and Extension

+ Extended inheritance (directly adding fields) may violate normal forms but is more efficient.

```java
@Model.model(CustomProduct.MODEL_MODEL)
@Model
public class CustomProduct extends Product {
    public static final String MODEL_MODEL="test.CustomProduct";
    // Directly extending the original model may cause redundancy
    @Field(displayName = "Customer Code")
    private String customCode;

}
```

# V. Practical Recommendations

## (Ⅰ) Scenarios to Prioritize 3NF:

+ Core master data (such as customers, products) must strictly avoid redundancy.
+ Fields with high-frequency write operations (such as inventory quantity) need to ensure consistency.

## (Ⅱ) Scenarios for Reasonable Denormalization:

+ Report fields with high-frequency read operations (such as statistical amounts).
+ Business logic requiring simplified complex queries (such as merging commonly associated fields).
+ Historical data archive tables (such as log records allowing redundancy).

# VI. Conclusion

## (Ⅰ) Performance Trade-offs

Although following the Third Normal Form reduces data redundancy, introducing appropriate data redundancy may be necessary in some cases to improve query performance. For example, in a system that frequently needs to count the number of tasks per project, adding a "task count" field to the project model and updating it when task records change avoids complex statistical calculations for each query.

## (Ⅱ) Business Requirement Orientation

Business requirements are the primary consideration in Oinone model design. Sometimes, appropriate adjustments to the Third Normal Form are needed to meet specific business needs. For instance, in some scenarios, relevant data may need to be stored in the same model to facilitate business processing.