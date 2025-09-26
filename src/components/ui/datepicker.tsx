"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	placeholder?: string;
}

export function DatePicker({
	value,
	onChange,
	placeholder = "Pick a date",
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
					data-empty={!value}
					variant="outline"
				>
					<CalendarIcon />
					{value ? format(value, "PPP") : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" onSelect={onChange} selected={value} />
			</PopoverContent>
		</Popover>
	);
}
