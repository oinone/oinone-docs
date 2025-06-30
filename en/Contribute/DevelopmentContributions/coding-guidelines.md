---
title: Coding Guidelines
index: true
category:
  - Contribution Manual
  - R&D Contribution
order: 2
next:
  text: Content Guidelines
  link: /en/Contribute/DocumentationContributions/content-guidelines.md
---
This article introduces the Oinone Coding Guidelines. These guidelines aim to improve the quality of Oinone application code. In fact, proper code can enhance readability, simplify maintenance, facilitate debugging, reduce complexity, and improve reliability.

# 1. Module Design

Refer to: [Modular Design](/en/DevManual/R&DParadigm/R&D-paradigm-modular-design.md)

# 2. Model Design

Refer to: [Model Design](/en/DevManual/R&DParadigm/R&D-paradigm-model-design.md)

# 3. Naming Conventions

## (I) Frontend

### 1. Vue Files

For relevant specifications of Vue files, refer to: [Vue Style Guide](https://v2.cn.vuejs.org/v2/style-guide/index.html)

### 2. TypeScript Files

#### 2.1 Naming Conventions

File names use PascalCase, and the file name should be consistent with the class name. Taking custom fields as an example: the file name and class name are composed of `${ViewType}${FieldType}${Component Type}${FieldWidget}`, such as `FormM2OSelectFieldWidget.ts`.

#### 2.2 Inheritance

Class names use PascalCase. When inheriting, inherit the default widget. Taking a custom m2o dropdown field as an example:

```typescript
export class FormM2ODialogFieldWidget extends FormM2OSelectFieldWidget{
  // ...todo
}
```

#### 2.3 Method Definition

Define different modifiers (public, protected, private) according to the role of the method, and method names use camelCase. If it is a responsive method, it needs to be marked with the `@Widget.Method()` decorator.

```typescript
@Widget.Method()
public change(value: string):{}
```

#### 2.4 Property Definition

Define different modifiers (public, protected, private) according to the role of the property, and property names use camelCase. If it is a responsive property, it needs to be marked with the `@Widget.Reactive()` decorator. For computed properties, the corresponding get accessor should be added.

```typescript
@Widget.Reactive()
public get userInfo() {
  return `Age: ${this.age}, Name: ${this.myName}`
}

@Widget.Reactive()
public myName = 'Zhang San'

@Widget.Reactive()
public age = 18
```

## (II) Backend

### 1. Class Names

For platform model naming conventions, refer to: [Model Naming Conventions](/en/DevManual/Reference/Back-EndFramework/ORM-API.md#5-model-naming-conventions). Ordinary POJO class names use PascalCase.

### 2. Property Names

For platform model field naming conventions, refer to: [Model Fields](/en/DevManual/Tutorials/Back-endFramework/chapter3-models-and-basic-fields.md). Ordinary POJO property names use camelCase.

### 3. Method Names

Method names use camelCase. If the method is a Function or Action, avoid using get, set, or unset as the method name prefix.

# 4. Notes

## (I) Frontend

### 1. Cohesion of Methods and Properties in Corresponding Classes

Whether it is a custom field, action, or view, its properties and methods should be written in the corresponding `class`. Vue components are only responsible for accepting corresponding properties and methods through props and do not handle business logic. Because `class` can be inherited, and its properties and methods can be overridden, which enables universality.

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
    return `Age: ${this.age}, Name: ${this.myName}`
  }
  
  @Widget.Reactive()
  public myName = 'Zhang San'
  
  @Widget.Reactive()
  public age = 18

  
  @Widget.Method()
  public changeUserInfo(age: number){
    this.age = age
  }
}
```

### 2. Import and Export of Files

Classes in TypeScript files use `export`. Folders of different types need to have an `index.ts` file to unify the import and export of files.

```markdown
├── field
├──── form
├────── string // Fields related to string type
├──────── input
├──────── select
├──────── index.ts // Export input and select
├────── index.ts // Export string
└── index.ts // Only export form
```

### 3. Debugging Tools

Use the latest version of [Vue Devtools](https://chromewebstore.google.com/detail/vuejs-devtools-beta/ljjemllljcmogpfapbkkighbhhppjdbg?utm_source=ext_app_menu) as the component debugging tool.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CodingGuidelines/1749527404519-3859fb39-9447-4407-afbb-a1db2fe57dd7.png)

## (II) Backend

### 1. Deep Copy

Use the cloning tool provided by the platform: `pro.shushi.pamirs.framework.common.utils.ObjectUtils#clone`

### 2. JSON Serialization/Deserialization

Use the Json operation tool provided by the platform: `pro.shushi.pamirs.meta.util.JsonUtils`

### 3. Getter/Setter

The underlying model uses `Map` as the data carrier. When manually overriding `Getter` and `Setter` methods, property reading and writing must be implemented by operating this `Map`.

The following code example shows manually writing Getter, Setter, and UnSetter:

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

# 5. Code Format

## (I) Frontend

Frontend code is formatted with `prettier`.

Configuration file reference:

Configuration file name: `.prettierrc.json`

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

## (II) Backend

Backend code format is based on IDEA's default package import and formatting.

# 6. Code Comments

Clear and accurate code comments with logical descriptions are advocated.