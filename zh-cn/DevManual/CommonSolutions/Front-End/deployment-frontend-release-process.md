---
title: 发布：前端发布流程
index: true
category:
   - 前端
order: 2
---
# 一、前端部署
前端本质上就是一个 VUE 工程，对应的部署方式跟通用的用 VUE 写的前端工程类似。部署的步骤：

1. 打包，在前端 boot 工程下(如：ss-boot)执行打包命令：pnpm run build
2. 将打包好的 dist 包上传到服务器上，用 nginx 启动即可
3. 用 nginx 启动情况下，nginx 的配置如下：

```nginx
server {
  # 根据实际详情修改
  listen 8090;
  # 根据实际详情修改
  server_name 127.0.0.1;

  location / {
    # 根据实际详情修改(前端dist文件对应的路径)
    root /Users/wangxian/nginx/html/mis/v3/dist;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }

  location /pamirs {
    # 根据实际详情修改(后端接口地址)
    proxy_pass http://127.0.0.1:8191;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

4. 配置修改保存后，执行启动或者重启生效

# 二、前端升级
1. 获取对应的版本信息。更新日志中的`前端版本包信息` 获取前端版本信息；
2. 升级步骤
修改`package.json`中依赖`oinone`的包的版本号，并重新安装。
    1. 将`ss-admin-widget`、`ss-boot`、`ss-oinone`、`ss-project`(或者更多自定义扩展的工程)中的`package.json`中`@kunlun`前缀的包，修改为要升级的版本。
3. 最后在最外层的包`ss-front-modules`执行`pnpm run clean`清除依赖,`pnpm install`重新安装依赖
