import { FileUp } from "lucide-react";
import { FileUploadBCDI } from "./FileUploadType";

export const FileUploadBC: FileUploadBCDI = {
	groupId: "form",
	icon: <FileUp size={16} />,
	id: "fileupload",
	label: "File Upload",
	props: {
		content: {},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},

			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "fileupload",
} satisfies FileUploadBCDI;
