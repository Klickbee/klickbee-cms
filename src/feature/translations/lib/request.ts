import { getRequestConfig } from "next-intl/server";
import { getSetting, setSetting } from "@/feature/settings/lib/settings";
import enMessages from "../languages/en.json";
import frMessages from "../languages/fr.json";

// Map of available translations
const messagesMap: Record<string, object> = {
	en: enMessages,
	fr: frMessages,
};

export default getRequestConfig(async () => {
	let locale = await getSetting("system_lang");
	if (!locale) {
		locale = "en";
		await setSetting("system_lang", locale);
	}
	return {
		locale,
		messages: messagesMap[locale] || messagesMap.en,
	};
});
