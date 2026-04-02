---
title: Resources API
index: true
category:
  - Development Manual
  - Reference
  - Standard Modules
order: 5

---
# I. Overview

In Oinone, built-in model definitions exist for common basic data to support specific scenarios, including address libraries, currencies, languages, icons, etc.

# II. Dependencies and Configuration

## (Ⅰ) pom Dependencies


### Add relevant dependency packages to the api project

```xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-resource-api</artifactId>
</dependency>
```

### Start the project and add the relevant dependency packages

```xml
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-resource-core</artifactId>
</dependency>
```


## (Ⅱ) Yaml Configuration

``` yaml
pamirs:
	boot:
    modules:
      - resource
```

# Ⅲ. Reference List

## (Ⅰ) Models

### 1. Region (ResourceRegion)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| children | List<`ResourceRegion`> | Children Nodes | No | - | Sub-region list (associated via pid), supports lazy loading |
| code | String | Code | Yes | - | Unique region code (inherited from BaseResourceModel) |
| country | ResourceCountry | Country | No | - | Associated with the country model via countryCode (many2one relationship) |
| countryCode | String | Country Code | No | - | Country code, associated with the code field of ResourceCountry |
| hasChildren | Boolean | Has Children | No | false | Indicates whether the current region has sub-regions, dynamically calculated via the children field |
| level | Integer | Level | No | - | Region hierarchy (e.g., 1 = Country, 2 = Province), default value for country level is `DefaultResourceConstants.REGION_LEVEL_COUNTRY` |
| name | String | Name | Yes | - | Region name, marked `translate=true`<br/>Supports multi-language translation |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations, associated with the current model via `code#resource.ResourceRegion` format |
| pCode | String | Parent Node Code | No | - | Parent region's Code, replacing the deprecated pid field for parent-child hierarchy association |
| pid | Long | Parent Node ID | No | - | **Deprecated**, use pCode field instead |
| sourceType | String | Source Type | Yes | GD | Data source type (e.g., GD = Gaode), default value is "GD" |
| type | AddressTypeEnum | Address Type | No | - | Region type enum (e.g., Country/Province/City), corresponding to AddressTypeEnum values |


### 2. Country Group (ResourceCountryGroup)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique country group code (inherited from CodeModel) |
| countryList | List<`ResourceCountry`> | Country List | No | - | Associated country list (many-to-many relationship via intermediate table ResourceCountryGroupCountryRel) |
| name | String | Name | Yes | - | Country group name (e.g., "Asia", "Europe") |


### 3. Country (ResourceCountry)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| addrFormat | String (Text) | Address Display Format | No | - | Country address display format (e.g., "Province/City/Street") |
| code | String | Code | Yes | - | Unique country code (inherited from BaseResourceModel) |
| completeName | String (256) | Full Country/Region Name | No | - | Full name of the country or region (e.g., "People's Republic of China") |
| countryGroup | ResourceCountryGroup | Continent | No | - | Belonged continent group (associated via countryGroupCode) |
| countryGroupCode | String | Continent Code | No | - | Continent group code (associated with the code field of ResourceCountryGroup) |
| currency | ResourceCurrency | Currency Used | No | - | Currency used by the country (associated via currencyCode) |
| currencyCode | String | Currency Code | No | - | Currency code (associated with the code field of ResourceCurrency) |
| flag | PamirsFile | National Flag | No | - | National flag file reference |
| lang | ResourceLang | Official Language | No | - | Country's official language (associated via langCode) |
| langCode | String | Language Code | No | - | Language code (associated with the code field of ResourceLang) |
| mappingList | List<`ResourceRegionMapping`> | Keyword Mapping List | No | - | Keyword mapping list for country region names (many-to-many relationship) |
| name | String | Country/Region Name | Yes | - | Country or region name (supports multi-language translation) |
| namePosition | String (Text) | Name Display Rule | No | - | Name display rule (e.g., "Surname First" or "Given Name First") |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| phoneCode | String | Long Distance Area Code | Yes | - | Country's long-distance area code (e.g., China: +86) |
| provinceList | List<`ResourceProvince`> | Provinces | No | - | List of provinces under the country (one-to-many relationship, pagination size 50) |
| regionList | List<`ResourceRegion`> | Regions | No | - | List of regions under the country (one-to-many relationship) |
| sourceType | String | Source Type | Yes | GD | Data source type (default "GD" for Gaode) |
| vatLabel | VatLabelEnum | Consumption Tax Display Name | No | - | Consumption tax label enum (e.g., VAT/GST, etc.) |


