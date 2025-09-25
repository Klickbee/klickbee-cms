import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

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
		<a
			className="text-blue-600 hover:underline"
			href={href}
			rel={rel}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
			target={target}
		>
			{text}
		</a>
	);
};
