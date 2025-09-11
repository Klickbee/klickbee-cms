import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import FormFieldGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertyToggle from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyToggle";

interface CheckboxContentProps {
	component: BuilderComponent;
}

export default function CheckboxContent({ component }: CheckboxContentProps) {
	const { name, label, required, defaultChecked } = useContentProps(
		component,
		{
			defaultChecked: true,
			label: CONTENT_DEFAULTS.FIELD_LABEL,
			name: CONTENT_DEFAULTS.FIELD_NAME,
			required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		},
	);

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

			<PropertyToggle
				label="Checked by default"
				onChange={(value) => updateSingleField("defaultChecked", value)}
				value={defaultChecked}
			/>
		</div>
	);
}
