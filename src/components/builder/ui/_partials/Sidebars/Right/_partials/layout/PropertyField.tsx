import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PropertyColumn from "./PropertyColumn";

interface PropertyFieldProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: "text" | "email" | "url" | "password";
	layout: "row" | "column";
	variant?: "input" | "textarea";
	textareaClassName?: string;
	disabled?: boolean;
}

export default function PropertyField({
	label,
	value,
	onChange,
	placeholder = CONTENT_DEFAULTS.FIELD_NAME,
	type = "text",
	layout = "row",
	variant = "input",
	textareaClassName = "h-16 resize",
	disabled = false,
}: PropertyFieldProps) {
	const renderField = () => {
		if (variant === "textarea") {
			return (
				<Textarea
					className={textareaClassName}
					disabled={disabled}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					value={value}
				/>
			);
		}

		return (
			<Input
				className="h-8"
				disabled={disabled}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
		);
	};

	return layout === "row" ? (
		<PropertyRow label={label}>{renderField()}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{renderField()}</PropertyColumn>
	);
}
