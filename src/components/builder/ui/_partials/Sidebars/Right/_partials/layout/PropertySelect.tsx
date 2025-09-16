import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface SelectOption<T extends string> {
	value: T;
	label: string;
}

interface PropertySelectProps<T extends string> {
	label: string;
	value: T;
	onChange: (value: T) => void;
	options: SelectOption<T>[];
	layout?: "row" | "column";
	placeholder?: string;
	disabled?: boolean;
}

export default function PropertySelect<T extends string>({
	label,
	value,
	onChange,
	options,
	layout = "row",
	placeholder,
	disabled = false,
}: PropertySelectProps<T>) {
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
