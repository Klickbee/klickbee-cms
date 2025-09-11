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
				label="Link Text"
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.LINK_TEXT}
				value={text}
			/>

			<PropertyField
				label="Link URL"
				layout="column"
				onChange={updateHref}
				placeholder={CONTENT_DEFAULTS.DEFAULT_URL}
				type="url"
				value={href}
			/>

			<PropertyToggle
				label="New Tab"
				onChange={updateOpenInNewTab}
				value={openInNewTab}
			/>
		</div>
	);
}
