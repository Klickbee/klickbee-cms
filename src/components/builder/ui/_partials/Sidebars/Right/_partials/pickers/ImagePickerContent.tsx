"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ImagePickerContentProps {
	value: {
		url: string;
		size: string;
		position: string;
	};
	onChange: (image: ImagePickerContentProps["value"]) => void;
}

export default function ImagePickerContent({
	value,
	onChange,
}: ImagePickerContentProps) {
	const t = useTranslations("Builder.RightSidebar.Background");
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = useState(false);

	const handleFileSelect = (file: File) => {
		if (file && file.type.startsWith("image/")) {
			// Convertir en base64 pour la persistence
			const reader = new FileReader();
			reader.onload = (e) => {
				const base64Url = e.target?.result as string;

				onChange({
					...value,
					position: value.position || "center",
					// Assurer les valeurs par défaut
					size: value.size || "cover",
					url: base64Url,
				});
			};

			reader.readAsDataURL(file);
		}
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(false);
		const file = e.dataTransfer.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragActive(false);
	};

	const handleUrlChange = (url: string) => {
		onChange({
			...value,
			url,
		});
	};

	const handleSizeChange = (size: string) => {
		onChange({
			...value,
			size,
		});
	};

	const handlePositionChange = (position: string) => {
		onChange({
			...value,
			position,
		});
	};

	return (
		<div className="space-y-3">
			{/* Zone de upload inspirée du design Figma */}
			<div
				className={`relative h-[200px] w-full rounded border-2 border-dashed transition-colors ${
					dragActive
						? "border-blue-400 bg-blue-50"
						: "border-zinc-200 bg-zinc-50"
				}`}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{value.url ? (
					<div className="h-full w-full rounded relative overflow-hidden group">
						<Image
							alt="Preview"
							className="h-full w-full object-cover"
							height={200}
							src={value.url}
							width={400}
						/>
						{/* Overlay pour changer l'image */}
						<div className="absolute inset-0 flex items-center justify-center transition-colors group-hover:backdrop-blur-sm">
							<Button
								className="opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => fileInputRef.current?.click()}
								size="sm"
								variant="secondary"
							>
								{t("changeImage")}
							</Button>
						</div>
					</div>
				) : (
					<div className="flex h-full flex-col items-center justify-center gap-4">
						<div className="text-center text-sm text-zinc-500">
							{t("dragImageHere")}
						</div>
						<Button
							onClick={() => fileInputRef.current?.click()}
							size="sm"
							variant="outline"
						>
							{t("uploadFromComputer")}
						</Button>
					</div>
				)}
			</div>

			{/* Input file caché */}
			<Input
				accept="image/*"
				className="hidden"
				onChange={handleFileInputChange}
				ref={fileInputRef}
				type="file"
			/>

			{/* URL input */}
			<div className="space-y-1">
				<label className="text-xs font-medium text-zinc-700">
					{t("imageUrl")}
				</label>
				<Input
					className="h-8 text-xs"
					onChange={(e) => handleUrlChange(e.target.value)}
					placeholder="https://example.com/image.jpg"
					type="url"
					value={value.url}
				/>
			</div>

			{/* Options de background */}
			<div className="grid grid-cols-2 gap-2">
				<div className="space-y-1">
					<label className="text-xs font-medium text-zinc-700">
						{t("imageSize")}
					</label>
					<Select onValueChange={handleSizeChange} value={value.size}>
						<SelectTrigger className="h-8 w-full text-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cover">Cover</SelectItem>
							<SelectItem value="contain">Contain</SelectItem>
							<SelectItem value="auto">Auto</SelectItem>
							<SelectItem value="100%">100%</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-1">
					<label className="text-xs font-medium text-zinc-700">
						{t("imagePosition")}
					</label>
					<Select
						onValueChange={handlePositionChange}
						value={value.position}
					>
						<SelectTrigger className="h-8 w-full text-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="top">Top</SelectItem>
							<SelectItem value="bottom">Bottom</SelectItem>
							<SelectItem value="left">Left</SelectItem>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="top left">Top Left</SelectItem>
							<SelectItem value="top right">Top Right</SelectItem>
							<SelectItem value="bottom left">
								Bottom Left
							</SelectItem>
							<SelectItem value="bottom right">
								Bottom Right
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
