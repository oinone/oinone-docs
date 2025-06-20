---
title: Data Operation:How to Use Bitwise Operation Data Dictionary
index: true
category:
  - Common Solutions
order: 31
---

# 一、Scenario Examples
In many projects, there are fields in the database representing "multiple selection status identifiers." Take an example from our project to illustrate:

+ Example 1:
Indicating whether a merchant supports multiple membership card discounts (such as gold cards, silver cards, other cards, etc.). The previous approach in projects was to establish a flag field for each membership card in each merchant record. As shown in the figure:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024053011531540-20250530144830265.png)

Using multiple fields to represent "multiple selection identifiers" has certain disadvantages: First, this setup clearly violates the first normal form of database design, increasing data redundancy and storage space. Furthermore, it is not conducive to flexible adjustment when business changes. For example, when a new membership card type is added, a new field needs to be added to the data table to adapt to the changing requirements.

Improved design: Tag bit flag design
Binary "bits" inherently serve to represent states. Each bit can be used to represent different types of membership card discount support:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024053011561971-20250530144830324.png)
In this way, the "MEMBERCARD" field still uses an integer type. When a merchant supports gold card discounts, it saves "1 (0001)"; when supporting silver cards, it saves "2 (0010)"; and when supporting both, it saves "3 (0011)". Others are similar. The table structure is as shown in the figure:
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/2024053011590622-20250530144830382.png)

When writing SQL statements, we can simply query the desired data through "bitwise" AND operations. This approach not only saves storage space but also simplifies query operations.

```sql
// Query merchants supporting gold card discounts:
select * from factory where MEMBERCARD & b'0001';
// Or:
select * from factory where MEMBERCARD & 1;

// Query merchants supporting silver card discounts:
select * from factory where MEMBERCARD & b'0010';
// Or:
select * from factory where MEMBERCARD & 2;
```

# 二、Binary (Bitwise Operation) Enumeration
You can set the bit attribute of the data dictionary through the @Dict annotation or implement the BitEnum interface to mark that the enumeration value is a power of 2. The biggest difference of binary enumerations lies in the different serialization and deserialization methods of values.

## （一）Example of Bitwise Operation Enumeration Definition
```java
import pro.shushi.pamirs.meta.annotation.Dict;
import pro.shushi.pamirs.meta.common.enmu.BitEnum;

@Dict(dictionary = ClientTypeEnum.DICTIONARY, displayName = "Client Type Enum", summary = "Client Type Enum")
public enum ClientTypeEnum implements BitEnum {

    PC(1L, "PC端", "PC端"),
    MOBILE(1L << 1, "移动端", "移动端"),
    ;

    public static final String DICTIONARY = "base.ClientTypeEnum";

    private final Long value;
    private final String displayName;
    private final String help;

    ClientTypeEnum(Long value, String displayName, String help) {
        this.value = value;
        this.displayName = displayName;
        this.help = help;
    }

    @Override
    public Long value() {
        return value;
    }

    @Override
    public String displayName() {
        return displayName;
    }

    @Override
    public String help() {
        return help;
    }
}
```

## （二）Example of Usage Methods
+ API: addTo and removeFrom

```java
List<ClientTypeEnum> clientTypes = module.getClientTypes();
// addTo
ClientTypeEnum.PC.addTo(clientTypes);
// removeFrom
ClientTypeEnum.PC.removeFrom(clientTypes);
```

+ Usage in Query Conditions

```java
List<Menu> moduleMenus = new Menu().queryListByWrapper(menuPage, LoaderUtils.authQuery(wrapper).eq(Menu::getClientTypes, ClientTypeEnum.PC));
```