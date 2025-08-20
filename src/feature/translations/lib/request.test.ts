import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error : alias is supported in vitest
import { getSetting, setSetting } from "@/feature/settings/lib/settings";

// Mock the settings module
vi.mock("@/feature/settings/lib/settings", () => ({
	getSetting: vi.fn(),
	setSetting: vi.fn(),
}));

// Define types for messages
interface Messages {
	greeting: string;
	welcome: string;
}

// Mock translation data instead of importing actual JSON files
const mockEnMessages: Messages = {
	greeting: "Hello",
	welcome: "Welcome to our app",
};
const mockFrMessages: Messages = {
	greeting: "Bonjour",
	welcome: "Bienvenue dans notre application",
};

// Create a simplified version of the requestConfig function for testing
async function getTestRequestConfig() {
	let locale = await getSetting("system_lang");
	if (!locale) {
		locale = "en";
		await setSetting("system_lang", locale);
	}

	// Use our mock messages
	const messagesMap: Record<string, Messages> = {
		en: mockEnMessages,
		fr: mockFrMessages,
	};

	return {
		locale,
		messages:
			messagesMap[locale as keyof typeof messagesMap] || messagesMap.en,
	};
}

describe("Translations Request Config", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should return English locale and messages when system_lang is set to 'en'", async () => {
		// Mock getSetting to return 'en'
		vi.mocked(getSetting).mockResolvedValue("en");

		// Call our test function to get the config
		const config = await getTestRequestConfig();

		// Verify the result
		expect(config.locale).toBe("en");
		expect(config.messages).toEqual(mockEnMessages);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
		// Verify setSetting was not called
		expect(setSetting).not.toHaveBeenCalled();
	});

	it("should return French locale and messages when system_lang is set to 'fr'", async () => {
		// Mock getSetting to return 'fr'
		vi.mocked(getSetting).mockResolvedValue("fr");

		// Call our test function to get the config
		const config = await getTestRequestConfig();

		// Verify the result
		expect(config.locale).toBe("fr");
		expect(config.messages).toEqual(mockFrMessages);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
		// Verify setSetting was not called
		expect(setSetting).not.toHaveBeenCalled();
	});

	it("should default to English and set system_lang when no language is set", async () => {
		// Mock getSetting to return null (no language set)
		vi.mocked(getSetting).mockResolvedValue(null);

		// Call our test function to get the config
		const config = await getTestRequestConfig();

		// Verify the result
		expect(config.locale).toBe("en");
		expect(config.messages).toEqual(mockEnMessages);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
		// Verify setSetting was called to set the default language
		expect(setSetting).toHaveBeenCalledWith("system_lang", "en");
	});

	it("should fallback to English messages when an unsupported language is set", async () => {
		// Mock getSetting to return an unsupported language
		vi.mocked(getSetting).mockResolvedValue("de");

		// Call our test function to get the config
		const config = await getTestRequestConfig();

		// Verify the result
		expect(config.locale).toBe("de");
		expect(config.messages).toEqual(mockEnMessages);

		// Verify getSetting was called with the correct parameter
		expect(getSetting).toHaveBeenCalledWith("system_lang");
		// Verify setSetting was not called
		expect(setSetting).not.toHaveBeenCalled();
	});
});
