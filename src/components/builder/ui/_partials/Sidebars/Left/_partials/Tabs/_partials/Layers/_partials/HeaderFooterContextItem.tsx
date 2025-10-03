import {
	BuilderComponent,
	isParentComponent,
} from "@/builder/types/components/components";
import { ContextMenuItem } from "@/components/ui/context-menu";

export default function HeaderFooterContextItem({
	node,
}: {
	node: BuilderComponent;
}) {
	return (
		<>
			{isParentComponent(node) ? (
				<>
					<ContextMenuItem>Set as Header</ContextMenuItem>
					<ContextMenuItem>Set as Footer</ContextMenuItem>
				</>
			) : null}
		</>
	);
}
