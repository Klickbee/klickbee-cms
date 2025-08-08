import { FileUp } from "lucide-react";
import { FormFileUploadBCDI } from "./FormFileUploadType";

export const FormFileUploadBC: FormFileUploadBCDI = {
	groupId: "form",
	icon: <FileUp size={16} />,
	id: "formfileupload",
	label: "File Upload",
	props: {
		content: {
			maxFileSize: 5,
			mimeTypes: ["image/*", "application/pdf"].join(","),
			name: "file",
		},
		style: {
			background: {},
			bordersAndCorners: {},
			effects: {},
			sizeAndSpacing: {},
			typography: {},
		},
	},
	type: "fileupload",
} satisfies FormFileUploadBCDI;
