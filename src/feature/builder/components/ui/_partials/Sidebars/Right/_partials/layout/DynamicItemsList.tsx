import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyColumn from "./PropertyColumn";

interface DynamicItemsListProps {
	label?: string;
	items: string[];
	onAddItem: (basePrefix?: string) => void;
	onRemoveItem: (index: number, minItems?: number) => void;
	onItemChange: (index: number, value: string) => void;
	addButtonText?: string;
	placeholderPrefix?: string;
	minItems?: number;
	disabled?: boolean;
}

export default function DynamicItemsList({
	label = "Items",
	items,
	onAddItem,
	onRemoveItem,
	onItemChange,
	addButtonText = "Add More",
	placeholderPrefix = "List Radio",
	minItems = 1,
	disabled = false,
}: DynamicItemsListProps) {
	return (
		<PropertyColumn label={label}>
			<div className="flex flex-col gap-2">
				{items.map((item: string, index: number) => (
					<div className="flex gap-2 items-center" key={index}>
						<Input
							className="h-8 px-2"
							disabled={disabled}
							onChange={(e) =>
								onItemChange(index, e.target.value)
							}
							placeholder={`${placeholderPrefix} ${index + 1}`}
							value={item}
						/>
						<Button
							className="h-8 w-8 p-0"
							disabled={disabled || items.length <= minItems}
							onClick={() => onRemoveItem(index, minItems)}
							size="sm"
							variant="outline"
						>
							<Minus className="w-4 h-4" />
						</Button>
					</div>
				))}

				<Button
					className="w-full h-[34px] text-xs font-medium"
					disabled={disabled}
					onClick={() => onAddItem(placeholderPrefix)}
					variant="outline"
				>
					{addButtonText}
				</Button>
			</div>
		</PropertyColumn>
	);
}
