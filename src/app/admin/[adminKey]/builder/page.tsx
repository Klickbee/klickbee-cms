import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import BuilderComponent from "@/feature/builder/components/Builder";
import BuilderHeader from "@/feature/builder/components/ui/BuilderHeader";
import { DeleteComponentProvider } from "@/feature/builder/contexts/DeleteComponentContext";
import { lastPageIdOptions } from "@/feature/page/options/lastPageIdOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function BuilderPage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(lastPageIdOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DeleteComponentProvider>
				<div className="flex flex-col h-full">
					<BuilderHeader />
					<BuilderComponent />
				</div>
				<Toaster position={"bottom-center"} />
			</DeleteComponentProvider>
		</HydrationBoundary>
	);
}
