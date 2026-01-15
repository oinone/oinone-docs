---
title: 可视搭建：数据可视化中图表的低无一体
index: true
category:
  - 常见解决方案
order: 3
---
# 一、概述

数据可视化提供了自定义图表模板的功能，以满足现有图表模板无法满足业务需求的情况。

# 二、如何使用

1. 点击数据可视化页面头部的“图表模板”
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e3eeaedf-20250530144825847.png)
2. 点击`创建`按钮后弹出图表模板表单，填写后提交保存
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e3f94f62-20250530144825943.png)
3. 找到刚刚创建的图表模板，点击操作栏中的“低无一体”按钮
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e4046262-20250530144826045.png)
4. 点击弹窗底部的“生成sdk”按钮
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e40eb405-20250530144826189.png)
5. 上一步操作完成后会重新刷新页面，再次找到该条数据，点击“低无一体”按钮，再次进来可以看到“下载模板工程”的按钮已经可以点击了，点击该按钮就可以下载到该自定义图表模板的示例代码包文件`kunlun-chart-sdk.zip`
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e41ad0f9-20250530144826255.png)
6. 解压`kunlun-chart-sdk.zip`后我们可以看到工程结构，在根目录下执行`npm i`安装依赖
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e427b5b3-20250530144826326.png)
7. 可以看到`packages/kunlun-plugin/src/chart/CUSTOM_BAR.vue`是我们自定义的图表vue组件，可以修改里面的自定义展示和逻辑处理
8. 完成自定义代码后去根目录运行`npm run build`打包代码，打包后可以在`packages/kunlun-plugin/dist`下看到打包后的js和css文件(如模板中无css则不会生成css文件，无需理会)
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e433c043-20250530144826461.png)
9. 回到自定义图表模板的管理页面，找到对应的数据行，再次点击“低无一体”按钮，在弹窗内上传上一步生成的`kunlun-plugin.umd.js`和`kunlun-plugin.css`文件，上传完成后点击弹窗底部的“确定”按钮保存
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e43d4ed0-20250530144826517.png)
   10. 进入图表的编辑页面，在图表分类选择处，可以看到柱状图的分类下有我们新增的“自定义柱状图”的子类，点击切换
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e447c527-20250530144826576.png)
   11. 切换后可以看到图表已经从开始柱状图变成了我们在前面自定义的蓝色边框样式，内部是`hello chart`文字的图表。
   ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/post-70-65d41e45182f2-20250530144826637.png)

# 二、示例自定义图表组件

本例子以`echarts`的图表库实现柱状图，框架自带的是以`G2`的库实现的柱状图
`demo-echarts-bar.vue`

``` vue
<template>
  <div class="data-designer-chart-instance demo-echarts-bar" ref="designerChartViewRef">
    <div class="data-designer-chart-container" ref="designerChartViewInnerRef"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import DataSet from '@antv/data-set';

  import * as echarts from 'echarts/core';
  import { ECharts, EChartsCoreOption } from 'echarts/core';
  import { GridComponent } from 'echarts/components';
  import { BarChart, BarSeriesOption } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { deepClone } from '@oinone/kunlun-dependencies';
  import {
    filterDimensionScaleColumns,
    isSameObj,
    ChartTypeEnum,
    IChartData,
    IChartDataResult,
    chartViewMixin,
    isNeedRerenderChart,
    isShowChatView,
    watchEchartsSize,
    ChartRenderEngine
  } from '@oinone/kunlun-data-designer-core';

  echarts.use([GridComponent, BarChart, CanvasRenderer]);

  export default defineComponent({
    props: {
      ...chartViewMixin.props
    },
    data() {
      return {
        engine: ChartRenderEngine.ECHARTS,
        chartType: [ChartTypeEnum.MAP_CHINA]
      };
    },
    mixins: [chartViewMixin],
    setup(props, { emit }) {
      const chart = ref<ECharts>();
      const designerChartViewRef = ref<HTMLElement>(null as any);
      const designerChartViewInnerRef = ref<HTMLElement>(null as any);
      onMounted(() => {
        initChart();
      });
      let option = {} as EChartsCoreOption;

      function initChart() {
        chart.value = echarts.init(designerChartViewInnerRef.value);
        option = {
          yAxis: {
            type: 'value'
          }
        };
      }

      let oldChartData = {} as IChartData;
      watch(
        () => props.chartData,
        (newVal) => {
          if (!newVal || !chart.value) {
            return;
          }
          if (!isNeedRerenderChart(newVal, oldChartData)) {
            oldChartData = deepClone(newVal);
            return;
          }
          render(chart.value!, newVal, props.chartDataResult);
          oldChartData = deepClone(newVal);
        },
        {
          immediate: true,
          deep: true
        }
      );
      let oldChartDataResult = {} as IChartDataResult;

      function watchDataList(chartData: IChartData, chartDataResult: IChartDataResult) {
        oldChartDataResult = deepClone(props.chartDataResult);
        if (!chart.value) {
          initChart();
        }
        render(chart.value!, chartData, chartDataResult);
      }

      // 监听数据的变动自动重新渲染
      watch(
        () => props.chartDataResult.data,
        () => {
          if (isSameObj(oldChartDataResult, props.chartDataResult)) {
            return;
          }
          if (!designerChartViewRef.value) {
            onMounted(() => {
              watchDataList(props.chartData, props.chartDataResult);
            });
          } else {
            watchDataList(props.chartData, props.chartDataResult);
          }
        },
        { immediate: true, deep: true }
      );

      /**
     * 自定义渲染逻辑
     * @param chart echarts图表对象
     * @param chartData 图表模板的定义
     * @param chartDataResult chartDataResult.data存放的是后端返回的图表数据
     */
      function render(chart: ECharts, chartData: IChartData, chartDataResult: IChartDataResult) {
        if (!isShowChatView(chartData)) {
          return;
        }
        if (!isSameObj(chartData, chartDataResult.chartData)) {
          return;
        }

        const {
          scales = [],
          dimensions = [],
        } = filterDimensionScaleColumns(chartData);

        const dataList = !scales.length || !dimensions.length ? [] : ((chartDataResult.data! || []) as any[]);

        dataList.forEach((a) => {
          if (dimensions.length && !a.name) {
            a.name = a[dimensions[0].chartField.displayName];
          }
          if (scales.length && !a.value) {
            a.value = a[scales[0].chartField.displayName] || null;
          }
        });
        const dv = new DataSet.DataView().source(dataList);

        option.xAxis = {
          type: 'category',
          data: dv.rows?.map((a) => a?.name)
        };
        option.series = [
          {
            type: 'bar',
            data: dv.rows?.map((a) => a?.value)
          } as BarSeriesOption
        ];
        chart.setOption(option);
      }

      // 监听图表容器大小
      watchEchartsSize(props, chart!);

      return { designerChartViewRef, designerChartViewInnerRef, chart };
    }
  });
</script>

```

## （一）注册该模板

``` typescript
import { ChartRenderEngine, ChartRenderType, registerChartComponent } from '@oinone/kunlun-data-designer-core';
import component from './demo-echarts-bar.vue';

registerChartComponent({
  engine: ChartRenderEngine.ECHARTS,
  render: ChartRenderType.CANVAS,
  chartTemplateCode: 'test002'
},
  {
    component
  } as any
);
```

## （三）效果展示

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/WX20240710-163839-1024x369-20250530144826749.png)

