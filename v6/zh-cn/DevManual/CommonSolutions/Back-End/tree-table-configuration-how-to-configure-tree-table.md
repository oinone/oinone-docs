---
title: 树表配置：树表怎么配置
index: true
category:
  - 常见解决方案
order: 49
---
# 一、左树为A模型,右表为B模型

举例 A 模型为类目 B 模型为类目属性
模型代码实例：

```java
@Model.model(AriesPlatformCategory.MODEL_MODEL)
@Model(displayName = "平台后台类目", labelFields = "name")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class AriesPlatformCategory extends AriesCategory {
    public static final String MODEL_MODEL = "aries.item.AriesPlatformCategory";

    @Field.many2one
    @Field.Relation(relationFields = {"parentCateCode"}, referenceFields = {"code"},store = true)
    @Field(displayName = "平台父类目")
    private AriesPlatformCategory platformCategory;

    @Field.one2many
    @Field(displayName = "类目属性")
    @Field.Relation(relationFields = "code", referenceFields = "categoryCode", store = true)
    private List<AriesPlatformCategoryAttr> platformCategoryAttrs;

}
```

```java
@Model.model(AriesPlatformCategoryAttr.MODEL_MODEL)
@Model(displayName = "Aries_平台类目属性", labelFields = "name")
@Model.Advanced(type = ModelTypeEnum.PROXY)
public class AriesPlatformCategoryAttr extends CategoryAttr {
    public static final String MODEL_MODEL = "aries.item.AriesPlatformCategoryAttr";

    @Field.many2one
    @Field(displayName = "平台后台类目")
    @Field.Relation(relationFields = "categoryCode", referenceFields = "code", store = true)
    private AriesPlatformCategory platformCategory;

}
```

在设计器设计左树右表之前，需要在模型中配置好关联关系 。如下部分代码配置好类目与父类目的关联关系。

```java
@Field.many2one
@Field.Relation(relationFields = {"parentCateCode"}, referenceFields = {"code"},store = true)
@Field(displayName = "平台父类目")
private AriesPlatformCategory platformCategory;
```

配置好类目与类目属性的关联关系。一个类目可以有多个类目属性，一对多 one2many

```java
@Field.one2many
@Field(displayName = "类目属性")
@Field.Relation(relationFields = "code", referenceFields = "categoryCode", store = true)
private List<AriesPlatformCategoryAttr> platformCategoryAttrs;
```

在类目属性模型中，配置好属性与类目的关联关系，一个类目属性只属于一个类目，一个类目可以有多个类目属性。类目属性对类目多对一many2one

```java
@Field.many2one
@Field(displayName = "平台后台类目")
@Field.Relation(relationFields = "categoryCode", referenceFields = "code", store = true)
private AriesPlatformCategory platformCategory;
```

设计器实例:

1. 需要选择 平台类目属性 做为主模型创建树表页面
   构建关联关系 选择平台后台类目 第一级的筛选条件 上级编码为空  表格关联关系字段 选择 平台类目属性。![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692255343245-2f7bf25a-df0c-4260-a0db-c89c14de0ac5-20250530144828979.png)
2. 构建关联关系 选择平台后台类目 第一级的筛选条件 上级编码为空  表格关联关系字段 选择 平台类目属性。![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692255426222-9d691993-a395-416a-b22f-8b90cc93bd7b-20250530144829042.png)
3. 表格拖拽好需要的属性字段
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692256463530-14359029-c667-452e-a16b-fb7eb7a87eb4-20250530144829141.png)

# 二、左树为A模型,右表也为A模型

举例 左 A 模型 组织结构管理。右 A 模型 组织结构管理

## （一）模型代码实例：

```java
@Model.model(BasicOrg.MODEL_MODEL)
@Model(displayName = "组织结构管理", summary = "组织结构管理", labelFields = {"orgName"})
@Model.Code(sequence = "ORDERLY_SEQ", prefix = "Org", size = 5, initial = 0)
public class BasicOrg {
    public static final String MODEL_MODEL = "basic.BasicOrg";

    @Field.String
    @Field(displayName = "名称")
    private String orgName;

    @Field.Enum
    @Field(displayName = "组织类型", summary = "组织类型")
    private OrgTypeEnum deptType;

    @Field.Enum
    @Field(displayName = "工厂类型", summary = "当组织类型为工厂时可见")
    private FactoryTypeEnum factoryType;

    @Field.Enum
    @Field(displayName = "仓库类型", summary = "当组织类型为仓库时可见")
    private WarehouseTypeEnum warehouseType;

    @Field.String
    @Field(displayName = "负责人", summary = "负责人")
    private String principal;

    @Field.String
    @Field(displayName = "联系号码", summary = "联系号码")
    private String phone;

    @Field(displayName = "上级组织")
    @Field.many2one
    @Field.Relation(relationFields = {"parentCode"}, referenceFields = {"code"})
    private BasicOrg parent;

    @Field.Text
    @Field(displayName = "备注")
    private String remark;

    @Field.Enum
    @Field(displayName = "数据状态", required = true, defaultValue = "ENABLED")
    private DataStatusEnum dataStatus;

    @Field.String
    @Field(displayName = "上级组织编码")
    private String parentCode;

    @Field.String(size = 256)
    @Field(displayName = "树编码", required = true)
    private String treeCode;

    @Field.one2many
    @Field.Relation(relationFields = "id", referenceFields = "orgId")
    @Field(displayName = "基础-所属组织员工")
    private List<BasicEmployee> basicEmployees;
}
```

配置好自我关联

```java
@Field(displayName = "上级组织")
@Field.many2one
@Field.Relation(relationFields = {"parentCode"}, referenceFields = {"code"})
private BasicOrg parent;
```

## （二）设计器操作:

1. 选择好模型 组织结构管理 创建页面 试图类型选择 表格 布局选择树表

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254280041-aa4ea165-83df-49a9-9452-79c6b2e84e5a-20250530144829237.png)

2. 设置联动关系 模型选择 组织结构管理 模型 ； 第一级的筛选条件 上级编码为空  表格关联关系字段 选择 组织结构管理-上级组织 字段名 parent
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254205452-a224b62d-56f4-45e0-82e7-98b6e4d61f15-20250530144829327.png)
3. 表格拖拽好需要的属性字段
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1692254601623-d45dd1e0-78cf-4ee5-a0f2-1b9bac6f272b-20250530144829419.png)

