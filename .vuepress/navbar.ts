import { navbar } from "vuepress-theme-hope"

export const enNavbarConfig = [
	{
		text: "服务中心",
		link: "/",
		prefix: "/en/",
	},
]

export const zhCNNavbarConfig = [
	{
		text: "服务中心",
		link: "/",
		prefix: "/zh-cn/",
	},
]

export const enNavbar = navbar(enNavbarConfig)
export const zhCNNavbar = navbar(zhCNNavbarConfig)

export const v6EnNavbar = navbar([
	{
		text: "服务中心",
		link: "/",
		prefix: "/v6/en/",
	},
])

export const v6ZhCNNavbar = navbar([
	{
		text: "服务中心",
		link: "/",
		prefix: "/v6/zh-cn/",
	},
])
