import { getRequestConfig } from "next-intl/server";

import type { Lang } from "@/types";
import { routing } from "./routing";

export default getRequestConfig(async({ requestLocale }) => {
	let locale = await requestLocale;
	if (!locale || !routing.locales.includes(locale as Lang)) {
		locale = routing.defaultLocale;
	}
	const [componentMessages, homeMessages, metaMessages] = await Promise.all([
		import(`../messages/${locale}/component.json`),
		import(`../messages/${locale}/home.json`),
		import(`../messages/${locale}/meta.json`)
	]);
	return {
		locale,
		messages: {
			...componentMessages.default,
			home: homeMessages.default,
			meta: metaMessages.default
		}
	};
});