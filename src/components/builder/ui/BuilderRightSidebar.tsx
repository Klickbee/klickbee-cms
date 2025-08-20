import BuilderStyleProperties from "./_partials/Sidebars/Right/StyleProperties";

export default function BuilderRightSidebar() {
	return (
		<div className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
			<BuilderStyleProperties />
		</div>
	);
}
