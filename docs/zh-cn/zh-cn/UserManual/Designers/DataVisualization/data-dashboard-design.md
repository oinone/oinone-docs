---
title: 数据大屏设计
index: true
category:
  - 用户手册
  - 设计器
order: 6
---
本界面主要分为四个区域：操作栏、组件栏、数据大屏预览区、样式栏

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/1.png)

# 一、操作栏
## （一）缩放自适应
### 1.功能介绍
支持对数据大屏进行缩放操作，可以根据实际需求，调整数据大屏的显示比例，以便更好地查看和分析数据细节

### 2.操作方法
点击缩放按钮或「全屏」，即可对数据大屏进行缩放操作

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/sf.png)

## （二）保存
### 1.功能介绍
支持对数据大屏设计进行存档保存。即使数据大屏设计尚未完整，也可选择保存当前设计进度。下次进入数据大屏设计页面时，系统将自动加载并显示之前保存的设计页面，方便继续完善数据大屏。

:::info 注意

当数据大屏的标题组件中包含有效内容时，方可进行保存操作。

:::

### 2.操作方法
点击「保存」，即可将当前设计进度存档保存。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/bc.png)

# 二、组件栏
## （一）组件
### 1.功能介绍
组件中包含图表与其他组件两个部分：

+ 图表：即在「数据可视化」中支持引用的所有图表

:::warning 提示

在大屏中添加图表可与已经设置好的边框合为一体。

:::

+ 其他组件：即系统提供的通用组件
    - 文本：可展示自定义文本信息
    - 通用标题：作为数据大屏的显示标题，必须至少包含一个

  :::info 注意

  在数据大屏中添加的通用标题即使存在多个，也必须全部包含有效内容

  :::

    - 倒计时：提供倒计时功能，可设置特定时间进行倒计时展示。
    - 时间器：实时显示当前时间，方便掌握时间信息。
    - 图片：支持插入图片元素，丰富大屏的视觉展示效果。
    - 轮播图：可设置多张图片进行轮播展示，增加动态视觉效果。
    - 视频：支持嵌入视频内容，让大屏展示更加生动。
    - 样式：提供多种样式选择，以满足不同展示需求。

### 2.操作方法
点击或拖拽组件，即可成功添加

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/zj.png)

## （二）数据大屏大纲
### 1.功能介绍
支持查看大纲，利用列表直观展示数据大屏已有组件。在大纲中可删除某一组件，或查看组件样式

### 2.操作方法
+ 点击「展开」图标，即可展示大纲

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/dg1.png)

+ 选中某一组件，即可在样式栏中显示该组件的样式

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/dg2.png)

+ 选中某一组件后点击「删除」图标，即可删除该组件
+ 点击「全部删除」图标，数据大屏中组件将全部删除

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/dg3.png)

# 三、数据大屏预览区
### 1.功能介绍
当组件被添加到数据大屏中后，可以在大屏环境中灵活地对其进行编辑和删除操作。不仅可以调整组件的位置和大小，以适应整体布局需求，而且当组件为图表时，还提供了便捷的快捷入口，可通过该入口快速跳转至图表设计界面，对图表内容进行进一步的修改和完善。

### 2.操作方法
+ 拖拽大屏中组件，可改变其位置

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/yl1.gif)

+ 选中某一组件，鼠标移至组件右下角，可改变其大小

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/yl2.gif)

+ 选中某一组件，点击「删除」图标，可删除该组件
+ 选中某一图表组件，点击「编辑」图标，可跳转至图表设计界面。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/yl3.png)

# 四、样式栏
### 1.功能介绍
支持为组件配置样式，包括数据大屏、图表与其他组件。

+ 数据大屏：设置数据大屏时可以设置屏幕的宽高、背景颜色、背景图片、主题
    - 宽高：根据数据大屏需要投放的屏幕大小进行设置

    :::info 注意

    若希望设计的数据大屏能够在屏幕中完整显示（实现全屏占满效果），需设置合理的屏幕宽高参数。  
    特别需要注意的是，屏幕宽高数值需除以设备像素比（DPR，即Device Pixel Ratio），否则可能导致显示异常。  
            
    如：当需要在分辨率为 2880×1800（DPR为2）的屏幕上全屏展示数据大屏时，实际应设置的屏幕宽高为1440×900，以确保画面正常铺满屏幕。

    :::

    - 背景颜色：当数据大屏无图片背景时可以调整背景颜色
    - 背景图片：支持为数据大屏上传一张图片作为背景
    - 主题模版：可以任意选择其中一个模版，但请务必先选定模版后再进行设计工作

:::info 注意

务必先选定模版后再进行设计工作。因为如果在设计完成后再修改模版，将会清空已经选择的所有组件，以避免不必要的损失和重复工作。

:::

+ 图表：设置图表的显示内容、边框信息、动画效果、刷新频率
    - 图表显示内容：展示标题、副标题、描述、标签、图例，一屏展示条数

  :::info 注意

  原图表有的内容在设置展示后展示在数据大屏，原图表没有的内容设置展示后不生效；

  :::

    - 边框信息：包括边框样式、背景颜色、边框线条颜色、展示边框标题、边框标题内容、边框标题颜色、边框标题字体大小
    - 动画效果：支持设置自动轮播，可以为轮播设置结束后停顿时长、速度、切换形式
    - 刷新频率：支持为开启自动刷新获取数据的频率、可设置刷新频率
+ 文本：可以设置内容、对齐方式、字体大小、字体加粗、字体颜色、背景颜色、边框样式、是否文字滚动、结束后停顿、速度

:::info 注意

当文字滚动开启时，文字会按照一行展示，通过设置结束后停顿和速度来控制文字滚动的效果

:::

+ 通用标题：设置内容与标题样式。若选择自定义样式，需要设置标题的字体大小、对齐方式、字体颜色、字体背景颜色等内容

:::info 注意

默认根据主题展示标题的样式，可选择自定义。

:::

+ 倒计时：需选定未来时间，可设置字体大小、颜色、背景颜色、边框样式
+ 时间器：可设置排列方式、字体大小、颜色、背景颜色、边框样式
+ 图片：需上传图片，可为图片设置链接，点击即可跳转
+ 轮播图：需按照设置的图片数量上传图片，每张图都可设置对应的链接，可设置轮播效果

:::info 注意

若选择非自动轮播模式，则需手动进行切换操作；若设置为自动轮播模式，则需指定轮播的速度及效果，以确保展示流畅且符合预期。

:::

+ 视频：需上传视频，可为视频设置链接与播放效果
+ 样式：包括边框一、二、三，以及线条、圆形、矩形的设置，可用于不使用主题模版时自定义数据大屏。可为样式中组件设置边框样式、颜色等

### 2.操作方法
选中某一组件，依据组件类型在样式栏中设置对应样式。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Data%20Visualization/Design%20of%20Big%20Data%20Screen/ys.png)

