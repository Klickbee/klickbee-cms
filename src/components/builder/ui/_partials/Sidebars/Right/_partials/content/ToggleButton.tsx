import { Button } from "@/components/ui/button";
import PropertyRow from "../layout/PropertyRow";

interface ToggleButtonProps {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

export default function ToggleButton({
	label,
	value,
	onChange,
}: ToggleButtonProps) {
	return (
		<PropertyRow label={label}>
			<div className="bg-zinc-100 p-[3px] rounded-lg flex">
				<Button
					className={`h-7 px-2 py-1 rounded-md text-xs font-medium flex-1 ${
						value
							? "bg-white border border-zinc-200 shadow-sm text-zinc-950"
							: "bg-transparent text-zinc-500"
					}`}
					onClick={() => onChange(true)}
					size="sm"
					variant={value ? "secondary" : "ghost"}
				>
					Yes
				</Button>
				<Button
					className={`h-7 px-2 py-1 rounded-md text-xs font-medium flex-1 ${
						!value
							? "bg-white border border-zinc-200 shadow-sm text-zinc-950"
							: "bg-transparent text-zinc-500"
					}`}
					onClick={() => onChange(false)}
					size="sm"
					variant={!value ? "secondary" : "ghost"}
				>
					No
				</Button>
			</div>
		</PropertyRow>
	);
}
