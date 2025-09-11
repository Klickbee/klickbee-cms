import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import { HeadingLevel } from "@/builder/types/components/properties/componentContentPropsType";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyField from "../layout/PropertyField";
import RewriteButton from "./RewriteButton";

interface HeadingContentProps {
	component: BuilderComponent;
}

export default function HeadingContent({ component }: HeadingContentProps) {
	const { text, level } = useContentProps(component, {
		level: CONTENT_DEFAULTS.DEFAULT_HEADING_LEVEL as HeadingLevel,
		text: CONTENT_DEFAULTS.HEADING_TEXT,
	});

	const { updateText, updateLevel } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertySelect
				label="Heading Level"
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
				label="Text"
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.HEADING_TEXT}
				value={text}
			/>

			<RewriteButton />
		</div>
	);
}
