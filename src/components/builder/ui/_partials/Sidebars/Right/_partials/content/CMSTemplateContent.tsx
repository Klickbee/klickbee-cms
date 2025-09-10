import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import ToggleButton from "./ToggleButton";

interface CMSTemplateContentProps {
	component: BuilderComponent;
}

export default function CMSTemplateContent({
	component,
}: CMSTemplateContentProps) {
	const enableDynamicContent =
		component.props.content?.enableDynamicContent ?? true;
	const templateFieldName =
		component.props.content?.templateFieldName || "Heading";

	return (
		<div className="flex flex-col gap-3">
			<ToggleButton
				label="Enable dynamic content"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={enableDynamicContent}
			/>

			<PropertyColumn label="Template field name">
				<Input
					className="h-8"
					placeholder="Heading"
					value={templateFieldName}
				/>
			</PropertyColumn>
		</div>
	);
}
