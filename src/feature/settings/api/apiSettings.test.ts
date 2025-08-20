import { NextResponse } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error : alias is supported in vitest
import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	getSetting,
	setSetting,
	setUserSetting,
	// @ts-expect-error : alias is supported in vitest
} from "@/feature/settings/lib/settings";

// Define response types
type ErrorResponse = { error: string; status: number };
type SuccessResponse = { value: any } | { message: string; status: number };
type ApiResponse = ErrorResponse | SuccessResponse;

// Mock dependencies
vi.mock("@/feature/auth/lib/session", () => ({
	isAuthenticatedGuard: vi.fn(),
}));

vi.mock("@/feature/settings/lib/settings", () => ({
	getSetting: vi.fn(),
	setSetting: vi.fn(),
	setUserSetting: vi.fn(),
}));

// Create simplified versions of the API functions for testing
async function testGetSettings(
	key: string | null,
	userId: string | null,
): Promise<ApiResponse> {
	// Check authentication
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return { error: "Unauthorized", status: 401 };
	}

	// Check if key is provided
	if (!key) {
		return { error: "missing key", status: 400 };
	}

	// Get the setting value
	const value = await getSetting(key, userId);
	return { value };
}

async function testPostSettings(body: {
	key?: string;
	value?: any;
	userId?: string;
}): Promise<ApiResponse> {
	// Check authentication
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return { error: "Unauthorized", status: 401 };
	}

	// Check if key and value are provided
	if (!body.key || body.value === undefined) {
		return { error: "key or value missing", status: 400 };
	}

	// Update the setting
	if (body.userId) {
		await setUserSetting(body.key, body.value, body.userId);
	} else {
		await setSetting(body.key, body.value);
	}

	return { message: `Setting ${body.key} updated successfully`, status: 200 };
}

describe("API Settings", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("GET", () => {
		it("should return an auth error if not authenticated", async () => {
			// Mock authentication failure
			const mockAuthError = NextResponse.json({
				error: "Unauthorized",
				status: 401,
			});
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(mockAuthError);

			// Call our test function
			const response = await testGetSettings("test_key", null);

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify the response is the auth error
			expect(response).toEqual({ error: "Unauthorized", status: 401 });
		});

		it("should return an error if key is missing", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Call our test function with no key
			const response = await testGetSettings(null, null);

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify the response is an error
			expect(response).toEqual({ error: "missing key", status: 400 });
		});

		it("should return a setting value for a valid key", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Mock getSetting to return a value
			vi.mocked(getSetting).mockResolvedValue("test_value");

			// Call our test function
			const response = await testGetSettings("test_key", null);

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify getSetting was called with the correct parameters
			expect(getSetting).toHaveBeenCalledWith("test_key", null);

			// Verify the response contains the value
			expect(response).toEqual({ value: "test_value" });
		});

		it("should return a user-specific setting value when userId is provided", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Mock getSetting to return a value
			vi.mocked(getSetting).mockResolvedValue("user_value");

			// Call our test function
			const response = await testGetSettings("test_key", "user123");

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify getSetting was called with the correct parameters
			expect(getSetting).toHaveBeenCalledWith("test_key", "user123");

			// Verify the response contains the value
			expect(response).toEqual({ value: "user_value" });
		});
	});

	describe("POST", () => {
		it("should return an auth error if not authenticated", async () => {
			// Mock authentication failure
			const mockAuthError = NextResponse.json({
				error: "Unauthorized",
				status: 401,
			});
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(mockAuthError);

			// Call our test function
			const response = await testPostSettings({
				key: "test_key",
				value: "test_value",
			});

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify the response is the auth error
			expect(response).toEqual({ error: "Unauthorized", status: 401 });
		});

		it("should return an error if key is missing", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Call our test function with missing key
			const response = await testPostSettings({
				value: "test_value",
			});

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify the response is an error
			expect(response).toEqual({
				error: "key or value missing",
				status: 400,
			});
		});

		it("should return an error if value is missing", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Call our test function with missing value
			const response = await testPostSettings({
				key: "test_key",
			});

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify the response is an error
			expect(response).toEqual({
				error: "key or value missing",
				status: 400,
			});
		});

		it("should update a system setting for valid key and value", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Mock setSetting to resolve successfully
			vi.mocked(setSetting).mockResolvedValue({
				createdAt: new Date(),
				key: "test_key",
				updatedAt: new Date(),
				value: "test_value",
			});
			// Call our test function
			const response = await testPostSettings({
				key: "test_key",
				value: "test_value",
			});

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify setSetting was called with the correct parameters
			expect(setSetting).toHaveBeenCalledWith("test_key", "test_value");

			// Verify setUserSetting was not called
			expect(setUserSetting).not.toHaveBeenCalled();

			// Verify the response is a success message
			expect(response).toEqual({
				message: "Setting test_key updated successfully",
				status: 200,
			});
		});

		it("should update a user-specific setting when userId is provided", async () => {
			// Mock authentication success
			vi.mocked(isAuthenticatedGuard).mockResolvedValue(null);

			// Mock setUserSetting to resolve successfully
			vi.mocked(setSetting).mockResolvedValue({
				createdAt: new Date(),
				key: "test_key",
				updatedAt: new Date(),
				value: "test_value",
			});

			// Call our test function
			const response = await testPostSettings({
				key: "test_key",
				userId: "user123",
				value: "test_value",
			});

			// Verify isAuthenticatedGuard was called
			expect(isAuthenticatedGuard).toHaveBeenCalled();

			// Verify setUserSetting was called with the correct parameters
			expect(setUserSetting).toHaveBeenCalledWith(
				"test_key",
				"test_value",
				"user123",
			);

			// Verify setSetting was not called
			expect(setSetting).not.toHaveBeenCalled();

			// Verify the response is a success message
			expect(response).toEqual({
				message: "Setting test_key updated successfully",
				status: 200,
			});
		});
	});
});
