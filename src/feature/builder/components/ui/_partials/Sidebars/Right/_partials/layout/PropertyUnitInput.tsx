import SimpleUnitInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import {
	PercentUnit,
	TimeUnit,
} from "@/feature/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/feature/builder/types/settings/FluidSize";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface PropertyUnitInputProps<
	T extends SizeUnit | PercentUnit | TimeUnit,
	V = number,
> {
	label: string;
	value: V;
	unit: T;
	onValueChange: (value: V) => void;
	onUnitChange: (unit: T) => void;
	layout?: "row" | "column";
	placeholder?: string;
	className?: string;
	onEmpty?: () => void;
	variant?: "embedded" | "default" | "no-wrap" | "opacity";
}

export default function PropertyUnitInput<
	T extends SizeUnit | PercentUnit | TimeUnit,
	V = number,
>({
	label,
	value,
	unit,
	onValueChange,
	onUnitChange,
	layout = "row",
	placeholder = "0",
	className,
	onEmpty,
	variant = "embedded",
}: PropertyUnitInputProps<T, V>) {
	const unitInput = (
		<SimpleUnitInput
			className={className}
			onEmpty={onEmpty}
			onUnitChange={onUnitChange}
			onValueChange={onValueChange}
			placeholder={placeholder}
			unit={unit}
			value={value}
			variant={variant}
		/>
	);

	return layout === "row" ? (
		<PropertyRow label={label} variant={variant}>
			{unitInput}
		</PropertyRow>
	) : (
		<PropertyColumn label={label} variant={variant}>
			{unitInput}
		</PropertyColumn>
	);
}
