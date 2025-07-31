"use client";
import { LayoutDashboard, Play, Save, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

export default function BuilderHeader() {
	const currentPage = "Home /";
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	return (
		<header className="flex items-center justify-between px-4 py-6 border-b">
			<div className="flex items-center gap-6">
				<Button
					asChild
					className="flex items-center gap-2 text-sm font-semibold"
					variant="outline"
				>
					<Link href={`/admin/${adminKey}`}>
						<LayoutDashboard className="w-4 h-4" />
						Dashboard
					</Link>
				</Button>
			</div>

			<div className="flex items-center gap-1 text-sm text-muted-foreground m-auto">
				<p className="text-blue-600 font-medium">{currentPage}</p>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="flex items-center gap-1"
					size="sm"
					variant="outline"
				>
					<Play className="w-4 h-4" />
					Preview
				</Button>
				<Button
					className="flex items-center gap-1"
					size="sm"
					variant="outline"
				>
					<Save className="w-4 h-4" />
					Save
				</Button>
				<Button className="flex items-center gap-1" size="sm">
					<Send className="w-4 h-4" />
					Publish
				</Button>
			</div>
		</header>
	);
}
