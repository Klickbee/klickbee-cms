import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import FileUploader from "./FileUploader";

interface ImageContentProps {
	component: BuilderComponent;
}

export default function ImageContent({ component }: ImageContentProps) {
	const imageSrc = component.props.content?.src;
	const altText = component.props.content?.alt || "Loremipsum dolor sit amet";

	const handleImageChange = (imageUrl: string | null) => {
		// TODO: Update component props in store
	};

	return (
		<div className="flex flex-col gap-3">
			<FileUploader
				acceptedTypes={["png", "jpeg", "jpg", "svg"]}
				initialFile={imageSrc}
				label="Icon"
				maxSize={2}
				mode="image"
				onFileChange={handleImageChange}
			/>

			<PropertyColumn label="Alt Text">
				<Input
					className="h-8"
					placeholder="Loremipsum dolor sit amet"
					value={altText}
				/>
			</PropertyColumn>
		</div>
	);
}
