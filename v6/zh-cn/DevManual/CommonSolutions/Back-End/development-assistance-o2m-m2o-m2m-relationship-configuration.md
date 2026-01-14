---
title: 开发辅助：O2M、M2O、M2M关系字段配置问题以及问题排查路径
index: true
category:
  - 常见解决方案
order: 13
---

# 一、M2O关系字段配置
```java
@Field(displayName = "教师关联学生")
@Field.many2one
@Field.Relation(relationFields = {"studentName"}, referenceFields = {"name"})
private Student students;
```

## （一）常见问题
### 1、多对一关系字段关联：
在多对一关系场景下，`studentName` 为本模型中的字段，而 `name` 属于 `Student` 模型的字段。此多对一关系正是借助这两个字段实现关联

### 2、关联关系保存机制：
在保存该关联关系过程中，系统会将 `Student` 模型中 `name` 字段的值，传递至本模型的 `studentName` 字段，并存储于当前模型（many 方）。

### 3、`studentName` 字段特性：
`studentName` 字段需设定为存储字段，原因在于针对当前模型（many 方）数据进行查询操作时，是以该字段作为查询依据。

### 4、字段定义规则：
`name` 字段必须在关系模型，即 `Student` 模型（one 方）中予以定义。而 `studentName` 字段在本模型中，定义与否均可。若本模型中尚未定义 `studentName` 字段，系统将自动在本模型中创建该字段。

### 5、启动报错处理：
若启动过程中出现报错情况，需依据报错具体内容进行针对性修改。

### 6、保存报错解析：
当保存操作出现 “Duplicate entry '******' for key 'PRIMARY'” 报错时，其根源在于 `studentName` 被设定为唯一键。在将 `Student` 模型中相同的 `name` 值赋给本模型的 `studentName` 字段时，触发了唯一键冲突。此情形在其他类似关系操作中同样可能出现。

# 二、O2M关系字段配置
```java
@Field(displayName = "教师关联宠物")
@Field.one2many
@Field.Relation(relationFields = {"id"}, referenceFields = {"teacherId"})
private List<PetShop> studentsCode;
```

   解析：

+ 在这个一对多关系下，`id` 作为本模型所定义的字段，`teacherId` 为 `PetShop` 模型中的字段，此一对多关系正是通过这两个字段实现关联。
+ 当执行该关联关系的保存操作时，系统会将 `id` 的值传递至 `teacherId`，并保存于 `PetShop` 模型（多端模型）之中。
+ 其中，`id` 务必在本模型（一端模型）中进行定义。而对于 `teacherId`，在 `PetShop` 模型中定义与否均可。若 `PetShop` 模型内未定义 `teacherId` 字段，系统将会自动在 `PetShop` 模型中创建此关联字段。

   常见问题：

+ 启动报错：根据报错内容进行相应修改
+ 保存报错：请先保存关联关系模型：如果 id 为自定义字段 与 PetShop 进行关联，那么保存关联关系时必须给id 赋值，不然会报错

# 三、M2M关系字段配置
## （一）配置示例1
```java
@Field.many2many(through = OrderRelLogistics.MODEL_MODEL, relationFields = {"parentOrderId"}, referenceFields = {"logisticsBillId"})
@Field.Relation(relationFields = {"id"}, referenceFields = {"id"})
@Field(displayName = "物流单")
private List<LogisticsBill> logisticsBillList;
```

   解析：

+ 在该多对多关系场景中，“id（左）” 是本模型所设定的字段，“id（右）” 则是 `PetShop` 模型的字段。`OrderRelLogistics.MODEL_MODEL` 作为中间表，在执行关联关系保存操作时，此中间表将负责维护双方的关系字段。具体而言，“id（左）” 的值会被写入中间表的 `parentOrderId` 字段，“id（右）” 的值会被写入中间表的 `logisticsBillId` 字段。

   常见问题：

+ 保存报错，请先保存关联关系模型：如果id（左）为在本模型自定义的字段，则需要在保存关联关系的时候的时候将该自定义赋值，这样才能正确保存关联关系。

##    （二）配置示例2：
1. 新增`TalentTypeEnum`

```java
@Dict(dictionary = TalentTypeEnum.DICTIONARY,displayName = "达人类型")
public class TalentTypeEnum extends BaseEnum<TalentTypeEnum,Integer> {

    public static final String DICTIONARY ="top.TalentTypeEnum";

    public final static TalentTypeEnum DOG =create("DOG",1,"狗达人","狗达人");
    public final static TalentTypeEnum CAT =create("CAT",2,"猫达人","猫达人");
}
```

2. 中间表定义

```java
@Model.model(PetItemRelPetTalent.MODEL_MODEL)
@Model(displayName = "中间表", summary = "中间表")
public class PetItemRelPetTalent extends BaseRelation {

    public static final String MODEL_MODEL = "top.PetItemRelPetTalent";

    @Field.String
    @Field(displayName = "商店ID")
    private String petItemId;

    @Field.String
    @Field(displayName = "宠物ID")
    private String petTalentId;

    @Field.String
    @Field(displayName = "宠物类型")
    private TalentTypeEnum talentType;
}
```

3.关系字段定义（关联关系中，使用”##“包括定义常量，这里定义常量"test"）

```java
@Field(displayName = "推荐达人")
@Field.many2many(
    through = PetItemRelPetTalent.MODEL_MODEL,
    relationFields = {"petItemId"},
    referenceFields = {"petTalentId","talentType"}
)
@Field.Relation(relationFields = {"id"}, referenceFields = {"id", "#2#"})
private List<PetTalent> petTalents;
```

   解析：

+ 在这个多对多的关系中，查询时首先会查当前模型的字段，拿到当前模型的id（左），然后根据条件`petItem_id=id（左）` 去查中间表，就可以在中间表里查询出多个`categoryId,talentType`，然后根据条件`（id（右）, talenttype） IN （categoryId，talentType)`查询出关系表`PetTalent`
+ 注意：`talentType`字段必须在关系表`PetTalent`中定义，并和中间表定义的字段`talentType`保持一致
+ ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20240813194828517-20250530144824567.png)
4. 常见问题：
+ 报错：需要配置关联模型的关联字段：原因是在`PetTalent`中没有定义`talentType`字段

##    （三）配置示例3：
```java
@Field(displayName = "类目")
@Field.many2many(
    through = MaterialRelCategory.MODEL_MODEL,
    relationFields = {"materialId","type"},
    referenceFields = {"categoryId"}
)
@Field.Relation(relationFields = {"id", "#test#"}, referenceFields = {"id"})
private List<MaterialCategory> categoryList;
```

   解析：

+ 在这个多对多关系中，查询时首先会查当前模型的字段，拿到当前模型的id（左），然后根据条件`material_id=id（左） AND type = test` 去查中间表，就可以在中间表里查询出多个`categoryId`，然后根据条件`id（右）IN （categoryId）`查询出关系表`MaterialCategory`

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20240813191447838-20250530144824727.png)
