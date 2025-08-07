import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface LinkProps {
	component: BuilderComponent;
}

export const Link: React.FC<LinkProps> = ({ component }) => {
	// Default link properties if not provided
	const text = (component.props?.content?.text as string) || "Link text";
	const href = (component.props?.content?.href as string) || "#";
	const target = (component.props?.content?.target as string) || "_blank";
	const rel = target === "_blank" ? "noopener noreferrer" : "";

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="">
				<a
					className="text-blue-600 hover:underline"
					href={href}
					rel={rel}
					target={target}
				>
					{text}
				</a>
			</div>
		</div>
	);
};
