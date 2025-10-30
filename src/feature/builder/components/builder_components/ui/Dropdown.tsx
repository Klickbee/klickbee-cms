import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface DropdownProps {
	component: BuilderComponent;
}

export const Dropdown: React.FC<DropdownProps> = ({ component }) => {
	// Default dropdown properties if not provided
	const label = (component.props?.content?.label as string) || "Dropdown";
	const name =
		(component.props?.content?.name as string) ||
		"dropdown-" + component.id;
	const required = (component.props?.content?.required as boolean) || false;
	const options = (component.props?.content?.options as {
		value: string;
		label: string;
	}[]) || [
		{ label: "Select an option", value: "" },
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	];
	const defaultValue =
		(component.props?.content?.defaultValue as string) || options[0]?.value;
	const helperText = (component.props?.content?.helperText as string) || "";

	return (
		<div
			className="flex flex-col space-y-2"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<label className="text-sm font-medium text-gray-700" htmlFor={name}>
				{label}
				{required && <span className="text-red-500 ">*</span>}
			</label>
			<select
				className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
				defaultValue={defaultValue}
				id={name}
				name={name}
				required={required}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{helperText && (
				<p className="text-xs text-gray-500">{helperText}</p>
			)}
		</div>
	);
};
