---
title: Development practice:Business implementation of a multi-tenant solution
index: true
category:
  - Common Solutions
order: 19
---

# I. Overall Plan
+ In the business project scenario, in order to achieve data isolation, for the models that need to be isolated, tenant fields need to be custom - added.
+ When implementing the data isolation function in this project, the `TenantSqlParser` in the `Mybatis - Plus` plugin was referred to, and an implementation at the `JPA` level was carried out based on this. The specific implementation method is to use the `jsqlparser` tool to parse and modify the `SQL` statements.
+ Through a series of technical means, the tenant ID of the current user is obtained, and when performing the addition, deletion, modification, and query operations of the `SQL`, the tenant fields are properly handled, and finally, the effective isolation of tenant data is successfully achieved.
+ The reference projects are as follows:
    - `Mybatis - Plus`：[https://github.com/baomidou/mybatis-plus](https://github.com/baomidou/mybatis-plus)
    - `JSqlParser`：[https://github.com/JSQLParser/JSqlParser](https://github.com/JSQLParser/JSqlParser)

## II. Specific Implementation Methods
### （Ⅰ） Define Two Basic Abstract Models Containing Tenant Fields in the Business
Define a basic abstract model containing an ID, and this model also contains tenant fields (for example: company code. Other fields can also be used as tenant fields, which can be flexibly modified according to the actual business situation).

```java
@Model.model(XXIdModel.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model(displayName = "The basic ID abstract model with the company CODE", summary = "The Id model of the company's Code")
public abstract class XXIdModel extends IdModel {
    public static final String MODEL_MODEL = "demo.biz.XXIdModel";
    
    @Field.String
    @Field(displayName = "Company code of Affiliation", invisible = true, index = true)
    private String companyCode;
}
```

Define a basic abstract model that contains "Code" and also includes tenant fields (such as company code. Other fields can be used as tenant fields as well, which can be adjusted flexibly according to the actual business situation).

```java
@Model.model(XXCodeModel.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.ABSTRACT)
@Model(displayName = "The basic CODE abstract model with the company Code", summary = "A CODE model with the company Code")
public abstract class XXCodeModel extends CodeModel {
    public static final String MODEL_MODEL = "demo.biz.XXCodeModel";

    @Field.String
    @Field(displayName = "Company code of Affiliation", invisible = true, index = true)
    private String companyCode;
}
```

### （Ⅱ） The models in the business module that require tenant isolation all inherit from these two models above;
```java
@Model.model(PetPetCompany.MODEL_MODEL)
@Model(displayName = "Pet Company", labelFields = "name")
public class PetPetCompany extends AbstractCompanyCodeModel {

  public static final String MODEL_MODEL = "demo.PetPetCompany";

  @Field.String
  @Field(displayName = "Name")
  private String name;

  @Field.Text
  @Field(displayName = "Introduction")
  private String introduction;
}
```

### （Ⅲ） Customize and extend the Session, and set tenant information in the Session
For each request, put the company code (companyCode) of the logged - in user into the Session. For Session extension reference: [Request Context API](/en/DevManual/Reference/Back-EndFramework/AdvanceAPI/request-context-API.md)

### （Ⅳ） Define an interceptor Interceptor for data isolation
During data creation and querying, use the interceptor to set the company code (companyCode) in the Session into the isolation field. For reference of the Java sample code of the interceptor:

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
@SuppressWarnings("unused")
@Intercepts({
    @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class,
                                                                RowBounds.class, ResultHandler.class}),
    @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})
})
@Component
@Order(99)
@ConditionalOnProperty(value = "pamirs.demo.isolation.enable", havingValue = "true")
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
    // update Return directly
    if ("UPDATE".equals(sqlCommandType)) {
        return invocation.proceed();
    }

    Object param = args[1];
    if (param instanceof Map) {
        Map map = (Map) param;
        // Obtain configuration information
        String model = MapperContext.model(map);
        if (StringUtils.isBlank(model)) {
            return invocation.proceed();
        }

        if (!demoIsolationConfiguration.needIsolation(model)) {
            return invocation.proceed();
        }
        BoundSql boundSql = ms.getBoundSql(param);
        String sql = boundSql.getSql();
        // Parse the SQL through jsqlparser. Here, the statement refers to the encapsulated SQL statements such as Insert/Update/Query.
        Statement statement = CCJSqlParserUtil.parse(sql);

        switch (sqlCommandType) {
            case "INSERT":
                Statement insert = prepareInsertSql(statement);
                BoundSql insertBoundSql = new BoundSql(ms.getConfiguration(), insert.toString(), boundSql.getParameterMappings(), boundSql.getParameterObject());
                cloneBoundSqlParameters(boundSql, insertBoundSql);
                MappedStatement insertMs = buildMappedStatement(ms, new BoundSqlSqlSource(insertBoundSql));
                // Update the MappedStatement objectUpdate the MappedStatement object
                args[0] = insertMs;
                break;
            case "SELECT":
                Statement select = prepareSelectSql(statement);
                BoundSql selectBoundSql = new BoundSql(ms.getConfiguration(), select.toString(), boundSql.getParameterMappings(), boundSql.getParameterObject());
                cloneBoundSqlParameters(boundSql, selectBoundSql);
                MappedStatement selectMs = buildMappedStatement(ms, new BoundSqlSqlSource(selectBoundSql));
                // Update the MappedStatement object
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
    //Cache is prohibited (important)
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
            // If the sql contains the column names for setting, only the values need to be set
            isContainsIsolationColumn = true;
            createDateColumnIndex = i;
            break;
        }
    }

    if (!isContainsIsolationColumn) {
        intoValue("<code>" + demoIsolationConfiguration.getColumn() + "</code>", DemoSession.getCompany().getCode(), insert);
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
    //Add the logical part processing of sql statements
    if (fromItem.getAlias() != null) {
        whereSql.append(fromItem.getAlias().getName()).append(".<code>" + demoIsolationConfiguration.getColumn() + "</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    } else {
        whereSql.append("<code>" + demoIsolationConfiguration.getColumn() + "</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
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
            //The where condition existed before and needs to be reconcatenated
            whereSql.append(" and ( " + where.toString() + " )");
        } else {
            //The newly added fragment does not exist. Use the previous sql
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
    //Add the logical part processing of sql statements
    if (fromItem.getAlias() != null) {
        whereSql.append(fromItem.getAlias().getName()).append(".<code>" + demoIsolationConfiguration.getColumn() + "</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
    } else {
        whereSql.append("<code>" + demoIsolationConfiguration.getColumn() + "</code> = ").append("'").append(DemoSession.getCompany().getCode()).append("'");
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
            //The where condition existed before and needs to be reconcatenated
            whereSql.append(" and ( " + where + " )");
        } else {
            //The newly added fragment does not exist. Use the previous sql
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
    // Set the corresponding value through visitor
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
    // Add columns
    insert.getColumns().add(new Column(columnName));
    // Set the corresponding value through visitor
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
                // Here it indicates when adding columns. The data types of column values in the database are currently only Long and String. If necessary, expand them by yourself
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
 * Remove the '' sign
 *
 * @param value
 * @return {@link String}
 */
private String clearQuote(String value) {
    if (value.startsWith("<code>") && value.endsWith("</code>")) {
        value = value.substring(1, value.length() - 1);
    }
    return value;
}
}
```

### （Ⅴ）Tenant configuration information code implementation
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
@ConfigurationProperties(prefix = "pamirs.demo.isolation")
public class DemoIsolationConfiguration {

    private Boolean enable = Boolean.FALSE;
    /** The column in the database table corresponding to the isolation field */
    private String column;
    /** The field in the model corresponding to the isolation field */
    private String field;
    /** List of models that don't need isolation even if they contain the isolation field. In an actual project, a whitelist approach can also be used */
    private List<String> ignoreModels = Lists.newArrayList("business.PamirsEmployee", "demo.PetEmployee");

    public boolean needIsolation(String model) {
        // 1. Models in the ignore list don't need to be isolated
        if (matchesIgnoreModel(model)) {
            return false;
        }

        // 2. Models with an empty module or the base module don't need to be isolated
        String module = Optional.ofNullable(PamirsSession.getContext())
               .map(v -> v.getModelConfig(model)).map(ModelConfig::getModule).orElse(null);
        if (StringUtils.isBlank(module) || module.equals(ModuleConstants.MODULE_BASE)) {
            return false;
        }

        // 3. Super administrators don't need to be isolated when accessing (decide whether to enable according to the actual situation)
        /**
        if (PamirsSession.getAdminTag()==null || PamirsSession.getAdminTag()) {
            return false;
        }**/

        // 4. Models without an isolation field don't need to be isolated
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

### (Ⅵ) Example configuration of the corresponding yml file
```yaml
demo:
    isolation:
      enable: true
      field:  companyCode
      column: company_code
      # ignoreModels:
```

### (Ⅶ) Attachment of sample code in this article
Example of implementing tenant isolation by interceptor [interceptor](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/interceptor.zip)   
Example of Session extension [Example of Session extension](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024040711092811.zip)

