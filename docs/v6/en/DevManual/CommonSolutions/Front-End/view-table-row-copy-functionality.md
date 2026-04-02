---
title: Views:Table Row Copy Functionality 
index: true
category:
   - Frontend
order: 14
---

# Ⅰ. Scenario Overview
After clicking the Add Button, the table displays an empty row without business data, and **inline editing** is required.


# Ⅱ. Solution
## (I) Add a new copyTable component in the layout directory; the component code is as follows
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
      // Get the vxetable instance
      const tableRef = this.getTableInstance()!.getOrigin();
      if (tableRef) {
        // How to handle copied unsaved data?
        const insertData = tableRef.getInsertRecords();
        if(insertData.length > 0){
          OioNotification.warning("Warning","Please check unsaved data!")
          return;
        }

        const { row: newRow } = await tableRef.insertAt(row,currentRow)
        // Insert a piece of data and trigger verification; the field name can be replaced
        await tableRef.setEditCell(newRow, 'city')
      }
    }

    public async deleteRowData(row) {
      // Get the vxetable instance
      const tableRef = this.getTableInstance()!.getOrigin();
      if (tableRef) {
        // How to handle copied unsaved data?
        console.log(row, 'remove row')
        tableRef.remove(row)
        // Insert a piece of data and trigger verification
      }
    }

    async mounted() {
      super.mounted();
      this.tableCopySub.subject.next({copyCb: (row,currentRow) => this.copyRowData(row,currentRow)})
      this.tableDeleteSub.subject.next({deleteCb: (row) => this.deleteRowData(row)})
    }
  }
```

## (II) Override the Add Button or Copy Row Button in the action directory; the code is as follows
```typescript
import {ActionWidget, ClickResult, ReturnPromise, SPI, Widget} from "@kunlun/dependencies";

@SPI.ClassFactory(
  ActionWidget.Token({
    model: 'resource.k2.Model0000001211', // Replace with the corresponding model
    name: 'uiView57c25f66fac9439089d590a4ac47f027' // Replace with the name of the corresponding action
  })
)
  export class CopyRow extends ActionWidget{
    @Widget.BehaviorSubContext(Symbol("$$TABLE_COPY_CB"))
    private tableCopySub;

    private tableCopyCb;

    @Widget.Method()
    public clickAction(): ReturnPromise<ClickResult> {
      // Copy a row based on a specific piece of data; the button is inline
      // let data = JSON.parse(JSON.stringify(this.activeRecords?.[0]));
      // Delete the ID when copying the row
      // if(data) {
      //   delete data.id
      //   delete  data['_X_ROW_KEY']
      // }
      // console.log(data, 'datatatatat')
      // this.tableCopyCb(data,this.activeRecords?.[0])

      // Global addition without default data
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

## (III) Replace the corresponding table layout
```typescript
// Replace the model and action in the second input parameter
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

## (IV) Supplementary Notes
1. The actions after adding an empty row can be configured to show or hide based on inline data. For example, the presence or absence of an ID determines whether it is set to "Edit" or "Save".
2. How to enable inline editing after addition? You can enter the UI Designer, select the table field, enable inline editing, and the newly added row will have inline editing by default.


I’ve completed the translation of the Chinese content while retaining the original document structure and code blocks, and used standard Internet/frontend development terminology. Do you need me to further sort out a **glossary of key Internet terminology** used in this document for easier reference in subsequent development?