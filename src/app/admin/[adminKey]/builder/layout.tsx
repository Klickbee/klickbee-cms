import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import BuilderLeftSidebar from "@/components/builder/ui/BuilderLeftSidebar";
import BuilderRightSidebar from "@/components/builder/ui/BuilderRightSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-full">
			<BuilderHeader />
			<div className="flex-1 flex">
				<BuilderLeftSidebar />
				{children}
				<BuilderRightSidebar />
			</div>
		</div>
	);
}
