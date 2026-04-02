---
title: Tree-Table Configuration:How to Configure Tree-Tables
index: true
category:
  - Common Solutions
order: 49
---
# I. Left Tree as Model A, Right Table as Model B

Take Model A as Category and Model B as Category Attributes as an example.
Model code example:

``` java
@Model.model(AriesPlatformCategory.MODEL_MODEL)
@Model(displayName = "Platform Background Category", labelFields = "name")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class AriesPlatformCategory extends AriesCategory {
    public static final String MODEL_MODEL = "aries.item.AriesPlatformCategory";

    @Field.many2one
    @Field.Relation(relationFields = {"parentCateCode"}, referenceFields = {"code"},store = true)
    @Field(displayName = "Platform Parent Category")
    private AriesPlatformCategory platformCategory;

    @Field.one2many
    @Field(displayName = "Category Attributes")
    @Field.Relation(relationFields = "code", referenceFields = "categoryCode", store = true)
    private List<AriesPlatformCategoryAttr> platformCategoryAttrs;

}
```

``` java
@Model.model(AriesPlatformCategoryAttr.MODEL_MODEL)
@Model(displayName = "Aries_Platform Category Attributes", labelFields = "name")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class AriesPlatformCategoryAttr extends CategoryAttr {
    public static final String MODEL_MODEL = "aries.item.AriesPlatformCategoryAttr";

    @Field.many2one
    @Field(displayName = "Platform Background Category")
    @Field.Relation(relationFields = "categoryCode", referenceFields = "code", store = true)
    private AriesPlatformCategory platformCategory;

}
```

Before designing the left tree-right table in the designer, the association relationships need to be configured in the model. The following code configures the association between categories and parent categories.

``` java
@Field.many2one
@Field.Relation(relationFields = {"parentCateCode"}, referenceFields = {"code"},store = true)
@Field(displayName = "Platform Parent Category")
private AriesPlatformCategory platformCategory;
```

Configure the association between categories and category attributes. One category can have multiple category attributes, a one-to-many (one2many) relationship.

``` java
@Field.one2many
@Field(displayName = "Category Attributes")
@Field.Relation(relationFields = "code", referenceFields = "categoryCode", store = true)
private List<AriesPlatformCategoryAttr> platformCategoryAttrs;
```

In the category attribute model, configure the association between attributes and categories. One category attribute belongs to only one category, while one category can have multiple category attributes. Category attributes have a many-to-one (many2one) relationship with categories.

``` java
@Field.many2one
@Field(displayName = "Platform Background Category")
@Field.Relation(relationFields = "categoryCode", referenceFields = "code", store = true)
private AriesPlatformCategory platformCategory;
```

Designer examples:

1. Select Platform Category Attributes as the main model to create a tree-table page
   Build the association relationship, select Platform Background Category, set the first-level filter condition as empty parent code, and select Platform Category Attributes as the table association relationship field. ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692255343245-2f7bf25a-df0c-4260-a0db-c89c14de0ac5-20250530144828979.png)
2. Build the association relationship, select Platform Background Category, set the first-level filter condition as empty parent code, and select Platform Category Attributes as the table association relationship field. ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692255426222-9d691993-a395-416a-b22f-8b90cc93bd7b-20250530144829042.png)
3. Drag and drop the required attribute fields in the table
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692256463530-14359029-c667-452e-a16b-fb7eb7a87eb4-20250530144829141.png)

# II. Left Tree as Model A, Right Table also as Model A

Take Model A as Organizational Structure Management for both left and right as an example.

## (I) Model Code Example:

``` java
@Model.model(BasicOrg.MODEL_MODEL)
@Model(displayName = "Organizational Structure Management", summary = "Organizational Structure Management", labelFields = {"orgName"})
@Model.Code(sequence = "ORDERLY_SEQ", prefix = "Org", size = 5, initial = 0)
public class BasicOrg {
    public static final String MODEL_MODEL = "basic.BasicOrg";

    @Field.String
    @Field(displayName = "Name")
    private String orgName;

    @Field.Enum
    @Field(displayName = "Organization Type", summary = "Organization Type")
    private OrgTypeEnum deptType;

    @Field.Enum
    @Field(displayName = "Factory Type", summary = "Visible when organization type is factory")
    private FactoryTypeEnum factoryType;

    @Field.Enum
    @Field(displayName = "Warehouse Type", summary = "Visible when organization type is warehouse")
    private WarehouseTypeEnum warehouseType;

    @Field.String
    @Field(displayName = "Principal", summary = "Principal")
    private String principal;

    @Field.String
    @Field(displayName = "Contact Number", summary = "Contact Number")
    private String phone;

    @Field(displayName = "Parent Organization")
    @Field.many2one
    @Field.Relation(relationFields = {"parentCode"}, referenceFields = {"code"})
    private BasicOrg parent;

    @Field.Text
    @Field(displayName = "Remarks")
    private String remark;

    @Field.Enum
    @Field(displayName = "Data Status", required = true, defaultValue = "ENABLED")
    private DataStatusEnum dataStatus;

    @Field.String
    @Field(displayName = "Parent Organization Code")
    private String parentCode;

    @Field.String(size = 256)
    @Field(displayName = "Tree Code", required = true)
    private String treeCode;

    @Field.one2many
    @Field.Relation(relationFields = "id", referenceFields = "orgId")
    @Field(displayName = "Basic - Affiliated Organization Employees")
    private List<BasicEmployee> basicEmployees;
}
```

Configure self-association:

``` java
@Field(displayName = "Parent Organization")
@Field.many2one
@Field.Relation(relationFields = {"parentCode"}, referenceFields = {"code"})
private BasicOrg parent;
```

## (II) Designer Operations:

1. Select the model Organizational Structure Management, create a page, choose Table as the view type, and select Tree-Table as the layout.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254280041-aa4ea165-83df-49a9-9452-79c6b2e84e5a-20250530144829237.png)

2. Set the linkage relationship: select Organizational Structure Management as the model; set the first-level filter condition as empty parent code, and select Organizational Structure Management - Parent Organization (field name: parent) as the table association relationship field.
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254205452-a224b62d-56f4-45e0-82e7-98b6e4d61f15-20250530144829327.png)
3. Drag and drop the required attribute fields in the table.
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254601623-d45dd1e0-78cf-4ee5-a0f2-1b9bac6f272b-20250530144829419.png)