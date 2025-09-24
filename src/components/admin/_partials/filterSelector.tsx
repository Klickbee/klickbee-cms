"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface FilterOption<T = string> {
	value: T;
	label: string;
}

interface FilterSelectorProps<T = string> {
	value: T;
	onValueChange: (value: T) => void;
	options: FilterOption<T>[];
	placeholder?: string;
	className?: string;
	label?: string;
}

export default function FilterSelector<T extends string>({
	value,
	onValueChange,
	options,
	placeholder = "Sort by",
	className,
	label,
}: FilterSelectorProps<T>) {
	return (
		<div className={`flex items-center gap-2 ${className || ""}`}>
			{label && (
				<span className="text-sm font-medium text-muted-foreground">
					{label}
				</span>
			)}
			<Select onValueChange={onValueChange} value={value}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
