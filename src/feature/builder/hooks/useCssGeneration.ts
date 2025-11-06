"use client";

import { useEffect, useMemo, useRef } from "react";
import { generateCssAction } from "@/feature/builder/actions/cssActions";
import { getBuilderMaxWidth } from "@/feature/builder/lib/breakpoints";
import { isBreakpointStyleProps } from "@/feature/builder/lib/style/breakpointStyle";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { useCurrentPageStore } from "@/feature/builder/store/storeCurrentPage";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

function toKebabCase(prop: string): string {
	return prop
		.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())
		.replace(/^ms-/, "-ms-");
}

function cssObjToDecls(style: React.CSSProperties): string {
	const parts: string[] = [];
	for (const [key, val] of Object.entries(style)) {
		if (val === undefined || val === null || val === "") continue;
		const cssKey = toKebabCase(key);
		parts.push(`${cssKey}: ${String(val)};`);
	}
	return parts.join(" ");
}

function generateCssForComponent(component: BuilderComponent): string {
	const style = component.props?.style as unknown;
	const selector = `#${component.id}`;
	const blocks: string[] = [];

	if (style && isBreakpointStyleProps(style)) {
		const entries = Object.entries(
			style as Record<string, ComponentStyleProps>,
		)
			.map(([k, v]) => [Number(k), v] as [number, ComponentStyleProps])
			.filter(([k]) => !Number.isNaN(k))
			.sort((a, b) => a[0] - b[0]);
		if (entries.length > 0) {
			// base = smallest breakpoint without media query
			const [_baseWidth, baseStyle] = entries[0];
			// base: resolve at the smallest breakpoint width
			const baseWidth = Number(entries[0][0]) || undefined;
			const baseDecls = cssObjToDecls(
				mapStylePropsToCss(baseStyle, baseWidth),
			);
			if (baseDecls) blocks.push(`${selector}{ ${baseDecls} }`);
			// remaining as min-width queries
			for (let i = 1; i < entries.length; i++) {
				const [width, s] = entries[i];
				const decls = cssObjToDecls(mapStylePropsToCss(s, width));
				if (decls) {
					blocks.push(
						`@media (min-width: ${width}px){ ${selector}{ ${decls} } }`,
					);
				}
			}
		}
	} else if (style) {
		const decls = cssObjToDecls(
			mapStylePropsToCss(style as ComponentStyleProps),
		);
		if (decls) blocks.push(`${selector}{ ${decls} }`);
	}

	// Children
	if (component.children && component.children.length) {
		for (const child of component.children as BuilderComponent[]) {
			blocks.push(generateCssForComponent(child));
		}
	}

	return blocks.filter(Boolean).join("\n");
}

function generateCssForTree(
	components: BuilderComponent[] | undefined | null,
): string {
	if (!components || !Array.isArray(components) || components.length === 0)
		return "";
	const chunks: string[] = [];
	for (const comp of components) {
		chunks.push(generateCssForComponent(comp));
	}
	return chunks.filter(Boolean).join("\n");
}

function sanitizeTitle(input: string): string {
	if (!input) return "untitled";
	return input
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "") // strip diacritics
		.replace(/[^a-zA-Z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.toLowerCase();
}

async function generateCssForParentComponents() {
	const maxWidth = getBuilderMaxWidth() ?? 1440;
	const containerCss = `.builder-container,[id="container-*"] { max-width: ${maxWidth}px;width:100%;margin-left:auto;margin-right:auto; }`;
	const filename = `default-builder.css`;
	try {
		const res = await generateCssAction({
			css: containerCss,
			pageId: 0,
			fileName: filename,
		});
		if (!res?.ok) {
			console.error(
				"CSS generation for parent components failed",
				res?.error,
			);
		}
	} catch (e) {
		console.error("CSS generation for parent components failed", e);
	}
	return true;
}

export function useCssGeneration(parentCssGeneration: boolean = false) {
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const contentKey = useMemo(() => {
		try {
			return JSON.stringify(currentPage?.content ?? []);
		} catch {
			return "";
		}
	}, [currentPage?.content]);

	const timerRef = useRef<number | null>(null);
	let run;
	useEffect(() => {
		if (!currentPage?.id || currentPage.id <= 0 || parentCssGeneration) {
			run = async () => {
				try {
					const res = await generateCssForParentComponents();
					if (!res) {
						console.error(
							"CSS generation for parent components failed",
						);
					}
				} catch (e) {
					console.error(
						"CSS generation for parent components failed",
						e,
					);
				}
			};
		} else {
			run = async () => {
				try {
					const res = await generateCssForParentComponents();
					if (!res) {
						console.error(
							"CSS generation for parent components failed",
						);
					}
				} catch (e) {
					console.error(
						"CSS generation for parent components failed",
						e,
					);
				}

				const css = generateCssForTree(
					Array.isArray(currentPage.content)
						? (currentPage.content as BuilderComponent[])
						: [],
				);

				const title = sanitizeTitle(
					currentPage.title || currentPage.slug || "",
				);
				const fileName = `page-${currentPage.id}-${title}.css`;

				try {
					const res = await generateCssAction({
						css,
						pageId: currentPage.id,
						fileName,
					});
					if (!res?.ok) {
						console.error("CSS generation failed", res?.error);
					}
				} catch (e) {
					// Fail silently in the builder
					console.error("CSS generation failed", e);
				}
			};
		}

		// debounce to avoid spamming
		if (timerRef.current) window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(run, 400);

		return () => {
			if (timerRef.current) window.clearTimeout(timerRef.current);
		};
	}, [currentPage?.id, currentPage?.title, currentPage?.slug, contentKey]);
}
