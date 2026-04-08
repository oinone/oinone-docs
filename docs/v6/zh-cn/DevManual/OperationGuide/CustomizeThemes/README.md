---
title: 自定义主题
index: true
category:
  - 研发手册
  - 操作指南
  - 自定义主题
dir:
  link: true
  order: 5
next:
  text: 组件默认主题变量
  link: /v6/zh-cn/DevManual/OperationGuide/CustomizeThemes/default-themes.md
---
在 Oinone 中的 `主题` 是通过 `CSS variable` 实现的，通过 `registerTheme` 注册主题，并使用 `VueOioProvider` 应用主题到系统中。

:::warning 提示

更多关于 CSS variable 的内容请参考：[CSS variable](https://www.w3school.com.cn/css/css3_variables.asp)

:::

# 一、通过 registerTheme 注册自定义主题变量

我们先来注册一个 `customTheme` 主题吧，这个主题将 `Oinone` 页面的主色修改为 `黑色（blank）`：

``` typescript
export const customThemeName = 'customTheme';
export const customThemeCssVars = {
  'primary-color': 'black'
};

registerTheme(customThemeName, customThemeCssVars);
```

:::warning 提示

通常我们将主题变量的定义和注册放在 `src/theme` 目录下。

:::

# 二、使主题生效

让我们在 VueOioProvider 中指定 theme 参数，让主题变量生效：

``` typescript
VueOioProvider({
  theme: [customThemeName]
});
```

现在，我们的页面就变成了这样：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/CustomTheme/theme.png)

:::warning 提示

在上面我们看到了主题已经生效了，但这还没完，当我们把鼠标悬停在 “创建” 按钮上时，按钮变成了蓝色。这是因为主题变量中包含了 `鼠标悬停色（hover）` 的定义，我们还需要将其他相关的主题变量都进行定义，这样才可以较为完整的替换整个页面的主题。

:::

# 三、内置主题变量

对于调整 UI 页面的主题变量一般分为两类，`尺寸（size）` 和 `颜色（color）` 。对于一些特殊的组件，我们还可以使用 `JavaScript` 变量进行主题的设置。

下面我们将按照这三个维度完整的列举目前系统中已有的主题变量供读者参考。

## （一）通用尺寸

### 1、大（large）

``` typescript
{
    "font-size": "14px",
    "font-size-lg": "16px",
    "font-size-sm": "12px",
    "padding": "24px",
    "margin": "24px",
    "row-gap": "24px",
    "line-height": "18px",
    "line-height-lg": "20px",
    "line-height-sm": "16px",
    "line-height-xs": "14px",
    "line-height-xxs": "12px",
    "border-radius": "4px",
    "border-radius-lg": "8px",
    "border-radius-sm": "2px",
    "padding-lg": "24px",
    "padding-md": "16px",
    "padding-sm": "12px",
    "padding-xs": "8px",
    "padding-xxs": "4px",
    "margin-lg": "24px",
    "margin-md": "16px",
    "margin-sm": "12px",
    "margin-xs": "8px",
    "margin-xxs": "4px",
    "height": "40px",
    "height-lg": "54px",
    "height-sm": "32px",
    "min-height": "32px",
    "label-height": "30px",
    "horizontal-label-height": "32px"
}
```

### 2、中（medium）（默认尺寸）

``` typescript
{
    "font-size": "14px",
    "font-size-lg": "16px",
    "font-size-sm": "12px",
    "padding": "16px",
    "margin": "16px",
    "row-gap": "16px",
    "line-height": "18px",
    "line-height-lg": "20px",
    "line-height-sm": "16px",
    "line-height-xs": "14px",
    "line-height-xxs": "12px",
    "border-radius": "4px",
    "border-radius-lg": "8px",
    "border-radius-sm": "2px",
    "padding-lg": "16px",
    "padding-md": "12px",
    "padding-sm": "8px",
    "padding-xs": "4px",
    "padding-xxs": "2px",
    "margin-lg": "16px",
    "margin-md": "12px",
    "margin-sm": "8px",
    "margin-xs": "4px",
    "margin-xxs": "2px",
    "height": "32px",
    "height-lg": "48px",
    "height-sm": "32px",
    "min-height": "32px",
    "label-height": "28px",
    "horizontal-label-height": "32px"
}
```

### 3、小（small）

