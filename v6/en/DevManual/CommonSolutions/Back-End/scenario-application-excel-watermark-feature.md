---
title: Scenario Application:Excel Watermark Addition Functionality
index: true
category:
  - Common Solution Approaches
order: 5
---

# I. Scenario Description
Implement the `ExcelWriteHandlerExtendApi` interface to achieve operations for adding complex functionalities to Excel, such as adding watermarks.

```java

/**
 * Determine whether to execute based on the context
 *
 * @param context Excel definition context
 * @return Whether to execute this extension
 */
boolean match(ExcelDefinitionContext context);

/**
 * Construct a WriteWorkbook object, i.e., a workbook object corresponding to an Excel file;
 *
 * @param builder Can be used to set inMemory=true to implement complex functionalities (such as adding watermarks)
 */
default void extendBuilder(ExcelWriterBuilder builder) {
}
```

This article mainly introduces how to add watermarks to Excel.

This example refers to the article: [Java Uses EasyExcel to Export with Watermark Addition](https://blog.csdn.net/iloveyouwh/article/details/131851920)

# II. Implementing the `ExcelWriteHandlerExtendApi` Interface
Add dependency packages

```xml
<!-- eaysexcel -->
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>easyexcel</artifactId>
  <version>3.3.2</version>
</dependency>
<!-- poi for adding watermarks -->
<dependency>
  <groupId>org.apache.poi</groupId>
  <artifactId>ooxml-schemas</artifactId>
  <version>1.4</version>
</dependency>
<!-- Using hutool utility classes -->
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
            throw new RuntimeException("Error adding watermark", e);
        }
    }

    private BufferedImage createWatermarkImage() {
        final Font font = watermark.getFont();
        final int width = watermark.getWidth();
        final int height = watermark.getHeight();

        String[] textArray = watermark.getContent().split(",");
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // Start of transparent background
        Graphics2D g = image.createGraphics();
        image = g.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
        g.dispose();
        // End of transparent background
        g = image.createGraphics();
        // Set brush color
        g.setColor(new Color(Integer.parseInt(watermark.getColor().substring(1), 16)));
        // Set brush font
        g.setFont(font);
        // Set skewness
        g.shear(watermark.getShear1(), watermark.getShear2());

        // Set font smoothing
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        int y = watermark.getYAxis();
        for (String s : textArray) {
            // Draw the string starting from the y-axis of the drawing frame. Assume the center of the computer screen is 0, and a positive y-axis is below
            g.drawString(s, 0, y);
            y = y + font.getSize();
        }

        // Release the brush
        g.dispose();
        return image;
    }

    private void setWaterMarkToExcel(XSSFWorkbook workbook, BufferedImage bfi) {
        // Add the image to the workbook
        int pictureIdx = workbook.addPicture(ImgUtil.toBytes(bfi, ImgUtil.IMAGE_TYPE_PNG), Workbook.PICTURE_TYPE_PNG);
        // Establish the association between the sheet and the image
        XSSFPictureData xssfPictureData = workbook.getAllPictures().get(pictureIdx);
        for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
            XSSFSheet xssfSheet = workbook.getSheetAt(i);
            PackagePartName packagePartName = xssfPictureData.getPackagePart().getPartName();
            PackageRelationship packageRelationship = xssfSheet.getPackagePart()
            .addRelationship(packagePartName, TargetMode.INTERNAL, XSSFRelation.IMAGES.getRelation(), null);
            // Add watermark to the worksheet
            xssfSheet.getCTWorksheet().addNewPicture().setId(packageRelationship.getId());
        }
    }

}


```

# III. Watermark Configuration Class
```java
/**
 * Watermark configuration class
 */
@Data
@Component
public class WaterMark {
    /**
     * Watermark content
     */
    private String content = "";

    /**
     * Brush color. eg:#C5CBCF
     */
    private String color = "#C5CBCF";

    /**
     * Font color
     */
    private Font font = new Font("microsoft-yahei", Font.PLAIN, 20);

    /**
     * Watermark width and height
     */
    private int width = 300;
    private int height = 100;

    /**
     * Skewness
     */
    private double shear1 = 0.1;
    private double shear2 = -0.26;

    /**
     * Y-axis position of the font
     */
    private int yAxis = 50;
}
```