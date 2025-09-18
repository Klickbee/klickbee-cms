"use client";

import { useTranslations } from "next-intl";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import BuilderStyleAdvanced from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Advanced";
import BuilderStyleBackground from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Background";
import BuilderStyleBordersAndCorners from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/BordersAndCorners";
import BuilderStyleEffects from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Effects";
import BuilderStyleLayout from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Layout";
import BuilderStylePosition from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Position";
import BuilderStyleSizeAndSpacing from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/SizeAndSpacing";
import BuilderStyleTypography from "@/components/builder/ui/_partials/Sidebars/Right/_partials/styles/Typography";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function BuilderStyleProperties() {
	const t = useTranslations("Builder.RightSidebar");
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	// Don't render if no component is selected
	if (!currentComponent || currentComponent.id === "none") {
		return null;
	}

	return (
		<Accordion collapsible type="single">
			<AccordionItem value="layout">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Layout.Layout")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleLayout component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="position">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Position.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStylePosition component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="size-spacing">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("SizeAndSpacing.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleSizeAndSpacing component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="typography">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Typography.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleTypography component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="background">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Background.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleBackground component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="borders">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("BordersAndCorners.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleBordersAndCorners
						component={currentComponent}
					/>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="effects">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Effects.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleEffects component={currentComponent} />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="advanced">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 border-b">
					{t("Advanced.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleAdvanced component={currentComponent} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
