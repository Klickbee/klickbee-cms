import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface PropertyNumberProps {
	label: string;
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	placeholder?: string;
	layout?: "row" | "column";
	disabled?: boolean;
	unit?: string;
}

export default function PropertyNumber({
	label,
	value,
	onChange,
	min,
	max,
	step = 1,
	placeholder,
	layout = "row",
	disabled = false,
	unit,
}: PropertyNumberProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseFloat(e.target.value);
		if (!isNaN(newValue)) {
			onChange(newValue);
		}
	};

	const numberInput = (
		<div className="relative">
			<Input
				className={cn("h-8 pr-8", unit && "pr-8")}
				disabled={disabled}
				max={max}
				min={min}
				onChange={handleChange}
				placeholder={placeholder}
				step={step}
				type="number"
				value={value}
			/>
			{unit && (
				<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 pointer-events-none">
					{unit}
				</span>
			)}
		</div>
	);

	return layout === "row" ? (
		<PropertyRow label={label}>{numberInput}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{numberInput}</PropertyColumn>
	);
}
