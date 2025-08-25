"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import BackgroundColorPicker from "./pickers/BackgroundColorPicker";
import BackgroundGradientPicker from "./pickers/BackgroundGradientPicker";
import BackgroundImagePicker from "./pickers/BackgroundImagePicker";

type BackgroundType = "color" | "gradient" | "image";

interface BackgroundState {
	type: BackgroundType;
	color: string;
	gradient: string; // CSS gradient string
	image: {
		url: string;
		size: string;
		position: string;
	};
}

export default function BuilderStyleBackground() {
	const t = useTranslations("Builder.RightSidebar.Background");
	const [isOpen, setIsOpen] = useState(false);
	const [background, setBackground] = useState<BackgroundState>({
		color: "#171717",
		gradient: "linear-gradient(90deg, #0052d4 0%, #6fb1fc 100%)",
		image: {
			position: "center",
			size: "cover",
			url: "",
		},
		type: "color",
	});

	const getBackgroundPreview = () => {
		switch (background.type) {
			case "color":
				return (
					<div
						className="w-4 h-4 rounded border border-zinc-200"
						style={{ backgroundColor: background.color }}
					/>
				);
			case "gradient":
				return (
					<div
						className="w-4 h-4 rounded border border-zinc-200"
						style={{ background: background.gradient }}
					/>
				);
			case "image":
				return (
					<div className="w-4 h-4 rounded border border-zinc-200 bg-gray-300" />
				);
		}
	};

	const getBackgroundText = () => {
		switch (background.type) {
			case "color":
				return background.color;
			case "gradient":
				return t("gradient");
			case "image":
				return t("image");
		}
	};

	const handleTypeChange = (type: BackgroundType) => {
		setBackground((prev) => ({
			...prev,
			type,
		}));
	};

	const renderBackgroundContent = () => {
		switch (background.type) {
			case "color":
				return (
					<BackgroundColorPicker
						closeColorPicker={() => setIsOpen(false)}
						onChange={(color) =>
							setBackground((prev) => ({ ...prev, color }))
						}
						onTypeChange={handleTypeChange}
						selectedType={background.type}
						value={background.color}
					/>
				);
			case "gradient":
				return (
					<BackgroundGradientPicker
						closeGradientPicker={() => setIsOpen(false)}
						onChange={(gradient) =>
							setBackground((prev) => ({ ...prev, gradient }))
						}
						onTypeChange={handleTypeChange}
						selectedType={background.type}
						value={background.gradient}
					/>
				);
			case "image":
				return (
					<BackgroundImagePicker
						onChange={(image) =>
							setBackground((prev) => ({ ...prev, image }))
						}
						onTypeChange={handleTypeChange}
						selectedType={background.type}
						value={background.image}
					/>
				);
		}
	};

	return (
		<PropertyRow label={t("title")}>
			<Popover onOpenChange={setIsOpen} open={isOpen}>
				<PopoverTrigger asChild>
					<Button
						className="w-[150px] h-8 justify-start text-left font-normal"
						variant="outline"
					>
						<div className="flex items-center gap-2 flex-1">
							{getBackgroundPreview()}
							<span className="flex-1 text-xs truncate">
								{getBackgroundText()}
							</span>
						</div>
						<ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="center"
					className="w-80 p-0"
					side="bottom"
				>
					<div className="p-3">
						{/* Contenu selon le type avec sélecteur intégré */}
						{renderBackgroundContent()}
					</div>
				</PopoverContent>
			</Popover>
		</PropertyRow>
	);
}
