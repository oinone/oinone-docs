---
title: 视图：表格列尾统计
index: true
category:
   - 前端
order: 13
---
# 一、概述
可以通过扩展`TableWidget.ts`实现

# 二、示例代码
``` typescript
import {
  BaseElementWidget,
  DslDefinitionType,
  SPI,
  TableWidget,
  ViewType,
  Widget
} from '@oinone/kunlun-dependencies';

@SPI.ClassFactory(
  BaseElementWidget.Token({
    type: ViewType.Table,
    widget: 'table',
    model: 'resource.k2.Model0000000109',
    viewName: '移动端品牌_TABLE_0000000000021513'
  })
)
  export class FooterStatisticsTable extends TableWidget {
    public initialize(props) {
      if (props.template) {
        props.template?.widgets?.forEach((a) => {
          if (a.dslNodeType === DslDefinitionType.FIELD && this.statisticsFieldList.includes(a.name)) {
            a.statistics = true;
          }
        });
      }
      super.initialize(props);
      return this;
    }

    // 需要表尾做合并的字段名称
    public statisticsFieldList = ['fansNum'];

    @Widget.Reactive()
    protected get showFooter(): boolean | undefined {
      return true;
    }
  }
```

# 三、效果预览
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240914-195826@2x-1024x633.png)

