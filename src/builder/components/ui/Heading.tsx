import React from "react";
import { mapStylePropsToCss } from "@/builder/lib/style/mapStylePropsToCss";
import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { BuilderComponent } from "../../types/components/components";

interface HeadingProps {
	component: BuilderComponent;
}

export const Heading: React.FC<HeadingProps> = ({ component }) => {
	// Default heading content and level if not provided
	const content = (component.props?.content?.text as string) || "Heading";
	const level: number = (component.props?.content?.level as number) || 2;
	const currentComponent = useCurrentComponentStore(
		(state) => state.currentComponent,
	);
	const renderHeading = (isCurrent: boolean) => {
		switch (level) {
			case 1:
				return <h1 className="text-3xl font-bold">{content}</h1>;
			case 2:
				return <h2 className="text-2xl font-bold">{content}</h2>;
			case 3:
				return <h3 className="text-xl font-bold">{content}</h3>;
			case 4:
				return <h4 className="text-lg font-bold">{content}</h4>;
			case 5:
				return <h5 className="text-base font-bold">{content}</h5>;
			case 6:
				return <h6 className="text-sm font-bold">{content}</h6>;
			default:
				return <h2 className="text-2xl font-bold">{content}</h2>;
		}
	};

	const isCurrent = currentComponent.id === component.id;

	return (
		<div
			className="relative  bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<div className="">{renderHeading(isCurrent)}</div>
		</div>
	);
};
