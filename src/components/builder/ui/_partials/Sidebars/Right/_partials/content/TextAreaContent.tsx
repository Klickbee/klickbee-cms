import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import FormFieldGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";

interface TextAreaContentProps {
	component: BuilderComponent;
}

export default function TextAreaContent({ component }: TextAreaContentProps) {
	const { name, label, required, rows } = useContentProps(component, {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		rows: CONTENT_DEFAULTS.DEFAULT_TEXTAREA_ROWS,
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
				label="Rows"
				layout="row"
				onChange={(value: string) =>
					updateSingleField("rows", parseInt(value))
				}
				options={[
					{ label: "1", value: "1" },
					{ label: "2", value: "2" },
					{ label: "3", value: "3" },
					{ label: "4", value: "4" },
					{ label: "5", value: "5" },
					{ label: "6", value: "6" },
				]}
				value={rows?.toString() || "1"}
			/>
		</div>
	);
}
