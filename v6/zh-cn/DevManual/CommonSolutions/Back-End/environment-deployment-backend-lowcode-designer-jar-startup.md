---
title: 环境部署：后端无代码设计器Jar包启动方法
index: true
category:
  - 常见解决方案
order: 61
---

# 一、下载Oinone专属启动器
[oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip)

## （一） Mac OS平台启动
```shell
# 直接运行
./darwin-boot java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup后台运行
nohup ./darwin-boot java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## （二）Mac OS（arm64架构）平台启动
```shell
# 直接运行
./darwin-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup后台运行
nohup ./darwin-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## （三）Linux平台启动
```shell
# 直接运行
./linux-boot java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup后台运行
nohup ./linux-boot java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## （四）Linux（arm64架构）平台启动
```shell
# 直接运行
./linux-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar

# nohup后台运行
nohup ./linux-boot-arm64 java -jar ./pamirs-designer-boot-4.7.0.jar > out.log 2>&1 &
```

## （五）Windows平台启动
```shell
.\win-boot.exe java -jar .\pamirs-designer-boot-4.7.0.jar
```

# 二、说明
1. 上述命令使用的`java -jar`与常规使用方式完全相同。
2. Oinone 无代码设计器不支持使用`javaagent`参数。

# 三、常用启动脚本
```shell
#!/bin/bash

# 脚本所在目录
home=$(cd "$(dirname "$0")" && pwd)

# 启动jar路径
jarPath=$home/pamirs-designer-boot-4.7.0.jar

# 配置路径
applicationPath=$home/application.yml

# 许可证信息
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

# 四、出现`cannot execute binary file`异常该如何处理？
## （一）问题原因
`Oinone专属启动器`是通过`go语言`进行编译并执行，对于不同的操作系统架构需要分别编译。

## （二）解决方案
1. `物理机`安装`go语言`环境。
2. 下载`boot.go`文件，放在`run`目录下。（需询问`Oinone客服`获取最新`boot.go`文件）
3. 进入`run`目录，执行`go build -o "boot-starter" "boot.go"`命令。
4. 在`startup.sh`命令中添加`-v $home/run/boot-starter:/opt/pamirs/run/boot-starter \`将文件挂载到容器。
5. 删除 docker 容器后再执行`startup.sh`脚本重启镜像即可。

# 五、出现`failed to open elf at /lib64/ld-linux-x86-64.so.2`异常该如何处理？
## （一）问题原因
部分`arm64`架构的宿主机无法兼容`amd64`环境中编译的`linux-boot`启动器，需要将启动器换为`linux-boot-arm64`。

## （二）解决方案
1. 下载[oinone-boot-starter.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/install/oinone-boot-starter.zip)并解压，获取`linux-boot-arm64`启动器。
2. 将启动器放在`run`目录下。
3. 在`startup.sh`命令中添加`-v $home/run/linux-boot-arm64:/opt/pamirs/run/boot-starter`替换镜像中的启动器。
4. 删除 docker 容器后再执行`startup.sh`脚本重启镜像即可。

