import { ZodEnum } from "zod";

/**
 * Extract enum values from a Zod enum schema
 */
export function getEnumValues<T extends string>(
	enumSchema: ZodEnum<[T, ...T[]]>,
): T[] {
	return enumSchema.options;
}

/**
 * Convert enum value to display label
 * Examples: "flex-start" -> "Flex Start", "space-between" -> "Space Between"
 */
export function formatEnumLabel(value: string): string {
	return value
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

/**
 * Get formatted options for select component
 */
export function getEnumOptions<T extends string>(
	enumSchema: ZodEnum<[T, ...T[]]>,
) {
	return getEnumValues(enumSchema).map((value) => ({
		label: formatEnumLabel(value),
		value,
	}));
}
