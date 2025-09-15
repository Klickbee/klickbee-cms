"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Page } from "@/feature/page/types/page";

export default function PagesPagination({
	checkedRows,
	pages,
}: {
	checkedRows: number[];
	pages: Page[];
}) {
	const t = useTranslations("Common");

	return (
		<div className="p-4 flex items-center justify-between text-sm text-muted-foreground">
			<p>
				{t("RowsSelected", {
					checkedRows: checkedRows?.length || 0,
					pagesLength: pages?.length || 0,
				})}
			</p>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<Button variant="outline">{t("Previous")}</Button>
					<Button variant="outline">{t("Next")}</Button>
				</div>
			</div>
		</div>
	);
}
