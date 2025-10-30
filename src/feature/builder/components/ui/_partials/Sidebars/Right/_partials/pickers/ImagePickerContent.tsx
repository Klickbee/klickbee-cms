"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FileUploader from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/content/FileUploader";
import {
	BackgroundAttachment,
	ImagePosition,
	ImageRepeat,
	ImageSize,
	SpacingValue,
} from "@/feature/builder/types/components/properties/componentStylePropsType";

interface ImagePickerContentProps {
	value: {
		src: string;
		size?: ImageSize;
		position?: ImagePosition | { x: SpacingValue; y: SpacingValue };
		repeat?: ImageRepeat;
		attachment?: BackgroundAttachment;
	};
	onChange: (image: ImagePickerContentProps["value"]) => void;
}

export default function ImagePickerContent({
	value,
	onChange,
}: ImagePickerContentProps) {
	const t = useTranslations("Builder.RightSidebar.Background");

	const handleUrlChange = (src: string) => {
		onChange({
			...value,
			src,
		});
	};

	const handleSizeChange = (size: ImageSize) => {
		onChange({
			...value,
			size,
		});
	};

	const handlePositionChange = (position: ImagePosition) => {
		onChange({
			...value,
			position,
		});
	};

	return (
		<div className="space-y-3">
			<FileUploader
				acceptedTypes={["png", "jpeg", "jpg", "svg"]}
				initialFile={value.src}
				label={t("image")}
				maxSize={10}
				mode="image"
				onFileChange={(fileUrl) =>
					onChange({
						...value,
						position: value.position || "center",
						size: value.size || "cover",
						src: fileUrl || "",
					})
				}
				openMediaLibrary={true}
			/>

			<div className="space-y-1">
				<label className="text-xs font-medium text-zinc-700">
					{t("imageUrl")}
				</label>
				<Input
					className="h-8 text-xs"
					onChange={(e) => handleUrlChange(e.target.value)}
					placeholder="https://example.com/image.jpg"
					type="url"
					value={value.src}
				/>
			</div>

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
						value={value.position as string}
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
