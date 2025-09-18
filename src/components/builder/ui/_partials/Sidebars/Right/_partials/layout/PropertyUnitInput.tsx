import {
	PercentUnit,
	TimeUnit,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import SimpleUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface PropertyUnitInputProps<T extends SizeUnit | PercentUnit | TimeUnit> {
	label: string;
	value: number;
	unit: T;
	onValueChange: (value: number) => void;
	onUnitChange: (unit: T) => void;
	layout?: "row" | "column";
	placeholder?: string;
	className?: string;
	onEmpty?: () => void;
}

export default function PropertyUnitInput<
	T extends SizeUnit | PercentUnit | TimeUnit,
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
}: PropertyUnitInputProps<T>) {
	const unitInput = (
		<SimpleUnitInput
			className={className}
			onEmpty={onEmpty}
			onUnitChange={onUnitChange}
			onValueChange={onValueChange}
			placeholder={placeholder}
			unit={unit}
			value={value}
		/>
	);

	return layout === "row" ? (
		<PropertyRow label={label}>{unitInput}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{unitInput}</PropertyColumn>
	);
}
