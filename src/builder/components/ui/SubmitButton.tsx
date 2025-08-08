import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface SubmitButtonProps {
	component: BuilderComponent;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ component }) => {
	// Default submit button properties if not provided
	const text = (component.props?.content?.text as string) || "Submit";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="">
				<button
					className={`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`}
					type="submit"
				>
					{text}
				</button>
			</div>
		</div>
	);
};
