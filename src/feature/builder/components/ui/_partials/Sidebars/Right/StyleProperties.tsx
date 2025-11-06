"use client";

import { useTranslations } from "next-intl";
import { Accordion } from "@/components/ui/accordion";
import {
	BuilderStyleAdvanced,
	BuilderStyleBackground,
	BuilderStyleBordersAndCorners,
	BuilderStyleEffects,
	BuilderStyleLayout,
	BuilderStylePosition,
	BuilderStyleSizeAndSpacing,
	BuilderStyleTypography,
} from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/styles";
import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import {
	ComponentName,
	componentMap,
} from "@/feature/builder/types/components/componentMap";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import StyleSection from "./StyleSection";

export default function BuilderStyleProperties() {
	const t = useTranslations("Builder.RightSidebar");
	const currentComponent: BuilderComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	// Don't render if no component is selected
	if (!currentComponent || currentComponent.id === "none") {
		return null;
	}

	const def = componentMap[currentComponent.name as ComponentName];

	if (!def) {
		return (
			<p className={"p-4 text-sm text-red-600"}>
				Their has been an error loading the style properties for this
				component.
			</p>
		);
	}

	const defStyle = def.styleProps;

	const triggerClass =
		"font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b";
	const contentClass = "px-4 py-3 border-b border-zinc-200";

	return (
		<Accordion collapsible type="single">
			{defStyle.layout && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Layout.Layout")}
					triggerClassName={triggerClass}
					value="layout"
				>
					<BuilderStyleLayout component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.position && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Position.title")}
					triggerClassName={triggerClass}
					value="position"
				>
					<BuilderStylePosition component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.sizeAndSpacing && (
				<StyleSection
					contentClassName={contentClass}
					title={t("SizeAndSpacing.title")}
					triggerClassName={triggerClass}
					value="size-spacing"
				>
					<BuilderStyleSizeAndSpacing component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.typography && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Typography.title")}
					triggerClassName={triggerClass}
					value="typography"
				>
					<BuilderStyleTypography component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.background && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Background.title")}
					triggerClassName={triggerClass}
					value="background"
				>
					<BuilderStyleBackground component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.bordersAndCorners && (
				<StyleSection
					contentClassName={contentClass}
					title={t("BordersAndCorners.title")}
					triggerClassName={triggerClass}
					value="borders"
				>
					<BuilderStyleBordersAndCorners
						component={currentComponent}
					/>
				</StyleSection>
			)}

			{defStyle.effects && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Effects.title")}
					triggerClassName={triggerClass}
					value="effects"
				>
					<BuilderStyleEffects component={currentComponent} />
				</StyleSection>
			)}

			{defStyle.advanced && (
				<StyleSection
					contentClassName={contentClass}
					title={t("Advanced.title")}
					triggerClassName={triggerClass}
					value="advanced"
				>
					<BuilderStyleAdvanced component={currentComponent} />
				</StyleSection>
			)}
		</Accordion>
	);
}
