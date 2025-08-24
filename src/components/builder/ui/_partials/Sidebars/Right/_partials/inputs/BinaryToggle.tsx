"use client";

import { cn } from "@/lib/utils";

interface BinaryToggleProps {
	value: boolean;
	onValueChange: (value: boolean) => void;
	trueLabel: string;
	falseLabel: string;
	className?: string;
}

export default function BinaryToggle({
	value,
	onValueChange,
	trueLabel,
	falseLabel,
	className,
}: BinaryToggleProps) {
	return (
		<div
			className={cn(
				"bg-zinc-100 p-[3px] rounded-lg flex gap-1",
				className,
			)}
		>
			<button
				className={cn(
					"flex-1 flex items-center justify-center h-7 px-2 rounded-md transition-all font-medium text-xs",
					value
						? "bg-white border border-zinc-200 shadow-sm text-zinc-950 font-semibold"
						: "hover:bg-zinc-200/50 text-zinc-500",
				)}
				onClick={() => onValueChange(true)}
				type="button"
			>
				{trueLabel}
			</button>
			<button
				className={cn(
					"flex-1 flex items-center justify-center h-7 px-2 rounded-md transition-all font-medium text-xs",
					!value
						? "bg-white border border-zinc-200 shadow-sm text-zinc-950 font-semibold"
						: "hover:bg-zinc-200/50 text-zinc-500",
				)}
				onClick={() => onValueChange(false)}
				type="button"
			>
				{falseLabel}
			</button>
		</div>
	);
}
