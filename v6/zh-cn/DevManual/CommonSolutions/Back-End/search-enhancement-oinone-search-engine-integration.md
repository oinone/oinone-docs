---
title: 搜索增强：Oinone引入搜索引擎(增强模型)
index: true
category:
  - 常见解决方案
order: 20
---

# 一、场景描述
当面临大数据量且有全文检索需求的场景时，在分布式架构体系中，通常会将架设 ElasticSearch 作为一种常规的解决方案。在 Oinone 体系里，增强模型正是为应对此类场景而设计，其底层实际上整合了 ElasticSearch 。

# 二、背景介绍
+ 对 ElasticSearch 展开全面了解，所涉内容包括但不限于：Index（索引）、分词、Node（节点）、Document（文档）、Shards（分片）以及 Replicas（副本）。详细信息可参考官方网站：[https://www.elastic.co/cn/](https://www.elastic.co/cn/) 。
+ 确保拥有一个可用的 ElasticSearch 环境，该环境需满足本地项目能够对其进行引用的要求。

# 三、前置约束
增强模型增量依赖数据变更实时消息，因此确保项目的 event 是开启的，mq 配置正确。

# 四、项目引入搜索步骤
## （一）boot 工程加入相关依赖包
+ boot 工程需要指定 ES 客户端包版本，不指定版本会隐性依赖顶层 spring-boot 依赖管理指定的低版本
+ boot 工程加入 pamris-channel 的工程依赖

```xml
<dependency>
  <groupId>org.elasticsearch.client</groupId>
  <artifactId>elasticsearch-rest-client</artifactId>
  <version>8.4.1</version>
</dependency>
<dependency>
  <groupId>jakarta.json</groupId>
  <artifactId>jakarta.json-api</artifactId>
  <version>2.1.1</version>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-sql-record-core</artifactId>
</dependency>
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-channel-core</artifactId>
</dependency>

```

## （二）api工程加入相关依赖包
在 XXX-api 中增加入 pamirs-channel-api 的依赖

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-channel-api</artifactId>
</dependency>

```

## （三）yml文件配置
在 pamirs-demo-boot 的 application-dev.yml 文件中增加配置 pamirs.boot.modules 增加 channel，即在启动模块中增加 channel 模块。同时注意 es 的配置，是否跟 es 的服务一致

```yaml
pamirs:
  record:
    sql:
      #改成自己本地路径(或服务器路径)
      store: /Users/oinone/record
  boot:
    modules:
      - channel
      ## 确保也安装了sql_record
      - sql_record
  elastic:
    url: 127.0.0.1:9200
```

注：更多 YAML 配置请前往 [Module API](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md) 查阅。

## （四）项目的模块增加模块依赖
XXXModule 增加对 ChannelModule 的依赖

```java
@Module(dependencies = {ChannelModule.MODULE_MODULE})
```

## （五）增加增强模型(举例)
```java
package pro.shushi.pamirs.demo.api.enhance;

import pro.shushi.pamirs.channel.enmu.IncrementEnum;
import pro.shushi.pamirs.channel.meta.Enhance;
import pro.shushi.pamirs.channel.meta.EnhanceModel;
import pro.shushi.pamirs.demo.api.model.ShardingModel;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.enmu.ModelTypeEnum;

@Model(displayName = "测试EnhanceModel")
@Model.model(ShardingModelEnhance.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.PROXY, inherited = {EnhanceModel.MODEL_MODEL})
@Enhance(shards = "3", replicas = "1", reAlias = true,increment= IncrementEnum.OPEN)
public class ShardingModelEnhance extends ShardingModel {
    public static final String MODEL_MODEL="demo.ShardingModelEnhance";
}
```

## （六）重启系统看效果
+ 进入【传输增强模型】应用，访问增强模型列表我们会发现一条记录，并点击【全量同步】初始化ES，并全量 dump 数据
 ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/image-9-1024x263-20250530144822179.png)
+ 再次回到 Demo 应用，进入增强模型页面，可以正常访问并进增删改查操作
 ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2-1024x431-20250530144822231.webp)

# 五、个性化 dump 逻辑
通常 dump 逻辑是有个性化需求，那么我们可以重写模型的 synchronize 方法，函数重写特性在“面向对象-继承与多态”部分中已经有详细介绍。

## （一）重写 ShardingModelEnhance 模型的 synchronize 方法
重写后，如果针对老数据记录需要把新增的字段都自动填充，可以进入【传输增强模型】应用，访问增强模型列表，找到对应的记录并点击【全量同步】

```java
package pro.shushi.pamirs.demo.api.enhance;

import pro.shushi.pamirs.channel.enmu.IncrementEnum;
import pro.shushi.pamirs.channel.meta.Enhance;
import pro.shushi.pamirs.channel.meta.EnhanceModel;
import pro.shushi.pamirs.demo.api.model.ShardingModel;
import pro.shushi.pamirs.meta.annotation.Field;
import pro.shushi.pamirs.meta.annotation.Function;
import pro.shushi.pamirs.meta.annotation.Model;
import pro.shushi.pamirs.meta.enmu.FunctionTypeEnum;
import pro.shushi.pamirs.meta.enmu.ModelTypeEnum;

import java.util.List;

@Model(displayName = "测试EnhanceModel")
@Model.model(ShardingModelEnhance.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.PROXY, inherited = {EnhanceModel.MODEL_MODEL})
@Enhance(shards = "3", replicas = "1", reAlias = true,increment= IncrementEnum.OPEN)
public class ShardingModelEnhance extends ShardingModel {
    public static final String MODEL_MODEL="demo.ShardingModelEnhance";

    @Field(displayName = "nick")
    private String nick;

    @Function.Advanced(displayName = "同步数据", type = FunctionTypeEnum.UPDATE)
    @Function(summary = "数据同步函数")
    public List<ShardingModelEnhance> synchronize(List<ShardingModelEnhance> data) {
        for(ShardingModelEnhance shardingModelEnhance:data){
            shardingModelEnhance.setNick(shardingModelEnhance.getName());
        }
        return data;
    }
}
```

## （二）给搜索增加个性化逻辑
通常情况下，dump 逻辑往往存在个性化需求。在此情形下，我们可对模型的 synchronize 方法进行重写。关于函数重写这一特性，在 “面向对象 - 继承与多态” 章节已有详尽阐述。

# 六、个性化 search 函数
```java
@Function(
    summary = "搜索函数",
    openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API}
)
@pro.shushi.pamirs.meta.annotation.Function.Advanced(
    type = {FunctionTypeEnum.QUERY},
    category = FunctionCategoryEnum.QUERY_PAGE,
    managed = true
)
public  Pagination<ShardingModelEnhance> search(Pagination<ShardingModelEnhance> page, IWrapper<ShardingModelEnhance> queryWrapper) {
    System.out.println("您的个性化搜索逻辑");
    return ((IElasticRetrieve) CommonApiFactory.getApi(IElasticRetrieve.class)).search(page, queryWrapper);
}
```

# 七、个性化 search 函数示例
```java
@Override
@SuppressWarnings({"rawtypes"})
public <T> Pagination<T> search(Pagination<T> page, IWrapper<T> queryWrapper) {
    String modelModel = queryWrapper.getModel();
    if (null == modelModel || modelModel.isEmpty()) {
        return page;
    }
    ModelConfig modelCfg = PamirsSession.getContext().getModelConfig(modelModel);
    if (null == modelCfg) {
        return page;
    }
    String rsql = queryWrapper.getOriginRsql();
    if (StringUtils.isBlank(rsql)) {
        rsql = "id>0";
    }
    BoolQuery.Builder queryBuilder = ElasticRSQLHelper.parseRSQL(modelCfg, rsql);
    TermQuery isDeletedTerm = QueryBuilders.term()
    .queryName(IS_DELETED)
    .field(IS_DELETED).value(0)
    .build();
    BoolQuery.Builder builder = QueryBuilders.bool().must(new Query(queryBuilder.build()));
    builder.must(new Query(isDeletedTerm));
    String alias = IndexNaming.aliasByModel(modelModel);
    Query query = new Query(builder.build());
    log.info("{}", query);

    List<Order> orders = Optional.ofNullable(page.getSort()).map(Sort::getOrders).orElse(new ArrayList<>());
    int currentPage = Optional.ofNullable(page.getCurrentPage()).orElse(1);
    Long size = Optional.ofNullable(page.getSize()).orElse(10L);
    int pageSize = size.intValue();
    List<SortOptions> sortOptions = new ArrayList<>();
    if (CollectionUtils.isEmpty(orders)) {
        orders.add(new Order(SortDirectionEnum.DESC, ID));
        orders.add(new Order(SortDirectionEnum.DESC, CREATE_DATE));
    }
    for (Order order : orders) {
        sortOptions.add(new SortOptions.Builder()
                        .field(SortOptionsBuilders.field()
                               .field(order.getField())
                               .order(SortDirectionEnum.DESC.equals(order.getDirection()) ? SortOrder.Desc : SortOrder.Asc)
                               .build())
                        .build());
    }

    SearchRequest request = new SearchRequest.Builder()
    .index(alias)
    .from((currentPage - 1) * pageSize)
    .size(pageSize)
    .sort(sortOptions)
    .query(query)
    .highlight(_builder ->
               _builder.numberOfFragments(4)
               .fragmentSize(50)
               .type(HighlighterType.Unified)
               .fields("name", HighlightField.of(_fieldBuilder -> _fieldBuilder.preTags(ElasticsearchConstant.HIGH_LIGHT_PREFIX).postTags(ElasticsearchConstant.HIGH_LIGHT_POSTFIX)))
               .fields("documentNo", HighlightField.of(_fieldBuilder -> _fieldBuilder.preTags(ElasticsearchConstant.HIGH_LIGHT_PREFIX).postTags(ElasticsearchConstant.HIGH_LIGHT_POSTFIX)))
               .fields("keywords", HighlightField.of(_fieldBuilder -> _fieldBuilder.preTags(ElasticsearchConstant.HIGH_LIGHT_PREFIX).postTags(ElasticsearchConstant.HIGH_LIGHT_POSTFIX))))
    .build();

    SearchResponse<HashMap> response = null;
    try {
        log.info("ES搜索请求参数：{}", request.toString());
        response = elasticsearchClient.search(request, HashMap.class);
    } catch (ElasticsearchException e) {
        log.error("索引异常", e);
        PamirsSession.getMessageHub()
        .msg(Message.init()
             .setLevel(InformationLevelEnum.WARN)
             .msg("索引异常"));
        return page;
    } catch (IOException e) {
        log.error("ElasticSearch运行状态异常", e);
        PamirsSession.getMessageHub()
        .msg(Message.init()
             .setLevel(InformationLevelEnum.WARN)
             .msg("ElasticSearch运行状态异常"));
        return page;
    }

    if (null == response || response.timedOut()) {
        return page;
    }

    HitsMetadata<HashMap> hits = response.hits();
    if (null == hits) {
        return page;
    }

    TotalHits totalHits = hits.total();
    long total = Optional.ofNullable(totalHits).map(TotalHits::value).orElse(0L);

    List<HashMap> dataMapList = Optional.of(hits)
    .map(HitsMetadata<HashMap>::hits)
    .map(hitsMap ->{
        hitsMap.stream().forEach(highlightForEach -> {
            highlightForEach.highlight().forEach((key, value) -> {
                if(highlightForEach.source().containsKey(key)){
                    highlightForEach.source().put(key,value.get(0));
                }
            });

        });
        return hitsMap;
    })
    .map(List::stream)
    .orElse(Stream.empty())
    .map(Hit::source)
    .collect(Collectors.toList());

    List<T> context = persistenceDataConverter.out(modelModel, dataMapList);

    page.setSize(size);
    page.setTotalElements(total);
    page.setContent(context);
    log.info("ES搜索请求参数返回total,{}", total);
    return page;
}
```

