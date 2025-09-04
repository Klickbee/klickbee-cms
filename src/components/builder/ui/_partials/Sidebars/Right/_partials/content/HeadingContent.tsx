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
import RewriteButton from "./RewriteButton";

interface HeadingContentProps {
	component: BuilderComponent;
}

export default function HeadingContent({ component }: HeadingContentProps) {
	const headingText = component.props.content?.text || "Text Heading";
	const headingLevel = component.props.content?.level || 1;

	// Convert number level to string for Select component
	const levelAsString = headingLevel.toString();

	return (
		<div className="flex flex-col gap-3">
			<PropertyRow label="Heading Level">
				<Select value={levelAsString}>
					<SelectTrigger className="h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">H1</SelectItem>
						<SelectItem value="2">H2</SelectItem>
						<SelectItem value="3">H3</SelectItem>
						<SelectItem value="4">H4</SelectItem>
						<SelectItem value="5">H5</SelectItem>
						<SelectItem value="6">H6</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			<PropertyColumn label="Text">
				<Input
					className="h-8"
					placeholder="Text Heading"
					value={headingText}
				/>
			</PropertyColumn>

			<RewriteButton />
		</div>
	);
}
