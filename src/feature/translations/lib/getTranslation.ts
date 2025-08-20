import { getSetting } from "@/feature/settings/lib/settings";

// Import translation files directly
import enTranslations from "../languages/en.json";
import frTranslations from "../languages/fr.json";

interface ApiTranslations {
	API: {
		[key: string]: {
			[key: string]: string;
		};
	};
}

// Map of available translations
const translationsMap: Record<string, ApiTranslations> = {
	en: enTranslations as ApiTranslations,
	fr: frTranslations as ApiTranslations,
};

export async function getTranslationApi(
	section: keyof ApiTranslations["API"],
	key: string,
): Promise<string> {
	try {
		const locale = (await getSetting("system_lang")) || "en";
		// Use the pre-imported translations
		const translations = translationsMap[locale] || translationsMap.en;

		return (
			translations.API[section][
				key as keyof (typeof translations.API)[typeof section]
			] || key
		);
	} catch {
		// Fallback to English if translation fails
		const fallbackTranslations = translationsMap.en;
		return (
			fallbackTranslations.API[section][
				key as keyof (typeof fallbackTranslations.API)[typeof section]
			] || key
		);
	}
}
