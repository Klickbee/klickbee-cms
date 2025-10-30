import { useTranslations } from "next-intl";
import PropertySelect from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import { CONTENT_DEFAULTS } from "@/feature/builder/constants/contentDefaults";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { HeadingLevel } from "@/feature/builder/types/components/properties/componentContentPropsType";
import PropertyField from "../layout/PropertyField";
import RewriteButton from "./RewriteButton";

interface HeadingContentProps {
	component: BuilderComponent;
}

export default function HeadingContent({ component }: HeadingContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { text, level } = useContentProps(component, {
		level: CONTENT_DEFAULTS.DEFAULT_HEADING_LEVEL as HeadingLevel,
		text: CONTENT_DEFAULTS.HEADING_TEXT,
	});

	const { updateText, updateLevel } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertySelect
				label={t("headingLevel")}
				layout="row"
				onChange={(value) =>
					updateLevel(parseInt(value) as HeadingLevel)
				}
				options={[
					{ label: "H1", value: "1" },
					{ label: "H2", value: "2" },
					{ label: "H3", value: "3" },
					{ label: "H4", value: "4" },
					{ label: "H5", value: "5" },
					{ label: "H6", value: "6" },
				]}
				value={level?.toString() || "1"}
			/>

			<PropertyField
				label={t("text")}
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.HEADING_TEXT}
				value={text}
				variant="textarea"
			/>

			<RewriteButton />
		</div>
	);
}
