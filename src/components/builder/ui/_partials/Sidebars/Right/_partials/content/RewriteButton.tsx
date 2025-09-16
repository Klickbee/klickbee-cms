import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RewriteButton() {
	return (
		<div className="flex justify-end h-9 items-center">
			<Button className="bg-purple-600 hover:bg-purple-700 text-white h-9 px-3 py-2 rounded-md shadow-sm text-sm font-medium">
				Rewrite with AI
				<Sparkles className="w-4 h-4 ml-2" />
			</Button>
		</div>
	);
}