``` typescript
{
    "font-size": "14px",
    "font-size-lg": "16px",
    "font-size-sm": "12px",
    "padding": "12px",
    "margin": "12px",
    "row-gap": "12px",
    "line-height": "18px",
    "line-height-lg": "20px",
    "line-height-sm": "12px",
    "line-height-xs": "14px",
    "line-height-xxs": "12px",
    "border-radius": "4px",
    "border-radius-lg": "8px",
    "border-radius-sm": "2px",
    "padding-lg": "12px",
    "padding-md": "10px",
    "padding-sm": "8px",
    "padding-xs": "4px",
    "padding-xxs": "2px",
    "margin-lg": "12px",
    "margin-md": "10px",
    "margin-sm": "8px",
    "margin-xs": "4px",
    "margin-xxs": "2px",
    "height": "24px",
    "height-lg": "40px",
    "height-sm": "24px",
    "min-height": "24px",
    "label-height": "24px",
    "horizontal-label-height": "32px"
}
```

## （二）通用颜色

### 1、默认主题（default）

``` typescript
{
    "primary-color-rgb": "3, 93, 255",
    "primary-color": "#035DFF",
    "primary-color-hover": "#3F84FF",
    "primary-color-focus": "#3F84FF",
    "primary-color-active": "#024CDE",
    "primary-color-outline": "#035DFF",
    "success-color": "#6DD400",
    "success-color-hover": "#90DE3D",
    "success-color-focus": "#90DE3D",
    "success-color-active": "#6BBB00",
    "success-color-outline": "#6DD400",
    "warning-color": "#F7B500",
    "warning-color-hover": "#F9C73D",
    "warning-color-focus": "#F9C73D",
    "warning-color-active": "#D99200",
    "warning-color-outline": "#F7B500",
    "info-color": "#8c8c8c",
    "info-color-hover": "#999999",
    "info-color-focus": "#999999",
    "info-color-active": "#666666",
    "info-color-outline": "#8c8c8c",
    "error-color-rgb": "224, 32, 32",
    "error-color": "#E02020",
    "error-color-hover": "#E75555",
    "error-color-focus": "#E75555",
    "error-color-active": "#C51C26",
    "error-color-outline": "#E02020",
    "notification-info": "#035DFF",
    "notification-error": "#FF4D4F",
    "notification-success": "#52C41A",
    "notification-warning": "#FAAD14",
    "background": "#ffffff",
    "body-background": "#F3F7FA",
    "search-background": "#ffffff",
    "header-background": "#ffffff",
    "main-background": "#ffffff",
    "footer-background": "#ffffff",
    "menu-background": "#ffffff",
    "placeholder-color": "rgba(0,0,0,0.25)",
    "hover-background-color": "rgba(3, 93, 255, 0.1)",
    "hover-text-color": "var(--oio-primary-color)",
    "font-family": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji';",
    "text-color": "rgba(0,0,0,0.85)",
    "text-color-rgb": "38, 38, 38",
    "text-color-secondary": "rgba(0,0,0,0.65)",
    "text-color-three": "rgba(0,0,0,0.45)",
    "font-weight-thick": "var(--oio-font-weight-bold)",
    "font-weight": "400",
    "font-weight-lighter": "lighter",
    "font-weight-bold": "bold",
    "font-weight-bolder": "bolder",
    "readonly-color": "rgba(0,0,0,0.85)",
    "readonly-bg": "#F7F7F7",
    "readonly-active-bg": "#F7F7F7",
    "readonly-border-color": "rgba(217,217,217,1)",
    "disabled-color": "rgba(0, 0, 0, 0.25)",
    "disabled-bg": "#F7F7F7",
    "disabled-active-bg": "#F7F7F7",
    "disabled-border-color": "rgba(217,217,217,1)",
    "border-color": "#e3e7ee",
    "border-color-danger": "#E02020",
    "border-width": "1px",
    "border-style": "solid",
    "icon-color": "rgba(0, 0, 0, 0.25)",
    "default-icon-color": "rgba(0, 0, 0, 0.25)",
    "normal-icon-filter": "",
    "icon-filter": "invert(0.7) hue-rotate(180deg) brightness(0.5)",
    "icon-filter-opacity": "0.2",
    "close-icon-background": "#f1f1f1",
    "group-border-width": "1px",
    "box-shadow-size": "6px",
    "box-shadow": "rgba(136, 156, 176, 0.1) 0px 2px 4px 0px",
    "addon-color-pick-background": "#ffffff",
    "addon-color-pick-readonly-background": "var(--oio-disabled-bg)",
    "addon-color-pick-border-color": "var(--oio-border-color)",
    "addon-color-pick-icon-color": "#909399",
    "addon-color-pick-dropdown-background": "#ffffff",
    "addon-color-pick-dropdown-border-color": "#e4e7ed",
    "user-dropdown-icon-color": "rgba(0, 0, 0, 0.25)",
    "tag-select-background": "#f1f1f1",
    "spin-background": ""
}
```

