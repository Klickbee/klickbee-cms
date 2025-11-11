"use client";

import { ChevronsUpDown, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextInputProps {
	value: string;
	onValueChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	icon?: LucideIcon;
	hideIcon?: boolean;
	onEmpty?: () => void;
}

export default function TextInput({
	value,
	onValueChange,
	placeholder = "",
	className,
	icon,
	hideIcon = false,
	onEmpty,
}: TextInputProps) {
	const [inputValue, setInputValue] = useState(value.toString());

	// Sync with external value changes
	React.useEffect(() => {
		setInputValue(value.toString());
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		// If empty, trigger onEmpty (if provided) else fallback to 0 for backward compatibility
		if (newValue === "") {
			if (onEmpty) {
				onEmpty();
			} else {
				onValueChange("");
			}
			return;
		}

		onValueChange(String(newValue));
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
					type="text"
					value={inputValue}
				/>
				{!icon && !hideIcon && (
					<ChevronsUpDown className="size-4 text-zinc-950 shrink-0" />
				)}
			</div>
		</div>
	);
}
