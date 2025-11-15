import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import {
	BuilderComponent,
	canHaveChildren,
} from "../../../types/components/components";

interface FormBlockProps {
	component: BuilderComponent;
	children?: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const FormBlock: React.FC<FormBlockProps> = ({
	component,
	children,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default form properties if not provided
	const formId = "form-" + component.id;
	const action = (component.props?.content?.action as string) || "";
	const method = (component.props?.content?.formMethod as string) || "POST";

	return (
		<div
			className={["relative", className].filter(Boolean).join(" ")}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<form
				action={action}
				className=" space-y-4"
				id={formId}
				method={method}
				onClick={onClick}
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
