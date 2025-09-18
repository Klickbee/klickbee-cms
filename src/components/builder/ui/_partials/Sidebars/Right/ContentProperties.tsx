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
import CheckboxContent from "./_partials/content/CheckboxContent";
import CMSTemplateContent from "./_partials/content/CMSTemplateContent";
import DropdownContent from "./_partials/content/DropdownContent";
import EmbedContent from "./_partials/content/EmbedContent";
import FileUploadContent from "./_partials/content/FileUploadContent";
import FormBlockContent from "./_partials/content/FormBlockContent";
import HeadingContent from "./_partials/content/HeadingContent";
import ImageContent from "./_partials/content/ImageContent";
import LinkContent from "./_partials/content/LinkContent";
import ListContent from "./_partials/content/ListContent";
import ParagraphContent from "./_partials/content/ParagraphContent";
import RadioGroupContent from "./_partials/content/RadioGroupContent";
import RichTextContent from "./_partials/content/RichTextContent";
import SubmitButtonContent from "./_partials/content/SubmitButtonContent";
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
			case "cmstemplate":
				return <CMSTemplateContent component={currentComponent} />;
			case "checkbox":
				return <CheckboxContent component={currentComponent} />;
			case "dropdown":
				return <DropdownContent component={currentComponent} />;
			case "fileupload":
				return <FileUploadContent component={currentComponent} />;
			case "radiogroup":
				return <RadioGroupContent component={currentComponent} />;
			case "submitbutton":
				return <SubmitButtonContent component={currentComponent} />;
			default:
				return null;
		}
	};

	const content = renderContentComponent();

	if (!content) {
		return null;
	}

	return (
		<Accordion defaultValue={["content"]} type="multiple">
			<AccordionItem value="content">
				<AccordionTrigger className="font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b">
					Content
				</AccordionTrigger>
				<AccordionContent className="px-4 py-3 border-b border-zinc-200">
					{content}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
