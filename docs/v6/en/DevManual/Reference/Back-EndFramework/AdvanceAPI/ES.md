---
title: ES API
index: true
category:
  - R&D Manual
  - Reference
  - Backend API
  - Advance API
order: 9

---
# Ⅰ、Overview

`EnhanceModel` is the core abstract base class for implementing **read-write separation** in the Oinone framework, providing the capability to write data to the database (DB) while enabling efficient retrieval through Elasticsearch (ES). By inheriting from `EnhanceModel`, business models automatically gain the following features:

+ **Data Synchronization**: The `synchronize()` method implements two-way synchronization between DB and ES
+ **Search Capability**: The `search()` method provides full-text search and complex queries based on ES
+ **Logical Deletion**: Built-in `isDeleted` field supports soft deletion mode
+ **Extensibility**: Supports custom data synchronization logic and search algorithms

# Ⅱ、EnhanceModel Usage Guide

## (Ⅰ) Read-Write Separation Implementation

### 1. Inherit from EnhanceModel

``` java
@Model(displayName = "测试EnhanceModel")
@Model.model(TestModelEnhance.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.PROXY, inherited = {EnhanceModel.MODEL_MODEL})
@Enhance(shards = "3", replicas = "1", reAlias = true, increment= IncrementEnum.OPEN)
public class TestModelEnhance extends TestModel {
    public static final String MODEL_MODEL="test.TestModelEnhance";

    // Model field definitions
    @Field(displayName = "nick")
    private String nick;

}
```

### 2. Override Core Methods

| **Method**                                                    | **Function**                                                     | **Override Scenario**                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `synchronize()` | Data synchronization logic (DB→ES) | Custom data conversion logic |
| `search()`      | ES query logic      | Custom search conditions/highlighting/sorting |
| `queryPage()`   | Pagination query entry     | Enhanced models need to override through the Action class |


### 3. @Enhance Annotation Details

``` java
@Enhance(
    index = "custom_index",    // Custom index name
    shards = "5",              // Number of shards
    replicas = "1",            // Number of replicas
    increment = IncrementEnum.OPEN,  // Enable incremental synchronization
    reAlias = true,            // Update alias after full synchronization
    analyzers = {
        @Analyzer(
            value = "content",
            analyzer = IkAnalyzer.SMART,
            searchAnalyzer = IkSearchAnalyzer.SMART
        )
    }
)
```

## (Ⅱ) Custom Synchronization Logic

``` java
@Override
@Function.Advanced(displayName = "同步数据", type = FunctionTypeEnum.UPDATE)
@Function(summary = "数据同步函数")
public List<TestModelEnhance> synchronize(List<TestModelEnhance> data) {
    data.forEach(item -> {
        item.setNick(item.getName() + "_processed");
    });
    return data;
}
```

## (Ⅲ) Custom Search Logic

``` java
@Override
@Function(
    summary = "搜索函数",
    openLevel = {FunctionOpenEnum.LOCAL, FunctionOpenEnum.REMOTE, FunctionOpenEnum.API}
)
@pro.shushi.pamirs.meta.annotation.Function.Advanced(
    type = {FunctionTypeEnum.QUERY},
    category = FunctionCategoryEnum.QUERY_PAGE,
    managed = true
)
public Pagination<TestModelEnhance> search(Pagination<TestModelEnhance> page, IWrapper<TestModelEnhance> wrapper) {
    // Process and customize page and wrapper parameters
    return ((ElasticSearchApi)CommonApiFactory.getApi(ElasticSearchApi.class)).search(page, queryWrapper);
}
```

## (Ⅳ) Using Native elasticsearchClient

``` java
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

# Ⅲ、Basic Configuration

## (Ⅰ) Add Relevant Dependencies to the Startup Project

+ The startup project needs to specify the version of the ES client package. Not specifying the version will implicitly depend on the lower version specified by the top-level spring-boot dependency management.
+ The startup project adds project dependencies of pamris-channel and pamirs-sql-record.

``` java
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

## (Ⅱ) Add Relevant Dependencies to the API Project

Add the dependency of pamirs-channel-api to XXX-api.

``` xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-channel-api</artifactId>
</dependency>
```

## (Ⅲ) YAML File Configuration

