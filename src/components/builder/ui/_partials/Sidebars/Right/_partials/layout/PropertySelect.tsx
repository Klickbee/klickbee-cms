import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface SelectOption {
	value: string;
	label: string;
}

interface PropertySelectProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: SelectOption[];
	layout?: "row" | "column";
	placeholder?: string;
	disabled?: boolean;
}

export default function PropertySelect({
	label,
	value,
	onChange,
	options,
	layout = "row",
	placeholder,
	disabled = false,
}: PropertySelectProps) {
	const selectElement = (
		<Select disabled={disabled} onValueChange={onChange} value={value}>
			<SelectTrigger className="h-8 w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="z-[9999]">
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);

	return layout === "row" ? (
		<PropertyRow label={label}>{selectElement}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{selectElement}</PropertyColumn>
	);
}
