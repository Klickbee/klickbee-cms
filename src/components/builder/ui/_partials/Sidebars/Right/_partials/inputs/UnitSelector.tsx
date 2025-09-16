"use client";

import {
	PercentUnit,
	TimeUnit,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit, sizeUnits } from "@/builder/types/settings/FluidSize";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface UnitSelectorProps<T extends SizeUnit | PercentUnit | TimeUnit> {
	unit: T;
	onUnitChange: (unit: T) => void;
	variant?: "default" | "embedded" | "no-wrap";
}

export default function UnitSelector<
	T extends SizeUnit | PercentUnit | TimeUnit,
>({ unit, onUnitChange, variant = "default" }: UnitSelectorProps<T>) {
	const getUnitOptions = () => {
		const unitsArraySelectItems: React.JSX.Element[] = [];
		sizeUnits.forEach((unit) => {
			unitsArraySelectItems.push(
				<SelectItem key={unit} value={unit}>
					{unit}
				</SelectItem>,
			);
		});
		// Pour les unités d'opacité, on affiche juste %
		if (unit === "%" && variant != "no-wrap") {
			return [
				<SelectItem key="%" value="%">
					%
				</SelectItem>,
			];
		}
		// Pour les unités de temps, on affiche ms et s
		if (unit === "ms" || unit === "s") {
			return [
				<SelectItem key="ms" value="ms">
					ms
				</SelectItem>,
				<SelectItem key="s" value="s">
					s
				</SelectItem>,
			];
		}
		// Pour les unités de taille, on affiche sizeUnits
		return unitsArraySelectItems;
	};

	if (variant === "no-wrap") {
		return getUnitOptions();
	} else {
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
				<SelectContent>{getUnitOptions()}</SelectContent>
			</Select>
		);
	}
}
