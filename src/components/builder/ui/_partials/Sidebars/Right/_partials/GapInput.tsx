import { type SizeUnit, sizeUnits } from "@/builder/types/settings/FluidSize";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface GapInputProps {
	label: string;
	valueX: number;
	valueY: number;
	unit: SizeUnit;
	onValueXChange: (value: number) => void;
	onValueYChange: (value: number) => void;
	onUnitChange: (unit: SizeUnit) => void;
}

export default function GapInput({
	label,
	valueX,
	valueY,
	unit,
	onValueXChange,
	onValueYChange,
	onUnitChange,
}: GapInputProps) {
	return (
		<div className="flex flex-col gap-2">
			{/* Ligne 1: Label + Sélecteur d'unité */}
			<div className="flex max-lg:flex-col gap-2">
				<Label className="flex-1 text-gray-500">{label}</Label>
				<Select onValueChange={onUnitChange} value={unit}>
					<SelectTrigger className="[all:inherit] !flex !items-center w-fit">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{sizeUnits.map((sizeUnit) => (
							<SelectItem key={sizeUnit} value={sizeUnit}>
								{sizeUnit}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Ligne 2: 2 inputs pour X et Y */}
			<div className="flex gap-2">
				<Input
					className="flex-1"
					onChange={(e) => onValueXChange(Number(e.target.value))}
					placeholder="Horizontal"
					type="number"
					value={valueX}
				/>
				<Input
					className="flex-1"
					onChange={(e) => onValueYChange(Number(e.target.value))}
					placeholder="Vertical"
					type="number"
					value={valueY}
				/>
			</div>
		</div>
	);
}
