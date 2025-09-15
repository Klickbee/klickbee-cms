"use client";

import { useTranslations } from "next-intl";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import EmptyState from "@/components/admin/manage/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminMediaPage() {
	const t = useTranslations("Media");

	return (
		<>
			<DashboardTitle
				subtitle="ManageSubtitle"
				title="ManageTitle"
				translationNamespace="Media"
			/>
			<section className="py-6 px-8">
				<Card className="gap-0 py-0">
					<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>{t("ListTitle")}</CardTitle>
						<Button className="flex items-center gap-2">
							{t("UploadNew")}
						</Button>
					</CardHeader>
					<CardContent className="p-4">
						<EmptyState
							buttonText={t("UploadNew")}
							description={t("EmptyStateDescription")}
							onButtonClick={() => {
								//TODO: Create new media
							}}
							title={t("EmptyStateTitle")}
						/>
					</CardContent>
				</Card>
			</section>
		</>
	);
}
