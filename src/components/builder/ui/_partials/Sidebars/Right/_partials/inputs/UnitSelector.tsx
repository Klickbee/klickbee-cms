"use client";

import { SizeUnit } from "@/builder/types/settings/FluidSize";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface UnitSelectorProps {
	unit: SizeUnit;
	onUnitChange: (unit: SizeUnit) => void;
	variant?: "default" | "embedded";
}

export default function UnitSelector({
	unit,
	onUnitChange,
	variant = "default",
}: UnitSelectorProps) {
	return (
		<Select onValueChange={onUnitChange} value={unit}>
			<SelectTrigger
				className={
					variant === "embedded"
						? "border-none shadow-none p-0 h-auto bg-transparent text-center text-xs font-medium text-zinc-500 hover:text-zinc-700 w-full [&>svg]:hidden"
						: "h-auto p-0 border-0 shadow-none bg-transparent text-sm text-zinc-500 hover:text-zinc-700"
				}
			>
				{variant === "embedded" ? <SelectValue /> : `(${unit})`}
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="px">px</SelectItem>
				<SelectItem value="rem">rem</SelectItem>
				<SelectItem value="em">em</SelectItem>
			</SelectContent>
		</Select>
	);
}
