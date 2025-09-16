import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";

interface SubmitButtonContentProps {
	component: BuilderComponent;
}

export default function SubmitButtonContent({
	component,
}: SubmitButtonContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { name, text } = useContentProps(component, {
		name: CONTENT_DEFAULTS.FIELD_NAME,
		text: CONTENT_DEFAULTS.BUTTON_TEXT,
	});

	const { updateName, updateText } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("fieldName")}
				layout="column"
				onChange={updateName}
				placeholder={CONTENT_DEFAULTS.FIELD_NAME}
				value={name}
			/>

			<PropertyField
				label={t("textButton")}
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.BUTTON_TEXT}
				value={text}
			/>
		</div>
	);
}
