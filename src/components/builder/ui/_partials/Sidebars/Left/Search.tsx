import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BuilderSearchComponent() {
	return (
		<div className="flex items-center gap-2  p-4 ">
			<div
				className={
					"bg-muted text-muted-foreground  flex items-center gap-1.5 border m-auto rounded-md shadow-sm px-3 py-0.5"
				}
			>
				<Search className="w-4 h-4" color={"black"} />
				<Input
					className="border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
					placeholder="Search"
					type="text"
				/>
			</div>
		</div>
	);
}
