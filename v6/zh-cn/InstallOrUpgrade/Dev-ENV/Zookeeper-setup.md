---
title: Zookeeper安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 6

---
# 一、下载安装包
下载地址 [https://zookeeper.apache.org/releases.html](https://zookeeper.apache.org/releases.html)

历史版本下载地址 [https://archive.apache.org/dist/zookeeper/](https://archive.apache.org/dist/zookeeper/)

推荐选择`3.5.8`及以上版本, 以下使用`3.8.4`版本进行安装。

:::info 注意

以下命令均需在 Zookeeper 的安装目录中执行。你可以通过命令 `cd <Zookeeper安装目录>` 进入该目录。
在 Linux/macOS 系统中，请使用默认终端；在 Windows 系统中，请使用 PowerShell。

:::

# 二、安装
## （一）解压
可视化工具或者使用如下命令解压

```shell
# Linux/macOS
tar zxvf apache-zookeeper-3.8.4-bin.tar.gz -C <Zookeeper安装目录>
```

Windows可以尝试使用以上命令，如果没有tar命令可使用Windows`资源管理器`进行解压缩

:::warning 提示

为了方便后续操作，可以为 Zookeeper 安装目录创建软链接。

:::

建立软链(可选)

```shell
# Linux/macOS
ln -s apache-zookeeper-3.8.4-bin zookeeper
```

```powershell
# Windows
New-Item -Path .\zookeeper\ -ItemType SymbolicLink -Target .\apache-zookeeper-3.8.4-bin
```

## （二）配置
创建数据存储目录

```powershell
# Linux/macOS/Windows
mkdir data
```

修改Zookeeper配置

```shell
# Linux/macOS
cat > ./conf/zoo.cfg << EOF
tickTime=2000
initLimit=10
syncLimit=5
dataDir=data
clientPort=2181
clientPortAddress=127.0.0.1
autopurge.snapRetainCount=3
autopurge.purgeInterval=1
admin.serverPort=8888
admin.enableServer=false
EOF
```

```shell
# Windows
Set-Content -Path ./conf/zoo.cfg -Value @(
    "tickTime=2000"
    "initLimit=10"
    "syncLimit=5"
    "dataDir=data"
    "clientPort=2181"
    "clientPortAddress=127.0.0.1"
    "autopurge.snapRetainCount=3"
    "autopurge.purgeInterval=1"
    "admin.serverPort=8888"
    "admin.enableServer=false"
)
```

# 三、运行
```shell
# Linux/macOS
./bin/zkServer.sh start
```

```powershell
# Windows
.\bin\zkServer.cmd
```

# 四、停止
```shell
# Linux/macOS
./bin/zkServer.sh stop
```

```powershell
# Windows
关闭运行的终端
```



