import { useTranslations } from "next-intl";
import BuilderStyleLayout from "@/components/builder/ui/_partials/Sidebars/Right/_partials/Layout";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function BuilderStyleProperties() {
	const t = useTranslations("Builder.RightSidebar");
	return (
		<Accordion
			className="w-full h-full"
			collapsible
			defaultValue="style-content"
			type="single"
		>
			<AccordionItem value="style-content">
				<AccordionTrigger className="border-b p-4">
					{t("Layout.Layout")}
				</AccordionTrigger>
				<AccordionContent asChild>
					<BuilderStyleLayout />
				</AccordionContent>
			</AccordionItem>
			{/*<BuilderStyleContent />*/}
			{/*<BuilderStyleBackground />*/}
			{/*<BuilderStyleTypography />*/}
			{/*<BuilderStyleSizeAndSpacing />*/}
			{/*<BuilderStyleEffects />*/}
			{/*<BuilderStyleBordersAndCorners />*/}
			{/*<BuilderStyleAdvanced />*/}
		</Accordion>
	);
}
