---
title: Actions
index: true
category:
  - User Manual
  - Designer
order: 4
next:
  text: Customized Components
  link: /zh-cn/UserManual/Designers/UIDesigner/CustomizedComponents/README.md
---
# I. General Attributes
+ Action Name/Button Text: The display name of the component on the current page.
+ Retain Action: After enabling this option, if the action component is deleted, it will be retained in the model action list in the left tool area for subsequent reuse.
+ Icon: Supports adding icons to action components to enhance their visualization and recognition.
+ Hidden: If set to hidden, the component will be invisible and uneditable on the actual page. If set to conditionally hidden, it will be hidden when the conditions are met. In the design page, hidden components will still be displayed.
+ Disabled: If set to disabled, the component will be visible but uneditable on the actual page. If set to conditionally disabled, it will be disabled when the conditions are met.
+ Button Style: Two options are available: primary button and secondary button. The primary button has a background color and is more prominent; the secondary button has no background color.
+ Button Type: Different types of buttons can be set, and each type has a different background color, including default, success, warning, danger, and prompt.
+ Display Device: Supports PC, mobile, and PAD.
+ Shortcut Key: Provides a keyboard shortcut customization function to quickly execute specified actions.
+ Trigger Scope: The trigger scope of the shortcut key can be set, including the current view and the global mode. When the current view is selected, the shortcut key is only valid in the current view; when the global mode is selected, the shortcut key can be used throughout the platform.
+ Secondary Confirmation: After enabling this function, a confirmation box will pop up for secondary confirmation before performing an action.
    - Prompt Type: Refers to the display type of the pop-up box, including bubble prompt and dialog prompt.
    - Prompt Direction: When the prompt type is a bubble prompt, this attribute is displayed. The display position of the bubble can be set, including above, below, left, and right of the button.

    :::info Note

    If there is insufficient space in the selected direction on the page, the prompt position will be adjusted automatically.

    :::

    - Prompt Text: The main text content displayed in the confirmation box.
    - Confirm Button Text: Supports customizing the display text of the confirm button.
    - Cancel Button Text: Supports customizing the display text of the cancel button.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/ty1.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/ty2.png)

# II. Specific Attributes
## (Ⅰ) Submit Action
By configuring different server functions, different operations can be performed, which is suitable for various scenarios such as querying, deleting, and creating.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tj1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tj2.gif)

:::

Specific attributes of the submit action:

+ Data Control Type: The data controlled when performing the action. It includes four types: processing single data, processing multiple data, processing single or multiple data, and no data processing.
+ Server Function: The function executed by the action. Multiple functions are provided and can be selected according to actual needs.
+ Validate Data: After enabling this option, data will be validated before the action is executed.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

:::tip Example

User System and Sales System:

+ In the user system, the unique identifier of a user may be called "User ID".
+ In the sales system, the unique identifier of the same user may be called "Customer ID".

Through context configuration, the names in these two different systems can be mapped to the same actual data, that is, the User ID and Customer ID refer to the same data.

:::

## (Ⅱ) Jump Action
Supports jumping to a certain page, which is suitable for scenarios such as page navigation and submission confirmation.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tz1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/tz2.gif)

:::

Specific attributes of the jump action:

+ Data Control Type: The data controlled when performing the action. It includes four types: processing single data, processing multiple data, processing single or multiple data, and no data processing.
+ Open Mode: Sets the open mode of the jumped page, including opening in the current window, opening in a new window, opening in a pop-up window, and opening in a drawer.
  :::warning Prompt

    When setting the jumped page to a pop-up window or a drawer, its page attributes can be configured:

  + Pop-up Window
    - Title: You can enter the title to be displayed on the pop-up window page.
    - Enable Dynamic Title: When enabled, the title can be dynamically displayed according to the set rules; when disabled, the default title will be displayed statically.
    - Pop-up Window Height/Pop-up Window Width: Different size specifications can be selected.
    - Title Arrangement: The arrangement style of the pop-up window title can be set, including horizontal and vertical.
    - Allow Dragging: After enabling, the pop-up window can be freely dragged.
    - Add Display Mask: You can choose whether to display a mask to blur the background content when the pop-up window appears, highlighting the content of the pop-up window.
    - Allow Closing: You can set whether to display the close button.
    - Close on Mask Click: You can set whether the pop-up window closes when the user clicks on the mask area.
  + Drawer
    - Title: You can enter the title to be displayed on the drawer page.
    - Enable Dynamic Title: When enabled, the title can be dynamically displayed according to the set rules; when disabled, the default title will be displayed statically.
    - Drawer Position: Used to set the position where the drawer pops up on the interface.
    - Drawer Size: Different size specifications can be selected.
    - Title Arrangement: The arrangement style of the drawer title can be set, including horizontal and vertical.
    - Add Display Mask: You can choose whether to display a mask to blur the background content when the drawer appears, highlighting the content of the drawer.
    - Allow Closing: You can set whether to display the close drawer button.
    - Close on Mask Click: You can set whether the drawer closes when the user clicks on the mask area.

  :::
