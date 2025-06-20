---
title: Environment Deployment：Deploy Designer on NeoKylin (mips64 Architecture)
index: true
category:
  - Common Solutions
order: 60
---

# 1. Hardware and Software Overview
1. Server Hardware and Software Overview

Hardware Overview: Domestic信创 (IT application innovation) server, Loongson CPU, mips64 architecture

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1746697045346-6fc33b5b-a6f1-4209-a19e-815b6428fadc-20250530144825491.png)

2. Deployment Method: The currently provided designer image package does not include an image package for the mips architecture, so the designer can only be deployed via the Jar method.

# 2. Middleware Installation
+ Manual middleware installation requires the following middleware list:

```graphql
1. Go runtime environment
2. Java 1.8        Version: 1.8_221+
3. MySQL           Version: 8.0+
4. Redis           Version: 4.x or 5.x
5. ZooKeeper       Version: 3.5.8+
6. RocketMQ        Version: 4.x, recommended 4.7.x
7. Nginx           No version requirement
```

+ NeoKylin is derived from CentOS, and CentOS uses yum as the package manager.

## (1) Install GO Runtime Environment
The golang official website: https://golang.google.cn/dl/ provides packages for the mips64 architecture.

## (2) Install JDK
```shell
sudo yum update

# Use the yum command to list all available JDK packages
yum list java-1.8*

# Execute installation
sudo yum install java-1.8.xxx
```

The JDK8 version supporting the mips64 architecture is 1.8_181. Since Oinone requires JDK1.8.221+, which is lower than this version, the JCE needs to be overridden to solve the 128-bit encryption key limitation issue.

## (3) Install Redis and Nginx
The installation method is similar to that of JDK, directly installed via yum.

## (4) Install ZooKeeper and RocketMQ
The Java 8 environment has been installed in the second step, and ZooKeeper and RocketMQ can be installed according to normal versions.

## (5) Install MySQL
### 1. Attempt to Install MySQL 8.x Version
+ The MySQL official website does not provide an installation package for the mips64 architecture, which needs to be compiled manually.
+ Initially tried to download the MySQL 8.0 package, and the following two options (Operating System and OS Version) were set with reference to the screenshot below:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729518982364-b17a0de8-84ec-466f-b761-212d63f2a492-20250530144825507.png)Attempts were made from 8.0.11 to 8.0.40, but none worked. During the compilation process, either the GCC+ version was incorrect or the cmake (cmake3) version was incorrect; the versions of these two dependent components supporting the mips64 architecture are all lower than the requirements for compiling MySQL8.0.X.

2) Installing MarriDB via yum was successful, but the MySQL version was very low, only 5.5.15 (2011 version).

### 2. Compile and Install MySQL5.7 (mips64 Architecture)
The content of compiling MySQL5.7 comes from [Tencent Cloud] - [Developer Community], specific link: [Source Code Compilation and Installation of MySQL (Galaxy Kirin v10 mips Architecture)](https://cloud.tencent.com/developer/article/2434623)

#### Upload and Extract the Source Package
Please select a version with built-in boost for the source package, such as: mysql-boost-5.7.33.tar.gz, my path is under /opt/softapp/

```bash
tar -zxvf mysql-boost-5.7.33.tar.gz
cd mysql-5.7.33/
```

#### Compile the MySQL Source Code
Note that the DWITH_BOOST in the following script needs to be changed to your local source code path, please modify it according to the actual situation.

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

#### Create Database User and Data Directory
```bash
useradd -M -s /sbin/nologin -r mysql
mkdir -p /usr/local/mysql/data
chown -R mysql.mysql /usr/local/mysql/
```

#### Execute Make Installation
```bash
make
sudo make install
```

#### Configuration File my.cnf
```bash
mv  /etc/my.cnf  /etc/my.cnf.bak
vim /etc/my.cnf
```

Two items are added based on the configuration from Tencent Cloud - Developer Community:

1) Case sensitivity: lower_case_table_names=2

2) Default time zone: default-time-zone = '+08:00'

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

#### Configure Startup Script
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

#### Add Permissions and Set to Start on Boot
```bash
chmod +x mysqld.service
systemctl enable mysqld.service
```

#### Initialize the Database
No password, if a temporary password is needed, remove the -insecure parameter.

```bash
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
```

Initialization error:

```plain
[root@localhost system]# /usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
2024-07-07T06:24:46.415658Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2024-07-07T06:24:46.433398Z 0 [ERROR] Could not open file '/var/log/mysql/mysql_err.log' for error logging: No such file or directory
2024-07-07T06:24:46.433548Z 0 [ERROR] Aborting
```

Solution: Create the file

```bash
mkdir  /var/log/mysql
touch /var/log/mysql/mysql_err.log
chown -R mysql:mysql /var/log/mysql
```

Successful initialization:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729519843649-8b7eb029-1c8b-4a05-b21b-089d1829088c-20250530144825526.png)

#### Start MySQL
```bash
systemctl start mysqld
```

#### Log in to MySQL
No password, press Enter directly when entering the password.

```bash
mysql -u root -p
```

Result (successful login):

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/1729519892747-20a37465-eccf-461a-9565-200b018b3d4c-20250530144825545.png)

#### Modify Password and Allow External Connections
```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;
```

```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password' WITH GRANT OPTION;
```

# 3. Start the Designer Backend via Jar
Refer to the documentation: Backend Code-Free Designer Jar Package Startup Method.

# 4. Deploy Designer Frontend with Nginx
+ You need to ask the `Oinone customer service` for the frontend dist resource package that matches the backend designer Jar package; upload the dist package to the server and start it with Nginx.
+ Nginx configuration is as follows:

```nginx
server {
  # Modify according to actual details
  listen 8090;
  # Modify according to actual details
  server_name 127.0.0.1;

  location / {
    # Modify according to actual details (path corresponding to frontend dist file)
    root /Users/admin/nginx/html/mis/v3/dist;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }

  location /pamirs {
    # Modify according to actual details (backend interface address)
    proxy_pass http://127.0.0.1:8191;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

+ After modifying and saving the configuration, execute startup or restart to take effect;
+ Nginx can be configured with gzip, etc., similar to normal configuration, which is not repeated here.