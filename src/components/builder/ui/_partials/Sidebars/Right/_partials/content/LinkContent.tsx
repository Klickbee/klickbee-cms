import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import ToggleButton from "./ToggleButton";

interface LinkContentProps {
	component: BuilderComponent;
}

export default function LinkContent({ component }: LinkContentProps) {
	const linkText = component.props.content?.text || "Link Text Here";
	const linkUrl = component.props.content?.href || "https://www.google.com/";
	const openInNewTab = component.props.content?.openInNewTab || true;

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Link Text">
				<Input
					className="h-8"
					placeholder="Link Text Here"
					value={linkText}
				/>
			</PropertyColumn>

			<PropertyColumn label="Link URL">
				<Input
					className="h-8"
					placeholder="https://www.google.com/"
					value={linkUrl}
				/>
			</PropertyColumn>

			<ToggleButton
				label="New Tab"
				onChange={() => {
					// TODO: Update component props in store
				}}
				value={openInNewTab}
			/>
		</div>
	);
}
