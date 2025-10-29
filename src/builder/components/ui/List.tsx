import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../types/components/components";

interface ListProps {
	component: BuilderComponent;
}

export const List: React.FC<ListProps> = ({ component }) => {
	// Default list properties if not provided
	const label = (component.props?.content?.label as string) || "List";
	const items = (component.props?.content?.items as string[]) || [
		"Item 1",
		"Item 2",
		"Item 3",
	];
	const listType = (component.props?.content?.listType as string) || "ul"; // ul or ol

	return (
		<div
			className="flex flex-col space-y-2"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<label className="text-sm font-medium text-gray-700">{label}</label>
			{listType === "ol" ? (
				<ol className="list-decimal pl-5 space-y-1">
					{items.map((item, index) => (
						<li className="text-gray-700" key={index}>
							{item}
						</li>
					))}
				</ol>
			) : (
				<ul className="list-disc pl-5 space-y-1">
					{items.map((item, index) => (
						<li className="text-gray-700" key={index}>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
