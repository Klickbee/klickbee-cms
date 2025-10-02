"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type PreviewMode = "icon" | "image";

interface FileUploaderProps {
	initialFile?: string | React.ReactNode | null;
	onFileChange?: (fileUrl: string | null) => void;
	maxSize?: number; // in MB
	acceptedTypes?: string[];
	placeholder?: string;
	label?: string;
	mode?: PreviewMode;
}

export default function FileUploader({
	initialFile,
	onFileChange,
	maxSize = 10,
	acceptedTypes = ["svg"],
	placeholder = "http://localhost:3845/assets/91210b31ffb7440374c0375c1a8959abf348506c.png",
	label = "Icon",
	mode = "icon",
}: FileUploaderProps) {
	const [fileUrl, setFileUrl] = useState<string | null>(
		typeof initialFile === "string" ? initialFile : null,
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Validation: file type
		const isValidType = acceptedTypes.some((type) =>
			file.type.includes(type),
		);
		if (!isValidType) {
			alert(
				`Please select a ${acceptedTypes.join(" or ").toUpperCase()} file`,
			);
			return;
		}

		// Validation: file size
		if (file.size > maxSize * 1024 * 1024) {
			alert(`File size must be less than ${maxSize}MB`);
			return;
		}

		// Create preview URL
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result as string;
			setFileUrl(result);
			onFileChange?.(result);
		};
		reader.readAsDataURL(file);
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const displayFile = fileUrl || placeholder;

	// Icon mode (60x60px, side by side layout)
	if (mode === "icon") {
		return (
			<div className="flex flex-col gap-2">
				<div className="text-xs font-medium text-zinc-500 leading-4">
					{label}
				</div>

				<div className="flex gap-2.5 items-center w-full">
					{/* Icon Preview */}
					<div
						className="w-[60px] h-[60px] rounded border border-zinc-200 bg-cover bg-center bg-no-repeat shrink-0"
						style={{ backgroundImage: `url(${displayFile})` }}
					/>

					{/* Upload Section */}
					<div className="flex flex-col gap-2.5 flex-1">
						<Button
							className="w-full h-[34px] text-xs font-medium"
							onClick={triggerFileInput}
							variant="outline"
						>
							Upload from computer
						</Button>

						<div className="text-xs font-medium text-zinc-500 leading-4">
							{acceptedTypes.join(", ").toUpperCase()} max.
							{maxSize}MB
						</div>
					</div>

					{/* Hidden file input */}
					<input
						accept={acceptedTypes
							.map((type) => `.${type}`)
							.join(",")}
						className="hidden"
						onChange={handleFileUpload}
						ref={fileInputRef}
						type="file"
					/>
				</div>
			</div>
		);
	}

	// Image mode (full width, stacked layout)
	return (
		<div className="flex flex-col gap-2">
			<div className="text-xs font-medium text-zinc-500 leading-4">
				{label}
			</div>

			<div className="flex flex-col gap-2.5 w-full">
				{/* Image Preview */}
				<div
					className="w-full h-[200px] rounded border border-zinc-200 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${displayFile})` }}
				/>

				{/* Upload Section */}
				<div className="flex flex-col gap-2.5 items-center w-full">
					<Button
						className="w-full h-[34px] text-xs font-medium"
						onClick={triggerFileInput}
						variant="outline"
					>
						Upload from computer
					</Button>

					<div className="text-xs font-medium text-zinc-500 leading-4">
						{acceptedTypes.join(",").toUpperCase()} max.{maxSize}MB
					</div>
				</div>

				{/* Hidden file input */}
				<input
					accept={acceptedTypes.map((type) => `.${type}`).join(",")}
					className="hidden"
					onChange={handleFileUpload}
					ref={fileInputRef}
					type="file"
				/>
			</div>
		</div>
	);
}
