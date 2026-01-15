---
title: Startup:Common Issues with Oinone License Usage
index: true
category:
  - Frequently Asked Questions (FAQ)
order: 1
prev:
  text: Project Deployment:Import and Export of UI Designer
  link: /v6/en/DevManual/CommonSolutions/Back-End/project-deployment-ui-designer-import-export.md
---
# I. How to Obtain a License?
Contact Shushi operation and maintenance personnel to obtain the license. (The following content uses <license.lic> to represent the license file path)

+ subject: Authorized entity name
+ license.lic: License file

## What are the Differences Between Different License Categories?
| License Type | LicenseType | Restricted Functions | Applicable Environment |
| --- | --- | --- | --- |
| Development Authorization | `DEVELOP` | 1. 1-day validity per installation, unable to access designer-related functions after timeout <br>2. Restricts CPU and motherboard serial numbers or the number of license users <br>3. Cannot be used for container startup <br>4. Contains page watermarks | Development environment (used by developers when starting business projects locally) |
| Partner Authorization | `TRIAL` | 1. No installation time limit <br>2. No deployment environment restrictions <br>3. Contains page watermarks | Non-production environments (test environment, pre-release environment, etc.) |
| Customer Authorization | `BUSINESS` | 1. No installation time limit <br>2. Can only deploy one production environment <br>3. No page watermarks | Production environment |


:::info Note:
A set of environments refers to all JVMs sharing the Base library as a single set of environments.
:::

# II. How to Configure the License?
## (Ⅰ) Configure the License in `yaml`
### 1. Single License Configuration
``` yaml
pamirs:
  license:
    subject: <subject>
    path: <license.lic>

```

### 2. Multiple License Configuration
``` yaml
pamirs:
  license:
    subject: <subject>
    path:
      - <license1.lic>
      - <license2.lic>
```

`pamirs.license.path` can be a relative path, absolute path, or URL path.

## (Ⅱ) Configure the License in `Program Arguments`
``` shell
java -jar -Psubject=<subject> -Plicense=<license1.lic> -Plicense=<license1.lic> <boot.jar>
```

# III. How to Install the License During Development?
Place the license in the backend runtime working directory. (Generally the root directory of the IDEA project)

# IV. How to Install the License in a Physical Machine Production Environment?
Place the license in the same directory as the JAR package.

# V. How to Install the License in a Docker Environment?
Add a mount volume mapping in the Docker runtime directory and configure the corresponding path in the YAML file.

# VI. How to Obtain CPU and Motherboard Serial Numbers?
## (Ⅰ) Using the `dmidecode` Command in Linux Environment
``` shell
# Get CPU serial number
dmidecode -s system-serial-number

# CPU serial number
7*****1

# Get motherboard serial number
dmidecode -s baseboard-serial-number

# Motherboard serial number
..CN*******V01Y7.

# Get system UUID
dmidecode -s system-uuid

# System UUID
4c4xxxxx-xxxx-xxxx-xxxx-xxxxxxxx5831
```

## (Ⅱ) Using the `system_profiler` Command in Mac Environment
``` shell
# Get CPU serial number
system_profiler SPHardwareDataType | grep 'Serial Number' | awk -F ':' '{print $2}'

# CPU serial number
C02******03Y

# Get motherboard serial number
system_profiler SPHardwareDataType | grep 'Hardware UUID' | awk -F ':' '{print $2}'

# Motherboard serial number
1AAxxxxx-xxxx-xxxx-xxxx-xxxxxxxxF0FC
```

## (Ⅲ) Using the `wmic` Command in Windows Environment
``` shell
# Get CPU serial number
wmic cpu get processorid

# CPU serial number
BFExxxxxxxxxx6A3

# Get motherboard serial number
wmic baseboard get serialnumber

# Motherboard serial number
PFxxxxBY

# Get system UUID
wmic csproduct get uuid

# System UUID
D0Exxxxx-xxxx-xxxx-xxxx-xxxxxxxx78B8
```

# VII. How to Handle `dmidecode` Command Execution Failure in Linux Environment?
1. If the command is not found, try installing it using the following methods:

``` shell
# debian (e.g., Ubuntu)
apt-get install dmidecode

# rpm (e.g., Fedora/CentOS/RedHat)
yum install dmidecode
```

2. If there is no permission to execute the command, try switching the current execution user or elevating the execution permission for the current user.

# VIII. How to Handle Certificate Installation Failure in Docker Environment?
1. Since the Docker environment is not a physical environment, it does not support CPU and motherboard serial number verification. Try replacing the license.

2. Check whether the position of the license in the image matches that in the configuration file.

# IX. How to Handle License Installation Failure?
## (Ⅰ) Log Displays `License installation failed.` Message
:::danger Warning:
Issues with JDK version dependencies have been fully resolved in versions above `5.0.0`, and this problem only occurs in lower platform versions.
:::

Check if the JDK version is higher than `1.8_221`.

In environments where JDK version upgrading is not possible, click to download [jce_policy-8.zip](https://pamirs.oss-cn-hangzhou.aliyuncs.com/oinone/doc/jce_policy-8.zip) and follow these steps:

+ Unzip `jce_policy-8.zip` to get two files: `US_export_policy.jar` and `local_policy.jar`
+ If JRE is installed, place the two JAR files in the `%JRE_HOME%\lib\security` directory to overwrite the original files
+ If JDK is installed, place the two JAR files in the `%JDK_HOME%\jre\lib\security` directory to overwrite the original files

## (Ⅱ) Spring Context is Closed During Startup
Check the startup log for logs related to the `pamirs-lic` keyword. If there are license-related exception messages, confirm whether the license is used correctly according to license rules.

# X. License is Installed Successfully, but Access is Denied with "Unauthorized Module Cannot Be Accessed". How to Handle?
## (Ⅰ) Check License Information During Startup
+ For services started with `nohup java -jar boot.jar > $home/out.log 2>&1 &`, view license information in the `out.log` file.
+ For services started with `docker`, view license information using `docker logs`.
+ For services started with `kubernetes`, view license information using `kubectl logs`.

![](http://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/FAQ/image-20250529201712947.png)

+ Check if the `Type` is the required type. Licenses used for designer startup are generally `TRIAL`.
+ Check if `Modules` are `ALL` or `module codes`; `ALL` indicates all designer modules.