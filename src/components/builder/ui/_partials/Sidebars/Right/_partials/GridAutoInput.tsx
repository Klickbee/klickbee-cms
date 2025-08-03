"use client";

import { useState } from "react";
import type { GridAuto } from "@/builder/types/components/properties/componentStylePropsSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface GridAutoInputProps {
	label: string;
	value: GridAuto;
	onValueChange: (value: GridAuto) => void;
}

type InputType = "number" | "fr";

export default function GridAutoInput({
	label,
	value,
	onValueChange,
}: GridAutoInputProps) {
	// Determine current type and value
	const isNumberValue = typeof value === "number";
	const isFrValue = typeof value === "string" && value.endsWith("fr");

	const [inputType, setInputType] = useState<InputType>(
		isNumberValue ? "number" : "fr",
	);

	const numericValue = isNumberValue
		? value
		: isFrValue
			? parseInt(value.slice(0, -2))
			: 1;

	const handleValueChange = (newValue: string) => {
		const num = Number(newValue);
		if (inputType === "number") {
			onValueChange(num);
		} else {
			onValueChange(`${num}fr`);
		}
	};

	const handleTypeChange = (newType: InputType) => {
		setInputType(newType);
		if (newType === "number") {
			onValueChange(numericValue);
		} else {
			onValueChange(`${numericValue}fr`);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{/* Ligne 1: Label + Type selector */}
			<div className="flex max-lg:flex-col gap-2">
				<Label className="flex-1 text-gray-500">{label}</Label>
				<Select onValueChange={handleTypeChange} value={inputType}>
					<SelectTrigger className="[all:inherit] !flex !items-center w-fit">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="number">Number</SelectItem>
						<SelectItem value="fr">Fraction (fr)</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Ligne 2: Value input */}
			<Input
				className="w-full"
				min={1}
				onChange={(e) => handleValueChange(e.target.value)}
				placeholder={inputType === "fr" ? "1 for '1fr'" : "Pixel value"}
				type="number"
				value={numericValue}
			/>
		</div>
	);
}
