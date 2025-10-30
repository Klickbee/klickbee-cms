import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface TextFieldProps {
	component: BuilderComponent;
}

export const TextField: React.FC<TextFieldProps> = ({ component }) => {
	// Default text field properties if not provided
	const label = (component.props?.content?.label as string) || "Text Field";
	const placeholder = (component.props?.content?.placeholder as string) || "";
	const name =
		(component.props?.content?.name as string) ||
		"textfield-" + component.id;
	const required = (component.props?.content?.required as boolean) || false;
	const type = (component.props?.content?.type as string) || "text";
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
			<input
				className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				id={name}
				name={name}
				placeholder={placeholder}
				required={required}
				type={type}
			/>
			{helperText && (
				<p className="text-xs text-gray-500">{helperText}</p>
			)}
		</div>
	);
};
