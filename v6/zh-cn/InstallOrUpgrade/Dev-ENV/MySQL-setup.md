---
title: MySQL安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 7

---
# 安装MySQL数据库
如果没有现成的数据库，可自行到官网下载安装：[https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

:::warning 提示

+ 以下示例展示的是手动安装的操作流程。
+ 下载时请注意选择与你的操作系统及 CPU 指令集架构（如 x64、arm64）相匹配的版本。
以下安装过程以版本号为 8.0.42、架构为 arm64 的版本为例进行说明。
+ 在 Linux/macOS 系统中，请使用默认终端；在 Windows 系统中，请使用 PowerShell(_**除非特殊指明使用CMD**_)。

:::

# 一、版本选择
## （一）macOS


<table>
  <tr>
    <td>Arm64</td>
    <td><img src="https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/MySQL/1.png"  width="700"></td>
  </tr>
  <tr>
    <td>Amd64</td>
    <td><img src="https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/MySQL/2.png"  width="700"></td>
  </tr>
</table>


## （二）Linux
### 1、获取glibc版本


```properties
ldd --version
```

输出类似信息

```properties
ldd (Debian GLIBC 2.36-9+deb12u10) 2.36
Copyright (C) 2022 自由软件基金会。这是一个自由软件；请见源代码的授权条款。本软件不含任何没有担保；甚至不保证适销性或者适合某些特殊目的。由 Roland McGrath 和 Ulrich Drepper 编写。
```

 选择与系统安装`glibc`相近的版本。
 ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/MySQL/3.png)

### 2、安装依赖
安装`libaio`依赖

| 包管理器 | 运行命令 |
| --- | --- |
| apt | _apt-cache__ search libaio1 & __apt-get__ install libaio1_ |
| yum | _yum__ search libaio & __yum__ install libaio_ |


## （三）Windows
![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Installation-and-Upgrade/Preparing-the-development-environment/MySQL/4.png)

# 二、安装
## （一）解压
解压到当前目录，为了方便操作可选择性建立软链

```shell
# macOS
tar zxvf mysql-8.0.42-macos15-arm64.tar.gz -C ./
# 建立软链
ln -s mysql-8.0.42-macos15-arm64 mysql
```

```shell
# Linux
tar Jxvf mysql-8.0.42-linux-glibc2.28-aarch64.tar.xz -C ./
# 建立软链
ln -s mysql-8.0.42-linux-glibc2.28-aarch64 mysql
```

```powershell
# Windows
Expand-Archive .\mysql-8.0.42-winx64.zip .\
# 建立软链
New-Item -Path .\mysql\ -ItemType SymbolicLink -Target .\mysql-8.0.42-winx64\
```

## （二）配置
macOS/Linux

```sql
# my.cnf
[mysqld]
# 表名存储与大小写敏感
lower-case-table-names      = 1
# 默认时区
default-time-zone           = '+08:00'
```

Windows

```sql
# my.ini
[mysqld]
# 表名存储与大小写敏感
lower-case-table-names      = 1
# 默认时区
default-time-zone           = '+08:00'
```

## （三）安装
```shell
# macOS
# 修改二进制文件运行权限
xattr -r -d com.apple.quarantine mysql-8.0.42-macos15-arm64
# 命令行进入mysql安装目录
cd mysql-8.0.42-macos15-arm64
# 初始化mysql服务
./bin/mysqld --defaults-file=my.cnf --initialize
```

```shell
# Linux
# 添加系统用户组
groupadd mysql
# 添加系统用户
useradd -r -g mysql -s /bin/false mysql
# 命令行进入mysql安装目录
cd mysql-8.0.42-linux-glibc2.28-aarch64
# 创建mysql支持文件目录并授权
mkdir mysql-files
chown mysql:mysql mysql-files
chmod 750 mysql-files
# 初始化mysql服务
./bin/mysqld --defaults-file=my.cnf --initialize --user=mysql
```

