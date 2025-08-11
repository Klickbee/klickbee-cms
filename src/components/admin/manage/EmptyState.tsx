import Image from "next/image";
import { Button } from "@/components/ui/button";
import EmptyStateImage from "../../../../public/empty_state.png";

interface EmptyStateProps {
	title: string;
	description: string;
	buttonText?: string;
	dialogTitle?: string;
	dialogDescription?: string;
	onButtonClick?: () => void;
}

export default function EmptyStateComponent({
	title,
	description,
	buttonText,
	dialogTitle = "Create New Collection",
	dialogDescription = "Create a new collection to organize your content.",
	onButtonClick,
}: EmptyStateProps) {
	return (
		<div className="p-6 border-t flex flex-col items-center justify-center text-center">
			<div className="mb-4">
				<Image
					alt="Empty state"
					height={141}
					src={EmptyStateImage}
					width={200}
				/>
			</div>
			<h2 className="text-base font-semibold mb-1">{title}</h2>
			<p className="text-sm text-muted-foreground mb-4 max-w-md">
				{description}
			</p>
			{buttonText && (
				<Button onClick={onButtonClick} variant="outline">
					{buttonText}
				</Button>
			)}
		</div>
	);
}
