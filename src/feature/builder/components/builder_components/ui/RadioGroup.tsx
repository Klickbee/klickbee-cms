import React, { DragEventHandler } from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface RadioGroupProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default radio group properties if not provided
	const label = (component.props?.content?.label as string) || "Radio Group";
	const name =
		(component.props?.content?.name as string) || "radio-" + component.id;
	const required = (component.props?.content?.required as boolean) || false;
	const options = (component.props?.content?.options as {
		value: string;
		label: string;
	}[]) || [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	];
	const defaultValue =
		(component.props?.content?.defaultValue as string) || options[0]?.value;
	const helperText = (component.props?.content?.helperText as string) || "";

	return (
		<fieldset
			className={className}
			onClick={onClick}
			onDragLeave={
				onDragLeave as DragEventHandler<HTMLFieldSetElement> | undefined
			}
			onDragOver={
				onDragOver as DragEventHandler<HTMLFieldSetElement> | undefined
			}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<legend className="text-sm font-medium text-gray-700">
				{label}
				{required && <span className="text-red-500 ">*</span>}
			</legend>
			<div className="mt-2 space-y-2">
				{options.map((option) => (
					<div className="flex items-center" key={option.value}>
						<input
							className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
							defaultChecked={option.value === defaultValue}
							id={`${name}-${option.value}`}
							name={name}
							required={required}
							type="radio"
							value={option.value}
						/>
						<label
							className=" text-sm font-medium text-gray-700"
							htmlFor={`${name}-${option.value}`}
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
			{helperText && (
				<p className="mt-2 text-xs text-gray-500">{helperText}</p>
			)}
		</fieldset>
	);
};
