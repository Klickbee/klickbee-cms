"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ColorSettings } from "@/builder/types/settings/ColorSettings";
import ColorPickerContent from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/ColorPickerContent";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BasicColorPickerProps {
	value: ColorSettings | string;
	onChange: (color: ColorSettings | string) => void;
	className?: string;
}

export default function BasicColorPicker({
	value,
	onChange,
	className,
}: BasicColorPickerProps) {
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
						style={{
							backgroundColor:
								typeof value === "string"
									? value
									: value?.hexCode || "#000000",
						}}
					/>
					<span className="flex-1 text-xs">
						{typeof value === "string"
							? value
							: value?.hexCode || "#000000"}
					</span>
					<ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="center"
				className="w-[310px] p-3 m-3"
				side="bottom"
			>
				<ColorPickerContent
					closeColorPicker={() => setIsOpen(false)}
					onChange={(color: string) => onChange(color)}
					value={
						typeof value === "string"
							? value
							: value?.hexCode || "#000000"
					}
				/>
			</PopoverContent>
		</Popover>
	);
}
