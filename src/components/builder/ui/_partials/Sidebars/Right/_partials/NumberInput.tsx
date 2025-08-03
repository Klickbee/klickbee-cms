"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberInputProps {
	label: string;
	value: number;
	onValueChange: (value: number) => void;
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
}

export default function NumberInput({
	label,
	value,
	onValueChange,
	placeholder,
	min = 0,
	max,
	step = 1,
}: NumberInputProps) {
	return (
		<div className="flex max-lg:flex-col gap-2">
			<Label className="flex-1 text-gray-500">{label}</Label>
			<Input
				className="w-[180px]"
				max={max}
				min={min}
				onChange={(e) => onValueChange(Number(e.target.value))}
				placeholder={placeholder}
				step={step}
				type="number"
				value={value}
			/>
		</div>
	);
}
