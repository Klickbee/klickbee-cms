import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import { FieldType } from "@/builder/types/components/properties/componentContentPropsType";
import FormFieldGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";

interface TextFieldContentProps {
	component: BuilderComponent;
}

export default function TextFieldContent({ component }: TextFieldContentProps) {
	const { name, label, required, type } = useContentProps(component, {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		type: "text" as FieldType,
	});

	const { updateName, updateLabel, updateRequired, updateSingleField } =
		useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<FormFieldGroup
				label={label}
				name={name}
				onLabelChange={updateLabel}
				onNameChange={updateName}
				onRequiredChange={updateRequired}
				required={required}
			/>

			<PropertySelect
				label="Type"
				layout="row"
				onChange={(value: string) =>
					updateSingleField("type", value as FieldType)
				}
				options={[
					{ label: "Text", value: "text" },
					{ label: "Email", value: "email" },
					{ label: "Password", value: "password" },
				]}
				value={type}
			/>
		</div>
	);
}