### 4. Province/State (ResourceProvince)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique province/state code (inherited from BaseResourceModel) |
| country | ResourceCountry | Country/Region | No | - | Belonged country/region (associated via countryCode) |
| countryCode | String | Country/Region Code | No | - | Country/region code (associated with the code field of ResourceCountry) |
| cityList | List<`ResourceCity`> | Cities | No | - | List of cities under the province/state (one-to-many relationship, pagination size 50) |
| mappingList | List<`ResourceRegionMapping`> | Keyword Mapping List | No | - | Keyword mapping list for province/state names (many-to-many relationship) |
| name | String | Province/State Name | No | - | Province/state name |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| sourceType | String | Source Type | Yes | GD | Data source type (default "GD" for Gaode) |


### 5. City (ResourceCity)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique city code (inherited from BaseResourceModel) |
| country | ResourceCountry | Country | No | - | Belonged country (associated via countryCode) |
| countryCode | String | Country/Region Code | No | - | Country code (associated with the code field of ResourceCountry) |
| districtList | List<`ResourceDistrict`> | Districts/Counties | No | - | List of districts/counties under the city (one-to-many relationship) |
| mappingList | List<`ResourceRegionMapping`> | Keyword Mapping List | No | - | Keyword mapping list for city names (many-to-many relationship) |
| name | String | City Name | Yes | - | City name |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| phoneCode | String | Long Distance Area Code | No | - | City's long-distance area code (e.g., Shanghai: 021) |
| province | ResourceProvince | Province/State | No | - | Belonged province/state (associated via provinceCode) |
| provinceCode | String | Province/State Code | No | - | Province/state code (associated with the code field of ResourceProvince) |
| sourceType | String | Source Type | Yes | GD | Data source type (default "GD" for Gaode) |
| zipCode | String | Postal Code | No | - | City's postal code |


### 6. District/County (ResourceDistrict)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique district/county code (inherited from BaseResourceModel) |
| city | ResourceCity | City | No | - | Belonged city (associated via cityCode) |
| cityCode | String | City Code | No | - | City code (associated with the code field of ResourceCity) |
| country | ResourceCountry | Country | No | - | Belonged country (associated via countryCode) |
| countryCode | String | Country Code | No | - | Country code (associated with the code field of ResourceCountry) |
| mappingList | List<`ResourceRegionMapping`> | Keyword Mapping List | No | - | Keyword mapping list for district/county names (many-to-many relationship) |
| name | String | District/County Name | No | - | District/county name |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| province | ResourceProvince | Province | No | - | Belonged province/state (associated via provinceCode) |
| provinceCode | String | Province Code | No | - | Province/state code (associated with the code field of ResourceProvince) |
| sourceType | String | Source Type | Yes | GD | Data source type (default "GD" for Gaode) |
| streetList | List<`ResourceStreet`> | Streets | No | - | List of streets under the district/county (one-to-many relationship) |
| zipCode | String | City District Postal Code | No | - | District/county postal code (optional, may be consistent with city zip code in some areas) |


