"use client";

import { Minus } from "lucide-react";
import { useState } from "react";
import { BuilderComponent } from "@/builder/types/components/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyColumn from "../layout/PropertyColumn";
import ToggleButton from "./ToggleButton";

interface DropdownContentProps {
	component: BuilderComponent;
}

export default function DropdownContent({ component }: DropdownContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const fieldLabel = component.props.content?.label || "Label Name Here";
	const required = component.props.content?.required ?? true;
	const [dropdownItems, setDropdownItems] = useState<string[]>(
		component.props.content?.items || [
			"List Radio 1",
			"List Radio 2",
			"List Radio 3",
		],
	);

	const handleAddItem = () => {
		const newItems = [
			...dropdownItems,
			`List Radio ${dropdownItems.length + 1}`,
		];
		setDropdownItems(newItems);
	};

	const handleRemoveItem = (index: number) => {
		if (dropdownItems.length > 1) {
			const newItems = dropdownItems.filter((_, i) => i !== index);
			setDropdownItems(newItems);
		}
	};

	const handleItemChange = (index: number, value: string) => {
		const newItems = dropdownItems.map((item, i) =>
			i === index ? value : item,
		);
		setDropdownItems(newItems);
	};

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Field Name">
				<Input
					className="h-8"
					placeholder="Field Name Here"
					value={fieldName}
				/>
			</PropertyColumn>

			<PropertyColumn label="Label">
				<Input
					className="h-8"
					placeholder="Label Name Here"
					value={fieldLabel}
				/>
			</PropertyColumn>

			<ToggleButton
				label="Required"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={required}
			/>

			<PropertyColumn label="Items">
				<div className="flex flex-col gap-2">
					{dropdownItems.map((item: string, index: number) => (
						<div className="flex gap-2 items-center" key={index}>
							<Input
								className="h-8 px-2"
								onChange={(e) =>
									handleItemChange(index, e.target.value)
								}
								placeholder={`List Radio ${index + 1}`}
								value={item}
							/>
							<Button
								className="h-8 w-8 p-0"
								disabled={dropdownItems.length <= 1}
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
