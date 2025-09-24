import { JSX } from "react";
import { ParentBuilderComponent } from "@/builder/types/components/components";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCreateHeader } from "@/feature/page/queries/useHeaderActions";
import { PageLight } from "@/feature/page/types/page";

export function HeaderFooterContextItems({
	node,
	currentPage,
}: {
	node: ParentBuilderComponent;
	currentPage: PageLight;
}): JSX.Element {
	const { mutate: createHeader } = useCreateHeader();

	return (
		<>
			<ContextMenuItem
				onClick={() => {
					createHeader({
						content: node,
						pageId: currentPage.id,
					});
				}}
			>
				Set as header
			</ContextMenuItem>
			<ContextMenuItem>Set as footer</ContextMenuItem>
		</>
	);
}