### 7. Street (ResourceStreet)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique street code (inherited from BaseResourceModel) |
| city | ResourceCity | City | No | - | Belonged city (associated via cityCode) |
| cityCode | String | City Code | No | - | City code (associated with the code field of ResourceCity) |
| country | ResourceCountry | Country | No | - | Belonged country (associated via countryCode) |
| countryCode | String | Country Code | No | - | Country code (associated with the code field of ResourceCountry) |
| district | ResourceDistrict | District/County | No | - | Belonged district/county (associated via districtCode) |
| districtCode | String | District/County Code | No | - | District/county code (associated with the code field of ResourceDistrict) |
| mappingList | List<`ResourceRegionMapping`> | Keyword Mapping List | No | - | Keyword mapping list for street names (many-to-many relationship) |
| name | String | Street Name | Yes | - | Street name |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| province | ResourceProvince | Province | No | - | Belonged province/state (associated via provinceCode) |
| provinceCode | String | Province Code | No | - | Province/state code (associated with the code field of ResourceProvince) |
| sourceType | String | Source Type | Yes | GD | Data source type (default "GD" for Gaode) |


### 8. Currency (ResourceCurrency)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| active | Boolean | Active | Yes | true | Currency status (true = active, false = inactive) |
| code | String | Code | Yes | - | Unique currency code (inherited from BaseResourceModel) |
| currencySubunitLabel | String | Subunit Label | Yes | - | Currency subunit name (e.g., "Fen") |
| currencyUnitLabel | String | Unit Label | Yes | - | Currency unit name (e.g., "Yuan") |
| decimalPlaces | Integer | Decimal Places | Yes | 2 | Number of decimal places for currency amount (default 2, e.g., 0.00) |
| name | String | Currency Name | Yes | - | Currency name (supports multi-language translation) |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |
| position | CurrencyPositionEnum | Symbol Position | Yes | - | Currency symbol position enum (e.g., before, after) |
| rounding | CurrencyRoundingEnum | Rounding Mode | Yes | ROUND_HALF_UP | Numeric rounding rule enum (default half-up) |
| symbol | String | Currency Symbol | Yes | - | Currency symbol (e.g., "¥", "€") |


### 9. Language (ResourceLang)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| active | ActiveEnum | Activation Status | No | ACTIVE | Language activation status enum (ACTIVE = active, INACTIVE = inactive) |
| addressFormat | String | Address Format | No | - | Actual address format used at runtime (e.g., "City/Street/House Number") |
| addressTypes | List<`AddressTypeEnum`> | Address Types | No | - | List of supported address type enums (e.g., Country/Province/City, etc.) |
| calendarType | CalendarTypeEnum | Calendar | Yes | - | Calendar type enum (e.g., Gregorian, Lunar, etc.) |
| code | String | Code | Yes | - | Unique language code (inherited from CodeModel, e.g., "zh-CN") |
| decimalPoint | String | Decimal Format | Yes | - | Decimal separator (e.g., "." or ",") |
| dateFormat | String | Date Format | No | - | **Deprecated**, use resourceDateFormat association instead |
| direction | DirectionEnum | Writing Direction | Yes | - | Text writing direction enum (LTR = left to right, RTL = right to left) |
| groupingRule | String | Number Grouping Rule | No | 3 | Number grouping digits (e.g., "3" for thousand separators, like 1,000) |
| icon | PamirsFile | Icon | No | - | **Deprecated**, use resourceIcon association instead |
| installState | Boolean | Language Pack Installation Status | No | - | **Deprecated**, no longer used |
| name | String | Language Name | Yes | - | Language name (supports multi-language translation, e.g., "Simplified Chinese") |
| resourceDateFormat | ResourceDateFormat | Date Format | No | - | Date format configuration model (associated with ResourceDateFormat) |
| resourceIcon | ResourceIcon | Icon | No | - | Language icon (recommended to associate with ResourceIcon model) |
| resourceTimeFormat | ResourceTimeFormat | Time Format | No | - | Time format configuration model (associated with ResourceTimeFormat) |
| thousandsSep | String | Integer Format | Yes | - | Thousand separator (e.g., "," or " ") |
| timeFormat | String | Time Format | No | - | **Deprecated**, use resourceTimeFormat association instead |
| timezoneType | TimeZoneTypeEnum | Time Zone | Yes | - | Time zone enum (e.g., UTC+8, UTC-5, etc.) |
| userCurrentLang | Boolean | Current User Language | No | false | Indicates whether it is the current user's language (for frontend display, not stored in business data) |
| weekStart | WeekStartEnum | First Day of Week | Yes | - | First day of week enum (e.g., MONDAY, SUNDAY) |
| isoCode | String | Language ISO Code | Yes | - | International code (e.g., "zh" for Chinese, "en" for English) |


