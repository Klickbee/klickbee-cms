import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import ToggleButton from "./ToggleButton";

interface CheckboxContentProps {
	component: BuilderComponent;
}

export default function CheckboxContent({ component }: CheckboxContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const fieldLabel = component.props.content?.label || "Label Name Here";
	const required = component.props.content?.required ?? true;
	const checkedByDefault = component.props.content?.defaultChecked ?? true;

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Field Name">
				<Input
					className="h-8"
					placeholder="Field Name Here"
					value={fieldName}
				/>
			</PropertyColumn>

			<PropertyColumn label="Label">
				<Input
					className="h-8"
					placeholder="Label Name Here"
					value={fieldLabel}
				/>
			</PropertyColumn>

			<ToggleButton
				label="Required"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={required}
			/>

			<ToggleButton
				label="Checked by default"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={checkedByDefault}
			/>
		</div>
	);
}
