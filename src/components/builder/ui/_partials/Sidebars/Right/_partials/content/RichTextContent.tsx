import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { BuilderComponent } from "@/builder/types/components/components";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PropertyRow from "../layout/PropertyRow";

interface RichTextContentProps {
	component: BuilderComponent;
}

export default function RichTextContent({ component }: RichTextContentProps) {
	const richText = component.props.content?.content || "";

	return (
		<div className="space-y-4">
			<PropertyRow label="Content">
				<div className="space-y-2">
					<div className="flex gap-1 border rounded p-1">
						<Button size="sm" variant="ghost">
							<Bold className="w-4 h-4" />
						</Button>
						<Button size="sm" variant="ghost">
							<Italic className="w-4 h-4" />
						</Button>
						<Button size="sm" variant="ghost">
							<Underline className="w-4 h-4" />
						</Button>
						<Button size="sm" variant="ghost">
							<List className="w-4 h-4" />
						</Button>
						<Button size="sm" variant="ghost">
							<ListOrdered className="w-4 h-4" />
						</Button>
					</div>
					<Textarea
						placeholder="Enter rich text content"
						rows={6}
						value={richText}
					/>
				</div>
			</PropertyRow>
		</div>
	);
}
