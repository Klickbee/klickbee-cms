import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import RewriteButton from "./RewriteButton";

interface ParagraphContentProps {
	component: BuilderComponent;
}

export default function ParagraphContent({ component }: ParagraphContentProps) {
	const { text } = useContentProps(component, {
		text: CONTENT_DEFAULTS.PARAGRAPH_TEXT,
	});

	const { updateText } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label="Text Content"
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.PARAGRAPH_TEXT}
				value={text}
				variant="textarea"
			/>

			<RewriteButton />
		</div>
	);
}
