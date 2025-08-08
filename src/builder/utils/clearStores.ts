import { useCurrentComponentStore } from "@/builder/store/storeCurrentComponent";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { useCurrentTabStore } from "@/builder/store/storeCurrentTabsSidebar";

export function clearStores() {
	// Clear current component store
	useCurrentComponentStore.getState().clearCurrentComponent();

	// Clear current page store
	useCurrentPageStore.getState().clearCurrentPage();

	useCurrentTabStore.getState().clearCurrentTab();
}
