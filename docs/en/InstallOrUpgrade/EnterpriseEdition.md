---
title: Enterprise Edition
index: true
category:
  - Installation and Upgrade
order: 2
prev:
  text: Community Edition
  link: /en/InstallOrUpgrade/CommunityEdition.md
next:
  text: Transition from Community Edition to Enterprise Edition
  link: /en/InstallOrUpgrade/from-community-to-enterprise.md
---
This section will introduce how to use `Docker Compose` to quickly deploy the `Oinone` designer (Enterprise Edition) and access it via a browser.

# I. Preparation

+ Obtain the Enterprise Edition license <font style="color:#DF2A3F;">(Required)</font>

# II. Quick Start

## (I) Download docker-compose.yml

```shell
# Download docker-compose.yml from Github
curl -L https://raw.githubusercontent.com/oinone/oinone-docker-shared/refs/heads/master/oinone/docker-compose.yml -o docker-compose.yml

# Download docker-compose.yml from Gitee
curl -L https://gitee.com/oinone/oinone-docker-shared/raw/master/oinone/docker-compose.yml -o docker-compose.yml
```

## (II) Modify docker-compose.yml to Mount the License

```yaml
services:
  backend:
    container_name: oinone-backend
    volumes:
      - ./pks:/opt/pamirs/pks
```

## (III) Modify the .env File to Configure License Information

```shell
# Enter your subject name
LIC_SUBJECT=<subject>
# Enter your license file name
LIC_FILE=pks/<license.lic>
```

:::warning Note:

For more information about the `.env` file, please refer to: [Oinone Designer Configuration Guide](/en/InstallOrUpgrade/setup-oinone-designer.md)

:::

## (IV) Start the Oinone Designer

```shell
# MacOS/Linux
docker compose up -d

# Windows
docker compose -p oinone up -d
```

PS: The first startup takes a long time. Please be patient. You can open a new terminal to view the backend startup logs at this time.

## (V) View the Backend Service Startup Logs

```shell
docker logs -f oinone-backend
```

## (VI) Access the Oinone Designer

Open in the **browser**: http://127.0.0.1:88

Enter the username/password: admin/admin

## (VI) Stop the Oinone Designer

```shell
# MacOS/Linux
docker compose down -v

# Windows
docker compose -p oinone down -v
```