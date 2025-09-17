"use client";

import { FileIcon, FileVideoIcon, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MediaTypeFilter } from "@/feature/media/hooks/useMediaSearch";

interface MediaTypeFilterProps {
	typeFilter: MediaTypeFilter;
	onTypeFilterChange: (filter: MediaTypeFilter) => void;
}

export default function MediaFilter({
	typeFilter,
	onTypeFilterChange,
}: MediaTypeFilterProps) {
	const t = useTranslations("Media");

	const filterOptions = [
		{
			icon: null,
			label: t("FilterAllMedia"),
			value: "all" as MediaTypeFilter,
		},
		{
			icon: <ImageIcon className="w-4 h-4" />,
			label: t("FilterImages"),
			value: "image" as MediaTypeFilter,
		},
		{
			icon: <FileVideoIcon className="w-4 h-4" />,
			label: t("FilterVideos"),
			value: "video" as MediaTypeFilter,
		},
		{
			icon: <FileIcon className="w-4 h-4" />,
			label: t("FilterDocuments"),
			value: "document" as MediaTypeFilter,
		},
	];

	const selectedOption = filterOptions.find(
		(option) => option.value === typeFilter,
	);

	return (
		<Select onValueChange={onTypeFilterChange} value={typeFilter}>
			<SelectTrigger className="w-40">
				<SelectValue>
					<div className="flex items-center gap-2">
						{selectedOption?.icon}
						<span>{selectedOption?.label}</span>
					</div>
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				{filterOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						<div className="flex items-center gap-2">
							{option.icon}
							<span>{option.label}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
