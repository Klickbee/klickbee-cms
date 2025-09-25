"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

interface CardListLayoutProps {
	title: string;
	createUrl?: string;
	createButtonText?: string;
	icon?: React.ReactNode;
	searchBar?: React.ReactNode;
	filterSelector?: React.ReactNode;
	actionButtons?: React.ReactNode;
	children: React.ReactNode;
}

export default function CardListLayout({
	title,
	createUrl,
	createButtonText = "Go to Content Manager",
	icon,
	searchBar,
	filterSelector,
	actionButtons,
	children,
}: CardListLayoutProps) {
	const adminKey = useAdminKeyStore((state) => state.adminKey);

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
				<CardTitle>{title}</CardTitle>
				{createUrl && (
					<Button
						asChild
						className="bg-zinc-950 text-white hover:bg-zinc-950/90 flex items-center"
					>
						<Link
							className="flex items-center"
							href={`/admin/${adminKey}${createUrl}`}
						>
							{icon && <span className="mr-2">{icon}</span>}
							{createButtonText}
						</Link>
					</Button>
				)}
			</CardHeader>
			<CardContent className="p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="w-[320px]">{searchBar}</div>
					<div className="flex items-center gap-3">
						{actionButtons}
						{filterSelector}
					</div>
				</div>
				{children}
			</CardContent>
		</Card>
	);
}
