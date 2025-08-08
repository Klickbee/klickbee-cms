import { Upload } from "lucide-react";
import React from "react";
import { BuilderComponent } from "../../types/components/component";

interface FormFileUploadProps {
	component: BuilderComponent;
}

export const FormFileUpload: React.FC<FormFileUploadProps> = ({
	component,
}) => {
	// Default file upload properties if not provided
	const label = (component.props?.content?.label as string) || "File Upload";
	const name =
		(component.props?.content?.name as string) || "file-" + component.id;
	const required = (component.props?.content?.required as boolean) || false;
	const accept = (component.props?.content?.mimeTypes as string) || "*/*";
	const multiple = (component.props?.content?.multiple as boolean) || false;
	const helperText = (component.props?.content?.helperText as string) || "";
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
				<div className="flex flex-col space-y-2">
					<label
						className="text-sm font-medium text-gray-700"
						htmlFor={name}
					>
						{label}
						{required && <span className="text-red-500 ">*</span>}
					</label>
					<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
						<div className="space-y-1 text-center">
							<Upload className="mx-auto h-12 w-12 text-gray-400" />
							<div className="flex text-sm text-gray-600">
								<label
									className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
									htmlFor={name}
								>
									<span>Upload a file</span>
									<input
										accept={accept}
										className="sr-only"
										id={name}
										multiple={multiple}
										name={name}
										required={required}
										type="file"
									/>
								</label>
								<p className="pl-1">or drag and drop</p>
							</div>
							<p className="text-xs text-gray-500">
								{accept.replace(/,/g, ", ")} up to {maxSize}MB
							</p>
						</div>
					</div>
					{helperText && (
						<p className="text-xs text-gray-500">{helperText}</p>
					)}
				</div>
			</div>
		</div>
	);
};
