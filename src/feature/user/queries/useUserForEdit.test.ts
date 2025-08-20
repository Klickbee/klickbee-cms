import { useSuspenseQuery } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { userByIdForEditOptions } from "@/feature/user/options/userByIdOptions";
import { useUserForEdit } from "./useUserForEdit";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
	useSuspenseQuery: vi.fn(),
}));

vi.mock("@/feature/user/options/userByIdOptions", () => ({
	userByIdForEditOptions: vi.fn(),
}));

describe("useUserForEdit", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should call useSuspenseQuery with the correct options", () => {
		// Mock the options function to return a query configuration
		const mockQueryOptions = {
			queryFn: async () => ({ id: "user123", name: "Test User" }),
			queryKey: ["user", "edit", "user123"],
		};
		vi.mocked(userByIdForEditOptions).mockReturnValue(mockQueryOptions);

		// Mock the useSuspenseQuery to return a result
		const mockQueryResult = {
			data: { id: "user123", name: "Test User" },
			isLoading: false,
			isSuccess: true,
		};
		vi.mocked(useSuspenseQuery).mockReturnValue(mockQueryResult);

		// Call the hook
		const result = useUserForEdit("user123");

		// Verify userByIdForEditOptions was called with the correct userId
		expect(userByIdForEditOptions).toHaveBeenCalledWith("user123");

		// Verify useSuspenseQuery was called with the options returned by userByIdForEditOptions
		expect(useSuspenseQuery).toHaveBeenCalledWith(mockQueryOptions);

		// Verify the hook returns the result from useSuspenseQuery
		expect(result).toBe(mockQueryResult);
	});

	it("should pass different userIds to userByIdForEditOptions", () => {
		// Mock the options function to return different query configurations for different userIds
		const mockQueryOptions1 = {
			queryFn: async () => ({ id: "user1", name: "User 1" }),
			queryKey: ["user", "edit", "user1"],
		};
		const mockQueryOptions2 = {
			queryFn: async () => ({ id: "user2", name: "User 2" }),
			queryKey: ["user", "edit", "user2"],
		};

		vi.mocked(userByIdForEditOptions)
			.mockReturnValueOnce(mockQueryOptions1)
			.mockReturnValueOnce(mockQueryOptions2);

		// Mock the useSuspenseQuery to return different results
		const mockQueryResult1 = {
			data: { id: "user1", name: "User 1" },
			isLoading: false,
			isSuccess: true,
		};
		const mockQueryResult2 = {
			data: { id: "user2", name: "User 2" },
			isLoading: false,
			isSuccess: true,
		};

		vi.mocked(useSuspenseQuery)
			.mockReturnValueOnce(mockQueryResult1)
			.mockReturnValueOnce(mockQueryResult2);

		// Call the hook with different userIds
		const result1 = useUserForEdit("user1");
		const result2 = useUserForEdit("user2");

		// Verify userByIdForEditOptions was called with the correct userIds
		expect(userByIdForEditOptions).toHaveBeenCalledWith("user1");
		expect(userByIdForEditOptions).toHaveBeenCalledWith("user2");

		// Verify useSuspenseQuery was called with the correct options
		expect(useSuspenseQuery).toHaveBeenCalledWith(mockQueryOptions1);
		expect(useSuspenseQuery).toHaveBeenCalledWith(mockQueryOptions2);

		// Verify the hook returns the correct results
		expect(result1).toBe(mockQueryResult1);
		expect(result2).toBe(mockQueryResult2);
	});
});
