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

interface TextAreaContentProps {
	component: BuilderComponent;
}

export default function TextAreaContent({ component }: TextAreaContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const fieldLabel = component.props.content?.label || "Label Name Here";
	const required = component.props.content?.required ?? true;
	const rows = component.props.content?.rows || 1;

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

			<PropertyRow label="Rows">
				<Select value={rows.toString()}>
					<SelectTrigger className="h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">1</SelectItem>
						<SelectItem value="2">2</SelectItem>
						<SelectItem value="3">3</SelectItem>
						<SelectItem value="4">4</SelectItem>
						<SelectItem value="5">5</SelectItem>
						<SelectItem value="6">6</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>
		</div>
	);
}
