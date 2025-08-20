import { MoveVertical } from "lucide-react";
import { SpacerBCI } from "./SpacerType";

export const SpacerBC: SpacerBCI = {
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
} satisfies SpacerBCI;
