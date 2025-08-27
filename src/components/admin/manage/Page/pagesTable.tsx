"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PagesPagination from "@/components/admin/manage/Page/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { generateAdminLink } from "@/feature/admin-key/lib/utils";
import { Page } from "@/feature/page/types/page";

export default function PagesTable({ pages }: { pages: Page[] }) {
	const t = useTranslations("Pages");
	const [checkedRows, setCheckedRows] = useState<number[]>([]);
	const allIds = pages?.map((page) => page.id) || [];
	const allChecked =
		checkedRows.length === allIds.length && allIds.length > 0;

	const handleHeaderCheck = (checked: boolean) => {
		setCheckedRows(checked ? allIds : []);
	};

	const handleRowCheck = (id: number, checked: boolean) => {
		setCheckedRows((prev) =>
			checked ? [...prev, id] : prev.filter((rowId) => rowId !== id),
		);
	};

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">
								<Checkbox
									checked={allChecked}
									onCheckedChange={handleHeaderCheck}
								/>
							</TableHead>
							<TableHead>{t("Name")}</TableHead>
							<TableHead>{t("Slug")}</TableHead>
							<TableHead className="w-12"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{pages?.map((page) => (
							<TableRow key={page.id}>
								<TableCell>
									<Checkbox
										checked={checkedRows.includes(page.id)}
										onCheckedChange={(checked: boolean) =>
											handleRowCheck(page.id, checked)
										}
									/>
								</TableCell>
								<TableCell className={"w-4/10"}>
									<a
										className="flex items-center space-x-2"
										href={generateAdminLink(
											`/manage/content/${page.slug}`,
										)}
									>
										{page.title}
									</a>
								</TableCell>
								<TableCell>{page.slug}</TableCell>
								<TableCell className={"w-fit"}>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												onClick={() =>
													// TODO
													"Edit"
												}
											>
												<Pencil className="h-4 w-4 mr-2" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												className="text-destructive"
												onClick={() =>
													// TODO
													"Delete"
												}
											>
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<PagesPagination checkedRows={checkedRows} pages={pages} />
		</>
	);
}