### 2、暗黑主题（dark）

``` typescript
{
    "primary-color-rgb": "3, 93, 255",
    "primary-color": "#035DFF",
    "primary-color-hover": "#3F84FF",
    "primary-color-focus": "#3F84FF",
    "primary-color-active": "#024CDE",
    "primary-color-outline": "#035DFF",
    "success-color": "#6DD400",
    "success-color-hover": "#90DE3D",
    "success-color-focus": "#90DE3D",
    "success-color-active": "#6BBB00",
    "success-color-outline": "#6DD400",
    "warning-color": "#F7B500",
    "warning-color-hover": "#F9C73D",
    "warning-color-focus": "#F9C73D",
    "warning-color-active": "#D99200",
    "warning-color-outline": "#F7B500",
    "info-color": "#8c8c8c",
    "info-color-hover": "#999999",
    "info-color-focus": "#999999",
    "info-color-active": "#666666",
    "info-color-outline": "#8c8c8c",
    "error-color": "#E02020",
    "error-color-hover": "#E75555",
    "error-color-focus": "#E75555",
    "error-color-active": "#C51C26",
    "error-color-outline": "#E02020",
    "notification-info": "#035DFF",
    "notification-error": "#FF4D4F",
    "notification-success": "#52C41A",
    "notification-warning": "#FAAD14",
    "background": "#1F2935",
    "body-background": "#15232E",
    "search-background": "#1F2935",
    "header-background": "#1F2935",
    "main-background": "#1F2935",
    "footer-background": "#1F2935",
    "menu-background": "#1F2935",
    "multi-tabs-background": "#F3F7FA",
    "placeholder-color": "rgba(255,255,255,0.25)",
    "hover-background-color": "rgba(255, 255, 255, 0.1)",
    "hover-text-color": "var(--oio-text-color)",
    "text-color": "rgba(255,255,255,0.65)",
    "text-color-rgb": "38, 38, 38",
    "text-color-secondary": "rgba(255,255,255,0.45)",
    "text-color-three": "rgba(255,255,255,0.25)",
    "font-weight-thick": "var(--oio-font-weight-bold)",
    "font-weight": "400",
    "font-weight-lighter": "lighter",
    "font-weight-bold": "bold",
    "font-weight-bolder": "bolder",
    "readonly-color": "rgba(255,255,255,0.65)",
    "readonly-bg": "#1D2E3C",
    "readonly-active-bg": "#1D2E3C",
    "readonly-border-color": "#333e4c",
    "disabled-color": "rgba(255,255,255,0.25)",
    "disabled-bg": "#1D2E3C",
    "disabled-active-bg": "#1D2E3C",
    "disabled-border-color": "#333e4c",
    "border-color": "#333e4c",
    "border-color-danger": "#E02020",
    "border-width": "1px",
    "border-style": "solid",
    "icon-color": "rgba(255,255,255,0.65)",
    "default-icon-color": "rgba(255,255,255,0.65)",
    "normal-icon-filter": "var(--oio-icon-filter)",
    "icon-filter": "invert(0.7) hue-rotate(180deg) brightness(0.5)",
    "icon-filter-opacity": "0.4",
    "close-icon-background": "#333E4C",
    "group-border-width": "0px",
    "box-shadow-size": "0px",
    "box-shadow": "0px 0px 6px 0px rgba(0,0,0,0.2)",
    "addon-color-pick-background": "var(--oio-primary-color)",
    "addon-color-pick-readonly-background": "rgba(92,104,127, 0.25)",
    "addon-color-pick-border-color": "#ffffff",
    "addon-color-pick-icon-color": "#ffffff",
    "addon-color-pick-dropdown-background": "var(--oio-background)",
    "addon-color-pick-dropdown-border-color": "var(--oio-border-color)",
    "user-dropdown-icon-color": "var(--oio-text-color)",
    "tag-select-background": "rgba(255,255,255,0.1)",
    "spin-background": "rgba(31,41,53,0.7)"
}
```

