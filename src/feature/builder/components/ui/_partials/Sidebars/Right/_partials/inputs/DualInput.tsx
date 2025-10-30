"use client";

import {
	AlignHorizontalSpaceAround,
	AlignVerticalSpaceAround,
	LucideIcon,
} from "lucide-react";
import NumberInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/inputs/NumberInput";
import { cn } from "@/lib/utils";

interface DualInputProps {
	valueX: number;
	valueY: number;
	onValueXChange: (value: number) => void;
	onValueYChange: (value: number) => void;
	iconX?: LucideIcon;
	iconY?: LucideIcon;
	placeholderX?: string;
	placeholderY?: string;
	className?: string;
}

export default function DualInput({
	valueX,
	valueY,
	onValueXChange,
	onValueYChange,
	iconX = AlignHorizontalSpaceAround,
	iconY = AlignVerticalSpaceAround,
	placeholderX = "0",
	placeholderY = "0",
	className,
}: DualInputProps) {
	return (
		<div className={cn("flex gap-2", className)}>
			<NumberInput
				className="flex-1"
				icon={iconY}
				onValueChange={onValueYChange}
				placeholder={placeholderY}
				value={valueY}
			/>
			<NumberInput
				className="flex-1"
				icon={iconX}
				onValueChange={onValueXChange}
				placeholder={placeholderX}
				value={valueX}
			/>
		</div>
	);
}
