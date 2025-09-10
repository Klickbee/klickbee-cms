import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";

interface SubmitButtonContentProps {
	component: BuilderComponent;
}

export default function SubmitButtonContent({
	component,
}: SubmitButtonContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const buttonText = component.props.content?.text || "Label Name Here";

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Field Name">
				<Input
					className="h-8"
					placeholder="Field Name Here"
					value={fieldName}
				/>
			</PropertyColumn>

			<PropertyColumn label="Text Button">
				<Input
					className="h-8"
					placeholder="Label Name Here"
					value={buttonText}
				/>
			</PropertyColumn>
		</div>
	);
}
