import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import FileUploader from "./FileUploader";

interface ButtonContentProps {
	component: BuilderComponent;
}

export default function ButtonContent({ component }: ButtonContentProps) {
	const { text, href, icon } = useContentProps(component, {
		href: CONTENT_DEFAULTS.DEFAULT_URL,
		icon: undefined,
		text: CONTENT_DEFAULTS.BUTTON_TEXT,
	});

	const { updateText, updateHref, updateIcon } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label="Button Text"
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.BUTTON_TEXT}
				value={text}
			/>

			<PropertyField
				label="URL"
				layout="column"
				onChange={updateHref}
				placeholder={CONTENT_DEFAULTS.DEFAULT_URL}
				type="url"
				value={href}
			/>

			<FileUploader
				acceptedTypes={["svg"]}
				initialFile={icon}
				label="Icon"
				maxSize={2}
				mode="icon"
				onFileChange={(fileUrl) => updateIcon(fileUrl || "")}
			/>
		</div>
	);
}
