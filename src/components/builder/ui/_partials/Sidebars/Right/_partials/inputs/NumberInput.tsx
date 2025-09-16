"use client";

import { ChevronsUpDown, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberInputProps {
	value: number;
	onValueChange: (value: number) => void;
	placeholder?: string;
	className?: string;
	icon?: LucideIcon;
	hideIcon?: boolean;
}

export default function NumberInput({
	value,
	onValueChange,
	placeholder = "0",
	className,
	icon,
	hideIcon = false,
}: NumberInputProps) {
	const [inputValue, setInputValue] = useState(value.toString());

	// Sync with external value changes
	React.useEffect(() => {
		setInputValue(value.toString());
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		// Only call onValueChange if it's a valid number or empty
		if (newValue === "" || !isNaN(Number(newValue))) {
			onValueChange(newValue === "" ? 0 : Number(newValue));
		}
	};

	const IconComponent = icon || ChevronsUpDown;

	return (
		<div
			className={cn(
				"bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden",
				className,
			)}
		>
			<div className="flex items-center px-3 py-2 gap-2">
				{icon && (
					<IconComponent className="size-4 text-zinc-500 shrink-0" />
				)}
				<Input
					className="border-none shadow-none p-0 h-auto text-xs font-normal bg-transparent flex-1 focus-visible:ring-0 focus:ring-0 [&_input]:focus-visible:ring-0 [&_input]:focus:ring-0"
					onBlur={handleChange}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder={placeholder}
					type="number"
					value={inputValue}
				/>
				{!icon && !hideIcon && (
					<ChevronsUpDown className="size-4 text-zinc-950 shrink-0" />
				)}
			</div>
		</div>
	);
}
