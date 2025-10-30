"use client";

import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import CardTitle from "@/components/admin/manage/CardTitle";
import EmptyState from "@/components/admin/manage/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdminKey } from "@/feature/admin-key/lib/utils";
import PagesTable from "@/feature/page/components/admin/pagesTable";
import { usePages } from "@/feature/page/queries/usePages";

export default function AdminPagesPage() {
	const router = useRouter();
	const adminKey = useAdminKey();
	const { data: pagesData, isLoading, isError } = usePages();
	const t = useTranslations("Pages");
	const pages = Array.isArray(pagesData) ? pagesData : [];

	return (
		<>
			<DashboardTitle
				subtitle="ManageSubtitle"
				title="ManageTitle"
				translationNamespace="Pages"
			/>
			<section className="py-6 px-8">
				<Card className="gap-0 py-0">
					<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>{t("ListTitle")}</CardTitle>
						<Button asChild className="flex items-center gap-2">
							<Link
								href={`/admin/${adminKey}/builder?action=create_page`}
							>
								<Plus className="h-4 w-4" />
								{t("CreateNew")}
							</Link>
						</Button>
					</CardHeader>
					<CardContent className="p-4">
						{isLoading ? (
							<div className="flex justify-center items-center h-40">
								<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
							</div>
						) : isError ? (
							<div className="flex justify-center items-center h-40 text-destructive">
								Error loading pages
							</div>
						) : pages.length === 0 ? (
							<EmptyState
								buttonText={t("CreateNew")}
								description={t("EmptyStateDescription")}
								onButtonClick={() => {
									router.push(
										`/admin/${adminKey}/builder?action=create_page`,
									);
								}}
								title={t("EmptyStateTitle")}
							/>
						) : (
							<PagesTable pages={pages} />
						)}
					</CardContent>
				</Card>
			</section>
		</>
	);
}
