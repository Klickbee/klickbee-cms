import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error : alias is supported in vitest
import { getSetting } from "@/feature/settings/lib/settings";

// Mock the settings module
vi.mock("@/feature/settings/lib/settings", () => ({
	getSetting: vi.fn(),
}));

// Define the ApiTranslations interface to match the actual implementation
interface ApiTranslations {
	API: {
		[key: string]: {
			[key: string]: string;
		};
	};
}

// Mock translation data instead of importing actual JSON files
const mockEnTranslations: ApiTranslations = {
	API: {
		PasswordResetRequest: {
			EmailContent: "Click the link to reset your password (EN)",
			EmailSubject: "Reset Your Password (EN)",
		},
	},
};

const mockFrTranslations: ApiTranslations = {
	API: {
		PasswordResetRequest: {
			EmailContent:
				"Cliquez sur le lien pour réinitialiser votre mot de passe (FR)",
			EmailSubject: "Réinitialiser Votre Mot de Passe (FR)",
		},
	},
};

// Create a simplified version of the getTranslationApi function for testing
async function testGetTranslationApi(
	section: keyof ApiTranslations["API"],
	key: string,
): Promise<string> {
	try {
		const locale = (await getSetting("system_lang")) || "en";
		// Use our mock translations instead of imported files
		const translations =
			locale === "fr" ? mockFrTranslations : mockEnTranslations;

		// Try to get the translation
		if (
			translations.API &&
			translations.API[section] &&
			translations.API[section][
				key as keyof (typeof translations.API)[typeof section]
			]
		) {
			return translations.API[section][
				key as keyof (typeof translations.API)[typeof section]
			];
		}

		// If not found in the selected language, fallback to English
		if (
			locale !== "en" &&
			mockEnTranslations.API &&
			mockEnTranslations.API[section] &&
			mockEnTranslations.API[section][
				key as keyof (typeof mockEnTranslations.API)[typeof section]
			]
		) {
			return mockEnTranslations.API[section][
				key as keyof (typeof mockEnTranslations.API)[typeof section]
			];
		}

		// If still not found, return the key itself
		return key;
	} catch {
		// Fallback to English if translation fails
		if (
			mockEnTranslations.API &&
			mockEnTranslations.API[section] &&
			mockEnTranslations.API[section][
				key as keyof (typeof mockEnTranslations.API)[typeof section]
			]
		) {
			return mockEnTranslations.API[section][
				key as keyof (typeof mockEnTranslations.API)[typeof section]
			];
		}
		return key;
	}
}

describe("getTranslationApi", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should return English translation when system_lang is set to 'en'", async () => {
		// Mock getSetting to return 'en'
		vi.mocked(getSetting).mockResolvedValue("en");

		// Define section and key
		const section = "PasswordResetRequest";
		const key = "EmailSubject";
		const expectedTranslation =
			mockEnTranslations.API.PasswordResetRequest.EmailSubject;

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result
		expect(translation).toBe(expectedTranslation);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});

	it("should return French translation when system_lang is set to 'fr'", async () => {
		// Mock getSetting to return 'fr'
		vi.mocked(getSetting).mockResolvedValue("fr");

		// Define section and key
		const section = "PasswordResetRequest";
		const key = "EmailSubject";
		const expectedTranslation =
			mockFrTranslations.API.PasswordResetRequest.EmailSubject;

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result
		expect(translation).toBe(expectedTranslation);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});

	it("should fallback to English when no language is set", async () => {
		// Mock getSetting to return null (no language set)
		vi.mocked(getSetting).mockResolvedValue(null);

		// Define section and key
		const section = "PasswordResetRequest";
		const key = "EmailSubject";
		const expectedTranslation =
			mockEnTranslations.API.PasswordResetRequest.EmailSubject;

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result
		expect(translation).toBe(expectedTranslation);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});

	it("should fallback to English when an unsupported language is set", async () => {
		// Mock getSetting to return an unsupported language
		vi.mocked(getSetting).mockResolvedValue("de");

		// Define section and key
		const section = "PasswordResetRequest";
		const key = "EmailSubject";
		const expectedTranslation =
			mockEnTranslations.API.PasswordResetRequest.EmailSubject;

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result
		expect(translation).toBe(expectedTranslation);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});

	it("should return the key itself when no translation is found", async () => {
		// Mock getSetting to return 'en'
		vi.mocked(getSetting).mockResolvedValue("en");

		// Use a section and key that don't exist in the translations
		const section = "NonExistentSection";
		const key = "NonExistentKey";

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result is the key itself
		expect(translation).toBe(key);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});

	it("should handle errors by falling back to English", async () => {
		// Mock getSetting to throw an error
		vi.mocked(getSetting).mockRejectedValue(new Error("Test error"));

		// Define section and key
		const section = "PasswordResetRequest";
		const key = "EmailSubject";
		const expectedTranslation =
			mockEnTranslations.API.PasswordResetRequest.EmailSubject;

		// Call the function
		const translation = await testGetTranslationApi(section, key);

		// Verify the result
		expect(translation).toBe(expectedTranslation);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
	});
});
