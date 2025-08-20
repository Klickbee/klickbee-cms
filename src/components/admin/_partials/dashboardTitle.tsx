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
		<div className="flex flex-col gap-2 px-12 pb-12 border-b">
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
			<h1 className="text-2xl font-bold">
				{titleContent ||
					(titleParams ? t(title, titleParams) : t(title))}
			</h1>
			{subtitle && (
				<p className="text-gray-600">
					{subtitleParams ? t(subtitle, subtitleParams) : t(subtitle)}
				</p>
			)}
		</div>
	);
}
