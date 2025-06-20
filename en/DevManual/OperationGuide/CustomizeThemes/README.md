---
title: Customize Themes
index: true
category:
  - Development Manual
  - Operation Guide
  - Custom Themes
dir:
  link: true
  order: 5
next:
  text: Default Theme Variables for Components
  link: /en/DevManual/OperationGuide/CustomizeThemes/default-themes.md
---
The `theme` in Oinone is implemented through `CSS variables`. You can register themes using `registerTheme` and apply them to the system with `VueOioProvider`.

:::warning Tip

For more information on CSS variables, refer to: [CSS variable](https://www.w3school.com.cn/css/css3_variables.asp)

:::

# I. Register Custom Theme Variables via registerTheme

Let's start by registering a `customTheme` that changes the primary color of Oinone pages to `black`:

```typescript
export const customThemeName = 'customTheme';
export const customThemeCssVars = {
  'primary-color': 'black'
};

registerTheme(customThemeName, customThemeCssVars);
```

:::warning Tip

Generally, we place theme variable definitions and registrations in the `src/theme` directory.

:::

# II. Activate the Theme

Let's specify the theme parameter in VueOioProvider to activate the theme variables:

```typescript
VueOioProvider({
  theme: [customThemeName]
});
```

Now, our page should look like this:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/OperationGuide/CustomTheme/theme.png)

:::warning Tip

Although the theme is activated as shown above, when we hover over the "Create" button, it turns blue. This is because the theme variables include definitions for `hover color`. We need to define all related theme variables to completely replace the page theme.

:::

# III. Built-in Theme Variables

Theme variables for adjusting UI pages generally fall into two categories: `size` and `color`. For special components, we can also use `JavaScript` variables for theme settings.

Below, we list all existing system theme variables for reference, organized by these three dimensions.

## (一) General Sizes

### 1. Large

```typescript
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

### 2. Medium (Default Size)

```typescript
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

### 3. Small

```typescript
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

## (二) General Colors

### 1. Default Theme

```typescript
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

### 2. Dark Theme

```typescript
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