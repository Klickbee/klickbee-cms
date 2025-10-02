import { JSX } from "react";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { setFooterToPage } from "@/feature/page/lib/setFooterToPage";
import { setHeaderToPage } from "@/feature/page/lib/setHeaderToPage";
import { useSetAsFooter } from "@/feature/page/queries/useSetAsFooter";
import { useSetAsHeader } from "@/feature/page/queries/useSetAsHeader";
import { PageLight } from "@/feature/page/types/page";

export function HeaderFooterContextItems({
	node,
	currentPage,
}: {
	node: ParentBuilderComponent;
	currentPage: PageLight;
}): JSX.Element {
	const { mutate: setHeader } = useSetAsHeader();
	const { mutate: setFooter } = useSetAsFooter();

	return (
		<>
			<ContextMenuItem
				onClick={() => {
					// Remove the selected block from the page before promoting it to header
					setHeaderToPage(node);
					// Then associate it as the page header
					setHeader({
						content: node,
						pageId: currentPage.id,
					});
				}}
			>
				Set as header
			</ContextMenuItem>
			<ContextMenuItem
				onClick={() => {
					// Remove the selected block from the page before promoting it to footer
					setFooterToPage(node);
					// Then associate it as the page footer
					setFooter({
						content: node,
						pageId: currentPage.id,
					});
				}}
			>
				Set as footer
			</ContextMenuItem>
		</>
	);
}
