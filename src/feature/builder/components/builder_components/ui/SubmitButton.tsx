import React, { DragEventHandler } from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface SubmitButtonProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	// Default submit button properties if not provided
	const text = (component.props?.content?.text as string) || "Submit";

	return (
		<button
			className={[
				`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`,
				className,
			]
				.filter(Boolean)
				.join(" ")}
			onClick={onClick}
			onDragLeave={
				onDragLeave as DragEventHandler<HTMLButtonElement> | undefined
			}
			onDragOver={
				onDragOver as DragEventHandler<HTMLButtonElement> | undefined
			}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
			type="submit"
		>
			{text}
		</button>
	);
};
