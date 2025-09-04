import { BuilderComponent } from "@/builder/types/components/components";
import { Textarea } from "@/components/ui/textarea";
import PropertyColumn from "../layout/PropertyColumn";

interface FormBlockContentProps {
	component: BuilderComponent;
}

export default function FormBlockContent({ component }: FormBlockContentProps) {
	const successMessage =
		component.props.content?.successMessage || "Success Message Here";
	const errorMessage =
		component.props.content?.errorMessage || "Error Message Here";

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Success Message">
				<Textarea
					className="h-16 resize"
					placeholder="Success Message Here"
					value={successMessage}
				/>
			</PropertyColumn>

			<PropertyColumn label="Error Message">
				<Textarea
					className="h-16 resize"
					placeholder="Error Message Here"
					value={errorMessage}
				/>
			</PropertyColumn>
		</div>
	);
}
