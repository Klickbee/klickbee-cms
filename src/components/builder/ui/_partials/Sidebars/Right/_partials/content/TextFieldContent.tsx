import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import PropertyColumn from "../layout/PropertyColumn";
import PropertyRow from "../layout/PropertyRow";
import ToggleButton from "./ToggleButton";

interface TextFieldContentProps {
	component: BuilderComponent;
}

export default function TextFieldContent({ component }: TextFieldContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const fieldLabel = component.props.content?.label || "Label Name Here";
	const required = component.props.content?.required ?? true;
	const fieldType = component.props.content?.type || "text";

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

			<PropertyRow label="Type">
				<Select value={fieldType}>
					<SelectTrigger className="h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="text">Text</SelectItem>
						<SelectItem value="email">Email</SelectItem>
						<SelectItem value="password">Password</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>
		</div>
	);
}
