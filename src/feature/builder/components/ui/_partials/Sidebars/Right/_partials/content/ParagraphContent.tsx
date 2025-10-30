import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/feature/builder/constants/contentDefaults";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import RewriteButton from "./RewriteButton";

interface ParagraphContentProps {
	component: BuilderComponent;
}

export default function ParagraphContent({ component }: ParagraphContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { text } = useContentProps(component, {
		text: CONTENT_DEFAULTS.PARAGRAPH_TEXT,
	});

	const { updateText } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("textContent")}
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
