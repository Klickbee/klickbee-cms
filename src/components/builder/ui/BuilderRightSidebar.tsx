import BuilderStyleProperties from "./_partials/Sidebars/Right/StyleProperties";

export default function BuilderRightSidebar() {
	return (
		<div className="border-l border-gray-200 h-[calc(100vh_-4rem)] flex flex-col overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden;">
			<BuilderStyleProperties />
		</div>
	);
}
