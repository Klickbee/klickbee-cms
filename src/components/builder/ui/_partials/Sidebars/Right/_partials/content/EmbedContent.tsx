import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";

interface EmbedContentProps {
	component: BuilderComponent;
}

export default function EmbedContent({ component }: EmbedContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { code } = useContentProps(component, {
		code: CONTENT_DEFAULTS.DEFAULT_CUSTOM_CODE,
	});

	const { updateSingleField } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("customCode")}
				layout="column"
				onChange={(value) => updateSingleField("code", value)}
				placeholder={CONTENT_DEFAULTS.DEFAULT_CUSTOM_CODE}
				value={code}
				variant="textarea"
			/>
		</div>
	);
}
