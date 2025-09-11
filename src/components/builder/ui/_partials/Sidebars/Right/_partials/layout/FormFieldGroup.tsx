import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import PropertyField from "./PropertyField";
import PropertyToggle from "./PropertyToggle";

interface FormFieldGroupProps {
	name: string;
	label: string;
	required: boolean;
	onNameChange: (value: string) => void;
	onLabelChange: (value: string) => void;
	onRequiredChange: (value: boolean) => void;
	disabled?: boolean;
	showRequired?: boolean;
}

export default function FormFieldGroup({
	name,
	label,
	required,
	onNameChange,
	onLabelChange,
	onRequiredChange,
	disabled = false,
	showRequired = true,
}: FormFieldGroupProps) {
	return (
		<>
			<PropertyField
				disabled={disabled}
				label="Field Name"
				layout="column"
				onChange={onNameChange}
				placeholder={CONTENT_DEFAULTS.FIELD_NAME}
				value={name}
			/>

			<PropertyField
				disabled={disabled}
				label="Label"
				layout="column"
				onChange={onLabelChange}
				placeholder={CONTENT_DEFAULTS.FIELD_LABEL}
				value={label}
			/>

			{showRequired && (
				<PropertyToggle
					disabled={disabled}
					label="Required"
					onChange={onRequiredChange}
					value={required}
				/>
			)}
		</>
	);
}
