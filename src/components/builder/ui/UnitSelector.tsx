"use client";

import { SizeUnit } from "@/builder/types/settings/FluidSize";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";

interface UnitSelectorProps {
	unit: SizeUnit;
	onUnitChange: (unit: SizeUnit) => void;
}

export default function UnitSelector({
	unit,
	onUnitChange,
}: UnitSelectorProps) {
	return (
		<Select onValueChange={onUnitChange} value={unit}>
			<SelectTrigger className="h-auto p-0 border-0 shadow-none bg-transparent text-sm text-zinc-500 hover:text-zinc-700">
				({unit})
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="px">px</SelectItem>
				<SelectItem value="rem">rem</SelectItem>
				<SelectItem value="em">em</SelectItem>
			</SelectContent>
		</Select>
	);
}
