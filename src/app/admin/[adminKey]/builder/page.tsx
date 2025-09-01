import { DeleteComponentProvider } from "@/builder/contexts/DeleteComponentContext";
import BuilderComponent from "@/components/builder/Builder";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import { Toaster } from "@/components/ui/sonner";

export default async function BuilderPage() {
	return (
		<DeleteComponentProvider>
			<div className="flex flex-col h-full">
				<BuilderHeader />
				<BuilderComponent />
			</div>
			<Toaster position={"bottom-center"} />
		</DeleteComponentProvider>
	);
}
