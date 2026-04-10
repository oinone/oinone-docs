---
title: Coding guidelines
index: true
category:
  - 贡献手册
  - 研发贡献
order: 2
next:
  text: Content guidelines
  link: /v6/zh/Contribute/DocumentationContributions/content-guidelines.md
---
本文介绍 Oinone 编码指南。这些指南旨在提高 Oinone 应用代码的质量。事实上，正确的代码可以提高可读性、简化维护、帮助调试、降低复杂性并提高可靠性。

# 一、模块设计

参阅: [模块化设计](/zh/DevManual/R&DParadigm/R&D-paradigm-modular-design.md)

# 二、模型设计

参阅: [模型设计](/zh/DevManual/R&DParadigm/R&D-paradigm-model-design.md)

# 三、命名规范

## (一)、前端

### 1、vue文件

vue文件的相关规范可以参考：[vue风格指南](https://v2.cn.vuejs.org/v2/style-guide/index.html)

### 2、ts文件

#### 2.1 命名规范

文件名大驼峰，文件名保持跟类名一致，以自定义字段举例：文件名以及类名是由`${视图类型}${字段类型}${组件类型}${FieldWidget}`，比如`FormM2OSelectFieldWidget.ts`。

#### 2.2、继承

类名使用大驼峰命名法，继承的时候，继承默认的widgte，以自定义m2o的下拉字段为例：

```typescript
export class FormM2ODialogFieldWidget extends FormM2OSelectFieldWidget{
  // ...todo
}
```

#### 2.3、方法定义

根据方法的作用定义不同的修饰符（public、protected、private），方法名使用小驼峰。如果是响应的方法，需要`@Widget.Method()` 装饰器标记。

```typescript
@Widget.Method()
public change(value: string):{}
```

#### 2.4、属性定义

根据属性的作用定义不同的修饰符（public、protected、private），属性名使用小驼峰。如果是响应的方法，需要`@Widget.Reactive()` 装饰器标记，如果是计算属性，需要加上对应的get属性。

```typescript
@Widget.Reactive()
public get userInfo() {
  return `年龄: ${this.age}, 名称: ${this.myName}`
}

@Widget.Reactive()
public myName = '张三'

@Widget.Reactive()
public age = 18
```

## (二)、后端

### 1、 类名

平台模型命名规范参考: [模型命名规范](/zh/DevManual/Reference/Back-EndFramework/ORM-API.md#1c798768) ，普通POJO类名以大写驼峰命名。

### 2、属性名

平台模型字段命名规范参考:  [模型字段（Model fields）](/zh/DevManual/Tutorials/Back-endFramework/chapter3-models-and-basic-fields.md) , 普通POJO类属性名以小写驼峰命名。

### 3、方法名

方法名以小写驼峰命名。如果该方法为Function或者Action，避免以get、set、unset作为方法名前缀。

# 四、注意事项

## (一)、前端

### 1、方法属性内聚在对应的class中

无论是自定义字段、动作、视图，其属性跟方法应写在对应的`class`里面，vue组件只负责通过props接受对应的属性、方法，不做业务逻辑处理，因为`class`是可被继承的，其中的属性、方法可被重写，这样就就能实现通用性。

```javascript
// FormM2ODialog.vue
<script  lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'test',
  props: {
    userInfo: {
      type: Object,
      default: () => ({})
    },
    changeUserInfo: {
      type: Function,
      default: () => {}
    }
  }
})
</script>

// FormM2ODialogWidget.ts
@SPI.ClassFactory(
  FormFieldWidget.Token({
    ...
  })
)
export class FormM2ODialogWidget extends FormM2OSelectFieldWidget {
  public initialize(props) {
    super.initialize(props);
    this.setComponent(FormM2ODialog);
    return this;
  }

  @Widget.Reactive()
  public get userInfo() {
    return `年龄: ${this.age}, 名称: ${this.myName}`
  }
  
  @Widget.Reactive()
  public myName = '张三'
  
  @Widget.Reactive()
  public age = 18

  
  @Widget.Method()
  public changeUserInfo(age: number){
    this.age = age
  }
}
```

### 2、文件的导入导出

ts文件的class使用`export`，不同类型的文件夹需要存在`index.ts`文件，统一文件的导入导出。

```markdown
├── field
├──── form
├────── string // string类型相关的字段
├──────── input
├──────── select
├──────── index.ts // 导出input跟select
├────── index.ts // 导出string
└── index.ts // 只做form的导出
```



### 3、调试工具

组件的调试工具使用最新版的[vue调试工具](https://chromewebstore.google.com/detail/vuejs-devtools-beta/ljjemllljcmogpfapbkkighbhhppjdbg?utm_source=ext_app_menu)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CodingGuidelines/1749527404519-3859fb39-9447-4407-afbb-a1db2fe57dd7.png)

## (一)、后端

### 1、深拷贝

使用平台提供克隆工具 `pro.shushi.pamirs.framework.common.utils.ObjectUtils#clone`

### 2、JSON序列化/反序列化

使用平台提供Json操作工具`pro.shushi.pamirs.meta.util.JsonUtils`

### 3、Getter/Setter

模型底层以 `Map` 作为数据载体，如在手动重写`Getter`、`Setter` 方法时需通过操作该 `Map` 实现属性的读写。

以下代码示例手写Getter、Setter、UnSetter

```java
@Model(displayName = "TestA")
@Model.model("test.TestA")
public class TestA extends IdModel {

    private static final long serialVersionUID = 2306247193831238288L;

    public static final String MODEL_MODEL = "test.TestA";

    @Field(displayName = "Name")
    @Field.String
    private String name;
    
    public String getName() {
        return (String)this._d.get("name");
    }

    public TestA setName(String name) {
        this._d.put("name", name);
        return this;
    }

    public TestA unsetName() {
        this._d.remove("name");
        return this;
    }
}
```

# 五、代码格式

## (一)、前端

前端代码以`prettier`格式化

配置文件参考:

配置文件名称 `.prettierrc.json`

```json
{
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none",
  "arrowParens": "always"
}
```

## (二)、后端

后端代码格式以IDEA默认导包、格式化作为基准。



# 六、代码注释

提倡逻辑清晰，描述准确的代码注释