### 10. Tax Type (ResourceTaxKind)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique tax type code (inherited from CodeModel) |
| name | String | Name | Yes | - | Tax type name (needs to be unique) |


### 11. Tax Rate (ResourceTax)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| code | String | Code | Yes | - | Unique tax rate code (inherited from CodeModel, auto-generated) |
| name | String | Name | Yes | - | Tax rate name (needs to be unique, e.g., "VAT - 13%") |
| tax | BigDecimal | Tax Rate | Yes | - | Tax rate value (e.g., 13.0 for 13%) |
| region | ResourceRegion | Country/Region | No | - | Applicable country/region (associated via region code, e.g., China) |
| taxKind | ResourceTaxKind | Tax Type | Yes | - | Associated tax type (e.g., VAT, Consumption Tax, required) |
| outResourceRelationList | List<`OutResourceRelation`> | External Resource Association List | No | - | External resource association relations (associated via code and model name) |


### 12. Icon (ResourceIcon)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| displayName | String | Icon Display Name | No | - | Icon's display name on the frontend (e.g., "Delete Icon") |
| fontClass | String | Font Icon Class Name | No | - | Base class name of the font icon (e.g., "fa fa-trash") |
| fullFontClass | String | Full Font Icon Class Name | No | - | Complete class name including library prefix (e.g., "font-awesome fa-trash") |
| group | ResourceIconGroup | Group | No | - | Icon group (associated via groupId with ResourceIconGroup) |
| groupId | Long | Group ID | No | - | Icon group ID |
| id | Long | ID | Yes | - | Primary key ID (inherited from IdModel) |
| lib | ResourceIconLib | Icon Library | No | - | Icon library (associated via libId with ResourceIconLib) |
| libId | Long | Icon Library ID | No | - | Icon library ID |
| name | String | Icon Name | No | - | Icon file name or identifier |
| outId | String | Icon ID | No | - | External icon unique identifier (e.g., font icon Unicode code) |
| remark | String (Text) | Remark | No | - | Icon remark information (max 500 characters) |
| show | Boolean | Visibility | No | true | Whether the icon is visible (default visible) |
| sys | Boolean | System Icon | No | false | Whether it is a built-in system icon (true = system icon, non-deletable) |
| type | IconLibTypeEnum | Icon Type | No | - | Icon type enum (e.g., FONT = font icon, IMAGE = image icon) |
| unicode | String | Unicode | No | - | Unicode code corresponding to the font icon (e.g., "\f01f") |


### 13. Icon Group (ResourceIconGroup)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| batchCode | Long | Update Batch | No | - | Group update batch number (for version control) |
| iconList | List<`ResourceIcon`> | All Icons | No | - | List of icons included in the group (associated via groupId, one-to-many relationship) |
| iconNum | Long | Number of Icons | No | - | Total number of icons in the group (non-persistent, calculated by the length of iconList) |
| id | Long | ID | Yes | - | Primary key ID (inherited from IdModel) |
| name | String | Group Name | No | - | Group name (needs to be unique, e.g., "Action Icons") |
| sys | Boolean | System Group | No | false | Whether it is a built-in system group (true = system group, non-deletable) |


