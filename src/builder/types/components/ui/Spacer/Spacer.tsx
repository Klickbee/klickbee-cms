import { MoveVertical } from "lucide-react";
import { SpacerBCDI } from "./SpacerType";

export const SpacerBC: SpacerBCDI = {
	groupId: "text",
	icon: <MoveVertical size={16} />,
	id: "spacer",
	label: "Spacer",
	props: {
		content: {},
		style: {
			sizeAndSpacing: {},
		},
	},
	type: "spacer",
} satisfies SpacerBCDI;
