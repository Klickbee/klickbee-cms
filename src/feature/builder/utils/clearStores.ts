import { useCurrentComponentStore } from "@/feature/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { useCurrentTabStore } from "@/feature/builder/store/storeCurrentTabsSidebar";

export function clearStores() {
	// Clear current component store
	useCurrentComponentStore.getState().clearCurrentComponent();

	// Clear current page store
	useCurrentPageStore.getState().clearCurrentPage();

	useCurrentTabStore.getState().clearCurrentTab();
}
