import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PropertyColumn from "./PropertyColumn";
import PropertyRow from "./PropertyRow";

interface IconToggleOption<T extends string> {
	value: T;
	icon: LucideIcon;
	label?: string;
}

interface BinaryToggleProps {
	variant?: "binary";
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	trueLabel?: string;
	falseLabel?: string;
	layout?: "row" | "column";
}

interface IconToggleProps<T extends string> {
	variant: "icon";
	label: string;
	value: T;
	onChange: (value: T) => void;
	options: IconToggleOption<T>[];
	disabled?: boolean;
	size?: "sm" | "default";
	layout?: "row" | "column";
}

type PropertyToggleProps<T extends string = never> =
	| BinaryToggleProps
	| IconToggleProps<T>;

export default function PropertyToggle<T extends string = never>(
	props: PropertyToggleProps<T>,
) {
	const { label, disabled = false, layout = "row" } = props;

	const renderToggle = () => {
		if (props.variant === "icon") {
			const { value, onChange, options, size = "default" } = props;
			return (
				<div
					className={cn(
						"bg-zinc-100 p-1 rounded-lg flex gap-1",
						disabled && "opacity-50 pointer-events-none",
					)}
				>
					{options.map((option) => {
						const isSelected = value === option.value;
						const Icon = option.icon;

						return (
							<button
								className={cn(
									"flex-1 flex items-center justify-center rounded-md transition-all",
									size === "sm"
										? "h-6 min-w-6"
										: "h-7 min-w-7",
									isSelected
										? "bg-white border border-zinc-200 shadow-sm"
										: "hover:bg-zinc-200/50",
								)}
								disabled={disabled}
								key={option.value}
								onClick={() => onChange(option.value)}
								title={option.label || option.value}
								type="button"
							>
								<Icon
									className={cn(
										"size-4",
										isSelected
											? "text-zinc-950"
											: "text-zinc-500",
									)}
								/>
								{option.label && size === "default" && (
									<span
										className={cn(
											"ml-2 font-medium text-xs",
											isSelected
												? "text-zinc-950"
												: "text-zinc-500",
										)}
									>
										{option.label}
									</span>
								)}
							</button>
						);
					})}
				</div>
			);
		} else {
			const {
				value,
				onChange,
				trueLabel = "Yes",
				falseLabel = "No",
			} = props;
			return (
				<div
					className={cn(
						"bg-zinc-100 p-[3px] rounded-lg flex gap-1",
						disabled && "opacity-50 pointer-events-none",
					)}
				>
					<button
						className={cn(
							"flex-1 flex items-center justify-center h-7 px-2 rounded-md transition-all font-medium text-xs",
							value
								? "bg-white border border-zinc-200 shadow-sm text-zinc-950 font-semibold"
								: "hover:bg-zinc-200/50 text-zinc-500",
						)}
						disabled={disabled}
						onClick={() => onChange(true)}
						type="button"
					>
						{trueLabel}
					</button>
					<button
						className={cn(
							"flex-1 flex items-center justify-center h-7 px-2 rounded-md transition-all font-medium text-xs",
							!value
								? "bg-white border border-zinc-200 shadow-sm text-zinc-950 font-semibold"
								: "hover:bg-zinc-200/50 text-zinc-500",
						)}
						disabled={disabled}
						onClick={() => onChange(false)}
						type="button"
					>
						{falseLabel}
					</button>
				</div>
			);
		}
	};

	const toggleElement = renderToggle();

	return layout === "row" ? (
		<PropertyRow label={label}>{toggleElement}</PropertyRow>
	) : (
		<PropertyColumn label={label}>{toggleElement}</PropertyColumn>
	);
}
