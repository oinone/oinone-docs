---
title: 环境部署：中标麒麟(mips64架构)部署设计器
index: true
category:
  - 常见解决方案
order: 60
---

# 一、软硬件情况
1、服务器软硬件情况

硬件情况：信创国产服务器，龙芯CPU（loongson）, mips64架构

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746697045346-6fc33b5b-a6f1-4209-a19e-815b6428fadc-20250530144825491.png)

2、部署方式：目前提供的设计器镜像包，不包含mips架构的镜像包，因此只能通过Jar方式部署设计器。

# 二、中间件安装
+ 手动安装中间件，需安装的中间件列表：

```graphql
1、go的运行环境
2、java1.8        版本：1.8_221+
3、MySQL          版本：8.0+
4、redis          版本：4.x、5.x都可以
5、ZooKeeper      版本：3.5.8+
6、RocketMQ       版本：4.x版本，建议4.7.x
7、nginx          版本无要求
```

+ 银河麒麟（中标麒麟）是在CentOS上衍生的，CentOS的包管理器为yum。

## （一）安装GO运行环境
golang官网：https://golang.google.cn/dl/ 提供了mips64架构的包；

## （二）安装JDK
```shell
sudo yum update

# 使用yum命令来列出所有可用的JDK包
yum list java-1.8*

# 执行安装
sudo yum install java-1.8.xxx
```

支持 mips64 架构的 jdk8 的版本为 1.8_181，Oinone 需要的 JDK1.8.221+ 低于这个版本需要覆盖 JCE，解决加解密密匙128限制问题。

## （三）安装 Redis 和 nginx
安装方式跟安装jdk方式类似，直接通过yum进行安装；

## （四）安装 ZooKeeper 和 RocketMQ
上面的第二步 Java8 环境已经安装好，ZooKeeper 和 RocketMQ 按照正常的版本安装即可

## （五）安装 MySQL
###  1、MySQL 8.x版本安装尝试
+ MySQL 官方未提供 mips64 架构的安装包，需要自行编译解决。
+ 最开始尝试下载 MySQL8.0 的包，下载的时候下面两个选择( Operating System 和 OS Version)，参照下面截图中的设置

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729518982364-b17a0de8-84ec-466f-b761-212d63f2a492-20250530144825507.png)从8.0.11到8.0.40都尝试过，都不行。编译过程中不是 GCC+ 版本不对，就是 cmake(cmake3) 的版本不对；依赖的这两个组件支持 mips64 架构的版本都低于编译 MySQL8.0.X 的要求

2）安装 MarriDB，通过 yum 安装能成功，但是 MySQL 的版本很低，只有5.5.15（2011年的版本）

