"use client";

import { ArrowLeft } from "lucide-react";
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
	const tCommon = useTranslations("Common");
	const t = useTranslations(translationNamespace);

	return (
		<header className="flex flex-col gap-1 px-8 py-4 border-b">
			{hasBackButton && (
				<Button
					className="w-fit -ml-4 text-primary"
					onClick={() => router.back()}
					variant="ghost"
				>
					<ArrowLeft className="h-4 w-4" />
					{tCommon("Back")}
				</Button>
			)}
			<h1 className="text-xl font-semibold">
				{titleContent ||
					(titleParams ? t(title, titleParams) : t(title))}
			</h1>
			{subtitle && (
				<p className="text-muted-foreground text-sm">
					{subtitleParams ? t(subtitle, subtitleParams) : t(subtitle)}
				</p>
			)}
		</header>
	);
}
