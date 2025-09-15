"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface DashboardTitleProps {
	title: string;
	translationNamespace: string;
	subtitle?: string;
	hasBackButton?: boolean;
	subtitleParams?: Record<string, string>;
	titleParams?: Record<string, string>;
	titleContent?: React.ReactNode;
}

export default function DashboardTitle({
	title,
	translationNamespace,
	subtitle,
	hasBackButton = false,
	subtitleParams,
	titleParams,
	titleContent,
}: DashboardTitleProps) {
	const router = useRouter();
	const t = useTranslations(translationNamespace);

	return (
		<header className="flex flex-row items-center justify-start gap-8 px-8 py-4 border-b">
			{hasBackButton && (
				<Button
					className={
						"group bg-background border gap-8 px-3 hover:bg-foreground group:text-primary group-hover:text-secondary"
					}
					onClick={() => router.back()}
				>
					<ChevronLeft
						className={"text-primary group-hover:text-secondary"}
					/>
				</Button>
			)}
			<div className="flex flex-col gap-1">
				<h1 className="text-xl font-semibold">
					{titleContent ||
						(titleParams ? t(title, titleParams) : t(title))}
				</h1>
				{subtitle && (
					<p className="text-muted-foreground text-sm">
						{subtitleParams
							? t(subtitle, subtitleParams)
							: t(subtitle)}
					</p>
				)}
			</div>
		</header>
	);
}
