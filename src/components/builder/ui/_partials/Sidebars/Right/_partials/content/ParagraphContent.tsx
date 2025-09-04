import { BuilderComponent } from "@/builder/types/components/components";
import { Textarea } from "@/components/ui/textarea";
import PropertyColumn from "../layout/PropertyColumn";
import RewriteButton from "./RewriteButton";

interface ParagraphContentProps {
	component: BuilderComponent;
}

export default function ParagraphContent({ component }: ParagraphContentProps) {
	const paragraphText = component.props.content?.text || "Text";

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Text Content">
				<Textarea
					className="h-16 resize"
					placeholder="Text"
					value={paragraphText}
				/>
			</PropertyColumn>

			<RewriteButton />
		</div>
	);
}
