import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface HeadingProps {
	component: BuilderComponent;
}

export const Heading: React.FC<HeadingProps> = ({ component }) => {
	// Default heading content and level if not provided
	const content = (component.props?.content as string) || "Heading";
	const level: number = (component.props?.level as number) || 2;

	const renderHeading = () => {
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

	return (
		<div
			className="relative border border-dashed border-gray-300 p-4 bg-white"
			style={{
				left: component.position?.x,
				position: component.position ? "absolute" : "relative",
				top: component.position?.y,
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="mt-6">{renderHeading()}</div>
		</div>
	);
};
