"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconToggleOption<T extends string> {
	value: T;
	icon: LucideIcon;
	label?: string;
}

interface IconToggleGroupProps<T extends string> {
	options: IconToggleOption<T>[];
	value: T;
	onValueChange: (value: T) => void;
	className?: string;
	size?: "sm" | "default";
}

export default function IconToggleGroup<T extends string>({
	options,
	value,
	onValueChange,
	className,
	size = "default",
}: IconToggleGroupProps<T>) {
	return (
		<div className={cn("bg-zinc-100 p-1 rounded-lg flex gap-1", className)}>
			{options.map((option) => {
				const isSelected = value === option.value;
				const Icon = option.icon;

				return (
					<button
						className={cn(
							"flex-1 flex items-center justify-center rounded-md transition-all",
							size === "sm" ? "h-6 min-w-6" : "h-7 min-w-7",
							isSelected
								? "bg-white border border-zinc-200 shadow-sm"
								: "hover:bg-zinc-200/50",
						)}
						key={option.value}
						onClick={() => onValueChange(option.value)}
						title={option.label || option.value}
						type="button"
					>
						<Icon
							className={cn(
								"size-4",
								isSelected ? "text-zinc-950" : "text-zinc-500",
							)}
						/>
						{option.label && size === "default" && (
							<span
								className={cn(
									"ml-2 font-medium text-xs",
									isSelected
										? "text-zinc-950"
										: "text-zinc-500",
								)}
							>
								{option.label}
							</span>
						)}
					</button>
				);
			})}
		</div>
	);
}