+ Page Content: Specifies the content of the jumped page. You can either choose to bind an existing page or create a new page. When choosing to create a new page, relevant attributes for creating a new page will be added to the current component property bar, facilitating the quick creation and setting of a new page.
+ Bind Page: When choosing to bind an existing page, this attribute is displayed. You can select a published page in the interface designer.
+ Disable Data Loading: After enabling this option, the data loading function will not be executed.
+ Loading Function: If "Disable Data Loading" is enabled, this attribute will not be displayed. When a certain option value is selected on the actual page, this function will be executed to load data.

:::info Note

When a specific loading function is specified, the loading function will no longer be automatically recognized.

:::
+ Force Refresh Tab: After enabling this option, the page content will be automatically refreshed every time you switch to this tab.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

:::tip Example

User System and Sales System:

+ In the user system, the unique identifier of a user may be called "User ID".
+ In the sales system, the unique identifier of the same user may be called "Customer ID".

Through context configuration, the names in these two different systems can be mapped to the same actual data, that is, the User ID and Customer ID refer to the same data.

:::
+ Design Jump Page: Provides a shortcut for users to quickly design the jumped page.

## (Ⅲ) Link Action
Supports linking to other web pages, which is suitable for scenarios such as quickly navigating to relevant pages.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/lj1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/lj2.gif)

:::

Specific attributes of the link action:

+ Data Control Type: The data controlled when performing the action. It includes four types: processing single data, processing multiple data, processing single or multiple data, and no data processing.
+ Link to URL: Specifies the target link URL to jump to.
:::info Note

It supports a dynamic URL configuration mechanism, allowing users to customize dynamic parameters in the link according to their needs, achieving flexible link jumps based on different data.

:::
+ Calculation Function: The function executed by the action, which can be customized according to actual needs.
:::info Note

Calculation Function: The function executed by the action, which can be customized according to actual needs

:::
+ Open Mode: Sets the open mode of the linked page.

## (Ⅳ) Client Action
According to different client behaviors, different operations can be performed, which is suitable for scenarios such as returning, refreshing, and updating data.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/khd1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/khd2.gif)

:::

Specific attributes of the client action:

+ Client Behavior: Configures actions according to client behaviors.
  + Return to Previous Page: If there is a previous page, it can return to the previous page.
  + Refresh Data: Can refresh the data information displayed on the page.
  + Batch Update: Needs to be used in conjunction with the batch action to update multiple pieces of data on the batch jump page.
  + Delete Data: After selecting the data to be deleted, the deletion operation can be performed.
  + Add a Row of Data: You can directly add a row of data to the table without jumping to a page.
  + Copy a Row of Data: After selecting any piece of data, you can quickly copy the data.

## (Ⅴ) Batch Action
A shortcut for the jump action to process multiple pieces of data, which can perform batch modification operations on the data in the selected data set.

:::tip Example

Design Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/pl1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/pl2gif)

:::

Specific attributes of the batch action:

+ Open Mode: Sets the open mode of the batch action, including opening in a pop-up window and opening in a drawer.
+ Page Model: The model bound to the page jumped to when performing the batch action.
+ Design Pop-up Window/Drawer: Can design the page jumped to by the batch action.

:::info Note

When setting a pop-up window/drawer page for the batch action, the "Client Action - Batch Update" action needs to be used to submit relevant data.

:::

## (Ⅵ) Workflow
Supports manually triggering the workflow.

:::info Note

The workflow action will only be displayed in the component library after the "Workflow" application is dependent on under the application to which the page belongs.

:::

:::tip Example

Design Example:

In this example, the workflow is selected: after triggering the process, an in-app message will be sent with the content "This is a process triggered by the workflow action".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/gzl1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/gzl2.gif)

:::

Specific attributes of the workflow:

