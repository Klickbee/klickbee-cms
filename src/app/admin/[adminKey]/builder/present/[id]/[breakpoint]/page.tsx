"use client";

import React, { Usable } from "react";
import { BreakpointProvider } from "@/feature/builder/contexts/BreakpointContext";
import { usePageFooterByPage } from "@/feature/page/_footer/queries/usePageFooter";
import { usePageHeaderByPage } from "@/feature/page/_header/queries/usePageHeader";
import { usePageById } from "@/feature/page/queries/usePageById";
import { PageLight } from "@/feature/page/types/page";
import { PageFooter, PageHeader } from "@/generated/prisma";
import { PageRenderer } from "@/public/renderer/PageRenderer";

export default function PagePresenter({
	params,
}: {
	params: { id: string; breakpoint: string };
}) {
	const { id: idParam, breakpoint: bpParam } = React.use(
		params as unknown as Usable<{ id: string; breakpoint: string }>,
	);

	// Support builder opening with "new" when no page exists yet
	if (idParam === "new") {
		const bpNum = parseInt(bpParam || "0", 10) || 0;
		return (
			<div style={{ padding: 16 }}>
				<h2>Preview (new page)</h2>
				<div
					style={{
						width: bpNum ? `${bpNum}px` : "100%",
						maxWidth: bpNum ? `${bpNum}px` : "100%",
						margin: "0 auto",
						border: "1px solid #e5e7eb",
						background: "white",
						minHeight: 400,
					}}
				/>
			</div>
		);
	}

	const pageId = Number(idParam);
	const breakpoint = Number(bpParam) || 0;
	const bpName = breakpoint ? `bp-${breakpoint}` : "default";

	const {
		error: pageError,
		data: page,
		isLoading: pageLoading,
	} = usePageById(pageId);
	const { data: pageHeader } = usePageHeaderByPage(
		pageId > 0 ? pageId : undefined,
	);
	const { data: pageFooter } = usePageFooterByPage(
		pageId > 0 ? pageId : undefined,
	);

	if (pageLoading) {
		return <div style={{ padding: 16 }}>Loading preview…</div>;
	}

	// Handle possible auth error response shape returned by server helpers
	if (!page) {
		return <div style={{ padding: 16 }}>Unable to load page.</div>;
	}
	if (pageError) {
		return (
			<div style={{ padding: 16 }}>
				Error loading page: {pageError.message}
			</div>
		);
	}

	// page is expected to be a Page object at this point
	const content = (page as PageLight).content;

	return (
		<div style={{ padding: 16 }}>
			<h1
				style={{
					marginBottom: 8,
					padding: 24,
					color: "#fff",
					textAlign: "center",
					backgroundColor: "black",
				}}
			>
				Preview - Page {pageId} - {breakpoint}px
			</h1>
			<div
				style={{
					width: breakpoint ? `${breakpoint}px` : "100%",
					maxWidth: breakpoint ? `${breakpoint}px` : "100%",
					margin: "0 auto",
					background: "white",
					border: "1px solid #e5e7eb",
					minHeight: 200,
					overflow: "hidden",
				}}
			>
				<BreakpointProvider
					value={{ name: bpName, width: breakpoint || 1440 }}
				>
					<PageRenderer
						content={content}
						footerContent={(pageFooter as PageHeader)?.content}
						headerContent={(pageHeader as PageFooter)?.content}
					/>
				</BreakpointProvider>
			</div>
		</div>
	);
}
