---
title: 页面设计：如何实现页面间的跳转
index: true
category:
  - 常见解决方案
order: 70
---

# 一、概述
在日常业务开展过程中，常常会面临在多个模型页面间进行跳转的需求。例如，在商品展示页面，能够从商品的具体行直接点击链接，无缝跳转至类目详情页面；或者在订单页面，可便捷地查看该订单所发起的售后单列表。接下来，本文将详细阐述在 Oinone 平台中实现这些功能的具体方式。

# 二、通过界面设计器的无代码能力配置
## （一）表格行跳转到表单页/详情页
1. 拖入一个跳转动作到表格行，保存动作后，在左侧的动作属性面板底部有个`请求配置`，里面的`上下文`属性就是配置跳转参数的地方，点击`添加`按钮可以增加一行参数
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240513-192102-1-20250530144825405.png)
2. 点击添加按钮后，可以看到新增了一行，行内有2个输入框，左侧输入框为`目标视图模型的字段`，右侧输入框为`当前视图模型的表达式`
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240513-192102-1-20250530144825405.png)

:::info 注意：

表达式中`activeRecord`关键字代表当前行的数据对象

:::

## （二）“上下文”相关知识点
+ 当前页面的模型和跳转后的页面模型相同的情况下，会字段带上当前行数据的id作为路由参数
+ `上下文`是从当前页面跳转到下个页面带的自定义参数
+ `上下文`会作为跳转后的页面数据加载函数的入参，后端的该函数需要根据该条件查询到数据返回给前端，典型的例子就是编辑页，根据id查询对象的其他字段信息返回
+ 跳转后页面的数据加载函数可以在动作场景的时候选择加载函数，也可以在页面的加载函数处设置

# 三、通过低代码方式在自定义代码中调用
oinone提供了内置函数`executeViewAction`实现该功能

``` typescript
import {
  DefaultComparisonOperator,
  executeViewAction,
  QueryExpression,
  RuntimeViewAction,
  ViewActionTarget,
  ViewType
} from '@oinone/kunlun-dependencies';

export class JumpActionWidget {

  protected goToObjectView() {
    executeViewAction(
      {
        viewType: ViewType.Form,
        moduleName: 'resource',
        model: 'resource.ResourceCountry',
        name: 'redirectUpdatePage',
        target: ViewActionTarget.Router
      } as RuntimeViewAction,
      undefined,
      undefined,
      {
        // 此处为id参数，目前只有表单和详情页需要
        id: '12223',
        // 此处为上下文参数，context内对象的key是目标页面需要传递的默认值
        context: JSON.stringify({code: 'xxx'}),
        // 此处为跳转后左侧菜单展开选中的配置
        menu: JSON.stringify({"selectedKeys":["国家"],"openKeys":["地址库","地区"]})
      }
    );
  }

  protected goToListView() {
    const searchConditions: QueryExpression[] = [];
    searchConditions.push({
      leftValue: ['countryCode'], // 查询条件的字段
      operator: DefaultComparisonOperator.EQUAL,
      right: 'CN' // 字段的值
    });
    executeViewAction(
      {
        viewType: ViewType.Table,
        moduleName: 'resource',
        model: 'resource.ResourceCity',
        name: 'resource#市',
        target: ViewActionTarget.OpenWindow
      } as RuntimeViewAction,
      undefined,
      undefined,
      {
        // searchConditions相当于domain，不会随页面搜索项重置动作一起被清空
        searchConditions: encodeURIComponent(JSON.stringify(searchConditions)),
        // searchBody的字段会填充搜索区域的字段组件，会随页面搜索项重置动作一起被清空
        searchBody: JSON.stringify({code: 'CN'}),
        menu: JSON.stringify({"selectedKeys":["国家"],"openKeys":["地址库","地区"]})
      }
    );
  }
}

```

# 四、扩展知识点
## （一）为什么`executeViewAction`跳转到的新页面不是入参的`moduleName`属性对应的模块?
跳转后所在的模块优先级为：

1. 第一个入参的`resModuleName`属性对应的模块
2. 执行`executeViewAction`时所在的模块
3. 第一个入参的`moduleName`属性对应的模块

## （二）如何快速获取选中菜单的值？
先通过页面菜单手动打开页面，然后在浏览器自带调试工具的控制台执行`decodeURIComponent(location.href)`,其中的 menu 参数就是我们需要的值

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240618-195352-1024x514-20250530144825464.png)

