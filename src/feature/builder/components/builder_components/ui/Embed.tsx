import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface EmbedProps {
	component: BuilderComponent;
}

export const Embed: React.FC<EmbedProps> = ({ component }) => {
	// Default embed code if not provided
	const embedCode =
		(component.props?.content?.content as string) ||
		'<div style="padding: 56.25% 0 0 0; position: relative;"><iframe src="https://player.vimeo.com/video/76979871?h=8272103f6e" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>';
	const title =
		(component.props?.content?.text as string) || "Embedded content";

	return (
		<div
			className="embed-container"
			dangerouslySetInnerHTML={{ __html: embedCode }}
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
			title={title}
		/>
	);
};
