import { BuilderComponent } from "@/feature/builder/types/components/components";

// Import all component definitions
import { ButtonBC } from "./Button/Button";
import { CheckboxBC } from "./Checkbox/Checkbox";
import { ContainerBC } from "./Container/Container";
import { DividerBC } from "./Divider/Divider";
import { DropdownBC } from "./Dropdown/Dropdown";
import { EmailBC } from "./Email/Email";
import { EmbedBC } from "./Embed/Embed";
import { FileUploadBC } from "./FileUpload/FileUpload";
import { FormBlockBC } from "./FormBlock/FormBlock";
import { FormFileUploadBC } from "./FormFileUpload/FormFileUpload";
import { FormRichTextBC } from "./FormRichText/FormRichText";
import { GridBC } from "./Grid/Grid";
import { HeadingBC } from "./Heading/Heading";
import { ImageBC } from "./Image/Image";
import { InputBC } from "./Input/Input";
import { LinkBC } from "./Link/Link";
import { ListBC } from "./List/List";
import { NavigationMenuBC } from "./NavigationMenu/NavigationMenu";
import { ParagraphBC } from "./Paragraph/Paragraph";
import { RadioGroupBC } from "./RadioGroup/RadioGroup";
import { RichTextBC } from "./RichText/RichText";
import { SectionBC } from "./Section/Section";
import { SliderBC } from "./Slider/Slider";
import { SpacerBC } from "./Spacer/Spacer";
import { SubmitButtonBC } from "./SubmitButton/SubmitButton";
import { TextBC } from "./Text/Text";
import { TextAreaBC } from "./TextArea/TextArea";
import { TextFieldBC } from "./TextField/TextField";
import { VideoBC } from "./Video/Video";

export const componentsList: BuilderComponent[] = [
	// Layout components
	SectionBC,
	ContainerBC,
	GridBC,
	SpacerBC,
	DividerBC,

	// Text & Content components
	HeadingBC,
	TextBC,
	ParagraphBC,
	RichTextBC,
	LinkBC,
	NavigationMenuBC,
	ButtonBC,

	// Media components
	ImageBC,
	VideoBC,
	EmbedBC,
	SliderBC,
	FileUploadBC,

	// Form components
	FormRichTextBC,
	FormBlockBC,
	TextFieldBC,
	ListBC,
	CheckboxBC,
	RadioGroupBC,
	DropdownBC,
	FormFileUploadBC,
	SubmitButtonBC,
	TextAreaBC,
	InputBC,
	EmailBC,
];
