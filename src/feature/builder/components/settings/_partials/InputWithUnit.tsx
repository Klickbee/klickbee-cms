import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SizeUnit } from "@/feature/builder/types/settings/FluidSize";

export function InputWithUnit({
	value,
	onChange,
	unit,
	onUnitChange,
	units,
	inputProps,
	buttonClassName = "",
}: {
	value: number;
	onChange: (_v: number) => void;
	unit: string;
	onUnitChange: (_u: SizeUnit) => void;
	units: readonly string[];
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	buttonClassName?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex items-center gap-1">
			<Input
				className="w-20"
				onChange={(e) => onChange(Number(e.target.value))}
				step="any"
				type="number"
				value={value}
				{...inputProps}
			/>
			<DropdownMenu onOpenChange={setOpen} open={open}>
				<DropdownMenuTrigger asChild>
					<Button
						className={buttonClassName + " px-2 min-w-8"}
						size="sm"
						variant="outline"
					>
						{unit}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{units.map((u) => (
						<DropdownMenuItem
							key={u}
							onClick={() => {
								onUnitChange(u as SizeUnit);
								setOpen(false);
							}}
						>
							{u}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
