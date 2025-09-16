"use client";

import { useTranslations } from "next-intl";
import { STYLE_DEFAULTS } from "@/builder/constants/styleDefaults";
import { useStyleProps } from "@/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import { AdvancedStyle } from "@/builder/types/components/properties/componentStylePropsType";
import PropertyField from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyField";

export default function BuilderStyleAdvanced({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Advanced");

	const styleProps = useStyleProps(component, {
		advanced: STYLE_DEFAULTS.ADVANCED,
	});
	const advancedStyle = styleProps.advanced || STYLE_DEFAULTS.ADVANCED;
	const { updateNestedProperty } = useStyleUpdate(component);

	const updateProperty = (field: keyof AdvancedStyle, value: string) => {
		updateNestedProperty("advanced", (current) => ({
			...current,
			[field]: value,
		}));
	};

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* CSS Class */}
			<PropertyField
				label={t("cssClass")}
				layout="row"
				onChange={(value) => updateProperty("cssClass", value)}
				placeholder={t("cssClass")}
				type="text"
				value={advancedStyle.cssClass || ""}
				variant="input"
			/>

			{/* CSS ID */}
			<PropertyField
				label={t("cssId")}
				layout="row"
				onChange={(value) => updateProperty("cssId", value)}
				placeholder={t("cssId")}
				type="text"
				value={advancedStyle.cssId || ""}
				variant="input"
			/>

			{/* Custom CSS */}
			<PropertyField
				label={t("customCss")}
				layout="column"
				onChange={(value) => updateProperty("customCss", value)}
				placeholder={t("customCssPlaceholder")}
				textareaClassName="h-48 resize-vertical text-xs"
				value={advancedStyle.customCss || ""}
				variant="textarea"
			/>
		</div>
	);
}
