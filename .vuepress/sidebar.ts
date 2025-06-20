import {sidebar, SidebarOptions} from "vuepress-theme-hope";

const options: SidebarOptions = {
  "/en/": [
    {
      text: "Install Or Upgrade",
      link: "InstallOrUpgrade/",
      prefix: "InstallOrUpgrade/",
      collapsible: true,
      icon: "/assets/icon/安装与升级.svg",
      children: "structure",
    },
    {
      text: "UserManual",
      link: "UserManual/",
      prefix: "UserManual/",
      collapsible: true,
      icon: "/assets/icon/用户手册.svg",
      children: "structure",
    },
    {
      text: "DevManual",
      link: "DevManual/",
      prefix: "DevManual/",
      collapsible: true,
      icon: "/assets/icon/研发手册.svg",
      children: "structure",
    },
    {
      text: "Contribute",
      link: "Contribute/",
      prefix: "Contribute/",
      collapsible: true,
      icon: "/assets/icon/贡献手册.svg",
      children: "structure",
    },
    {
      text: "Third Party Open Source Software And License Notice",
      icon: "/assets/icon/第三方开源软件及许可说明备份.svg",
      link: "Third-Party-Open-Source-Software-And-License-Notice",
    },
    {
      text: "Software Licenses",
      icon: "/assets/icon/软件使用许可和合约.svg",
      link: "software-licenses",
    },
  ],
};

const zhCNOptions: SidebarOptions = {
  "/zh-cn/": [
    {
      text: "安装与升级",
      link: "InstallOrUpgrade/",
      prefix: "InstallOrUpgrade/",
      collapsible: true,
      icon: "/assets/icon/安装与升级.svg",
      children: "structure",
    },
    {
      text: "用户手册",
      link: "UserManual/",
      prefix: "UserManual/",
      collapsible: true,
      icon: "/assets/icon/用户手册.svg",
      children: "structure",
    },
    {
      text: "研发手册",
      link: "DevManual/",
      prefix: "DevManual/",
      collapsible: true,
      icon: "/assets/icon/研发手册.svg",
      children: "structure",
    },
    {
      text: "贡献手册",
      link: "Contribute/",
      prefix: "Contribute/",
      collapsible: true,
      icon: "/assets/icon/贡献手册.svg",
      children: "structure",
    },
    {
      text: "第三方开源软件及许可说明",
      icon: "/assets/icon/第三方开源软件及许可说明备份.svg",
      link: "Third-Party-Open-Source-Software-And-License-Notice",
    },
    {
      text: "软件使用许可和合约",
      icon: "/assets/icon/软件使用许可和合约.svg",
      link: "software-licenses",
    },
  ],
};

export const enSidebar = sidebar(options);
export const zhCNSidebar = sidebar(zhCNOptions);

// export default sidebar(options)
