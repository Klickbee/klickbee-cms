"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TypeOption {
	value: string;
	label: string;
}

interface TypeSelectorProps {
	value: string;
	onValueChange: (value: string) => void;
	options: TypeOption[];
	className?: string;
}

export default function TypeSelector({
	value,
	onValueChange,
	options,
	className,
}: TypeSelectorProps) {
	return (
		<Select onValueChange={onValueChange} value={value}>
			<SelectTrigger className={`h-8 w-full ${className || ""}`}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
