"use client";

import { ReactNode } from "react";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

type StyleSectionProps = {
	value: string;
	title: string;
	children: ReactNode;
	triggerClassName?: string;
	contentClassName?: string;
};

export function StyleSection({
	value,
	title,
	children,
	triggerClassName,
	contentClassName,
}: StyleSectionProps) {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger
				className={
					triggerClassName ??
					"font-medium text-xs px-4 py-3 border-t border-zinc-200 data-[state=open]:border-b"
				}
			>
				{title}
			</AccordionTrigger>
			<AccordionContent
				className={
					contentClassName ?? "px-4 py-3 border-b border-zinc-200"
				}
			>
				{children}
			</AccordionContent>
		</AccordionItem>
	);
}

export default StyleSection;
