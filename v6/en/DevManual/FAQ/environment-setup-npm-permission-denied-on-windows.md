---
title: Environment Preparation:npm Installation Dependencies on Windows Environment Prompt Insufficient Permissions
index: true
category:
  - Frequently Asked Questions (faq)
order: 9
---

# Ⅰ、Scenario Description
Encountering the error message "The operation was rejected by your operating system" usually means that the permission settings of the operating system prevent npm from performing certain operations, such as file or directory writing. This issue may be caused by various reasons, and the following are some common troubleshooting steps:

# Ⅱ、Solutions
## (Ⅰ) Run Command Line as Administrator
Ensure that you are running the command-line tool with administrator privileges. On Windows, you can right-click the Command Prompt or PowerShell icon and select "Run as administrator".

## (Ⅱ) Clear npm Cache
Sometimes, issues in the npm cache can cause installation failures. Try clearing the npm cache:

``` bash
npm cache clean –force
```

Then try installing again:

``` bash
npm install
```

## (Ⅲ) Check Disk Space
Ensure that there is sufficient space on your disk to install new packages and their dependencies.

## (Ⅳ) Modify npm Configuration
If `unsafe-perm` or `_authToken` is set in your npm configuration, it may affect the installation. Try changing npm's configuration to disable `unsafe-perm`:

``` bash
npm config set unsafe-perm false
```

## (Ⅴ) Check Firewall and Antivirus Software
Certain firewalls or antivirus software may block npm's network requests or file writing operations. Check the settings of these security software to ensure they do not prevent npm from functioning normally.

## (Ⅵ) Repair npm
Sometimes, issues with npm itself can cause installation failures. Try reinstalling Node.js and npm, or use nvm (Node Version Manager) to manage multiple Node.js versions.

## (Ⅶ) Check File or Directory Permissions
If the error message mentions specific files or directories, check the permission settings of these files or directories. You may need to modify the permissions or move the project to another location to obtain sufficient permissions.

## (Ⅷ) Update Node.js and npm
Ensure that you are using the latest versions of Node.js and npm. Older versions may contain known bugs or compatibility issues.

## (Ⅸ) Check npm Logs
View npm's log files, which can help you find more detailed error information. The location of the log files can be queried using the following command:

``` bash
npm config get cache
```

The log files are typically located in the `.npm/_logs` directory.

## (Ⅹ) Configure the .npmrc File in the Folder as Follows
`@kunlun:registry=http://nexus.shushi.pro/repository/kunlun/`

<span style="color:rgb(26, 26, 26);">More reference articles:</span>
[**npm or yarn Installation Dependencies Report EPERM Error**](https://www.cnblogs.com/caihongmin/p/18203392){ style="color:rgb(19, 99, 251);" target="_blank" }