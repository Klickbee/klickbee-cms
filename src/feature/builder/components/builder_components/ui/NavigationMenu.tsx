import React from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import {
	ComponentContentProps,
	NavigationItem,
} from "@/feature/builder/types/components/properties/componentContentPropsType";
import { BuilderComponent } from "../../../types/components/components";

interface NavigationMenuProps {
	component: BuilderComponent;
}

/*
  NavigationMenu expects component.props.content to contain:
  - items: Array<{ label: string; href: string; target?: string }> or string[]
  - orientation?: "horizontal" | "vertical" (default: horizontal)
*/
export const NavigationMenu: React.FC<NavigationMenuProps> = ({
	component,
}) => {
	const content = (component.props?.content || {}) as ComponentContentProps;
	const rawItems =
		(content.navItems as NavigationItem[] | undefined) ??
		(content.items as string[] | undefined);
	const orientation: "horizontal" | "vertical" =
		content.orientation ?? "horizontal";

	const items: { label: string; href: string; target?: string }[] =
		Array.isArray(rawItems) && rawItems.length > 0
			? rawItems.map((it) =>
					typeof it === "string"
						? { label: it, href: "#" }
						: (it as {
								label: string;
								href: string;
								target?: string;
							}),
				)
			: [
					{ label: "Home", href: "#" },
					{ label: "About", href: "#" },
					{ label: "Contact", href: "#" },
				];

	return (
		<nav
			className=""
			style={{
				order: component.order || 0,
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<ul
				className={
					orientation === "vertical"
						? "flex flex-col gap-2"
						: "flex flex-row gap-4 items-center"
				}
			>
				{items.map((item, i) => (
					<li key={i}>
						<a className="" href={item.href} target={item.target}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};
