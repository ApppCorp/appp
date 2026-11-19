import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	defaultLocale: "zh",

	/**
	 * 关闭语言探测：`/` 永远跳到 `/zh`（默认中文），
	 * 不受浏览器 Accept-Language 或上次的 locale cookie 影响。
	 * 需要按访客语言分流时，把它改回 true 即可。
	 */
	localeDetection: false,
	locales: ["zh", "en"]
});