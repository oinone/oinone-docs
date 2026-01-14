---
title: 视图：表格实现复制行
index: true
category:
   - 前端
order: 14
---
# 一、场景概述
新增按钮点击后表格出现空行，不带业务数据，需要有行内编辑

# 二、解决方案
## （一）在 layout 目录下新增 copyTable 组件，组件代码如下
```javascript
import { BaseElementWidget, SPI, TableWidget, Widget } from '@kunlun/dependencies';
import { OioNotification } from '@kunlun/vue-ui-antd';

@SPI.ClassFactory(BaseElementWidget.Token({ widget: 'copy-table-row' }))
  export class CopyTableWidget extends TableWidget {
    @Widget.BehaviorSubContext(Symbol("$$TABLE_COPY_CB"), {})
    private tableCopySub;

    @Widget.BehaviorSubContext(Symbol("$$TABLE_DELETE_CB"))
    private tableDeleteSub;

    @Widget.Reactive()
    @Widget.Provide()
    protected get editorMode(): any {
      return 'manual'
    }

    public async copyRowData(row,currentRow) {
      // 获取vxetable 实例
      const tableRef = this.getTableInstance()!.getOrigin();
      if (tableRef) {
        // 有复制未保存数据，如何处理?
        const insertData = tableRef.getInsertRecords();
        if(insertData.length > 0){
          OioNotification.warning("警告","请检查未保存数据！")
          return;
        }

        const { row: newRow } = await tableRef.insertAt(row,currentRow)
        // 插入一条数据并触发校验, 其中字段名称可以替换
        await tableRef.setEditCell(newRow, 'city')
      }
    }

    public async deleteRowData(row) {
      // 获取vxetable 实例
      const tableRef = this.getTableInstance()!.getOrigin();
      if (tableRef) {
        // 有复制未保存数据，如何处理?
        console.log(row, 'remove row')
        tableRef.remove(row)
        // 插入一条数据并触发校验
      }
    }

    async mounted() {
      super.mounted();
      this.tableCopySub.subject.next({copyCb: (row,currentRow) => this.copyRowData(row,currentRow)})
      this.tableDeleteSub.subject.next({deleteCb: (row) => this.deleteRowData(row)})
    }
  }
```

## （二）在 action 目录下覆盖新增按钮或者复制行按钮；代码如下
```typescript
import {ActionWidget, ClickResult, ReturnPromise, SPI, Widget} from "@kunlun/dependencies";

@SPI.ClassFactory(
  ActionWidget.Token({
    model: 'resource.k2.Model0000001211', // 替换对应模型
    name: 'uiView57c25f66fac9439089d590a4ac47f027' // 替换对应action的name
  })
)
  export class CopyRow extends ActionWidget{
    @Widget.BehaviorSubContext(Symbol("$$TABLE_COPY_CB"))
    private tableCopySub;

    private tableCopyCb;

    @Widget.Method()
    public clickAction(): ReturnPromise<ClickResult> {
      // 按照某一条数据复制行， 按钮在行内
      // let data = JSON.parse(JSON.stringify(this.activeRecords?.[0]));
      // 复制行删除id
      // if(data) {
      //   delete data.id
      //   delete  data['_X_ROW_KEY']
      // }
      // console.log(data, 'datatatatat')
      // this.tableCopyCb(data,this.activeRecords?.[0])

      // 全局新增，不带默认数据
      this.tableCopyCb({},null)
    }

    mounted() {
      super.mounted()
      this.tableCopySub.subscribe((value) => {
        if(value) {
          // debugger
          this.tableCopyCb = value.copyCb
        }
      })
    }
  }
```

## （三）替换对应的表格layout
```typescript
// 替换第二个入参的模型和动作
const registerGlobalTableLayout = () => {
  return registerLayout(`<view type="TABLE">
    <pack widget="group">
        <view type="SEARCH">
            <element widget="search" slot="search" slotSupport="field" />
        </view>
    </pack>
    <element widget="actionBar" slot="actionBar" slotSupport="action">
        <xslot name="actions" slotSupport="action" />
    </element>
    <pack widget="group" slot="tableGroup">
        <element widget="copy-table-row" slot="table" slotSupport="field">
            <element widget="expandColumn" slot="expandRow" />
            <xslot name="fields" slotSupport="field" />
            <element widget="rowActions" slot="rowActions" slotSupport="action" />
        </element>
    </pack>
</view>`, { viewType: ViewType.Table, model: 'resource.k2.Model0000001211' })
}

registerGlobalTableLayout()
```

## （四）补充
1. 新增空行后的动作可以根据行内数据配置显隐，比如有无id配置是编辑还是保存
2. 新增后怎么开启行内编辑？可以进入界面设计器选中表格字段，开启行内编辑，新增行后会默认有行内编辑

