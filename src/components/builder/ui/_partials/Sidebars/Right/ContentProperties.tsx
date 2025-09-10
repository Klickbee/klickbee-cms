"use client";

import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import TextAreaContent from "@/components/builder/ui/_partials/Sidebars/Right/_partials/content/TextAreaContent";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import ButtonContent from "./_partials/content/ButtonContent";
import EmbedContent from "./_partials/content/EmbedContent";
import FormBlockContent from "./_partials/content/FormBlockContent";
import HeadingContent from "./_partials/content/HeadingContent";
import ImageContent from "./_partials/content/ImageContent";
import LinkContent from "./_partials/content/LinkContent";
import ListContent from "./_partials/content/ListContent";
import ParagraphContent from "./_partials/content/ParagraphContent";
import RichTextContent from "./_partials/content/RichTextContent";
import TextFieldContent from "./_partials/content/TextFieldContent";
import VideoContent from "./_partials/content/VideoContent";

export default function BuilderContentProperties() {
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);

	// Don't render if no component is selected
	if (!currentComponent || currentComponent.id === "none") {
		return null;
	}

	const renderContentComponent = () => {
		switch (currentComponent.type) {
			case "heading":
				return <HeadingContent component={currentComponent} />;
			case "paragraph":
				return <ParagraphContent component={currentComponent} />;
			case "richtext":
				return <RichTextContent component={currentComponent} />;
			case "list":
				return <ListContent component={currentComponent} />;
			case "link":
				return <LinkContent component={currentComponent} />;
			case "button":
				return <ButtonContent component={currentComponent} />;
			case "image":
				return <ImageContent component={currentComponent} />;
			case "video":
				return <VideoContent component={currentComponent} />;
			case "embed":
				return <EmbedContent component={currentComponent} />;
			case "formblock":
				return <FormBlockContent component={currentComponent} />;
			case "textfield":
				return <TextFieldContent component={currentComponent} />;
			case "textarea":
				return <TextAreaContent component={currentComponent} />;
			default:
				return (
					<div className="text-sm text-gray-500 py-4">
						No content properties available for{" "}
						{currentComponent.type}
					</div>
				);
		}
	};

	return (
		<Accordion defaultValue={["content"]} type="multiple">
			<AccordionItem value="content">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					Content
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					{renderContentComponent()}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
