import { Upload } from "lucide-react";
import React from "react";
import { BuilderComponent } from "../../types/components/components";

interface FileUploadProps {
	component: BuilderComponent;
}

export const FileUpload: React.FC<FileUploadProps> = ({ component }) => {
	// Default file properties if not provided
	const label = (component.props?.content?.label as string) || "Upload File";
	const accept = (component.props?.content?.mimeTypes as string) || "*/*";
	const maxSize = (component.props?.content?.maxFileSize as number) || 5; // in MB

	return (
		<div
			className="relative   bg-white"
			style={{
				order: component.order || 0, // Use order property for positioning
				...((component.props?.style as Record<string, unknown>) || {}),
			}}
		>
			<div className="">
				<div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
					<Upload className="w-10 h-10 text-gray-400 mb-2" />
					<p className="mb-2 text-sm text-gray-700">{label}</p>
					<p className="text-xs text-gray-500">
						Accepted file types: {accept.replace(/,/g, ", ")}
					</p>
					<p className="text-xs text-gray-500">
						Max file size: {maxSize}MB
					</p>
					<button
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						type="button"
					>
						Select File
					</button>
				</div>
			</div>
		</div>
	);
};
