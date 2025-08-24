"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import GradientPickerContent from "@/components/builder/ui/GradientPickerContent";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface GradientColorPickerProps {
	value: string;
	onChange: (gradient: string) => void;
	className?: string;
}

export default function GradientColorPicker({
	value,
	onChange,
	className,
}: GradientColorPickerProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Popover onOpenChange={setIsOpen} open={isOpen}>
			<PopoverTrigger asChild>
				<Button
					className={cn(
						"h-8 w-[150px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
						className,
					)}
					variant="outline"
				>
					<div
						className="w-4 h-4 rounded border border-zinc-200 mr-2"
						style={{ background: value }}
					/>
					<span className="flex-1 text-xs truncate">{value}</span>
					<ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="center"
				className="w-[310px] p-3 m-3"
				side="bottom"
			>
				<GradientPickerContent
					closeGradientPicker={() => setIsOpen(false)}
					onChange={onChange}
					value={value}
				/>
			</PopoverContent>
		</Popover>
	);
}