### 2、编译安装 MySQL5.7(mips64架构)
编译MySQL5.7 ，内容来自【腾讯云】-【开发者社区】，具体链接：[源码编译安装MySQL（银河麒麟v10 mips架构）](https://cloud.tencent.com/developer/article/2434623)

#### 上传源码包并解压
源码包请 选择自带 boost 的版本，例如：mysql-boost-5.7.33.tar.gz，我的路径是/opt/softapp/下

```bash
tar -zxvf mysql-boost-5.7.33.tar.gz
cd mysql-5.7.33/
```

#### 编译 mysql 源代码
注意下面的脚本中 DWITH_BOOST 需要改成自己本地的源码路径，请根据实际情况修改

```bash
cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DSYSCONFDIR=/etc \
-DWITH_MYISAM_STORAGE_ENGINE=1 \
-DWITH_INNOBASE_STORAGE_ENGINE=1 \
-DWITH_ARCHIVE_STORAGE_ENGINE=1 \
-DWITH_BLACKHOLE_STORAGE_ENGINE=1 \
-DWITH_PARTITION_STORAGE_ENGINE=1 \
-DWITH_FEDERATED_STORAGE_ENGINE=1 \
-DWITH_MEMORY_STORAGE_ENGINE=1 \
-DDEFAULT_STORAGE_ENGINE=InnoDB \
-DWITH_SSL=system \
-DWITH_ZLIB=system \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_EMBEDDED_SERVER=1 \
-DENABLE_DOWNLOADS=1 \
-DWITH_EXTRA_CHARSETS=all \
-DWITH_READLINE=1 \
-DWITH_SYSTEMD=1 \
-DWITH_BOOST=/opt/softapp/mysql-5.7.33/boost/boost_1_59_0
```

#### **创建数据库用户和数据目录**
```bash
useradd -M -s /sbin/nologin -r mysql
mkdir -p /usr/local/mysql/data
chown -R mysql.mysql /usr/local/mysql/
```

#### 执行 Make 安装
```bash
make
sudo make install
```

#### 配置文件my.cnf
```bash
mv  /etc/my.cnf  /etc/my.cnf.bak
vim /etc/my.cnf
```

在腾讯云-开发社区配置的基础上增加了两项：

1）区分大小写： lower_case_table_names=2

2）默 认 时 区： default-time-zone = '+08:00'

```bash
[mysql]
default-character-set=utf8

[mysqld]
port=3306
user=mysql
general_log = 1
general_log_file= /var/log/mysql/mysql.log
socket=/var/log/mysql/mysql.sock
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
bind-address = 0.0.0.0
default_storage_engine = InnoDB
character-set-server=utf8
collation-server=utf8_general_ci
lower_case_table_names=2
autocommit=1
symbolic-links=0
skip-networking = 0
log-error=/var/log/mysql/mysql_err.log
pid-file=/var/log/mysql/mysql.pid
default-time-zone = '+08:00'
```

#### 配置启动脚本
```bash
cd /etc/systemd/system
vim mysqld.service
```

```bash
[Unit]
Description=MySQL DBMS

[Service]
LimitNOFILE=10000
Type=simple
User=mysql
Group=mysql
PIDFile=/usr/local/mysql/mysqld.pid
ExecStart=/usr/local/mysql/bin/mysqld --datadir=/usr/local/mysql/data
ExecStop=/bin/kill -9 $MAINPID

[Install]
WantedBy=multi-user.target
```

#### 添加权限并设置开机启动
```bash
chmod +x mysqld.service
systemctl enable mysqld.service
```

#### 初始化数据库
空密码，如果需要临时密码，把-insecure参数去掉

```bash
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
```

初始化报错

```plain
[root@localhost system]# /usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
2024-07-07T06:24:46.415658Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2024-07-07T06:24:46.433398Z 0 [ERROR] Could not open file '/var/log/mysql/mysql_err.log' for error logging: No such file or directory
2024-07-07T06:24:46.433548Z 0 [ERROR] Aborting
```

解决：创建文件

```bash
mkdir  /var/log/mysql
touch /var/log/mysql/mysql_err.log
chown -R mysql:mysql /var/log/mysql
```

初始化成功

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729519843649-8b7eb029-1c8b-4a05-b21b-089d1829088c-20250530144825526.png)

#### 启动MySQL
```bash
systemctl start mysqld
```

#### 登录MySQL
无密码，输入密码的时候直接回车即可

```bash
mysql -u root -p
```

结果（登录成功）

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729519892747-20a37465-eccf-461a-9565-200b018b3d4c-20250530144825545.png)

#### 修改密码和允许外部连接
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
```

```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password' WITH GRANT OPTION;
```

# 三、Jar 方式启动设计器后端
参考文档：后端无代码设计器 Jar 包启动方法

# 四、Nginx 部署设计器前端
+ 需询问`Oinone客服`获取与后端设计器 Jar 包匹配的前端 dist 资源包；讲 dist 包上传到服务器上，用 Nginx 启动即可。
+ Nginx 的配置如下：

```nginx
server {
  # 根据实际详情修改
  listen 8090;
  # 根据实际详情修改
  server_name 127.0.0.1;

  location / {
    # 根据实际详情修改(前端dist文件对应的路径)
    root /Users/admin/nginx/html/mis/v3/dist;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }

  location /pamirs {
    # 根据实际详情修改(后端接口地址)
    proxy_pass http://127.0.0.1:8191;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

+ 配置修改保存后，执行启动或者重启生效；
+ nginx 可配置 gzip 等，跟正常的配置类似，这里不在赘述















