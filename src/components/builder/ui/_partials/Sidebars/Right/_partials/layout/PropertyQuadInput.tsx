import { LucideIcon } from "lucide-react";
import {
	PercentUnit,
	TimeUnit,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import QuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/QuadInput";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "./PropertyColumn";

interface QuadValues {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

interface QuadIcons {
	top?: LucideIcon;
	right?: LucideIcon;
	bottom?: LucideIcon;
	left?: LucideIcon;
}

interface PropertyQuadInputProps<T extends SizeUnit | PercentUnit | TimeUnit> {
	label: string;
	values: QuadValues;
	unit: T;
	onValuesChange: (values: Partial<QuadValues>) => void;
	onUnitChange: (unit: T) => void;
	icons?: QuadIcons;
	disabled?: boolean;
}

export default function PropertyQuadInput<
	T extends SizeUnit | PercentUnit | TimeUnit,
>({
	label,
	values,
	unit,
	onValuesChange,
	onUnitChange,
	icons,
	disabled = false,
}: PropertyQuadInputProps<T>) {
	return (
		<PropertyColumn
			action={<UnitSelector onUnitChange={onUnitChange} unit={unit} />}
			label={label}
		>
			<QuadInput
				bottomIcon={icons?.bottom}
				bottomValue={values.bottom}
				leftIcon={icons?.left}
				leftValue={values.left}
				onBottomChange={(value) => onValuesChange({ bottom: value })}
				onLeftChange={(value) => onValuesChange({ left: value })}
				onRightChange={(value) => onValuesChange({ right: value })}
				onTopChange={(value) => onValuesChange({ top: value })}
				rightIcon={icons?.right}
				rightValue={values.right}
				topIcon={icons?.top}
				topValue={values.top}
			/>
		</PropertyColumn>
	);
}
