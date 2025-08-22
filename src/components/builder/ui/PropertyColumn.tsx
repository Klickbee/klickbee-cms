"use client";

import { cn } from "@/lib/utils";

interface PropertyColumnProps {
	label: string;
	children: React.ReactNode;
	className?: string;
	action?: React.ReactNode;
}

export default function PropertyColumn({
	label,
	children,
	className,
	action,
}: PropertyColumnProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<div className="flex items-center justify-between">
				<span className="font-medium text-xs text-zinc-500 flex-1">
					{label}
				</span>
				{action && <div className="flex items-center">{action}</div>}
			</div>
			{children}
		</div>
	);
}
