import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import PropertyToggle from "../layout/PropertyToggle";

interface LinkContentProps {
	component: BuilderComponent;
}

export default function LinkContent({ component }: LinkContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { text, href, openInNewTab } = useContentProps(component, {
		href: CONTENT_DEFAULTS.DEFAULT_URL,
		openInNewTab: CONTENT_DEFAULTS.DEFAULT_OPEN_NEW_TAB,
		text: CONTENT_DEFAULTS.LINK_TEXT,
	});

	const { updateText, updateHref, updateOpenInNewTab } =
		useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("linkText")}
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.LINK_TEXT}
				value={text}
			/>

			<PropertyField
				label={t("linkUrl")}
				layout="column"
				onChange={updateHref}
				placeholder={CONTENT_DEFAULTS.DEFAULT_URL}
				type="url"
				value={href}
			/>

			<PropertyToggle
				label={t("newTab")}
				onChange={updateOpenInNewTab}
				value={openInNewTab}
			/>
		</div>
	);
}
