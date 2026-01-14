---
title: 场景应用：Excel添加水印功能
index: true
category:
  - 常见解决方案
order: 5
---

# 一、场景描述
实现`ExcelWriteHandlerExtendApi`接口从而实现对 Excel 增加复杂功能的操作。如添加水印。

```java

/**
 * 根据上下文判断是否执行
 *
 * @param context Excel定义上下文
 * @return 是否执行该扩展
 */
boolean match(ExcelDefinitionContext context);

/**
 * 构建出一个WriteWorkbook对象，即一个工作簿对象，对应的是一个Excel文件；
 *
 * @param builder 可用于设置inMemory=true实现复杂功能（如添加水印）
 */
default void extendBuilder(ExcelWriterBuilder builder) {
}
```

本文主要介绍如何给Excel添加水印

本例参考文章：[Java使用EasyExcel导出添加水印](https://blog.csdn.net/iloveyouwh/article/details/131851920)

# 二、实现`ExcelWriteHandlerExtendApi`接口
添加依赖包

```xml
<!-- eaysexcel -->
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>easyexcel</artifactId>
  <version>3.3.2</version>
</dependency>
<!-- poi 添加水印 -->
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>ooxml-schemas</artifactId>
  <version>1.4</version>
</dependency>
<!-- 使用了hutool的工具类 -->
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-all</artifactId>
  <version>5.8.20</version>
</dependency>

```



```java
package pro.shushi.pamirs.top.core.temp;

import cn.hutool.core.img.ImgUtil;
import com.alibaba.excel.write.builder.ExcelWriterBuilder;
import com.alibaba.excel.write.metadata.holder.WriteSheetHolder;
import com.alibaba.excel.write.metadata.holder.WriteWorkbookHolder;
import org.apache.poi.openxml4j.opc.PackagePartName;
import org.apache.poi.openxml4j.opc.PackageRelationship;
import org.apache.poi.openxml4j.opc.TargetMode;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFPictureData;
import org.apache.poi.xssf.usermodel.XSSFRelation;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import pro.shushi.pamirs.file.api.context.ExcelDefinitionContext;
import pro.shushi.pamirs.file.api.easyexcel.ExcelWriteHandlerExtendApi;

import java.awt.*;
import java.awt.image.BufferedImage;

@Component
public class CustomWaterMarkHandler implements ExcelWriteHandlerExtendApi {

    private final WaterMark watermark;

    public CustomWaterMarkHandler() {
        this.watermark = new WaterMark().setContent("ABC");
    }

    @Override
    public void extendBuilder(ExcelWriterBuilder builder) {
        builder.inMemory(true);
    }

    @Override
    public boolean match(ExcelDefinitionContext context) {
        return DemoTemplate.TEMPLATE_NAME.equals(context.getName());
    }

    @Override
    public void afterSheetCreate(WriteWorkbookHolder writeWorkbookHolder, WriteSheetHolder writeSheetHolder) {
        try {
            BufferedImage bufferedImage = createWatermarkImage();
            setWaterMarkToExcel((XSSFWorkbook) writeWorkbookHolder.getWorkbook(), bufferedImage);
        } catch (Exception e) {
            throw new RuntimeException("添加水印出错",e);
        }
    }

    private BufferedImage createWatermarkImage() {
        final Font font = watermark.getFont();
        final int width = watermark.getWidth();
        final int height = watermark.getHeight();

        String[] textArray = watermark.getContent().split(",");
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // 背景透明 开始
        Graphics2D g = image.createGraphics();
        image = g.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
        g.dispose();
        // 背景透明 结束
        g = image.createGraphics();
        // 设定画笔颜色
        g.setColor(new Color(Integer.parseInt(watermark.getColor().substring(1), 16)));
        // 设置画笔字体
        g.setFont(font);
        // 设定倾斜度
        g.shear(watermark.getShear1(), watermark.getShear2());

        // 设置字体平滑
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int y = watermark.getYAxis();
        for (String s : textArray) {
            // 从画框的y轴开始画字符串.假设电脑屏幕中心为0，y轴为正数则在下方
            g.drawString(s, 0, y);
            y = y + font.getSize();
        }

        // 释放画笔
        g.dispose();
        return image;
    }

    private void setWaterMarkToExcel(XSSFWorkbook workbook, BufferedImage bfi) {
        //将图片添加到工作簿
        int pictureIdx = workbook.addPicture(ImgUtil.toBytes(bfi, ImgUtil.IMAGE_TYPE_PNG), Workbook.PICTURE_TYPE_PNG);
        //建立 sheet 和 图片 的关联关系
        XSSFPictureData xssfPictureData = workbook.getAllPictures().get(pictureIdx);
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
            XSSFSheet xssfSheet = workbook.getSheetAt(i);
            PackagePartName packagePartName = xssfPictureData.getPackagePart().getPartName();
            PackageRelationship packageRelationship = xssfSheet.getPackagePart()
            .addRelationship(packagePartName, TargetMode.INTERNAL, XSSFRelation.IMAGES.getRelation(), null);
            //添加水印到工作表
            xssfSheet.getCTWorksheet().addNewPicture().setId(packageRelationship.getId());
        }
    }

}


```

# 三、水印配置类
```java
/**
 * 水印配置类
 */
@Data
@Component
public class WaterMark {
    /**
     * 水印内容
     */
    private String content = "";

    /**
     * 画笔颜色. eg:#C5CBCF
     */
    private String color = "#C5CBCF";

    /**
     * 字体颜色
     */
    private Font font = new Font("microsoft-yahei", Font.PLAIN, 20);

    /**
     * 水印宽、高
     */
    private int width = 300;
    private int height = 100;

    /**
     * 倾斜度
     */
    private double shear1 = 0.1;
    private double shear2 = -0.26;

    /**
     * 字体的y轴位置
     */
    private int yAxis = 50;
}
```

