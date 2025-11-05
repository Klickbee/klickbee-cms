import { FileUp } from "lucide-react";
import { FormFileUploadBCI } from "./FormFileUploadType";

export const FormFileUploadBC: FormFileUploadBCI = {
	groupId: "form",
	icon: <FileUp size={16} />,
	id: "formfileupload",
	label: "File Upload",
	name: "FormFileUpload",
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
} satisfies FormFileUploadBCI;
