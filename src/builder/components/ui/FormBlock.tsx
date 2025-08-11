import React from "react";
import {
	BuilderComponent,
	canHaveChildren,
} from "../../types/components/components";

interface FormBlockProps {
	component: BuilderComponent;
	children?: React.ReactNode;
}

export const FormBlock: React.FC<FormBlockProps> = ({
	component,
	children,
}) => {
	// Default form properties if not provided
	const formId = "form-" + component.id;
	const action = (component.props?.content?.action as string) || "";
	const method = (component.props?.content?.formMethod as string) || "POST";

	return (
		<div
			className="relative bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<form
				action={action}
				className=" space-y-4"
				id={formId}
				method={method}
			>
				{/* Render children if this component can have children */}
				{canHaveChildren(component.type) && children ? (
					children
				) : (
					<p className="text-gray-500 italic">
						Add form elements here
					</p>
				)}
			</form>
		</div>
	);
};
