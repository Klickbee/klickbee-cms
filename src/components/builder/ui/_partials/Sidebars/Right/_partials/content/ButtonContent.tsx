import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import FileUploader from "./FileUploader";

interface ButtonContentProps {
	component: BuilderComponent;
}

export default function ButtonContent({ component }: ButtonContentProps) {
	const buttonText = component.props.content?.text || "Button Text Here";
	const buttonUrl =
		component.props.content?.href || "https://www.google.com/";
	const buttonIcon = component.props.content?.icon;

	const handleIconChange = (iconUrl: string | null) => {
		// TODO: Update component props in store
	};

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Button Text">
				<Input
					className="h-8"
					placeholder="Button Text Here"
					value={buttonText}
				/>
			</PropertyColumn>

			<PropertyColumn label="URL">
				<Input
					className="h-8"
					placeholder="https://www.google.com/"
					value={buttonUrl}
				/>
			</PropertyColumn>

			<FileUploader
				acceptedTypes={["svg"]}
				initialFile={buttonIcon}
				label="Icon"
				maxSize={2}
				mode="icon"
				onFileChange={handleIconChange}
			/>
		</div>
	);
}
