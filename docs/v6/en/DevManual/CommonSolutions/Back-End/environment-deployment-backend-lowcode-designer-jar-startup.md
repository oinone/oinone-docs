---
title: Environment Deployment:Backend No-Code Designer Jar Package Startup Method
index: true
category:
  - Common Solutions
order: 61
---

# I. Download Oinone Exclusive Starter
[oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip)

## (Ⅰ) Mac OS Platform Startup
``` shell
# Direct run
./darwin-boot java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup background run
nohup ./darwin-boot java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## (Ⅱ) Mac OS (arm64 Architecture) Platform Startup
``` shell
# Direct run
./darwin-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup background run
nohup ./darwin-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## (Ⅲ) Linux Platform Startup
``` shell
# Direct run
./linux-boot java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup background run
nohup ./linux-boot java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## (Ⅳ) Linux (arm64 Architecture) Platform Startup
``` shell
# Direct run
./linux-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup background run
nohup ./linux-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## (Ⅴ) Windows Platform Startup
``` shell
.\win-boot.exe java -jar .\pamirs-designer-boot-4.7.0.jar
```

# II. Instructions
1. The `java -jar` command used above is exactly the same as the conventional usage.
2. The Oinone no-code designer does not support the use of `javaagent` parameters.

# III. Common Startup Scripts
``` shell
#!/bin/bash

# Directory where the script is located
home=$(cd "$(dirname "$0")" && pwd)

# Startup jar path
jarPath=$home/pamirs-designer-boot-4.7.0.jar

# Configuration path
applicationPath=$home/application.yml

# License information
subject=
licensePath=

nohup $home/linux-boot java -Duser.timezone=GMT+08:00 -Dhttps.protocols=TLSv1.2 -Dfile.encoding=UTF-8 \
  -jar $jarPath \
  --spring.config.location=$applicationPath \
  -Psubject=$subject \
  -Plicense=$licensePath \
  -Plifecycle=INSTALL > $home/out.log 2>&1  &

sleep 1

tail -200f $home/out.log
```

# IV. How to Handle the "cannot execute binary file" Exception?
## (Ⅰ) Problem Cause
The `Oinone exclusive starter` is compiled and executed using `Go language`, which requires separate compilation for different operating system architectures.

## (Ⅱ) Solution
1. Install the `Go language` environment on the physical machine.
2. Download the `boot.go` file and place it in the `run` directory. (You need to ask `Oinone customer service` for the latest `boot.go` file)
3. Enter the `run` directory and execute the command `go build -o "boot-starter" "boot.go"`.
4. Add `-v $home/run/boot-starter:/opt/pamirs/run/boot-starter \` to the `startup.sh` command to mount the file to the container.
5. Delete the docker container and then execute the `startup.sh` script to restart the image.

# V. How to Handle the "failed to open elf at /lib64/ld-linux-x86-64.so.2" Exception?
## (Ⅰ) Problem Cause
Some `arm64` architecture hosts cannot be compatible with the `linux-boot` starter compiled in the `amd64` environment, and the starter needs to be replaced with `linux-boot-arm64`.

## (Ⅱ) Solution
1. Download [oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip) and unzip it to obtain the `linux-boot-arm64` starter.
2. Place the starter in the `run` directory.
3. Add `-v $home/run/linux-boot-arm64:/opt/pamirs/run/boot-starter` to the `startup.sh` command to replace the starter in the image.
4. Delete the docker container and then execute the `startup.sh` script to restart the image.