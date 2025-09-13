import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import PropertyToggle from "../layout/PropertyToggle";

interface CMSTemplateContentProps {
	component: BuilderComponent;
}

export default function CMSTemplateContent({
	component,
}: CMSTemplateContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { enableDynamicContent, templateFieldName } = useContentProps(
		component,
		{
			enableDynamicContent: CONTENT_DEFAULTS.DEFAULT_ENABLE_DYNAMIC,
			templateFieldName: CONTENT_DEFAULTS.DEFAULT_TEMPLATE_FIELD,
		},
	);

	const { updateSingleField } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyToggle
				label={t("enableDynamicContent")}
				onChange={(value) =>
					updateSingleField("enableDynamicContent", value)
				}
				value={enableDynamicContent}
			/>

			<PropertyField
				label={t("templateFieldName")}
				layout="column"
				onChange={(value) =>
					updateSingleField("templateFieldName", value)
				}
				placeholder={CONTENT_DEFAULTS.DEFAULT_TEMPLATE_FIELD}
				value={templateFieldName}
			/>
		</div>
	);
}
