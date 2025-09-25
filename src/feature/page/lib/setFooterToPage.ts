import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";

// Remove a component (by id) from the content tree. Returns true if removed.
function removeComponentById(
	components: BuilderComponent[],
	targetId: string,
): boolean {
	for (let i = 0; i < components.length; i++) {
		const c = components[i];
		if (c.id === targetId) {
			components.splice(i, 1);
			// Reorder siblings to keep sequential order values
			components.forEach((comp, idx) => {
				comp.order = idx + 1;
			});
			return true;
		}
		if (
			c.children &&
			removeComponentById(c.children as BuilderComponent[], targetId)
		) {
			return true;
		}
	}
	return false;
}

// Removes the selected component from the current page content.
// This prepares the page so the chosen block can be promoted to the shared Footer without duplication.
export function setFooterToPage(component: ParentBuilderComponent) {
	// Access the store outside of React components using getState (Zustand API)
	const { currentPage, setCurrentPage } = useCurrentPageStore.getState();

	if (!Array.isArray(currentPage.content)) return;

	// Work on a deep copy to avoid mutating store references directly
	const newContent: BuilderComponent[] = JSON.parse(
		JSON.stringify(currentPage.content),
	);

	const removed = removeComponentById(newContent, component.id);
	if (!removed) return;

	setCurrentPage(
		{
			...currentPage,
			content: newContent,
		},
		{ recordHistory: true },
	);
}
