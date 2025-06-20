---
title: Views:Table Column Footer Statistics
index: true
category:
   - Frontend
order: 13
---

# I. Overview
This feature can be implemented by extending `TableWidget.ts`.

# II. Example Code
```typescript
import {
  BaseElementWidget,
  DslDefinitionType,
  SPI,
  TableWidget,
  ViewType,
  Widget
} from '@kunlun/dependencies';

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

    // Fields requiring footer statistics
    public statisticsFieldList = ['fansNum'];

    @Widget.Reactive()
    protected get showFooter(): boolean | undefined {
      return true;
    }
  }
```

# III. Effect Preview
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240914-195826@2x-1024x633.png)