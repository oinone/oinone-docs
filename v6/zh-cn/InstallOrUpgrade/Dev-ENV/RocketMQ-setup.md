---
title: RocketMQ安装与注意事项
index: true
category:
  - 安装与升级
  - 环境准备
order: 5

---
# 一、下载安装包
下载地址: [https://rocketmq.apache.org/download](https://rocketmq.apache.org/download)

推荐选择`4.5.2`及以上`5.0.0`以下版本, 以下使用`4.5.2`版本进行安装。

:::info 注意

以下命令均需在 RocketMQ 的安装目录中执行。你可以通过命令 `cd <RocketMQ安装目录>` 进入该目录。
在 Linux/macOS 系统中，请使用默认终端；在 Windows 系统中，请使用 PowerShell(_**除非特殊指明使用CMD**_)。

:::

# 二、安装
## （一）解压
可视化工具或者使用如下命令解压

```shell
# Linux/macOS
unzip rocketmq-all-4.5.2-bin-release.zip -d <RocketMQ安装目录>
```

```shell
# Windows
Expand-Archive .\rocketmq-all-4.5.2-bin-release.zip <RocketMQ安装目录>
```

:::warning 提示

为了方便后续操作，可以为 RocketMQ 安装目录创建软链接。

:::

建立软链(可选)

```shell
# Linux/macOS
ln -s rocketmq-all-4.5.2-bin-release rocketmq
```

```powershell
# Windows
New-Item -Path .\rocketmq\ -ItemType SymbolicLink -Target .\rocketmq-all-4.5.2-bin-release
```

:::info 注意

在 Windows 系统中，使用 PowerShell 创建软链接可能需要以管理员权限运行 PowerShell，或者需要开启开发者模式。

:::

## （二）开发环境修改配置
:::info 注意

RocketMQ 默认的 JVM 运行时内存设置对本地开发环境来说过大，建议调整内存值以优化性能。

:::

修改NameServer运行内存

```shell
# Linux/macOS
awk '
{
    gsub(/-Xms4g -Xmx4g -Xmn2g/, "-Xms1g -Xmx1g -Xmn1g")
    if ($0 ~ /choose_gc_log_directory/) {
        count++
        if (count == 2) {
            print "#choose_gc_log_directory"
            next
        }
    }
    print
}
' ./bin/runserver.sh > ./bin/tmp && mv ./bin/tmp ./bin/runserver.sh

```

```powershell
# Windows
(Get-Content .\bin\runserver.cmd) | ForEach-Object { $_ -replace '-Xms2g -Xmx2g -Xmn1g', '-Xms1g -Xmx1g -Xmn1g' } | Set-Content .\bin\runserver.cmd
```

修改Broker运行内存

```shell
# Linux/macOS
awk '
{
    gsub(/-Xms8g -Xmx8g -Xmn4g/, "-Xms1g -Xmx1g -Xmn1g")

    if ($0 ~ /choose_gc_log_directory/) {
        count++
        if (count == 2) {
            print "#choose_gc_log_directory"
            next
        }
    }

    print
}
' ./bin/runbroker.sh > ./bin/tmp && mv ./bin/tmp bin/runbroker.sh

```

```powershell
# Windows
(Get-Content .\bin\runbroker.cmd) | ForEach-Object { $_ -replace '-Xms2g -Xmx2g -Xmn1g', '-Xms1g -Xmx1g -Xmn1g' } | Set-Content .\bin\runbroker.cmd
```

修改Broker配置

```shell
# Linux/macOS
cat > ./conf/broker.conf << EOF
brokerClusterName = DefaultCluster
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
namesrvAddr = 127.0.0.1:9876
brokerIP1 = 127.0.0.1
EOF
```

```shell
# Windows
Set-Content -Path .\conf\broker.conf -Value @(
    "brokerClusterName = DefaultCluster"
    "brokerName = broker-a"
    "brokerId = 0"
    "deleteWhen = 04"
    "fileReservedTime = 48"
    "brokerRole = ASYNC_MASTER"
    "flushDiskType = ASYNC_FLUSH"
    "namesrvAddr = 127.0.0.1:9876"
    "brokerIP1 = 127.0.0.1"
)
```

# 三、运行
Linux/macOS

```shell
# NameServer
nohup ./bin/mqnamesrv start >> ./namesrv.nohup 2>&1 &
```

```shell
# Broker
nohup ./bin/mqbroker -c ./conf/broker.conf >> ./broker.nohup 2>&1 &
```



Windows

```powershell
# NameServer
$env:ROCKETMQ_HOME = <RocketMQ安装目录>
Start-Process -FilePath ".\bin\mqnamesrv.cmd" -ArgumentList "start" -WindowStyle Hidden
```

```powershell
# Broker
$env:ROCKETMQ_HOME = <RocketMQ安装目录>
Start-Process -FilePath ".\bin\mqbroker.cmd" -ArgumentList "-c .\conf\broker.conf" -WindowStyle Hidden
```

# 四、验证
命令行输入 `jps -l`

```powershell
59205 org.apache.rocketmq.namesrv.NamesrvStartup
59306 org.apache.rocketmq.broker.BrokerStartup
```

命令行输出类似信息

# 五、停止
```shell
# Linux/macOS
./bin/mqshutdown broker
./bin/mqshutdown namesrv
```

```shell
# Windows
.\bin\mqshutdown.cmd broker
.\bin\mqshutdown.cmd namesrv
```

:::info 注意

Windows运行RocketMQ命令请在CMD中运行。

:::
