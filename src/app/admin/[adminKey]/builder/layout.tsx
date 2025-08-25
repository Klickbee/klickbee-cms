import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-full">
			<BuilderHeader />
			<div className="flex-1 flex">
				<div className="flex flex-row w-screen">
					<div className="flex-1 bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						<BuilderLeftSidebar />
					</div>
					<div className="w-70/100  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						{children}
					</div>
					<div className="flex-1  bg-background divide-y border-r border-t border-gray-200 h-full flex flex-col">
						<BuilderRightSidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
