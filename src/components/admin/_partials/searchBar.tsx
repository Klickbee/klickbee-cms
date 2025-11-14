"use client";

import { SearchIcon } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	placeholder: string;
	useSearchStore: () => {
		searchQuery: string;
		setSearchQuery: (query: string) => void;
	};
}

export default function SearchBar({
	placeholder,
	useSearchStore,
}: SearchBarProps) {
	const { searchQuery, setSearchQuery } = useSearchStore();
	const [localValue, setLocalValue] = useState(searchQuery);
	const deferredValue = useDeferredValue(localValue);

	useEffect(() => {
		setSearchQuery(deferredValue);
	}, [deferredValue, setSearchQuery]);

	return (
		<div className="w-full relative">
			<SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				className="pl-10 h-9"
				onChange={(e) => {
					setLocalValue(e.target.value);
				}}
				placeholder={placeholder}
				value={localValue}
			/>
		</div>
	);
}
