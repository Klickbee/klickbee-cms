"use client";

import {
	PercentUnit,
	TimeUnit,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import NumberInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/NumberInput";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import { cn } from "@/lib/utils";

interface SimpleUnitInputProps<T extends SizeUnit | PercentUnit | TimeUnit> {
	value: number;
	onValueChange: (value: number) => void;
	unit: T;
	onUnitChange: (unit: T) => void;
	placeholder?: string;
	className?: string;
}

export default function SimpleUnitInput<
	T extends SizeUnit | PercentUnit | TimeUnit,
>({
	value,
	onValueChange,
	unit,
	onUnitChange,
	placeholder = "0",
	className,
}: SimpleUnitInputProps<T>) {
	return (
		<div
			className={cn(
				"bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden flex h-8 max-w-[180px]",
				className,
			)}
		>
			{/* Input section */}
			<div className="flex-1 flex items-center">
				<NumberInput
					className="border-none shadow-none bg-transparent h-auto flex-1 [&>div]:pl-3 [&>div]:pr-2 [&>div]:py-2"
					hideIcon
					onValueChange={onValueChange}
					placeholder={placeholder}
					value={value}
				/>
			</div>

			{/* Separator border */}
			<div className="w-px bg-zinc-200" />

			{/* Unit select section */}
			<div className="px-2 py-2 flex items-center w-[50px] flex-shrink-0">
				<UnitSelector
					onUnitChange={onUnitChange}
					unit={unit}
					variant="embedded"
				/>
			</div>
		</div>
	);
}
