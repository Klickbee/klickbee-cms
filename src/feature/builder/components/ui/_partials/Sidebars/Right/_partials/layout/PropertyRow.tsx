"use client";

import { cn } from "@/lib/utils";

interface PropertyRowProps {
	label: string;
	children: React.ReactNode;
	className?: string;
	labelWidth?: string;
	variant?: string;
}

export default function PropertyRow({
	label,
	children,
	className,
	labelWidth = "w-[100px]",
	variant = "default",
}: PropertyRowProps) {
	return (
		<div className={cn("flex items-center gap-2 w-full", className)}>
			<div
				className={cn(
					"font-medium text-xs text-zinc-500 leading-4 flex-1 shrink-0",
					labelWidth,
				)}
			>
				{label}
			</div>
			<div className="w-[150px]">{children}</div>
		</div>
	);
}
