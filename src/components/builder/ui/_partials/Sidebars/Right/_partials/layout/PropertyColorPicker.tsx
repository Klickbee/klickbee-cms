import { ColorSettings } from "@/builder/types/settings/ColorSettings";
import BasicColorPicker from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/BasicColorPicker";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface PropertyColorPickerProps {
	label: string;
	value: ColorSettings | string;
	onChange: (color: ColorSettings | string) => void;
	layout?: "row" | "column";
}

export default function PropertyColorPicker({
	label,
	value,
	onChange,
	layout = "row",
}: PropertyColorPickerProps) {
	const colorPicker = <BasicColorPicker onChange={onChange} value={value} />;

	return layout === "row" ? (
		<PropertyRow label={label}>{colorPicker}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{colorPicker}</PropertyColumn>
	);
}
