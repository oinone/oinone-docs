---
title: Data Operation:Multi-table Join Query Solutions
index: true
category:
  - Common Solutions
order: 30
---

In some business scenarios, we need to query data from two tables simultaneously, which requires the use of join queries.

:::info Objective: By the end of this section, you should be able to perform multi-table join queries

:::

# Ⅰ. Scenario Description
Scenario: On the page corresponding to Model A, the query conditions include fields from Model B.

Model A

``` java
@Model.model(YesOne.MODEL_MODEL)
@Model(displayName = "YesOne", summary = "YesOne")
public class YesOne extends IdModel {

    public static final String MODEL_MODEL = "top.YesOne";

    @Field.Integer
    @Field(displayName = "YesId")
    private Long yesId;

    @Field.String
    @Field(displayName = "Name")
    private String name;

    @Field.String
    @Field(displayName = "Subject Name")
    private String professionalName;

    @Field(displayName = "Associated YesTwo")
    @Field.many2one
    @Field.Relation(relationFields = {"yesId"},referenceFields = {"id"})
    private YesTwo yesTwo;

}
```

Model B

``` java
@Model.model(YesTwo.MODEL_MODEL)
@Model(displayName = "YesTwo", summary = "YesTwo")
public class YesTwo extends IdModel {

    public static final String MODEL_MODEL = "top.YesTwo";

    @Field.Integer
    @Field(displayName = "Subject ID")
    private Long professionalId;

    @Field.String
    @Field(displayName = "Subject Name")
    private String professionalName;

}
```

# Ⅱ. Query Using Wrapper
Query all data IDs that meet the conditions through the query conditions of Model B, then use these IDs to query the required data in Model A.

``` java
@Function.Advanced(displayName = "Query List", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
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

# Ⅲ. Query Using Mapper
Use SQL to directly query results, employing join query methods.

``` java
@Autowired
private YesOneQueryMapper yesOneQueryMapper;

@Function.Advanced(displayName = "Query List", type = FunctionTypeEnum.QUERY, category = FunctionCategoryEnum.QUERY_PAGE, managed = true)
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

Interface

``` java
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