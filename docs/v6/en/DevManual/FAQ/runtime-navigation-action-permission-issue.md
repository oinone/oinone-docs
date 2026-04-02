---
title: Runtime:Troubleshooting "No Permission" Errors in Navigation Actions
index: true
category:
- FAQs (Frequently Asked Questions)
order: 20
---
# I. Scenario Description
A navigation action with a configured loading function fails with a "No permission to perform this operation" error when clicked.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_14-41-25-scaled.jpg)

# II. Root Cause Analysis
Despite assigning all necessary action permissions, the error persists. This is likely due to missing permissions for the **loading function** itself.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_15-01-47.jpg)

# III. Troubleshooting Steps
In versions **5.0.X and above**, permission checks rely on the `path` parameter within the request payload's `variables`. This `path` is derived from the hierarchical menu names. The error occurs when the loading function's permission is not configured under the relevant `path`.

## Solution 1: Popup or Drawer Navigation
If the target page opens in a **popup or drawer**:
- The `path` remains the same as the parent page.
- **Action Steps**:
  1. Configure the loading function on the parent table page (set it to hidden).
  2. Assign the corresponding action permission in the权限 management system.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_14-56-27.jpg)

## Solution 2: New Window Navigation
If the target page opens in a **new window**:
- The `path` changes to the new window's menu path.
- **Action Steps**:
  1. Configure the loading function on the target page (set it to hidden).
  2. Assign the corresponding action permission under the new window's path.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/Snipaste_2024-10-29_15-00-44-1-20250529202453394.jpg)

## Solution 3: Bypass Permission Checks
For scenarios where:
- The loading function does not require page interaction, or
- The page and function belong to different models

**Action Steps**:
Convert the loading function to a `Function` type to bypass permission validation.