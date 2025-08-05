import React from "react";
import { cn } from "@/lib/utils";

export default function DefaultHeader({
	className,
	children,
	title,
	description,
}: {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	className?: string;
}) {
	return (
		<>
			<div
				className={cn(
					"px-8 py-4 flex flex-col gap-1 border-b",
					className,
				)}
			>
				{children}
				<div>
					<h1 className="text-2xl font-semibold">{title}</h1>
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				</div>
			</div>
		</>
	);
}
