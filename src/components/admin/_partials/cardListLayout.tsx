"use client";

import Link from "next/link";
import CardTitle from "@/components/admin/manage/CardTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";

interface CardListLayoutProps {
	title: string;
	createUrl?: string;
	createButtonText?: string;
	searchBar?: React.ReactNode;
	sortSelector?: React.ReactNode;
	actionButtons?: React.ReactNode;
	children: React.ReactNode;
}

export default function CardListLayout({
	title,
	createUrl,
	createButtonText = "Go to Content Manager",
	searchBar,
	sortSelector,
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
						className="bg-zinc-950 text-white hover:bg-zinc-950/90"
					>
						<Link href={`/admin/${adminKey}${createUrl}`}>
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
						{sortSelector}
					</div>
				</div>
				{children}
			</CardContent>
		</Card>
	);
}