### 14. Icon Library (ResourceIconLib)

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| cssUrls | List<`String`> | CSS File Links | No | - | List of CSS style file links corresponding to the icon library (e.g., font icon style sheets) |
| description | String (Text) | Description | No | - | Icon library function description (e.g., "Font Awesome Icon Library") |
| fontClassPrefix | String | Icon Library Prefix | No | - | Font icon class name prefix (e.g., "fa-", for composing complete class names) |
| fontUrls | List<`String`> | Font File Links | No | - | List of font file links (supports multiple files, e.g., woff2, ttf formats) |
| group | ResourceIconGroup | Group | No | - | Icon library group (associated via groupId with ResourceIconGroup) |
| groupId | Long | Group ID | No | - | Icon library group ID |
| iconList | List<`ResourceIcon`> | All Icons in Library | No | - | List of icons included in the icon library (associated via libId, one-to-many relationship) |
| id | Long | ID | Yes | - | Primary key ID (inherited from IdModel) |
| jsUrls | List<`String`> | JS File Links | No | - | List of JS file links required by the icon library (e.g., dynamic icon loading scripts) |
| name | String | Icon Library Name | No | - | Icon library name (e.g., "Font Awesome") |
| outId | String | Icon Library ID | No | - | External icon library unique identifier (e.g., library ID for Font Awesome) |
| type | IconLibTypeEnum | Icon Library Type | No | - | Icon library type enum (FONT = font icon library, IMAGE = image icon library) |


### 15. OutResourceRelation

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| extra | String | Extension Field | No | - | Extended data (recommended to store in JSON format, e.g., additional attributes of external systems) |
| id | Long | ID | Yes | - | Primary key ID (inherited from IdModel) |
| model | String | Associated Model | Yes | - | Name of the associated internal model (e.g., "resource.ResourceCountry") |
| outCode | String | External Code | Yes | - | Resource code in the external system (recommended as the association primary key, e.g., unique identifier of a third-party platform) |
| relationCode | String | Association Code | Yes | - | Resource code of the internal system (recommended as the unique association value, e.g., region Code of this system) |
| sourceType | String | Source Type | Yes | - | External system identifier (e.g., "GD" = Gaode Map, "BD" = Baidu Map) |


### 16. ResourceRegionMapping

| **Field Name** | **Data Type** | **Display Name** | **Required** | **Default Value** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| id | Long | ID | Yes | - | Primary key ID (inherited from IdModel) |
| model | String | Associated Model | Yes | - | Type of the associated region model (e.g., "resource.ResourceProvince", "resource.ResourceCity") |
| relationCode | String | Association Code | Yes | - | Corresponding region code (e.g., province code "CN-31", city code "CN-31-01") |
| keywords | String | Mapping Keywords | Yes | - | Keywords for matching (e.g., city alias "Hu" corresponding to "CN-31") |


### 17. Date Format (ResourceDateFormat)

| **Field Name** | **Data Type** | **Display Name** | **Description (Format Example)** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| chinese | String | Chinese Format | `YYYY年MM月DD日` (e.g., 2025年06月06日) |
| chineseYearMonth | String | Chinese Year-Month Format | `YYYY年MM月` (e.g., 2025年06月) |
| hyphenYearMonth | String | Hyphenated Year-Month Format | `YYYY-MM` (e.g., 2025-06) |
| slashYearMonth | String | Slashed Year-Month Format | `YYYY/MM` (e.g., 2025/06) |
| hyphen | String | Hyphenated Format | `YYYY-MM-DD` (e.g., 2025-06-06) |
| slash | String | Slashed Format | `YYYY/MM/DD` (e.g., 2025/06/06) |
| chineseMap | Map<String, Object> | Chinese Format (Frontend) | JSON object containing language and format (e.g., `{"lang":"zh-CN", "format":"YYYY年MM月DD日"}`) |
| chineseYearMonthMap | Map<String, Object> | Chinese Year-Month Format (Frontend) | JSON object containing language and format |
| hyphenYearMonthMap | Map<String, Object> | Hyphenated Year-Month Format (Frontend) | JSON object containing language and format |
| slashYearMonthMap | Map<String, Object> | Slashed Year-Month Format (Frontend) | JSON object containing language and format |
| hyphenMap | Map<String, Object> | Hyphenated Format (Frontend) | JSON object containing language and format |
| slashMap | Map<String, Object> | Slashed Format (Frontend) | JSON object containing language and format |


