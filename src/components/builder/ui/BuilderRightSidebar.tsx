import BuilderStyleProperties from "./_partials/Sidebars/Right/StyleProperties";

export default function BuilderRightSidebar() {
	return (
		<div className="w-80 bg-gray-50 border-l border-gray-200 h-[calc(100vh_-4rem)] flex flex-col">
			<BuilderStyleProperties />
		</div>
	);
}