Documentation related to this topic can be found in [Enhanced Model Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#ⅻ-enhanced-model-configuration-pamirschannel) and [Data Record Configuration](/en/DevManual/Reference/Back-EndFramework/module-API.md#ⅹ-data-record-configuration-pamirsrecordsql).

Add the configuration pamirs.boot.modules in the application.yml file of the startup project to include channel and sql_record, that is, add the channel and sql_record modules to the startup module. At the same time, pay attention to the ES configuration to ensure it matches the ES service.

``` yaml
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

## (Ⅳ) Add Module Dependencies to the Project's Modules

The definition class of xxxModule adds a dependency on ChannelModule.

``` java
@Module(dependencies = {ChannelModule.MODULE_MODULE})
```

# Ⅳ、Common Issues

After introducing Oinone's search (i.e., the Channel module), errors may occur due to incorrect configuration, missing configuration, or missing introduction of some Jar packages.

## (Ⅰ) Class JCTree Not Found During Startup

### 1. Specific Phenomenon

An error may occur during startup:
java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression

### 2. Cause of Occurrence

+ After introducing the Channel module, the startup process will scan the Class package to find Enhance annotations. The Pamirs底层 uses classes in jdk's tools, such as com/sun/tools/javac/tree/JCTree$JCExpression.
+ Specific versions of jdk may lack tools.jar, leading to startup failure.

### 3. Specific Error

``` powershell
at org.springframework.boot.loader.Launcher.launch(Launcher.java:107) [pamirs-venus-boot.jar:na]
    at org.springframework.boot.loader.Launcher.launch(Launcher.java:58) [pamirs-venus-boot.jar:na]
    at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:88) [pamirs-venus-boot.jar:na]
Caused by: java.util.concurrent.ExecutionException: java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression
    at java.util.concurrent.CompletableFuture.reportGet(CompletableFuture.java:357) ~[na:1.8.0_381]
    at java.util.concurrent.CompletableFuture.get(CompletableFuture.java:1908) ~[na:1.8.0_381]
    at pro.shushi.pamirs.boot.common.initial.PamirsBootMainInitial.init(PamirsBootMainInitial.java:66) ~[pamirs-boot-api-4.6.10.jar!/:na]
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:1.8.0_381]
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:1.8.0_381]
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:1.8.0_381]
    at java.lang.reflect.Method.invoke(Method.java:498) ~[na:1.8.0_381]
    at org.springframework.context.event.ApplicationListenerMethodAdapter.doInvoke(ApplicationListenerMethodAdapter.java:305) ~[spring-context-5.2.12.RELEASE.jar!/:5.2.12.RELEASE]
    ... 20 common frames omitted
Caused by: java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression
    at java.lang.Class.forName0(Native Method) ~[na:1.8.0_381]
    at java.lang.Class.forName(Class.java:264) ~[na:1.8.0_381]
    at pro.shushi.pamirs.meta.util.ClassUtils.getClasses(ClassUtils.java:157) ~[pamirs-meta-model-4.6.8.jar!/:na]
    at pro.shushi.pamirs.meta.util.ClassUtils.getClassesByPacks(ClassUtils.java:73) ~[pamirs-meta-model-4.6.8.jar!/:na]
    at pro.shushi.pamirs.channel.core.manager.EnhanceModelScanner.enhanceModel(EnhanceModelScanner.java:51) ~[pamirs-channel-core-4.6.15.jar!/:na]
    at pro.shushi.pamirs.channel.core.init.ChannelSystemBootAfterInit.init(ChannelSystemBootAfterInit.java:31)
```

### 4. Solution

#### Method 1: Configure the Channel's Scanning Path [Recommended]

``` yaml
pamirs:
  channel:
    packages:
      - com.xxx.xxx # Configure if the enhanced model definition class is in a non-pro.shushi.pamirs package
```

#### Method 2: Use Oracle Version of JDK

Ensure that the jdk's lib directory and tools.jar have the corresponding classes for com/sun/tools/javac/tree/JCTree.

## (Ⅱ) Class JsonProvider Not Found During Startup

### 1. Specific Error

If the startup error message is as follows:

``` powershell
Caused by: java.lang.NoClassDefFoundError: jakarta/json/spi/JsonProvider
    at java.lang.ClassLoader.defineClass1(Native Method) ~[na:1.8.0_181]
    at java.lang.ClassLoader.defineClass(ClassLoader.java:763) ~[na:1.8.0_181]
    at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142) ~[na:1.8.0_181]
    at java.net.URLClassLoader.defineClass(URLClassLoader.java:467) ~[na:1.8.0_181]
```

### 2. Cause of Occurrence

The project only introduces `pamirs-channel-core` but does not introduce `elasticsearch`-related packages.

### 3. Solution

``` xml
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
```