### 18. Time Format (ResourceTimeFormat)

| **Field Name** | **Data Type** | **Display Name** | **Description (Format Example)** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| colonNormal | String | Standard Colon Format | `HH:mm:ss` (24-hour format, e.g., `14:30:45`) |
| colonShort | String | Short Colon Format | `HH:mm` (24-hour format, e.g., `14:30`) |
| apColonNormal | String | Standard Colon Format (AP Style) | `A hh:mm:ss` (12-hour format, e.g., `PM 02:30:45`) |
| apColonShort | String | Short Colon Format (AP Style) | `A hh:mm` (12-hour format, e.g., `PM 02:30`) |
| colonNormalMap | Map<String, Object> | Standard Colon Format (Frontend) | Mapping containing format information (e.g., `{"format":"HH:mm:ss"}`) |
| colonShortMap | Map<String, Object> | Short Colon Format (Frontend) | Mapping containing format information |
| apColonNormalMap | Map<String, Object> | Standard Colon Format (AP Style, Frontend) | Mapping containing format information |
| apColonShortMap | Map<String, Object> | Short Colon Format (AP Style, Frontend) | Mapping containing format information |


## (Ⅱ) Enums

### 1. Address Type (AddressTypeEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Country | country | Country | Country-level address |
| Province | province | Province | Provincial administrative region |
| City | city | City | Municipal administrative region |
| District | district | District | District-level administrative region |
| Street | street | Street | Street/town-level address |


### 2. Vat Label (VatLabelEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| VAT | VAT | Value Added Tax | Value Added Tax (common in Europe, China) |
| GST | GST | GST | Goods and Services Tax (common in Canada, Australia) |
| HST | HST | HST | Harmonized Sales Tax (some provinces in Canada) |
| RFC | RFC | RFC | Taxpayer Registration Number (Mexico) |
| RNC | RNC | RNC | Taxpayer Registration Number (Dominican Republic, etc.) |
| NIT | NIT | NIT | Taxpayer Identification Number (Colombia, etc.) |


### 3. Currency Position (CurrencyPositionEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| BEFORE | BEFORE | Symbol Before | Currency symbol before the amount (e.g., "¥100") |
| AFTER | AFTER | Symbol After | Currency symbol after the amount (e.g., "100¥") |


### 4. Currency Rounding (CurrencyRoundingEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| ROUND_UP | ROUND_UP | Round Up | Always round up (e.g., 1.1→2.0) |
| ROUND_DOWN | ROUND_DOWN | Round Down | Always round down (e.g., 1.9→1.0) |
| ROUND_CEILING | ROUND_CEILING | Ceiling | Round up for positive numbers, round towards zero for negative numbers (1.1→2.0, -1.9→-1.0) |
| ROUND_FLOOR | ROUND_FLOOR | Floor | Round towards zero for positive numbers, round down for negative numbers (1.9→1.0, -1.1→-2.0) |
| ROUND_HALF_UP | ROUND_HALF_UP | Half Up (≥0.5 Round Up) | Round up if the discarded part ≥0.5 (1.5→2.0, 1.4→1.0) |
| ROUND_HALF_DOWN | ROUND_HALF_DOWN | Half Down (>0.5 Round Up) | Round up if the discarded part >0.5 (1.5→1.0, 1.6→2.0) |
| ROUND_HALF_EVEN | ROUND_HALF_EVEN | Bankers Rounding | Round half to even (if the left digit is even, round down; if odd, round up) (2.5→2.0, 3.5→4.0) |
| ROUND_UNNECESSARY | ROUND_UNNECESSARY | No Rounding | Assert operation result is precise (e.g., integer operations), throw exception if decimals exist |


### 5. Activation Status (ActiveEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| ACTIVE | true | Active | Object is in an active state and can be used normally |
| INACTIVE | false | Inactive | Object is deactivated and cannot participate in business operations |


