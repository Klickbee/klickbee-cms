import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

interface CheckboxProps {
	component: BuilderComponent;
}

export const Checkbox: React.FC<CheckboxProps> = ({ component }) => {
	// Default checkbox properties if not provided
	const label = (component.props?.content?.label as string) || "Checkbox";
	const name =
		(component.props?.content?.name as string) ||
		"checkbox-" + component.id;
	const required = (component.props?.content?.required as boolean) || false;
	const checked = (component.props?.content?.checked as boolean) || false;
	const helperText = (component.props?.content?.helperText as string) || "";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<div className="">
				<div className="flex items-start">
					<div className="flex items-center h-5">
						<input
							className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							defaultChecked={checked}
							id={name}
							name={name}
							required={required}
							type="checkbox"
						/>
					</div>
					<div className=" text-sm">
						<label
							className="font-medium text-gray-700"
							htmlFor={name}
						>
							{label}
							{required && (
								<span className="text-destructive ">*</span>
							)}
						</label>
						{helperText && (
							<p className="text-xs text-gray-500">
								{helperText}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
