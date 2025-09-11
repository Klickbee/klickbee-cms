import BinaryToggle from "../inputs/BinaryToggle";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface PropertyToggleProps {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	trueLabel?: string;
	falseLabel?: string;
	layout?: "row" | "column";
}

export default function PropertyToggle({
	label,
	value,
	onChange,
	disabled = false,
	trueLabel = "Yes",
	falseLabel = "No",
	layout = "row",
}: PropertyToggleProps) {
	const toggleElement = (
		<BinaryToggle
			className={disabled ? "opacity-50 pointer-events-none" : ""}
			falseLabel={falseLabel}
			onValueChange={onChange}
			trueLabel={trueLabel}
			value={value}
		/>
	);

	return layout === "row" ? (
		<PropertyRow label={label}>{toggleElement}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{toggleElement}</PropertyColumn>
	);
}
