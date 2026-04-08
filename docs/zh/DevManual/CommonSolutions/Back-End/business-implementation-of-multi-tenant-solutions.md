---
title: 开发实践：业务实现多租户方案
index: true
category:
  - 常见解决方案
order: 19
---

# 一、总体方案
+ 在业务项目场景下，为达成数据隔离之目的，针对需要进行隔离的模型，需自定义添加租户字段。
+ 本项目在实现数据隔离功能时，参考了 `Mybatis - Plus` 插件中的 `TenantSqlParser`，并基于此进行了 `JPA` 层面的实现。具体实现方式为，运用 `jsqlparser` 工具对 `SQL` 语句进行解析与修改。
+ 通过一系列技术手段，实现了获取当前用户的租户 `ID`，并在执行 `SQL` 的增、删、改、查操作时，对租户字段进行妥善处理，最终成功达成租户数据的有效隔离。
+ 参考项目如下：
    - `Mybatis - Plus`：[https://github.com/baomidou/mybatis-plus](https://github.com/baomidou/mybatis-plus)
    - `JSqlParser`：[https://github.com/JSQLParser/JSqlParser](https://github.com/JSQLParser/JSqlParser)

## 二、具体实现方式
### （一）业务上定义两个基础抽象模型包含租户字段
定义包含 ID 的基础抽象模型，且包含租户字段(如：公司编码, 用其他字段作为租户字段也可以，根据实际业务情况灵活修改)。

```java
@Model.model(XXIdModel.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model(displayName = "带公司CODE的基础ID抽象模型", summary = "待公司Code的Id模型")
public abstract class XXIdModel extends IdModel {
    public static final String MODEL_MODEL = "demo.biz.XXIdModel";


    @Field.String
    @Field(displayName = "所属公司编码", invisible = true, index = true)
    private String companyCode;
}
```

定义包含`Code`的基础抽象模型，且包含租户字段(如：公司编码, 用其他字段作为租户字段也可以，根据实际业务情况灵活修改)。

```java
@Model.model(XXCodeModel.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model(displayName = "带公司CODE的基础Code抽象模型", summary = "带公司CODE的Code模型")
public abstract class XXCodeModel extends CodeModel {
    public static final String MODEL_MODEL = "demo.biz.XXCodeModel";

    @Field.String
    @Field(displayName = "所属公司编码", invisible = true, index = true)
    private String companyCode;
}
```

### （二）业务模块的模型需租户隔离的都是继承上面这两个模型；
```java
@Model.model(PetPetCompany.MODEL_MODEL)
@Model(displayName = "宠物公司", labelFields = "name")
public class PetPetCompany extends AbstractCompanyCodeModel {

    public static final String MODEL_MODEL = "demo.PetPetCompany";

    @Field.String
    @Field(displayName = "名称")
    private String name;

    @Field.Text
    @Field(displayName = "简介")
    private String introduction;
}
```

### （三）自定义扩展 Session，Session 中设置租户信息
每次请求多把登录用户所属公司编码（companyCode）放到 Session 中； Session扩展参考：[请求上下文 API](/zh/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)

### （四）定义拦截器Interceptor进行数据隔离
数据创建和查询通过拦截器把 Session 中的中的公司编码（companyCode）设置到隔离字段中；拦截器的 java 示例代码参考：

```java
package pro.shushi.pamirs.demo.core.interceptor;

import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.LongValue;
import net.sf.jsqlparser.expression.StringValue;
import net.sf.jsqlparser.expression.operators.relational.ExpressionList;
import net.sf.jsqlparser.expression.operators.relational.ItemsListVisitor;
import net.sf.jsqlparser.expression.operators.relational.MultiExpressionList;
import net.sf.jsqlparser.expression.operators.relational.NamedExpressionList;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.schema.Column;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.insert.Insert;
import net.sf.jsqlparser.statement.select.;
import net.sf.jsqlparser.statement.update.Update;
import net.sf.jsqlparser.statement.values.ValuesStatement;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.demo.core.session.DemoSession;
import pro.shushi.pamirs.framework.connectors.data.mapper.context.MapperContext;
import pro.shushi.pamirs.meta.annotation.fun.extern.Slf4j;

import java.util.Map;
import java.util.Properties;

@Slf4j
@SuppressWarnings(“unused”)
@Intercepts({
    @Signature(type = Executor.class, method = “query”, args = {MappedStatement.class, Object.class,
                                                                RowBounds.class, ResultHandler.class}),
    @Signature(type = Executor.class, method = “update”, args = {MappedStatement.class, Object.class})
})
@Component
@Order(99)
@ConditionalOnProperty(value = “pamirs.demo.isolation.enable”, havingValue = “true”)
public class IsolationCheckInterceptor implements Interceptor {

    private static final String[] BOUND_SQL_CLONE_FIELDS = new String[]{"additionalParameters", "metaParameters"};

    @Autowired
    private DemoIsolationConfiguration demoIsolationConfiguration;

    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        if (SqlCommandType.FLUSH == ms.getSqlCommandType() || SqlCommandType.UNKNOWN == ms.getSqlCommandType()) {
            return invocation.proceed();
        }
            // sql type: UNKNOWN, INSERT, UPDATE, DELETE, SELECT, FLUSH
    String sqlCommandType = ms.getSqlCommandType().toString();
    // update 直接返回
    if ("UPDATE".equals(sqlCommandType)) {
        return invocation.proceed();
    }

    Object param = args[1];
    if (param instanceof Map) {
        Map map = (Map) param;
        // 获取配置信息
        String model = MapperContext.model(map);
        if (StringUtils.isBlank(model)) {
            return invocation.proceed();
        }

        if (!demoIsolationConfiguration.needIsolation(model)) {
            return invocation.proceed();
        }
        BoundSql boundSql = ms.getBoundSql(param);
        String sql = boundSql.getSql();
        // 通过jsqlparser解析SQL，此处的statement是封装过后的Insert/Update/Query等SQL语句
        Statement statement = CCJSqlParserUtil.parse(sql);

        switch (sqlCommandType) {
            case "INSERT":
                Statement insert = prepareInsertSql(statement);
                BoundSql insertBoundSql = new BoundSql(ms.getConfiguration(), insert.toString(), boundSql.getParameterMappings(), boundSql.getParameterObject());
                cloneBoundSqlParameters(boundSql, insertBoundSql);
                MappedStatement insertMs = buildMappedStatement(ms, new BoundSqlSqlSource(insertBoundSql));
                // 更新 MappedStatement 对象
                args[0] = insertMs;
                break;
            case "SELECT":
                Statement select = prepareSelectSql(statement);
                BoundSql selectBoundSql = new BoundSql(ms.getConfiguration(), select.toString(), boundSql.getParameterMappings(), boundSql.getParameterObject());
                cloneBoundSqlParameters(boundSql, selectBoundSql);
                MappedStatement selectMs = buildMappedStatement(ms, new BoundSqlSqlSource(selectBoundSql));
                // 更新 MappedStatement 对象
                args[0] = selectMs;
                break;
            default:
                break;
        }
    }

    return invocation.proceed();
}

private void cloneBoundSqlParameters(BoundSql boundSql, BoundSql targetBoundSql) {
    MetaObject boundSqlObject = SystemMetaObject.forObject(boundSql);
    MetaObject targetBoundSqlObject = SystemMetaObject.forObject(targetBoundSql);
    for (String field : BOUND_SQL_CLONE_FIELDS) {
        targetBoundSqlObject.setValue(field, boundSqlObject.getValue(field));
    }
}

@Override
public Object plugin(Object target) {
    if (target instanceof Executor) {
        return Plugin.wrap(target, this);
    }
    return target;
}

@Override
public void setProperties(Properties properties) {
    // to do nothing
}

private MappedStatement buildMappedStatement(MappedStatement ms, SqlSource newSqlSource) {
    MappedStatement.Builder builder = new MappedStatement.Builder(ms.getConfiguration(), ms.getId(), newSqlSource, ms.getSqlCommandType());
    builder.resource(ms.getResource());
    builder.fetchSize(ms.getFetchSize());
    builder.statementType(ms.getStatementType());
    builder.keyGenerator(ms.getKeyGenerator());
    if (ms.getKeyProperties() != null && ms.getKeyProperties().length > 0) {
        builder.keyProperty(ms.getKeyProperties()[0]);
    }
    //禁止用缓存（重要）
    builder.flushCacheRequired(false);
    builder.timeout(ms.getTimeout());
    builder.parameterMap(ms.getParameterMap());
    builder.resultMaps(ms.getResultMaps());
    builder.cache(ms.getCache());
    builder.useCache(ms.isUseCache());
    return builder.build();
}

private static class BoundSqlSqlSource implements SqlSource {
    BoundSql boundSql;

    public BoundSqlSqlSource(BoundSql boundSql) {
        this.boundSql = boundSql;
    }

    @Override
    public BoundSql getBoundSql(Object parameterObject) {
        return boundSql;
    }
}

private Statement prepareInsertSql(Statement statement) {
    Insert insert = (Insert) statement;

    boolean isContainsIsolationColumn = false;
    int createDateColumnIndex = 0;
    for (int i = 0; i < insert.getColumns().size(); i++) {
        Column column = insert.getColumns().get(i);
        if (clearQuote(column.getColumnName()).equals(demoIsolationConfiguration.getColumn())) {
            // sql中包含了设置的列名，则只需要设置值
            isContainsIsolationColumn = true;
            createDateColumnIndex = i;
            break;
        }
    }

    if (!isContainsIsolationColumn) {
        intoValue("<code>&quot; + demoIsolationConfiguration.getColumn() + &quot;</code>", DemoSession.getCompany().getCode(), insert);
    } else {
        intoValueWithIndex(createDateColumnIndex, DemoSession.getCompany().getCode(), insert);
    }

    log.debug("intercept insert sql is : {}", insert);
    return insert;
}

private Statement prepareSelectSql(Statement statement) throws JSQLParserException {
    Select select = (Select) statement;
    PlainSelect plain = (PlainSelect) select.getSelectBody();
    FromItem fromItem = plain.getFromItem();

    StringBuffer whereSql = new StringBuffer();
    //增加sql语句的逻辑部分处理
    if (fromItem.getAlias() != null) {
        whereSql.append(fromItem.getAlias().getName()).append(".<code>&quot; + demoIsolationConfiguration.getColumn() + &quot;</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    } else {
        whereSql.append("<code>&quot; + demoIsolationConfiguration.getColumn() + &quot;</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    }
    Expression where = plain.getWhere();
    if (where == null) {
        if (whereSql.length() > 0) {
            Expression expression = CCJSqlParserUtil.parseCondExpression(whereSql.toString());
            Expression whereExpression = (Expression) expression;
            plain.setWhere(whereExpression);
        }
    } else {
        if (whereSql.length() > 0) {
            //where条件之前存在，需要重新进行拼接
            whereSql.append(" and ( " + where.toString() + " )");
        } else {
            //新增片段不存在，使用之前的sql
            whereSql.append(where.toString());
        }
        Expression expression = CCJSqlParserUtil.parseCondExpression(whereSql.toString());
        plain.setWhere(expression);
    }

    return select;
}

private Statement prepareUpdateSql(Statement statement) throws JSQLParserException {
    Update update = (Update) statement;
    PlainSelect plain = (PlainSelect) update.getSelect().getSelectBody();
    FromItem fromItem = plain.getFromItem();

    StringBuffer whereSql = new StringBuffer();
    //增加sql语句的逻辑部分处理
    if (fromItem.getAlias() != null) {
        whereSql.append(fromItem.getAlias().getName()).append(".<code>&quot; + demoIsolationConfiguration.getColumn() + &quot;</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    } else {
        whereSql.append("<code>&quot; + demoIsolationConfiguration.getColumn() + &quot;</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    }
    Expression where = plain.getWhere();
    if (where == null) {
        if (whereSql.length() > 0) {
            Expression expression = CCJSqlParserUtil.parseCondExpression(whereSql.toString());
            Expression whereExpression = expression;
            plain.setWhere(whereExpression);
        }
    } else {
        if (whereSql.length() > 0) {
            //where条件之前存在，需要重新进行拼接
            whereSql.append(" and ( " + where + " )");
        } else {
            //新增片段不存在，使用之前的sql
            whereSql.append(where);
        }
        Expression expression = CCJSqlParserUtil.parseCondExpression(whereSql.toString());
        plain.setWhere(expression);
    }

    return update;
}

/**
 * insert sql update column value
 *
 * @param index
 * @param columnValue
 * @param insert
 */
private void intoValueWithIndex(final int index, final Object columnValue, Insert insert) {
    // 通过visitor设置对应的值
    if (insert.getItemsList() == null) {
        insert.getSelect().getSelectBody().accept(new PlainSelectVisitor(index, columnValue));
    } else {
        insert.getItemsList().accept(new ItemsListVisitor() {
            @Override
            public void visit(SubSelect subSelect) {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public void visit(NamedExpressionList namedExpressionList) {

            }

            @Override
            public void visit(ExpressionList expressionList) {
                if (columnValue instanceof String) {
                    expressionList.getExpressions().set(index, new StringValue((String) columnValue));
                } else if (columnValue instanceof Long) {
                    expressionList.getExpressions().set(index, new LongValue((Long) columnValue));
                } else {
                    // if you need to add other type data, add more if branch
                    expressionList.getExpressions().set(index, new StringValue((String) columnValue));
                }
            }

            @Override
            public void visit(MultiExpressionList multiExpressionList) {
                for (ExpressionList expressionList : multiExpressionList.getExprList()) {
                    if (columnValue instanceof String) {
                        expressionList.getExpressions().set(index, new StringValue((String) columnValue));
                    } else if (columnValue instanceof Long) {
                        expressionList.getExpressions().set(index, new LongValue((Long) columnValue));
                    } else {
                        // if you need to add other type data, add more if branch
                        expressionList.getExpressions().set(index, new StringValue((String) columnValue));
                    }
                }
            }
        });
    }
}

/**
 * insert sql add column
 *
 * @param columnName
 * @param columnValue
 * @param insert
 */
private void intoValue(String columnName, final Object columnValue, Insert insert) {
    // 添加列
    insert.getColumns().add(new Column(columnName));
    // 通过visitor设置对应的值
    if (insert.getItemsList() == null) {
        insert.getSelect().getSelectBody().accept(new PlainSelectVisitor(-1, columnValue));
    } else {
        insert.getItemsList().accept(new ItemsListVisitor() {
            @Override
            public void visit(SubSelect subSelect) {
                throw new UnsupportedOperationException("Not supported yet.");
            }

            @Override
            public void visit(ExpressionList expressionList) {
                // 这里表示添加列时。列值在数据库中的数据类型， 目前只用到了Long和String，需要的自行扩展
                if (columnValue instanceof String) {
                    expressionList.getExpressions().add(new StringValue((String) columnValue));
                } else if (columnValue instanceof Long) {
                    expressionList.getExpressions().add(new LongValue((Long) columnValue));
                } else {
                    // if you need to add other type data, add more if branch
                    expressionList.getExpressions().add(new StringValue((String) columnValue));
                }
            }

            @Override
            public void visit(NamedExpressionList namedExpressionList) {
            }

            @Override
            public void visit(MultiExpressionList multiExpressionList) {
                for (ExpressionList expressionList : multiExpressionList.getExprList()) {
                    if (columnValue instanceof String) {
                        expressionList.getExpressions().add(new StringValue((String) columnValue));
                    } else if (columnValue instanceof Long) {
                        expressionList.getExpressions().add(new LongValue((Long) columnValue));
                    } else {
                        // if you need to add other type data, add more if branch
                        expressionList.getExpressions().add(new StringValue((String) columnValue));
                    }
                }
            }
        });
    }
}

/**
 * 支持INSERT INTO SELECT 语句
 */
private class PlainSelectVisitor implements SelectVisitor {
    int index;
    Object columnValue;

    public PlainSelectVisitor(int index, Object columnValue) {
        this.index = index;
        this.columnValue = columnValue;
    }

    @Override
    public void visit(PlainSelect plainSelect) {
        if (index != -1) {
            if (columnValue instanceof String) {
                plainSelect.getSelectItems().set(index, new SelectExpressionItem(new StringValue((String) columnValue)));
            } else if (columnValue instanceof Long) {
                plainSelect.getSelectItems().set(index, new SelectExpressionItem(new LongValue((Long) columnValue)));
            } else {
                // if you need to add other type data, add more if branch
                plainSelect.getSelectItems().set(index, new SelectExpressionItem(new StringValue((String) columnValue)));
            }
        } else {
            if (columnValue instanceof String) {
                plainSelect.getSelectItems().add(new SelectExpressionItem(new StringValue((String) columnValue)));
            } else if (columnValue instanceof Long) {
                plainSelect.getSelectItems().add(new SelectExpressionItem(new LongValue((Long) columnValue)));
            } else {
                // if you need to add other type data, add more if branch
                plainSelect.getSelectItems().add(new SelectExpressionItem(new StringValue((String) columnValue)));
            }
        }
    }

    @Override
    public void visit(SetOperationList setOperationList) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void visit(WithItem withItem) {
        if (index != -1) {
            if (columnValue instanceof String) {
                withItem.getWithItemList().set(index, new SelectExpressionItem(new StringValue((String) columnValue)));
            } else if (columnValue instanceof Long) {
                withItem.getWithItemList().set(index, new SelectExpressionItem(new LongValue((Long) columnValue)));
            } else {
                // if you need to add other type data, add more if branch
                withItem.getWithItemList().set(index, new SelectExpressionItem(new StringValue((String) columnValue)));
            }
        } else {
            if (columnValue instanceof String) {
                withItem.getWithItemList().add(new SelectExpressionItem(new StringValue((String) columnValue)));
            } else if (columnValue instanceof Long) {
                withItem.getWithItemList().add(new SelectExpressionItem(new LongValue((Long) columnValue)));
            } else {
                // if you need to add other type data, add more if branch
                withItem.getWithItemList().add(new SelectExpressionItem(new StringValue((String) columnValue)));
            }
        }
    }

    @Override
    public void visit(ValuesStatement valuesStatement) {

    }
}

/**
 * 去除''号
 *
 * @param value
 * @return {@link String}
 */
private String clearQuote(String value) {
    if (value.startsWith("<code>&quot;) &amp;&amp; value.endsWith(&quot;</code>")) {
        value = value.substring(1, value.length() - 1);
    }
    return value;
}
}
```

### （五）租户配置信息代码实现
```java
package pro.shushi.pamirs.demo.core.interceptor;

import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import pro.shushi.pamirs.meta.annotation.fun.Data;
import pro.shushi.pamirs.meta.api.dto.config.ModelConfig;
import pro.shushi.pamirs.meta.api.dto.config.ModelFieldConfig;
import pro.shushi.pamirs.meta.api.session.PamirsSession;
import pro.shushi.pamirs.meta.common.constants.ModuleConstants;

import java.util.List;
import java.util.Optional;

@Data
@Configuration
@ConfigurationProperties(prefix = “pamirs.demo.isolation”)
public class DemoIsolationConfiguration {

    private Boolean enable = Boolean.FALSE;
    /**隔离字段对应的数据表column*/
    private String column;
    /**隔离字段对应的模型field*/
    private String field;
    /**即使包含隔离字段field,也不需要隔离的模型列表。 实际项目中也可采用白名单方式*/
    private List<String> ignoreModels = Lists.newArrayList("business.PamirsEmployee", "demo.PetEmployee");

    public boolean needIsolation(String model) {
        // 1、在忽略列表中的不需要进行隔离
        if (matchesIgnoreModel(model)) {
            return false;
        }

        // 2、模块为空或者为base模块的不需要进行隔离
        String module = Optional.ofNullable(PamirsSession.getContext())
        .map(v -> v.getModelConfig(model)).map(ModelConfig::getModule).orElse(null);
        if (StringUtils.isBlank(module) || module.equals(ModuleConstants.MODULE_BASE)) {
            return false;
        }

        // 3、超级管理员进入不需要进行隔离(根据实际情况确定是否开启)
        /**
    if (PamirsSession.getAdminTag()==null || PamirsSession.getAdminTag()) {
        return false;
    }**/

        // 4、模型中无隔离字段的不需要进行隔离
        ModelFieldConfig modelField = PamirsSession.getContext().getModelField(model, field);
        if (modelField == null) {
            return false;
        }

        return true;
    }

    private boolean matchesIgnoreModel(String model) {
        if (CollectionUtils.isEmpty(ignoreModels)) {
            return false;
        }
        if (ignoreModels.contains(model)) {
            return true;
        }
        return false;
    }
}
```

### （六）对应的yml文件配置示例
```yaml
demo:
    isolation:
      enable: true
      field:  companyCode
      column: company_code
      # ignoreModels:
```

### （七）本文中的示例代码附件
拦截器实现租户隔离示例 [interceptor](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/interceptor.zip)   
Session扩展示例 [Session扩展示例](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024040711092811.zip)

