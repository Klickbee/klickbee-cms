"use client";

import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface MediaSearchBarProps {
	searchTerm: string;
	onSearchChange: (searchTerm: string) => void;
}

export default function MediaSearchBar({
	searchTerm,
	onSearchChange,
}: MediaSearchBarProps) {
	const t = useTranslations("Media");
	const [localValue, setLocalValue] = useState(searchTerm);

	// Debounce search
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onSearchChange(localValue);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [localValue, onSearchChange]);

	// Synchronise with the searchTerm prop
	useEffect(() => {
		setLocalValue(searchTerm);
	}, [searchTerm]);

	return (
		<div className="w-full max-w-md relative mb-4">
			<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				className="pl-8"
				onChange={(e) => {
					setLocalValue(e.target.value);
				}}
				placeholder={t("Search")}
				value={localValue}
			/>
		</div>
	);
}
