import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import ToggleButton from "./ToggleButton";

interface VideoContentProps {
	component: BuilderComponent;
}

export default function VideoContent({ component }: VideoContentProps) {
	const videoUrl = component.props.content?.src || "https://www.google.com/";
	const autoplay = component.props.content?.autoplay ?? true;
	const controls = component.props.content?.controls ?? true;

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Video URL">
				<Input
					className="h-8"
					placeholder="https://www.google.com/"
					value={videoUrl}
				/>
			</PropertyColumn>

			<ToggleButton
				label="Autoplay"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={autoplay}
			/>

			<ToggleButton
				label="Show Controls"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={controls}
			/>
		</div>
	);
}
