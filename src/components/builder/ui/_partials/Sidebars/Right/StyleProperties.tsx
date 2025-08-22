import { useTranslations } from "next-intl";
import BuilderStyleLayout from "@/components/builder/ui/_partials/Sidebars/Right/_partials/Layout";
import BuilderStylePosition from "@/components/builder/ui/_partials/Sidebars/Right/_partials/Position";
import BuilderStyleSizeAndSpacing from "@/components/builder/ui/_partials/Sidebars/Right/_partials/SizeAndSpacing";
import BuilderStyleTypography from "@/components/builder/ui/_partials/Sidebars/Right/_partials/Typography";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function BuilderStyleProperties() {
	const t = useTranslations("Builder.RightSidebar");

	return (
		<Accordion defaultValue={["layout"]} type="multiple">
			<AccordionItem value="layout">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Layout.Layout")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleLayout />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="position">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Position.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStylePosition />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="size-spacing">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("SizeAndSpacing.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleSizeAndSpacing />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="typography">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					{t("Typography.title")}
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					<BuilderStyleTypography />
				</AccordionContent>
			</AccordionItem>

			{/*<AccordionItem value="content">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200">
					Content
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3">
					<BuilderStyleContent />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="background">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200">
					Background
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3">
					<BuilderStyleBackground />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="effects">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200">
					Effects
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3">
					<BuilderStyleEffects />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="borders">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200">
					Borders & Corners
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3">
					<BuilderStyleBordersAndCorners />
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="advanced">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200">
					Advanced
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3">
					<BuilderStyleAdvanced />
				</AccordionContent>
			</AccordionItem>*/}
		</Accordion>
	);
}
