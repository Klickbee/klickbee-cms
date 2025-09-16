import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";

interface FormBlockContentProps {
	component: BuilderComponent;
}

export default function FormBlockContent({ component }: FormBlockContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { successMessage, errorMessage } = useContentProps(component, {
		errorMessage: CONTENT_DEFAULTS.DEFAULT_ERROR_MESSAGE,
		successMessage: CONTENT_DEFAULTS.DEFAULT_SUCCESS_MESSAGE,
	});

	const { updateSingleField } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("successMessage")}
				layout="column"
				onChange={(value) => updateSingleField("successMessage", value)}
				placeholder={CONTENT_DEFAULTS.DEFAULT_SUCCESS_MESSAGE}
				value={successMessage}
				variant="textarea"
			/>

			<PropertyField
				label={t("errorMessage")}
				layout="column"
				onChange={(value) => updateSingleField("errorMessage", value)}
				placeholder={CONTENT_DEFAULTS.DEFAULT_ERROR_MESSAGE}
				value={errorMessage}
				variant="textarea"
			/>
		</div>
	);
}
