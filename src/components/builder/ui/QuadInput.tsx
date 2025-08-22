"use client";

import {
	ArrowDownToLine,
	ArrowLeftToLine,
	ArrowRightToLine,
	ArrowUpToLine,
} from "lucide-react";
import NumberInput from "@/components/builder/ui/NumberInput";
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
	className,
}: QuadInputProps) {
	return (
		<div className={cn("grid grid-cols-2 gap-2", className)}>
			{/* Top */}
			<NumberInput
				icon={ArrowUpToLine}
				onValueChange={onTopChange}
				value={topValue}
			/>
			{/* Right */}
			<NumberInput
				icon={ArrowRightToLine}
				onValueChange={onRightChange}
				value={rightValue}
			/>
			{/* Bottom */}
			<NumberInput
				icon={ArrowDownToLine}
				onValueChange={onBottomChange}
				value={bottomValue}
			/>
			{/* Left */}
			<NumberInput
				icon={ArrowLeftToLine}
				onValueChange={onLeftChange}
				value={leftValue}
			/>
		</div>
	);
}
