import { useTranslations } from "next-intl";
import FormFieldGroup from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertySelect from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import { CONTENT_DEFAULTS } from "@/feature/builder/constants/contentDefaults";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { FieldType } from "@/feature/builder/types/components/properties/componentContentPropsType";

interface TextFieldContentProps {
	component: BuilderComponent;
}

export default function TextFieldContent({ component }: TextFieldContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
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
				label={t("type")}
				layout="row"
				onChange={(value: string) =>
					updateSingleField("type", value as FieldType)
				}
				options={[
					{ label: t("text"), value: "text" },
					{ label: t("email"), value: "email" },
					{ label: t("password"), value: "password" },
				]}
				value={type}
			/>
		</div>
	);
}
