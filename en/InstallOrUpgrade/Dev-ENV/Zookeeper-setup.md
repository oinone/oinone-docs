---
title: Zookeeper Setup
index: true
category:
  - Installation and Upgrade
  - Environment Preparation
order: 6

---
# I. Download Installation Package
Download address: [https://zookeeper.apache.org/releases.html](https://zookeeper.apache.org/releases.html)

Historical version download address: [https://archive.apache.org/dist/zookeeper/](https://archive.apache.org/dist/zookeeper/)

It is recommended to select versions 3.5.8 and above. The 3.8.4 version is used for installation below.

:::info Note

The following commands need to be executed in the Zookeeper installation directory. You can enter the directory by the command `cd <Zookeeper installation directory>`.
On Linux/macOS systems, use the default terminal; on Windows systems, use PowerShell.

:::

# II. Installation
## (I) Unzip
Use visualization tools or the following commands to unzip:

```shell
# Linux/macOS
tar zxvf apache-zookeeper-3.8.4-bin.tar.gz -C <Zookeeper installation directory>
```

Windows can try the above command. If there is no tar command, use Windows Explorer to unzip.

:::warning Prompt

For the convenience of subsequent operations, a soft link can be created for the Zookeeper installation directory.

:::

Create a soft link (optional):

```shell
# Linux/macOS
ln -s apache-zookeeper-3.8.4-bin zookeeper
```

```powershell
# Windows
New-Item -Path .\zookeeper\ -ItemType SymbolicLink -Target .\apache-zookeeper-3.8.4-bin
```

## (II) Configuration
Create a data storage directory:

```powershell
# Linux/macOS/Windows
mkdir data
```

Modify the Zookeeper configuration:

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

# III. Run
```shell
# Linux/macOS
./bin/zkServer.sh start
```

```powershell
# Windows
.\bin\zkServer.cmd
```

# IV. Stop
```shell
# Linux/macOS
./bin/zkServer.sh stop
```

```powershell
# Windows
Close the running terminal
```