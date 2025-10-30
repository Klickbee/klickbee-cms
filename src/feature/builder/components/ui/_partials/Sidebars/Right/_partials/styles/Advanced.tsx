"use client";

import { useTranslations } from "next-intl";
import PropertyField from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyField";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { AdvancedStyle } from "@/feature/builder/types/components/properties/componentStylePropsType";

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
