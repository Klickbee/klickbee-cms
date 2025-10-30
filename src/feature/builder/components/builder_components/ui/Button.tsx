import React from "react";
import { Button as ButtonShadcn } from "@/components/ui/button";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "@/feature/builder/types/components/components";

interface ButtonProps {
	component: BuilderComponent;
}

export const Button: React.FC<ButtonProps> = ({ component }) => {
	// Extract content with sensible fallbacks
	const text = (component.props?.content?.text as string) || "Button";
	const href = (component.props?.content?.href as string) || "";
	// Icon color (optional). If provided, applies to React icons (currentColor) and to SVG URLs via masking.
	const contentForColor = component.props?.content as
		| { iconColor?: string }
		| undefined;
	const iconColor = contentForColor?.iconColor;
	// Render icon from either a URL string (data URL or absolute/relative) or a ReactNode
	const rawIcon = component.props?.content?.icon as unknown;
	let Icon: React.ReactNode | null = null;
	if (typeof rawIcon === "string") {
		const src = rawIcon.trim();
		if (src) {
			const isSvg =
				src.endsWith(".svg") || src.startsWith("data:image/svg+xml");
			if (iconColor && isSvg) {
				// Use CSS mask to tint external SVGs with a solid color
				Icon = (
					<span
						aria-hidden="true"
						className="h-4 w-4 shrink-0"
						style={{
							backgroundColor: iconColor,
							WebkitMaskImage: `url(${src})`,
							maskImage: `url(${src})`,
							WebkitMaskRepeat: "no-repeat",
							maskRepeat: "no-repeat",
							WebkitMaskSize: "contain",
							maskSize: "contain",
						}}
					/>
				);
			} else {
				Icon = (
					<img
						alt=""
						aria-hidden="true"
						className="h-4 w-4 shrink-0"
						src={src}
						style={iconColor ? { color: iconColor } : undefined}
					/>
				);
			}
		}
	} else if (rawIcon) {
		if (React.isValidElement(rawIcon)) {
			type WithClassStyle = {
				className?: string;
				style?: React.CSSProperties;
			};
			const el = rawIcon as React.ReactElement<WithClassStyle>;
			Icon = React.cloneElement<WithClassStyle>(el, {
				className: ["h-4 w-4 shrink-0", el.props?.className]
					.filter(Boolean)
					.join(" "),
				style: {
					...(el.props?.style || {}),
					...(iconColor ? { color: iconColor } : {}),
				},
			});
		} else {
			Icon = rawIcon as React.ReactNode;
		}
	}

	const commonStyle: React.CSSProperties = {
		order: component.order || 0,
		...mapStylePropsToCss(component.props?.style),
	};

	const className =
		"inline-flex items-center gap-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

	const handleClick = React.useCallback(
		(e?: React.MouseEvent) => {
			if (!href) return;
			if (typeof window === "undefined") return;
			// If inside builder viewport, do not navigate.
			const el = (e?.currentTarget as HTMLElement) ?? null;
			if (el && el.closest('[data-builder="true"]')) {
				// Navigation disabled in builder; allow viewport click-capture to show toast.
				return;
			}
			if (href.startsWith("#")) {
				window.location.hash = href.slice(1);
			} else {
				window.location.href = href;
			}
		},
		[href],
	);

	return (
		<ButtonShadcn
			className={className}
			data-href={href || undefined}
			onClick={handleClick}
			style={commonStyle}
			type="button"
		>
			{Icon}
			<p>{text}</p>
		</ButtonShadcn>
	);
};
