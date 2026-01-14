---
title: 启动时：Oinone License 许可证使用常见问题
index: true
category:
  - 常见问题（faq）
order: 1
prev:
  text: 项目部署：界面设计器的导入导出
  link: /zh-cn/DevManual/CommonSolutions/Back-End/project-deployment-ui-designer-import-export.md
---
# 一、如何获取许可证？
联系数式运维人员获取许可证。（以下内容全部使用 <license.lic> 表示许可证文件路径）

+ subject：授权主体名称
+ license.lic：许可证文件

## 不同许可证类别有什么不同？
| 许可证类型 | LicenseType | 限制功能 | 适用环境 |
| --- | --- | --- | --- |
| 研发授权 | `DEVELOP` | 1.每次安装时效1天，超时后无法正常访问设计器相关功能   2.限制CPU和主板序列号或限制许可证使用人数   3.不能用于容器启动   4.有页面水印 | 开发环境（开发人员本地启动业务工程时使用该授权） |
| 伙伴授权 | `TRIAL` | 1.无安装时效限制   2.无部署环境限制   3.有页面水印 | 非生产环境（测试环境、预发环境等使用该授权） |
| 客户授权 | `BUSINESS` | 1.无安装时效限制   2.仅能部署一套生产环境   3.无页面水印 | 生产环境 |


:::info 注意：

一套环境是指共用Base库的所有JVM称为一套环境。

:::

# 二、如何配置许可证？
## （一）在`yaml`中配置许可证
### 1、单个许可证配置
```yaml
pamirs:
  license:
    subject: <subject>
    path: <license.lic>

```

### 2、多个许可证配置
```yaml
pamirs:
  license:
    subject: <subject>
    path:
      - <license1.lic>
      - <license2.lic>
```

`pamirs.license.path`可以是相对路径、绝对路径以及URL路径。

## （二）在`Program Arguments`中配置许可证
```shell
java -jar -Psubject=<subject> -Plicense=<license1.lic> -Plicense=<license1.lic> <boot.jar>
```

# 三、如何在开发中安装许可证？
将许可证放入后端运行时工作目录中即可。（一般为 idea 项目根目录）

# 四、如何在物理机生产环境安装许可证？
将许可证放入与 jar 包平级目录中即可。

# 五、如何在docker环境中安装许可证？
在 docker 运行时目录添加挂载卷映射，并在 yaml 中配置对应的路径即可。

# 六、如何获取CPU序列号和主板序列号
## （一）在Linux环境中使用`dmidecode`命令
```shell
# 获取CPU序列号
dmidecode -s system-serial-number

# CPU序列号
7*****1

# 获取主板序列号
dmidecode -s baseboard-serial-number

# 主板序列号
..CN*******V01Y7.

# 获取系统UUID
dmidecode -s system-uuid

# 系统UUID
4c4xxxxx-xxxx-xxxx-xxxx-xxxxxxxx5831
```

## （二）在Mac环境中使用`system_profiler`命令
```shell
# 获取CPU序列号
system_profiler SPHardwareDataType | grep 'Serial Number' | awk -F ':' '{print $2}'

# CPU序列号
C02******03Y

# 获取主板序列号
system_profiler SPHardwareDataType | grep 'Hardware UUID' | awk -F ':' '{print $2}'

# 主板序列号
1AAxxxxx-xxxx-xxxx-xxxx-xxxxxxxxF0FC
```

## （三）在Windows环境中使用`wmic`命令
```shell
# 获取CPU序列号
wmic cpu get processorid

# CPU序列号
BFExxxxxxxxxx6A3

# 获取主板序列号
wmic baseboard get serialnumber

# 主板序列号
PFxxxxBY

# 获取系统UUID
wmic csproduct get uuid

# 系统UUID
D0Exxxxx-xxxx-xxxx-xxxx-xxxxxxxx78B8
```

# 七、在 Linux 环境出现`dmidecode`命令执行失败该如何处理？
1. 命令未找到，可使用如下方式尝试安装

```shell
# debian (eg: Ubuntu)
apt-get install dmidecode

# rpm (eg: Fedora/CentOS/RedHat)
yum install dmidecode
```

2. 无权限执行命令，尝试切换当前执行用户或为当前用户提高执行权限

# 八、在 docker 环境出现证书安装失败该如何处理？
1. 由于 docke 环境非物理环境，不支持 CPU 序列号和主板序列号校验，尝试更换许可证。

2. 检查许可证在镜像中的位置是否与配置文件中一致。

# 九、许可证安装失败该如何处理？
## （一）日志出现`License installation failed.`信息
:::danger 警告：

对JDK版本依赖的问题已在`5.0.0`版本以上得到完整解决，此问题仅会出现在低版本的平台版本中。

:::

请检查 jdk 版本是否高于`1.8_221`以上。

如无法升级 jdk 版本的环境下，请点击下载 [jce_policy-8.zip](https://pamirs.oss-cn-hangzhou.aliyuncs.com/oinone/doc/jce_policy-8.zip) 并按照如下步骤进行操作：

+ 解压`jce_policy-8.zip`，得到两个文件`US_export_policy.jar`和`local_policy.jar`
+ 如果安装了JRE，将两个jar文件放到`%JRE_HOME%\lib\security`目录下覆盖原来的文件
+ 如果安装了JDK，将两个jar文件放到`%JDK_HOME%\jre\lib\security`目录下覆盖原来文件

## （二）启动过程中出现Spring上下文被关闭
请检查启动日志中`pamirs-lic`关键字的相关日志输出，如有许可证相关异常提示，请根据许可证规则确认是否正确使用相应许可证。

# 十、许可证安装成功，但访问出现【未经许可授权模块无法访问】该如何处理？
## （一）检查启动时许可证信息
+ `nohup java -jar boot.jar > $home/out.log 2>&1 &`启动的服务需通过查看`out.log`文件查看许可证信息。
+ `docker`启动的服务需通过`docker logs`查看许可证信息。
+ `kubernetes`启动的服务需通过`kubectl logs`查看许可证信息。

![](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/image-20250529201712947.png)

+ 检查`Type`是否为所需类型。一般用于设计器启动的许可证为`TRIAL`。
+ 检查`Modules`是否为`ALL`或`模块编码`，`ALL`表示所有设计器模块。

