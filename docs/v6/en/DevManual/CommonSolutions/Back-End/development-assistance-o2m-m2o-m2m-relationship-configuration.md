---
title: Development Aid:Configuration Issues and Troubleshooting Paths for O2M, M2O, and M2M Relationship Fields
index: true
category:
  - Common Solutions
order: 13
---

# Ⅰ. M2O Relationship Field Configuration
``` java
@Field(displayName = "Teacher Associated Student")
@Field.many2one
@Field.Relation(relationFields = {"studentName"}, referenceFields = {"name"})
private Student students;
```

## \(Ⅰ\) Common Issues
### 1. Many-to-One Relationship Field Association:
In a many-to-one relationship scenario, `studentName` is a field in the current model, while `name` belongs to the `Student` model. This many-to-one relationship is established through these two fields.

### 2. Association Relationship Saving Mechanism:
During the saving of this association relationship, the system transfers the value of the `name` field in the `Student` model to the `studentName` field of the current model and stores it in the current model (the many side).

### 3. Characteristics of the `studentName` Field:
The `studentName` field must be set as a stored field because when querying data for the current model (the many side), this field serves as the query criterion.

### 4. Field Definition Rules:
The `name` field must be defined in the relationship model, i.e., the `Student` model (the one side). The `studentName` field may or may not be defined in the current model. If the `studentName` field is not yet defined in the current model, the system will automatically create it in the current model.

### 5. Startup Error Handling:
If an error occurs during startup, make targeted modifications based on the specific error content.

### 6. Analysis of Saving Errors:
When a "Duplicate entry '******' for key 'PRIMARY'" error occurs during saving, the root cause is that `studentName` is set as a unique key. When the same `name` value from the `Student` model is assigned to the `studentName` field of the current model, it triggers a unique key conflict. This situation may also occur in other similar relationship operations.

# Ⅱ. O2M Relationship Field Configuration
``` java
@Field(displayName = "Teacher Associated Pet")
@Field.one2many
@Field.Relation(relationFields = {"id"}, referenceFields = {"teacherId"})
private List<PetShop> studentsCode;
```

Analysis:

+ In this one-to-many relationship, `id` is a field defined in the current model, and `teacherId` is a field in the `PetShop` model. This one-to-many relationship is established through these two fields.
+ When saving this association relationship, the system transfers the value of `id` to `teacherId` and saves it in the `PetShop` model (the many-side model).
+ Among them, `id` must be defined in the current model (the one-side model). The `teacherId` may or may not be defined in the `PetShop` model. If the `teacherId` field is not defined in the `PetShop` model, the system will automatically create this association field in the `PetShop` model.

Common Issues:

+ Startup error: Make corresponding modifications based on the error content.
+ Saving error: Please save the associated relationship model first. If `id` is a custom field associated with `PetShop`, the `id` must be assigned a value when saving the association relationship; otherwise, an error will occur.

# Ⅲ. M2M Relationship Field Configuration
## \(Ⅰ\) Configuration Example 1
``` java
@Field.many2many(through = OrderRelLogistics.MODEL_MODEL, relationFields = {"parentOrderId"}, referenceFields = {"logisticsBillId"})
@Field.Relation(relationFields = {"id"}, referenceFields = {"id"})
@Field(displayName = "Logistics Bill")
private List<LogisticsBill> logisticsBillList;
```

Analysis:

+ In this many-to-many relationship scenario, "id (left)" is a field set in the current model, and "id (right)" is a field of the `PetShop` model. `OrderRelLogistics.MODEL_MODEL` serves as the intermediate table, which maintains the relationship fields of both sides when the association relationship is saved. Specifically, the value of "id (left)" is written to the `parentOrderId` field of the intermediate table, and the value of "id (right)" is written to the `logisticsBillId` field of the intermediate table.

Common Issues:

+ Saving error: Please save the associated relationship model first. If "id (left)" is a custom field in the current model, the custom value needs to be assigned when saving the association relationship to correctly save the association.

## \(Ⅱ\) Configuration Example 2:
1. Add `TalentTypeEnum`

``` java
@Dict(dictionary = TalentTypeEnum.DICTIONARY,displayName = "Talent Type")
public class TalentTypeEnum extends BaseEnum<TalentTypeEnum,Integer> {

    public static final String DICTIONARY ="top.TalentTypeEnum";

    public final static TalentTypeEnum DOG =create("DOG",1,"Dog Talent","Dog Talent");
    public final static TalentTypeEnum CAT =create("CAT",2,"Cat Talent","Cat Talent");
}
```

2. Intermediate Table Definition

``` java
@Model.model(PetItemRelPetTalent.MODEL_MODEL)
@Model(displayName = "Intermediate Table", summary = "Intermediate Table")
public class PetItemRelPetTalent extends BaseRelation {

    public static final String MODEL_MODEL = "top.PetItemRelPetTalent";

    @Field.String
    @Field(displayName = "Shop ID")
    private String petItemId;

    @Field.String
    @Field(displayName = "Pet ID")
    private String petTalentId;

    @Field.String
    @Field(displayName = "Pet Type")
    private TalentTypeEnum talentType;
}
```

3. Relationship Field Definition (In the association relationship, use "##" to enclose the defined constant, here defining the constant "test")

``` java
@Field(displayName = "Recommended Talent")
@Field.many2many(
    through = PetItemRelPetTalent.MODEL_MODEL,
    relationFields = {"petItemId"},
    referenceFields = {"petTalentId","talentType"}
)
@Field.Relation(relationFields = {"id"}, referenceFields = {"id", "#2#"})
private List<PetTalent> petTalents;
```

Analysis:

+ In this many-to-many relationship, the query first retrieves the fields of the current model to obtain the id (left) of the current model. Then, it queries the intermediate table based on the condition `petItem_id = id (left)`, from which multiple `categoryId` and `talentType` can be obtained. Finally, it queries the relationship table `PetTalent` based on the condition `(id (right), talentType) IN (categoryId, talentType)`.
+ Note: The `talentType` field must be defined in the relationship table `PetTalent` and must be consistent with the `talentType` field defined in the intermediate table.
+ ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20240813194828517-20250530144824567.png)
4. Common Issues:
+ Error: The associated field of the associated model needs to be configured. Reason: The `talentType` field is not defined in `PetTalent`.

## \(Ⅲ\) Configuration Example 3:
``` java
@Field(displayName = "Category")
@Field.many2many(
    through = MaterialRelCategory.MODEL_MODEL,
    relationFields = {"materialId","type"},
    referenceFields = {"categoryId"}
)
@Field.Relation(relationFields = {"id", "#test#"}, referenceFields = {"id"})
private List<MaterialCategory> categoryList;
```

Analysis:

+ In this many-to-many relationship, the query first retrieves the fields of the current model to obtain the id (left) of the current model. Then, it queries the intermediate table based on the condition `material_id = id (left) AND type = test`, from which multiple `categoryId` can be obtained. Finally, it queries the relationship table `MaterialCategory` based on the condition `id (right) IN (categoryId)`.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-20240813191447838-20250530144824727.png)