"use client";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import {
	BuilderComponent,
	isParentComponent,
	ParentBuilderComponent,
} from "@/builder/types/components/components";
import { ContextMenuItem } from "@/components/ui/context-menu";
import {
	useDefaultPageFooter,
	usePageFooterByPage,
	useSetFooterAsDefault,
	useSetPageFooter,
	useUnlinkFooter,
} from "@/feature/page/_footer/queries/usePageFooter";
import {
	useDefaultPageHeader,
	usePageHeaderByPage,
	useSetHeaderAsDefault,
	useSetPageHeader,
	useUnlinkHeader,
} from "@/feature/page/_header/queries/usePageHeader";

export default function HeaderFooterContextItem({
	node,
}: {
	node: BuilderComponent;
}) {
	const { currentPage, setCurrentPage } = useCurrentPageStore();
	const pageId = currentPage?.id ?? -1;
	const { data: pageHeader } = usePageHeaderByPage(
		pageId > 0 ? pageId : undefined,
	);
	const { data: defaultHeader } = useDefaultPageHeader();
	const setHeader = useSetPageHeader();
	const setDefault = useSetHeaderAsDefault();
	const unlink = useUnlinkHeader();

	// Footer hooks
	const { data: pageFooter } = usePageFooterByPage(
		pageId > 0 ? pageId : undefined,
	);
	const { data: defaultFooter } = useDefaultPageFooter();
	const setFooter = useSetPageFooter();
	const setFooterDefault = useSetFooterAsDefault();
	const unlinkFooter = useUnlinkFooter();

	const handleSetAsHeader = async () => {
		if (!isParentComponent(node) || pageId <= 0) return;
		try {
			const header = await setHeader.mutateAsync({
				content: node as ParentBuilderComponent,
				pageId,
			});
			// Remove the section from the page content, since it is now a header rendered apart
			if (Array.isArray(currentPage.content)) {
				const contentCopy = JSON.parse(
					JSON.stringify(currentPage.content),
				) as BuilderComponent[];
				const removeById = (list: BuilderComponent[]): boolean => {
					const idx = list.findIndex((c) => c.id === node.id);
					if (idx !== -1) {
						list.splice(idx, 1);
						return true;
					}
					for (const c of list) {
						if (
							c.children &&
							removeById(c.children as BuilderComponent[])
						)
							return true;
					}
					return false;
				};
				removeById(contentCopy);
				setCurrentPage({
					...currentPage,
					pageHeaderId: header.id,
					content: contentCopy,
				});
			} else {
				setCurrentPage({ ...currentPage, pageHeaderId: header.id });
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleSetAsDefault = async () => {
		if (!pageHeader?.id) return;
		try {
			await setDefault.mutateAsync({ pageHeaderId: pageHeader.id });
		} catch (e) {
			console.error(e);
		}
	};

	const handleUnlink = async () => {
		if (!pageHeader?.id || pageId <= 0) return;
		try {
			const newHeader = await unlink.mutateAsync({
				pageId,
				pageHeaderId: pageHeader.id,
			});
			setCurrentPage({ ...currentPage, pageHeaderId: newHeader.id });
		} catch (e) {
			console.error(e);
		}
	};

	// Footer handlers
	const handleSetAsFooter = async () => {
		if (!isParentComponent(node) || pageId <= 0) return;
		try {
			const footer = await setFooter.mutateAsync({
				content: node as ParentBuilderComponent,
				pageId,
			});
			// Remove the section from the page content, since it is now a footer rendered apart
			if (Array.isArray(currentPage.content)) {
				const contentCopy = JSON.parse(
					JSON.stringify(currentPage.content),
				) as BuilderComponent[];
				const removeById = (list: BuilderComponent[]): boolean => {
					const idx = list.findIndex((c) => c.id === node.id);
					if (idx !== -1) {
						list.splice(idx, 1);
						return true;
					}
					for (const c of list) {
						if (
							c.children &&
							removeById(c.children as BuilderComponent[])
						)
							return true;
					}
					return false;
				};
				removeById(contentCopy);
				setCurrentPage({
					...currentPage,
					pageFooterId: footer.id,
					content: contentCopy,
				});
			} else {
				setCurrentPage({ ...currentPage, pageFooterId: footer.id });
			}
		} catch (e) {
			console.error(e);
		}
	};

	const handleSetFooterAsDefault = async () => {
		if (!pageFooter?.id) return;
		try {
			await setFooterDefault.mutateAsync({ pageFooterId: pageFooter.id });
		} catch (e) {
			console.error(e);
		}
	};

	const handleUnlinkFooter = async () => {
		if (!pageFooter?.id || pageId <= 0) return;
		try {
			const newFooter = await unlinkFooter.mutateAsync({
				pageId,
				pageFooterId: pageFooter.id,
			});
			setCurrentPage({ ...currentPage, pageFooterId: newFooter.id });
		} catch (e) {
			console.error(e);
		}
	};

	const hasHeaderForPage = !!pageHeader?.id;
	const headerContent = pageHeader?.content;
	const isThisHeader =
		hasHeaderForPage &&
		!!headerContent &&
		(headerContent as BuilderComponent).id === node.id;
	const isDefault =
		isThisHeader && !!defaultHeader && pageHeader?.id === defaultHeader.id;

	const hasFooterForPage = !!pageFooter?.id;
	const footerContent = pageFooter?.content;
	const isThisFooter =
		hasFooterForPage &&
		!!footerContent &&
		(footerContent as BuilderComponent).id === node.id;
	const isFooterDefault =
		isThisFooter && !!defaultFooter && pageFooter?.id === defaultFooter.id;

	return (
		<>
			{isParentComponent(node) ? (
				<>
					{isThisHeader ? (
						<>
							{!isDefault && (
								<ContextMenuItem onClick={handleSetAsDefault}>
									Set as Default Header
								</ContextMenuItem>
							)}
							<ContextMenuItem onClick={handleUnlink}>
								Unlink Header
							</ContextMenuItem>
						</>
					) : !isThisFooter ? (
						<ContextMenuItem onClick={handleSetAsHeader}>
							Set as Header
						</ContextMenuItem>
					) : null}
					{isThisFooter ? (
						<>
							{!isFooterDefault && (
								<ContextMenuItem
									onClick={handleSetFooterAsDefault}
								>
									Set as Default Footer
								</ContextMenuItem>
							)}
							<ContextMenuItem onClick={handleUnlinkFooter}>
								Unlink Footer
							</ContextMenuItem>
						</>
					) : !isThisHeader ? (
						<ContextMenuItem onClick={handleSetAsFooter}>
							Set as Footer
						</ContextMenuItem>
					) : null}
				</>
			) : null}
		</>
	);
}