+ Execution Function: The function called when performing the action.
+ Workflow: You can select the processes that need to be triggered by the model included in the model to which the current page belongs.
+ Validate Data: After enabling this option, data will be validated before the action is executed.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Submit Data: If this option is enabled, parameter mapping can be configured. That is, when the data has different names in different locations but actually refers to the same data, it can be achieved by configuring parameter mapping.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

## (Ⅶ) Microflow
Supports manually triggering the microflow.

:::info Note

The microflow action will only be displayed in the component library after the "Workflow" application is dependent on under the application to which the page belongs.

:::

:::tip Example

Design Example:

In this example, the microflow is selected: after triggering the process, an in-app message will be sent with the content "This is a microflow triggered by the microflow action".

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/wl1.png)

Display Example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/wl2.gif)

:::

Specific attributes of the microflow:

+ Execution Function: The function called when performing the action.
+ Workflow: You can select the processes that need to be triggered by the model included in the model to which the current page belongs.
+ Validate Data: After enabling this option, data will be validated before the action is executed.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Submit Data: If this option is enabled, parameter mapping can be configured. That is, when the data has different names in different locations but actually refers to the same data, it can be achieved by configuring parameter mapping.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

## (Ⅷ) Integration Connector
Supports manually initiating an integration connection to other applications or databases.

:::info Note

The integration connector action will only be displayed in the component library after the "Integration Interface" application is dependent on under the application to which the page belongs.

:::

:::tip Example

Design Example:

In this example, the connector is selected: after triggering the integration connection, the interface will be executed (the interface log can be viewed in "Integration Designer" - "Interface Log").

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/jc1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/jc2.gif)

:::

Specific attributes of the integration connector:

+ Execution Function: The function called when performing the action.
+ Connector Type: You can select the type of the connector, including application or database.
+ Application/Database: You can select from existing applications or databases in the integration designer.
+ Api Resource: Displays the API resources included in the selected application or database.
+ Validate Data: After enabling this option, data will be validated before the action is executed.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Submit Data: If this option is enabled, parameter mapping can be configured. That is, when the data has different names in different locations but actually refers to the same data, it can be achieved by configuring parameter mapping.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

## (Ⅸ) Data Flow
Supports manually triggering the data flow.

:::info Note

The data flow action will only be displayed in the component library after the "Integration Interface" application is dependent on under the application to which the page belongs.

:::

:::tip Example

Design Example:

In this example, the data flow is selected: after triggering the process, an in-app message will be sent with the content "The process has been executed."

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/sjlc1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/sjlc2.gif)

:::

Specific attributes of the data flow:

+ Execution Function: The function called when performing the action.
+ Data Flow: You can select the data flow that needs to be triggered by the model included in the model to which the current page belongs.
+ Validate Data: After enabling this option, data will be validated before the action is executed.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Submit Data: If this option is enabled, parameter mapping can be configured. That is, when the data has different names in different locations but actually refers to the same data, it can be achieved by configuring parameter mapping.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.

:::warning Prompt

The actions in the model are shortcut operation methods for the above actions. Their specific attributes can be directly referred to the attributes of the above actions for viewing.

:::

## (Ⅹ) AI
Supports binding and associating the configured AI connector with various fields on the current page, and quickly building customized AI product solutions through data mapping.

:::info Note

The AI action will only be displayed in the component library after the "AI" application is dependent on under the application to which the page belongs.

:::

:::tip Example

Design Example:

Generate corresponding pictures based on the text entered by the user.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/AI1.png)

Display Page:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/UI%20Designer/Component%20Introduction/action/AI2.gif)

:::

Specific attributes of AI:
+ AI Connector: You can select a successfully published AI connector, and the system will complete data interaction according to the fields configured in the selected connector and the order of the large model.
+ Body Parameter Mapping: Refers to establishing a relationship between the fields on the current page and the input fields of the AI connector.
+ Response Parameter Mapping: Refers to establishing a relationship between the fields on the current page and the output fields of the AI connector.
+ Return to Previous Page: After enabling this option, it will directly return to the previous page after the action is executed.
+ Refresh Main View: After enabling this option, the main view will be refreshed after the action is executed.
+ Refresh Current View: After enabling this option, the current view will be refreshed after the action is executed.
+ Submit Data: If this option is enabled, parameter mapping can be configured. That is, when the data has different names in different locations but actually refers to the same data, it can be achieved by configuring parameter mapping.
+ Context: When the data has different names in different locations but actually refers to the same data, data mapping can be achieved by configuring the context.