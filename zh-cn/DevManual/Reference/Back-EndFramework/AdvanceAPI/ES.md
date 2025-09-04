---
title: ES API
index: true
category:
  - 研发手册
  - Reference
  - 后端API
  - Advance API
order: 9

---
# 一、概述

`EnhanceModel` 是 Oinone 框架中实现 **读写分离** 的核心抽象基类，提供将数据写入数据库（DB）同时通过 Elasticsearch（ES）进行高效检索的能力。通过继承 `EnhanceModel`，业务模型可自动获得以下特性：

+ **数据同步**：`synchronize()` 方法实现 DB 到 ES 的双向同步
+ **搜索能力**：`search()` 方法提供基于 ES 的全文检索与复杂查询
+ **逻辑删除**：内置 `isDeleted` 字段支持软删除模式
+ **扩展性**：支持自定义数据同步逻辑和搜索算法

# 二、EnhanceModel 使用指南

## （一）读写分离实现

### 1、继承 EnhanceModel

```java
@Model(displayName = "测试EnhanceModel")
@Model.model(TestModelEnhance.MODEL_MODEL)
@Model.Advanced(type = ModelTypeEnum.PROXY, inherited = {EnhanceModel.MODEL_MODEL})
@Enhance(shards = "3", replicas = "1", reAlias = true, increment= IncrementEnum.OPEN)
public class TestModelEnhance extends TestModel {
    public static final String MODEL_MODEL="test.TestModelEnhance";

    // 模型字段定义
    @Field(displayName = "nick")
    private String nick;

}
```

### 2、核心方法重写

| **方法**                                                    | **作用**                                                     | **重写场景**                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `synchronize()` | 数据同步逻辑（DB→ES） | 自定义数据转换逻辑 |
| `search()`      | ES 查询逻辑      | 自定义搜索条件/高亮/排序 |
| `queryPage()`   | 分页查询入口     | 增强模型需通过 Action 类重写 |


### 3、@Enhance 注解详解

```java
@Enhance(
    index = "custom_index",    // 自定义索引名
    shards = "5",              // 分片数
    replicas = "1",            // 副本数
    increment = IncrementEnum.OPEN,  // 开启增量同步
    reAlias = true,            // 全量同步后更新别名
    analyzers = {
        @Analyzer(
            value = "content",
            analyzer = IkAnalyzer.SMART,
            searchAnalyzer = IkSearchAnalyzer.SMART
        )
    }
)
```

## （二）自定义同步逻辑

```java
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

## （三）自定义搜索逻辑

```java
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
    // 处理自行加工page、wrapper参数
    return ((ElasticSearchApi)CommonApiFactory.getApi(ElasticSearchApi.class)).search(page, queryWrapper);
}
```

## （四）使用原生elasticsearchClient

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

# 三、基础配置

## （一）启动工程加入相关依赖包

+ 启动工程需要指定ES客户端包版本，不指定版本会隐性依赖顶层spring-boot依赖管理指定的低版本
+ 启动工程加入pamris-channel和pamirs-sql-record的工程依赖

```java
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

在XXX-api中增加入pamirs-channel-api的依赖

```xml
<dependency>
  <groupId>pro.shushi.pamirs.core</groupId>
  <artifactId>pamirs-channel-api</artifactId>
</dependency>
```

## （三）YAML文件配置

与此主题相关的文档可在 [增强模型配置](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#十二-增强模型配置-pamirs-channel)和[数据记录配置](/zh-cn/DevManual/Reference/Back-EndFramework/module-API.md#十-数据记录配置-pamirs-record-sql) 中找到。

在启动工程的application.yml文件中增加配置pamirs.boot.modules增加channel和sql_record，即在启动模块中增加channel和sql_record模块。同时注意es的配置，是否跟es的服务一致

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

## （四）项目的模块增加模块依赖

xxxModule的定义类增加对ChannelModule的依赖

```java
@Module(dependencies = {ChannelModule.MODULE_MODULE})
```

# 四、常见问题

引入Oinone的搜索（即Channel模块）后，因错误的配置、缺少配置或者少引入一些Jar包，会出现一些报错。

## （一）启动报类JCTree找不到

### 1、具体现象

启动过程可能会出现报错：
java.lang.NoClassDefFoundError: com/sun/tools/javac/tree/JCTree$JCExpression

### 2、产生原因

+ 引入Channel模块后，启动过程中会扫描Class包找寻Enhance的注解，Pamirs底层有使用到jdk的tools中的类，
  com/sun/tools/javac/tree/JCTree$JCExpression
+ 特定版本的jdk可能会缺少tools.jar导致启动失败

### 3、具体报错

```powershell
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

### 4、解决办法

#### 方式一：配置channel的扫描路径【推荐】

```yaml
pamirs:
  channel:
    packages:
      - com.xxx.xxx # 扫描增强模型 定义类在非pro.shushi.pamirs包下需要配置
```

#### 方式二：使用Oracle版本的jdk

确保jdk的lib目录，tools.jar有com/sun/tools/javac/tree/JCTree对应的类

## （二）启动报类JsonProvider找不到

### 1、具体报错

如果启动报错信息如下：

```powershell
Caused by: java.lang.NoClassDefFoundError: jakarta/json/spi/JsonProvider
    at java.lang.ClassLoader.defineClass1(Native Method) ~[na:1.8.0_181]
    at java.lang.ClassLoader.defineClass(ClassLoader.java:763) ~[na:1.8.0_181]
    at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142) ~[na:1.8.0_181]
    at java.net.URLClassLoader.defineClass(URLClassLoader.java:467) ~[na:1.8.0_181]
```

### 2、产生原因

项目中只引入了`pamirs-channel-core`，但未引入`elasticsearch`相关的包

### 3、解决办法

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
```

