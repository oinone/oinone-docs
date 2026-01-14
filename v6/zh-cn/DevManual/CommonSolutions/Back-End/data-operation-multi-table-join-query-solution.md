---
title: 数据操作：多表关联查询方案
index: true
category:
  - 常见解决方案
order: 30
---

在部分业务场景中，我们需要同时查询两张表的数据，此时就必须借助联表查询。

:::info 目标：在本节结束时，应当能够进行多表关联查询

:::

# 一、场景描述
场景：在 A 模型对应的页面上，其查询条件里涵盖了 B 模型的字段。

 A 模型

```java
@Model.model(YesOne.MODEL_MODEL)
@Model(displayName = "YesOne", summary = "YesOne")
public class YesOne extends IdModel {

    public static final String MODEL_MODEL = "top.YesOne";

    @Field.Integer
    @Field(displayName = "YesId")
    private Long yesId;

    @Field.String
    @Field(displayName = "名字")
    private String name;

    @Field.String
    @Field(displayName = "科目名字")
    private String professionalName;

    @Field(displayName = "关联YesTwo")
    @Field.many2one
    @Field.Relation(relationFields = {"yesId"},referenceFields = {"id"})
    private YesTwo yesTwo;

}
```

B模型

```java
@Model.model(YesTwo.MODEL_MODEL)
@Model(displayName = "YesTwo", summary = "YesTwo")
public class YesTwo extends IdModel {

    public static final String MODEL_MODEL = "top.YesTwo";

    @Field.Integer
    @Field(displayName = "科目id")
    private Long professionalId;

    @Field.String
    @Field(displayName = "科目名字")
    private String professionalName;

}
```

# 二、使用 wrapper 的方式查询
通过 B 模型的查询条件查询出符合条件的所有数据 ID，再根据这个 ID 去 A模型里面查询出所需的数据。

```java
@Function.Advanced(displayName = "查询列表", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<YesOne> queryPage(Pagination<YesOne> page, IWrapper<YesOne> queryWrapper) {

    String professionalName = (String) queryWrapper.getQueryData().get("professionalName");
    if (StringUtils.isNotBlank(professionalName)) {
        List<Long> yesTwoId = new YesTwo().queryList(Pops.<YesTwo>lambdaQuery()
                                                     .from(YesTwo.MODEL_MODEL)
                                                     .eq(YesTwo::getProfessionalName, professionalName))
        .stream().map(YesTwo::getId)
        .collect(Collectors.toList());
        LambdaQueryWrapper<YesOne> wq = Pops.<YesOne>lambdaQuery().from(YesOne.MODEL_MODEL);
        if (CollectionUtils.isNotEmpty(yesTwoId)) {
            wq.in(YesOne::getYesId, yesTwoId);
        }
        return new YesOne().queryPage(page, wq);
    }
    return new YesOne().queryPage(page, queryWrapper);
}
```

# 三、使用 mapper的方式查询
利用 SQL 的方式去直接查询出结果。使用联表查询的方式查询

```java
@Autowired
private YesOneQueryMapper yesOneQueryMapper;

@Function.Advanced(displayName = "查询列表", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
@Function(openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API})
public Pagination<YesOne> queryPage(Pagination<YesOne> page, IWrapper<YesOne> queryWrapper) {

    try (DsHintApi dsHint = DsHintApi.model(YesOne.MODEL_MODEL)) {
        String professionalName = (String) queryWrapper.getQueryData().get("professionalName");
        String yesOneTable = PamirsSession.getContext().getModelCache().get(YesOne.MODEL_MODEL).getTable();
        String yesTwoTable = PamirsSession.getContext().getModelCache().get(YesTwo.MODEL_MODEL).getTable();
        StringBuffer where = new StringBuffer().append("a.is_deleted = 0").append(CharacterConstants.SEPARATOR_BLANK)
        .append(SqlConstants.AND).append(CharacterConstants.SEPARATOR_BLANK)
        .append("b.is_deleted=0").append(CharacterConstants.SEPARATOR_BLANK);
        if (StringUtils.isNotBlank(professionalName)) {
            where.append(SqlConstants.AND).append(CharacterConstants.SEPARATOR_BLANK).append("b.").
            append(PStringUtils.fieldName2Column(LambdaUtil.fetchFieldName(YesOne::getProfessionalName))).append(CharacterConstants.SEPARATOR_BLANK).
            append(SqlConstants.EQ).append(professionalName);
        }
        StringBuffer limit = new StringBuffer().append(page.getStart() + " , " + page.getSize());
        List<YesOne> yesOnes = yesOneQueryMapper.unionTableQuery(yesOneTable, yesTwoTable, where.toString(), limit.toString());
        Long total = yesOneQueryMapper.queryTotal(yesOneTable, yesTwoTable, where.toString());
        page.setTotalElements(total);
        page.setContent(yesOnes);
    }
    return page;
}
```

接口

```java
package pro.shushi.pamirs.top.core.service;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import pro.shushi.pamirs.top.api.model.YesOne;

import java.util.List;

@Mapper
public interface YesOneQueryMapper {

    @Select("<script>"
            + "SELECT "
            + "a.id , "
            + "a.name, "
            + "b.professional_name as professionalName "
            + "FROM ${yesOne} a "
            + "INNER JOIN ${yesTwo} b ON a.yes_id = b.id "
            + "<if test='whereConditions != null'>"
            + "where (${whereConditions}) "
            + "</if>"
            + "ORDER BY a.id ASC "
            + "<if test='limitConditions != null'>"
            + "LIMIT ${limitConditions} "
            + "</if>"
            + "</script>")
    List<YesOne> unionTableQuery(@Param("yesOne") String yesOne, @Param("yesTwo") String yesTwo, @Param("whereConditions") String whereConditions, @Param("limitConditions") String limitConditions);

    @Select("<script>"
            + "SELECT count(a.id )"
            + "FROM ${yesOne} a "
            + "INNER JOIN ${yesTwo} b ON a.yes_id = b.id "
            + "<if test='whereConditions != null'>"
            + "where (${whereConditions}) "
            + "</if>"
            + "</script>")
    Long queryTotal(@Param("yesOne") String yesOne, @Param("yesTwo") String yesTwo, @Param("whereConditions") String whereConditions);

}

```

