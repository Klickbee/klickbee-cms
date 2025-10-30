import { useTranslations } from "next-intl";
import FormFieldGroup from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertyToggle from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyToggle";
import { CONTENT_DEFAULTS } from "@/feature/builder/constants/contentDefaults";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";

interface CheckboxContentProps {
	component: BuilderComponent;
}

export default function CheckboxContent({ component }: CheckboxContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
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
				label={t("checkedByDefault")}
				onChange={(value) => updateSingleField("defaultChecked", value)}
				value={defaultChecked}
			/>
		</div>
	);
}
