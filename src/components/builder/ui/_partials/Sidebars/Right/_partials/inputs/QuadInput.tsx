"use client";

import { LucideIcon } from "lucide-react";
import NumberInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/NumberInput";
import { cn } from "@/lib/utils";

interface QuadInputProps {
	topValue: number;
	rightValue: number;
	bottomValue: number;
	leftValue: number;
	onTopChange: (value: number) => void;
	onRightChange: (value: number) => void;
	onBottomChange: (value: number) => void;
	onLeftChange: (value: number) => void;
	topIcon?: LucideIcon;
	rightIcon?: LucideIcon;
	bottomIcon?: LucideIcon;
	leftIcon?: LucideIcon;
	className?: string;
}

export default function QuadInput({
	topValue,
	rightValue,
	bottomValue,
	leftValue,
	onTopChange,
	onRightChange,
	onBottomChange,
	onLeftChange,
	topIcon,
	rightIcon,
	bottomIcon,
	leftIcon,
	className,
}: QuadInputProps) {
	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
			{/* Top */}
			<NumberInput
				icon={topIcon}
				onValueChange={onTopChange}
				value={topValue}
			/>
			{/* Right */}
			<NumberInput
				icon={rightIcon}
				onValueChange={onRightChange}
				value={rightValue}
			/>
			{/* Bottom */}
			<NumberInput
				icon={bottomIcon}
				onValueChange={onBottomChange}
				value={bottomValue}
			/>
			{/* Left */}
			<NumberInput
				icon={leftIcon}
				onValueChange={onLeftChange}
				value={leftValue}
			/>
		</div>
	);
}