### 6. Calendar Type (CalendarTypeEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Gregorian | Gregorian | Gregorian Calendar | International standard calendar (solar calendar) |
| Lunar | Lunar | Lunar Calendar | Traditional Chinese lunisolar calendar |
| Solar | Solar | Solar Calendar | Solar calendar (alias of Gregorian calendar) |


### 7. Writing Direction (DirectionEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| LTR | LTR | Left to Right | Text layout direction is left to right (e.g., Chinese, English) |
| RTL | RTL | Right to Left | Text layout direction is right to left (e.g., Arabic, Hebrew) |


### 8. Time Zone (TimeZoneTypeEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Australia_Darwin | Australia/Darwin | Australia/Darwin | Darwin Time Zone, Australia |
| Australia_Sydney | Australia/Sydney | Australia/Sydney | Sydney Time Zone, Australia |
| America_Argentina_Buenos_Aires | America/Argentina/Buenos_Aires | America/Argentina/Buenos_Aires | Buenos Aires Time Zone, Argentina |
| Africa_Cairo | Africa/Cairo | Africa/Cairo | Cairo Time Zone, Egypt |
| America_Anchorage | America/Anchorage | America/Anchorage | Anchorage Time Zone, USA |
| America_Sao_Paulo | America/Sao_Paulo | America/Sao_Paulo | Sao Paulo Time Zone, Brazil |
| Asia_Dhaka | Asia/Dhaka | Asia/Dhaka | Dhaka Time Zone, Bangladesh |
| Africa_Harare | Africa/Harare | Africa/Harare | Harare Time Zone, Zimbabwe |
| America_St_Johns | America/St_Johns | America/St_Johns | St. Johns Time Zone, Canada |
| America_Chicago | America/Chicago | America/Chicago | Chicago Time Zone, USA |
| Asia_Shanghai | Asia/Shanghai | Asia/Shanghai | Shanghai Time Zone, China |
| Africa_Addis_Ababa | Africa/Addis_Ababa | Africa/Addis_Ababa | Addis Ababa Time Zone, Ethiopia |
| Europe_Paris | Europe/Paris | Europe/Paris | Paris Time Zone, France |
| America_Indiana_Indianapolis | America/Indiana/Indianapolis | America/Indiana/Indianapolis | Indianapolis Time Zone, Indiana, USA |
| Asia_Kolkata | Asia/Kolkata | Asia/Kolkata | Kolkata Time Zone, India |
| Asia_Tokyo | Asia/Tokyo | Asia/Tokyo | Tokyo Time Zone, Japan |
| Pacific_Apia | Pacific/Apia | Pacific/Apia | Apia Time Zone, Samoa |
| Asia_Yerevan | Asia/Yerevan | Asia/Yerevan | Yerevan Time Zone, Armenia |
| Pacific_Auckland | Pacific/Auckland | Pacific/Auckland | Auckland Time Zone, New Zealand |
| Asia_Karachi | Asia/Karachi | Asia/Karachi | Karachi Time Zone, Pakistan |
| America_Phoenix | America/Phoenix | America/Phoenix | Phoenix Time Zone, USA |
| America_Puerto_Rico | America/Puerto_Rico | America/Puerto_Rico | San Juan Time Zone, Puerto Rico |


### 9. First Day of Week (WeekStartEnum)

| **Enum Value** | **Stored Value** | **Display Name** | **Description** |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| MONDAY | monday | Monday | Monday as the first day of the week |
| TUESDAY | tuesday | Tuesday | Tuesday as the first day of the week |
| WEDNESDAY | wednesday | Wednesday | Wednesday as the first day of the week |
| THURSDAY | thursday | Thursday | Thursday as the first day of the week |
| FRIDAY | friday | Friday | Friday as the first day of the week |
| SATURDAY | saturday | Saturday | Saturday as the first day of the week |
| SUNDAY | sunday | Sunday | Sunday as the first day of the week |