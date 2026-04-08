---
title: RocketMQ Setup
index: true
category:
  - installation and upgrade
  - Environmental preparation
order: 5
---

# Ⅰ. Download the Installation Package

Download: [https://rocketmq.apache.org/download](https://rocketmq.apache.org/download)

It is recommended to use versions `4.5.2` and above, and below `5.0.0`. Version `4.5.2` is recommended for installation.

:::info Note

The following commands must be executed from the RocketMQ installation directory. You can access this directory by running the command `cd <RocketMQ installation directory>`.
On Linux/macOS, use the default terminal; on Windows, use PowerShell (**unless CMD is specified**).

:::

# II. Installation

## (Ⅰ) Decompression

Visualize or decompress using the following command

``` shell
# Linux/macOS
unzip rocketmq-all-4.5.2-bin-release.zip -d <RocketMQ installation directory>
```

``` shell
# Windows
Expand-Archive .\rocketmq-all-4.5.2-bin-release.zip <RocketMQ installation directory>
```

:::warning Tips

For convenience, you can create symbolic links to the RocketMQ installation directory.

:::

Create symbolic link (optional)

``` shell
# Linux/macOS
ln -s rocketmq-all-4.5.2-bin-release rocketmq
```

``` powershell
# Windows
New-Item -Path .\rocketmq\ -ItemType SymbolicLink -Target .\rocketmq-all-4.5.2-bin-release
```

:::info Note

On Windows systems, using PowerShell to create symbolic links may require PowerShell to be running with administrator privileges or developer mode to be turned on.

:::

## (Ⅱ) Modify Configuration for the Development Environment

:::info Note

The default JVM runtime memory settings of RocketMQ are too large for the local development environment. It is recommended to adjust the memory values to optimize performance.

:::

Modify NameServer Running Memory

``` shell
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

``` powershell
# Windows
(Get-Content .\bin\runserver.cmd) | ForEach-Object { $_ -replace '-Xms2g -Xmx2g -Xmn1g', '-Xms1g -Xmx1g -Xmn1g' } | Set-Content .\bin\runserver.cmd
```

Modify Broker Run Memory

``` shell
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

``` powershell
# Windows
(Get-Content .\bin\runbroker.cmd) | ForEach-Object { $_ -replace '-Xms2g -Xmx2g -Xmn1g', '-Xms1g -Xmx1g -Xmn1g' } | Set-Content .\bin\runbroker.cmd
```

Modify Broker Configuration

``` shell
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

``` shell
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

# III. Operation

Linux/macOS

``` shell
# NameServer
nohup ./bin/mqnamesrv start >> ./namesrv.nohup 2>&1 &
```

``` shell
# Broker
nohup ./bin/mqbroker -c ./conf/broker.conf >> ./broker.nohup 2>&1 &
```

Windows

``` powershell
# NameServer
$env:ROCKETMQ_HOME = <RocketMQ installation directory>
Start-Process -FilePath ".\bin\mqnamesrv.cmd" -ArgumentList "start" -WindowStyle Hidden
```

``` powershell
# Broker
$env:ROCKETMQ_HOME = <RocketMQ installation directory>
Start-Process -FilePath ".\bin\mqbroker.cmd" -ArgumentList "-c .\conf\broker.conf" -WindowStyle Hidden
```

# IV. Verification

Type `jps -l` in the command line

``` powershell
59205 org.apache.rocketmq.namesrv.NamesrvStartup
59306 org.apache.rocketmq.broker.BrokerStartup
```

The command line should output similar information.

# V. Stop

``` shell
# Linux/macOS
./bin/mqshutdown broker
./bin/mqshutdown namesrv
```

``` shell
# Windows
.\bin\mqshutdown.cmd broker
.\bin\mqshutdown.cmd namesrv
```

:::info Note

On Windows, run RocketMQ commands in CMD.

:::
