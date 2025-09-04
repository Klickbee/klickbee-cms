import { Minus } from "lucide-react";
import { useState } from "react";
import { BuilderComponent } from "@/builder/types/components/components";
import { Button } from "@/components/ui/button";
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

interface ListContentProps {
	component: BuilderComponent;
}

export default function ListContent({ component }: ListContentProps) {
	const [listType, setListType] = useState(
		component.props.content?.type || "bullet",
	);
	const [listItems, setListItems] = useState<string[]>(
		component.props.content?.items || [
			"List Text 1",
			"List Text 2",
			"List Text 3",
		],
	);

	const handleAddItem = () => {
		const newItems = [...listItems, `List Text ${listItems.length + 1}`];
		setListItems(newItems);
	};

	const handleRemoveItem = (index: number) => {
		if (listItems.length > 1) {
			const newItems = listItems.filter((_, i) => i !== index);
			setListItems(newItems);
		}
	};

	const handleItemChange = (index: number, value: string) => {
		const newItems = listItems.map((item, i) =>
			i === index ? value : item,
		);
		setListItems(newItems);
	};

	return (
		<div className="flex flex-col gap-3">
			<PropertyRow label="List Type">
				<Select onValueChange={setListType} value={listType}>
					<SelectTrigger className="h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="bullet">Bullet</SelectItem>
						<SelectItem value="numbered">Numbered</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			<PropertyColumn label="List Content">
				<div className="flex flex-col gap-2">
					{listItems.map((item: string, index: number) => (
						<div className="flex gap-2 items-center" key={index}>
							<Input
								className="h-8 px-2"
								onChange={(e) =>
									handleItemChange(index, e.target.value)
								}
								placeholder={`List Text ${index + 1}`}
								value={item}
							/>
							<Button
								className="h-8 w-8 p-0"
								disabled={listItems.length <= 1}
								onClick={() => handleRemoveItem(index)}
								size="sm"
								variant="outline"
							>
								<Minus className="w-4 h-4" />
							</Button>
						</div>
					))}

					<Button
						className="w-full h-[34px] text-xs font-medium"
						onClick={handleAddItem}
						variant="outline"
					>
						Add More
					</Button>
				</div>
			</PropertyColumn>
		</div>
	);
}
