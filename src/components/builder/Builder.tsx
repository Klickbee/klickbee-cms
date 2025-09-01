import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderPreview from "@/components/builder/ui/BuilderPreview";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";

export default function BuilderComponent() {
	return (
		<div className="flex-1 flex">
			<div className="flex flex-row w-screen">
				<div className="flex-1 bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderLeftSidebar />
				</div>
				<div className="w-70/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderPreview />
				</div>
				<div className="flex-1  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
					<BuilderRightSidebar />
				</div>
			</div>
		</div>
	);
}
