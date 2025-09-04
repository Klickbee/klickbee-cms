import { BuilderComponent } from "@/builder/types/components/components";
import { Textarea } from "@/components/ui/textarea";
import PropertyColumn from "../layout/PropertyColumn";

interface EmbedContentProps {
	component: BuilderComponent;
}

export default function EmbedContent({ component }: EmbedContentProps) {
	const customCode = component.props.content?.code || "Custom code";

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Custom Code">
				<Textarea
					className="h-16 resize"
					placeholder="Custom code"
					value={customCode}
				/>
			</PropertyColumn>
		</div>
	);
}
