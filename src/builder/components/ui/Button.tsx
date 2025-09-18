import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "@/builder/types/components/components";

interface ButtonProps {
	component: BuilderComponent;
}

export const Button: React.FC<ButtonProps> = ({ component }) => {
	// Extract content with sensible fallbacks
	const text = (component.props?.content?.text as string) || "Button";
	const href = (component.props?.content?.href as string) || "";
	// Only render icon if it's not a primitive string; avoid leaking client references in serialized state
	const rawIcon = component.props?.content?.icon as unknown;
	const Icon =
		typeof rawIcon === "string"
			? undefined
			: (rawIcon as React.ReactNode | undefined);

	const commonStyle: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};

	const className =
		"inline-flex items-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

	const handleClick = React.useCallback(() => {
		if (!href) return;
		if (typeof window === "undefined") return;
		if (href.startsWith("#")) {
			window.location.hash = href.slice(1);
		} else {
			window.location.href = href;
		}
	}, [href]);

	return (
		<button
			className={className}
			onClick={handleClick}
			style={commonStyle}
			type="button"
		>
			{Icon}
			<p>{text}</p>
		</button>
	);
};
