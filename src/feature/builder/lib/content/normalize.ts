import type { BuilderComponent } from "@/feature/builder/types/components/components";

export function isBuilderComponent(value: unknown): value is BuilderComponent {
	if (!value || typeof value !== "object") return false;
	const v = value as Partial<BuilderComponent>;
	return (
		typeof v.id === "string" &&
		typeof v.type === "string" &&
		typeof v.label === "string" &&
		typeof v.groupId === "string"
	);
}

export function normalizeToComponents(input: unknown): BuilderComponent[] {
	// Common stored shapes: array of components, object with components field, single component, or empty
	if (Array.isArray(input)) return input as BuilderComponent[];
	if (
		input &&
		typeof input === "object" &&
		Array.isArray((input as { components?: unknown }).components)
	) {
		return (
			(input as { components: unknown[] })
				.components as BuilderComponent[]
		).filter(isBuilderComponent);
	}
	if (isBuilderComponent(input)) return [input];
	return [];
}
