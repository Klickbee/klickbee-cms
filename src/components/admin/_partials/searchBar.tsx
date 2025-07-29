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
		<div className="w-full max-w-md flex items-center space-x-2">
			<div className="relative flex-1">
				<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					className="pl-8"
					onChange={(e) => {
						setLocalValue(e.target.value);
						setSearchQuery(e.target.value);
					}}
					placeholder={placeholder}
					value={localValue}
				/>
			</div>
		</div>
	);
}