```powershell
# Windows
# 命令行进入mysql安装目录
cd mysql-8.0.42-winx64
# 初始化mysql服务
.\bin\mysqld.exe --defaults-file=my.ini --initialize --console
```

## （四）修改root密码
### 1、默认密码
在命令中运行初始化mysql服务命令之后会输出类似信息。

```shell
2025-04-27T03:17:38.853843Z 0 [System] [MY-013169] [Server] /Volumes/sm/build/mysql-8.0.42-macos15-arm64/bin/mysqld (mysqld 8.0.42) initializing of server in progress as process 9742
2025-04-27T03:17:38.855773Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /Volumes/sm/build/mysql-8.0.42-macos15-arm64/data/ is case insensitive
2025-04-27T03:17:38.859938Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2025-04-27T03:17:39.099986Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2025-04-27T03:17:40.096072Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: .u_p9JUy53Aj
2025-04-27T03:17:40.466111Z 0 [System] [MY-013172] [Server] Received SHUTDOWN from user <via user signal>. Shutting down mysqld (Version: 8.0.42).
```

在输出信息中包含了默认生成的 root 密码。
请注意，在信息中 `A temporary password is generated for root@localhost:` 后面的内容即为默认的 root 密码。

### 2、启动MySQL服务
```properties
# macOS
nohup ./bin/mysqld --defaults-file=my.cnf >> mysql.nohup 2>&1 &
```

```properties
# Linux
nohup ./bin/mysqld --defaults-file=my.cnf --user=mysql >> mysql.nohup 2>&1 &
```

```powershell
# Windows
.\bin\mysqld.exe --defaults-file=my.ini
```

### 3、登录命令行客户端
```properties
# macOS/Linux
./bin/mysql -uroot -p
```

```powershell
# Windows
.\bin\mysql.exe -uroot -p
```

输入上文日志中输出的密码进行登录

### 4、修改密码
修改密码为`shushi@2019`

:::info 注意

此为示例密码，可随个人习惯修改密码。

:::

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'shushi@2019';
```

至此MySQL服务安装成功。

# 三、停止
:::info 注意

命令中为示例密码，可替换为个人修改的密码。

:::

```shell
# macOS/Linux
./bin/mysqladmin shutdown -uroot -pshushi@2019
```

```powershell
# Windows
.\bin\mysqladmin.exe shutdown -uroot -pshushi@2019
```



# 四、数据库配置常见问题
## （一）允许远程连接
```sql
# 打开远程连接
use mysql;
update user set host='%' where user='root';
flush privileges;
quit;
```

:::info 注意：如有其他环境配合体验，网络需互通

安装成功，大家可以使用自己的工具去测试一下看能不能连上，如果连不上看下是不是开了防火墙。

:::

## （二）时区问题
```plsql
# 修改：my.cnf (macOS ) / my.ini (windows)
default-time-zone= '+08:00'
```

:::info 注意：如果出现时区问题会报以下错误

error creating bean with name 'dataSourceAutoRefreshManager': Invocation of init method failed; nested exception is PamirsException level: ERROR, code: 10150008, type: SYSTEM_ERROR, msg: 创建数据库错误, extra:, extend: null

Caused by: java.sql.SQLException: The server time zone value 'й ʱ' is unrecognized or represents more than one time zone. You must configure either the server or JDBC driver (via the serverTimezone configuration property) to use a more specifc time zone value if you want to utilize time zone support.

:::


如何验证default-time-zone参数是否生效？登录 MySQL 后，执行以下 SQL 命令：

```sql
SELECT @@global.time_zone, @@session.time_zone;
```

#### **预期结果**

+ 若配置成功，`@@global.time_zone` 会显示你设置的值（如 `'+8:00'` 或 `'Asia/Shanghai'`）。
+ `@@session.time_zone` 通常显示 `SYSTEM`（表示使用全局设置），或者显示与全局时区相同的值。


