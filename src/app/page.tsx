"use client";

import { Suspense } from "react";
import {
	useDefaultPageHeader,
	usePageHeaderByPage,
} from "@/feature/page/_header/queries/usePageHeader";
import { usePublicPageById } from "@/feature/page/queries/usePublicPageById";
import { useSetting } from "@/feature/settings/queries/useSettings";
import { PageRenderer } from "@/public/renderer/PageRenderer";

function HomepageContent({ pageId }: { pageId: number }) {
	const { data: page } = usePublicPageById(pageId);
	const { data: header } = usePageHeaderByPage(pageId);
	const { data: defaultHeader } = useDefaultPageHeader();
	const headerContent = header?.content ?? defaultHeader?.content;
	if (!page) {
		return <div>Homepage not set</div>;
	}
	return (
		<PageRenderer content={page.content} headerContent={headerContent} />
	);
}

export default function Home() {
	const { data: homepageRaw, isLoading: isSettingLoading } =
		useSetting("current_homepage_id") || {};

	if (isSettingLoading) return <div>Loading...</div>;

	const homepageId = homepageRaw?.value
		? parseInt(homepageRaw.value, 10)
		: NaN;
	if (!homepageId || Number.isNaN(homepageId)) {
		return <div>Homepage not set</div>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<HomepageContent pageId={homepageId} />
		</Suspense>
	);
}
