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
	variant?: "default" | "embedded" | "no-wrap" | "opacity";
}

export default function UnitSelector<
	T extends SizeUnit | PercentUnit | TimeUnit,
>({ unit, onUnitChange, variant = "default" }: UnitSelectorProps<T>) {
	// Generate the list of SelectItem elements for available units.
	// When variant === "no-wrap", we return only the items (to be embedded inside an existing Select)
	// and we manually invoke onUnitChange when an item is selected.
	const getUnitOptions = (attachHandlers: boolean = false) => {
		const unitsArraySelectItems: React.JSX.Element[] = [];
		sizeUnits.forEach((u) => {
			unitsArraySelectItems.push(
				<SelectItem
					key={u}
					value={u}
					{...(attachHandlers
						? { onClick: () => onUnitChange(u as T) }
						: {})}
				>
					{u}
				</SelectItem>,
			);
		});
		// Pour les unités d'opacité, on affiche juste %
		if (variant === "opacity") {
			return [
				<SelectItem
					key="%"
					value="%"
					{...(attachHandlers
						? { onClick: () => onUnitChange("%" as T) }
						: {})}
				>
					%
				</SelectItem>,
			];
		}
		// Pour les unités de temps, on affiche ms et s
		if (unit === "ms" || unit === "s") {
			return [
				<SelectItem
					key="ms"
					value="ms"
					{...(attachHandlers
						? { onClick: () => onUnitChange("ms" as T) }
						: {})}
				>
					ms
				</SelectItem>,
				<SelectItem
					key="s"
					value="s"
					{...(attachHandlers
						? { onClick: () => onUnitChange("s" as T) }
						: {})}
				>
					s
				</SelectItem>,
			];
		}
		// Pour les unités de taille, on affiche sizeUnits
		return unitsArraySelectItems;
	};

	if (variant === "no-wrap") {
		// In no-wrap mode, we attach click handlers so the provided onUnitChange is called.
		return getUnitOptions(true);
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
