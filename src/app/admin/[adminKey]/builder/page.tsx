import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { DeleteComponentProvider } from "@/builder/contexts/DeleteComponentContext";
import BuilderComponent from "@/components/builder/Builder";
import BuilderHeader from "@/components/builder/ui/BuilderHeader";
import { Toaster } from "@/components/ui/sonner";
import { allPagesOptions } from "@/feature/page/options/allPagesOptions";
import { lastPageIdOptions } from "@/feature/page/options/lastPageIdOptions";
import { getQueryClient } from "@/lib/getQueryClient";

export default async function BuilderPage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(allPagesOptions);
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
