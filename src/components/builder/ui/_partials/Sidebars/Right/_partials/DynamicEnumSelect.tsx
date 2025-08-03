"use client";

import { ZodEnum } from "zod";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getEnumOptions } from "@/lib/enumUtils";

interface DynamicEnumSelectProps<T extends string> {
	enumSchema: ZodEnum<[T, ...T[]]>;
	label: string;
	value: T;
	onValueChange: (value: T) => void;
	placeholder?: string;
	className?: string;
}

export default function DynamicEnumSelect<T extends string>({
	enumSchema,
	label,
	value,
	onValueChange,
	placeholder,
	className = "w-[180px]",
}: DynamicEnumSelectProps<T>) {
	const options = getEnumOptions(enumSchema);

	return (
		<div className="flex max-lg:flex-col gap-2">
			<Label className="flex-1 text-gray-500">{label}</Label>
			<Select
				defaultValue={value}
				onValueChange={(selectedValue) =>
					onValueChange(selectedValue as T)
				}
			>
				<SelectTrigger className={className}>
					<SelectValue
						placeholder={placeholder || options[0]?.label}
					/>
				</SelectTrigger>
				<SelectContent>
					{options.map(
						({ value: optionValue, label: optionLabel }) => (
							<SelectItem key={optionValue} value={optionValue}>
								{optionLabel}
							</SelectItem>
						),
					)}
				</SelectContent>
			</Select>
		</div>
	);
}
