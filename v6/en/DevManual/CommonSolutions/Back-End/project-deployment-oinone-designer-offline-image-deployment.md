---
title: Project Deployment:Oinone Offline Deployment of Designer Image
index: true
category:
  - Common Solutions
order: 77
---

# I. Overview
The Oinone platform provides partners with multiple deployment methods. This article introduces how to deploy Oinone platform Docker images in a private cloud environment.

:::info Note:

This article uses `5.2.20.1` as an example and deploys with the `amd64` architecture `experience image`. The specific version number shall be subject to that provided by Shushi.

:::

# II. Deployment Environment Requirements
## (I) Environment Requirements for Including All Middleware and Designer Services
+ CPU: 8 vCPU
+ Memory (RAM): More than 16G
+ Hard Disk (HDD/SSD): More than 60G

## (II) Environment Requirements for Designer Services Only
+ CPU: 8 vCPU
+ Memory (RAM): More than 8G
+ Hard Disk (HDD/SSD): More than 40G

# III. Deployment Preparation
+ A server (private cloud environment) with Docker environment installed; hereinafter referred to as the `deployment environment`;
+ A computer (with public network access) with Docker environment installed; hereinafter referred to as the `local environment`;

# IV. Deployment List
The following lists all files after the local environment operations in the article:

+ Designer image: `oinone-designer-full-v5-5.2.20.1-amd64.tar`
+ Offline deployment structure package: `oinone-designer-full-standard-offline.zip`
+ Oinone license: ****-trial.lic (the actual file name is subject to the license issued by Oinone)
+ Third-party database driver package (required for non-MySQL databases)

:::info Note:

If you need to copy all deployment files to the deployment environment at one time, you can transfer all files at one time after executing the document steps in the local environment.

:::

# V. Create a Deployment Directory in the Deployment Environment
``` shell
mkdir -p /home/admin/oinone-designer-full
mkdir -p /home/admin/oinone-designer-full/images
```

# VI. Check the Server Architecture of the Deployment Environment
Confirm whether the deployment environment is of `amd64` or `arm64` architecture. If the viewing method provided in this article cannot be executed correctly, you can search for relevant content by yourself.

## (I) Use the uname command to view
``` shell
uname -a
```

:::info Note:

This step is very important. If the server architecture of the deployment environment is inconsistent with that of the local environment, the image will not be able to start correctly.

:::

# VII. Prepare the Image in the Local Environment
Prepare the image version to be deployed.

## (I) Log in to the Oinone image repository (if already logged in, this step can be ignored)
``` shell
docker login https://harbor.oinone.top
# input username
# input password
```

## (II) Obtain the Oinone platform image
``` shell
docker pull harbor.oinone.top/oinone/oinone-designer-full-v5.2:5.2.20.1-amd64
```

## (III) Save the image to a .tar file
``` shell
docker save -o oinone-designer-full-v5-5.2.20.1-amd64.tar oinone-designer-full-v5.2:5.2.20.1-amd64

If an error "Error response from daemon: reference does not exist" is reported, change the script to the following:
docker save -o oinone-designer-full-v5-5.2.20.1-amd64.tar harbor.oinone.top/oinone/oinone-designer-full-v5.2:5.2.20.1-amd64

# docker save [OPTIONS] IMAGE [IMAGE...]
```

## (IV) Upload the .tar to the deployment environment
``` shell
scp ./oinone-designer-full-v5-5.2.20.1-amd64.tar admin@127.0.0.1:/home/admin/oinone-full/images/
```

:::warning Tip:

If the scp method cannot be used for uploading, the image file can be uploaded to the deployment directory of the deployment environment according to the specific situation of the deployment environment.

:::

# VIII. Load the Image in the Deployment Environment
## (I) Load the image file into Docker
``` shell
cd /home/admin/oinone-full/images

docker load -i oinone-designer-full-v5-5.2.20.1-amd64.tar
```

## (II) Check whether the image is loaded correctly
``` shell
docker images
```

Check the output content and compare whether the `REPOSITORY`, `TAG`, and `IMAGE ID` are completely consistent with those in the local environment.

# IX. Designer Service Deployment
For convenience, it is not convenient to operate files on the server. Therefore, we can prepare the deployment script in the local environment and then transfer it to the deployment environment for deployment. The structure package (oinone-designer-full-standard-offline.) needs to be uploaded to the server to be deployed, and the subsequent operations are all carried out in this directory.

## (I) Download the offline deployment structure package (subject to that issued by Shushi)
[oinone-designer-full-standard-offline.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/oinone-designer-deploy/oinone-designer-full-standard-offline.zip)

## (II) Move the Pamirs license to the `config` directory and rename it to `****-trial.lic` (the actual file name is subject to the license issued by Oinone)
``` shell
mv ****-trial.lic config/****-trial.lic
```

## (III) Load non-MySQL database drivers (as needed)
Move the driver `jar` file to the `lib` directory.

Take the KDB8 database driver `kingbase8-8.6.0.jar` as an example:
``` shell
mv kingbase8-8.6.0.jar lib/
```

:::warning Tip:

The `lib` directory is an external loading directory (external library) for non-designer built-in packages, and any `jar` package can be added to be integrated into the designer.

:::

## (IV) Modify the configuration in the script
### 1. Modify the startup script `startup.sh`
Modify the corresponding image version number and change the IP from 192.168.0.121 to the host IP.
``` nginx
configDir=$(pwd)
version=5.1.16
IP=192.168.0.121
```

### 2. Modify mq/broker.conf
Modify the brokerIP1 in it, changing the IP from 192.168.0.121 to the host IP.
``` nginx
brokerClusterName = DefaultCluster
namesrvAddr=127.0.0.1:9876
brokerIP1=192.168.0.121
brokerName = broker-a
brokerId = 0
deleteWhen = 04
fileReservedTime = 48
brokerRole = ASYNC_MASTER
flushDiskType = ASYNC_FLUSH
autoCreateTopicEnable=true
listenPort=10991
transactionCheckInterval=1000
# Storage usage threshold, when the usage exceeds the threshold, the message sending request will be rejected
diskMaxUsedSpaceRatio=98
# Disk space warning threshold, stop accepting messages when exceeding this value, default value 90
diskSpaceWarningLevelRatio=99
# Forced file deletion threshold, default 85
diskSpaceCleanForciblyRatio=97
```

## (V) Execute the `startup.sh` script to start
``` shell
sh startup.sh
```

# X. Access the Service
Use `http://127.0.0.1:88` to access the service.