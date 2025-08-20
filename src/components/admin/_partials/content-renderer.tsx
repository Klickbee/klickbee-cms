import { FieldRenderer } from "./field-renderers";

interface ContentRendererProps {
	content: Record<string, unknown>;
}

function formatFieldLabel(key: string): string {
	// Convert camelCase or snake_case to Title Case
	return key
		.replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to words
		.replace(/_/g, " ") // snake_case to words
		.replace(/\b\w/g, (char) => char.toUpperCase()); // Title Case
}

export function ContentRenderer({ content }: ContentRendererProps) {
	const entries = Object.entries(content);

	if (entries.length === 0) {
		return;
	}

	return (
		<div className="space-y-6">
			{entries.map(([key, value]) => (
				<FieldRenderer
					key={key}
					label={formatFieldLabel(key)}
					value={value}
				/>
			))}
		</div>
	);
}
