---
title: Release:Frontend Release Process
index: true
category:
   - Frontend
order: 2
---
# I. Frontend Deployment
The frontend is essentially a VUE project, and the corresponding deployment method is similar to that of a general frontend project written in VUE. Deployment steps:

1. Packaging: Execute the packaging command in the frontend boot project (e.g., ss-boot): `pnpm run build`
2. Upload the packaged dist package to the server and start it with nginx.
3. When starting with nginx, the nginx configuration is as follows:
```nginx
server {
  # Modify according to actual details
  listen 8090;
  # Modify according to actual details
  server_name 127.0.0.1;

  location / {
    # Modify according to actual details (path corresponding to frontend dist file)
    root /Users/wangxian/nginx/html/mis/v3/dist;
    try_files $uri $uri/ /index.html;
    index  index.html index.htm;
  }

  location /pamirs {
    # Modify according to actual details (backend interface address)
    proxy_pass http://127.0.0.1:8191;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```
4. After modifying and saving the configuration, execute startup or restart to take effect.

# II. Frontend Upgrade
1. Obtain the corresponding version information; get the frontend version information from the `frontend version package information` in the update log.
2. Upgrade steps:
   Modify the version number of the `oinone` dependency in `package.json` and reinstall it.
   1. Modify the version of packages prefixed with `@kunlun` in `package.json` of `ss-admin-widget`, `ss-boot`, `ss-oinone`, `ss-project` (or more custom extended projects) to the version to be upgraded.
3. Finally, in the outermost package `ss-front-modules`, execute `pnpm run clean` to clear dependencies, and `pnpm install` to reinstall dependencies.