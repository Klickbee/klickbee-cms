import {
	BreakpointStyleProps,
	ComponentStyleProps,
} from "@/feature/builder/types/components/properties/componentStylePropsType";

export function isBreakpointStyleProps(
	style: unknown,
): style is BreakpointStyleProps {
	if (!style || typeof style !== "object") return false;
	const keys = Object.keys(style as Record<string, unknown>);
	// If there are no keys, treat as breakpoint style (empty map)
	if (keys.length === 0) return true;
	// If any key is numeric, consider it a breakpoint map
	return keys.some((k) => !Number.isNaN(Number(k)));
}

export function resolveStyleAtWidth(
	style: BreakpointStyleProps | ComponentStyleProps | undefined,
	width: number,
): ComponentStyleProps {
	if (!style) return {};
	if (!isBreakpointStyleProps(style)) {
		return style as ComponentStyleProps;
	}
	const entries = Object.entries(style as Record<string, ComponentStyleProps>)
		.map(([k, v]) => [Number(k), v] as [number, ComponentStyleProps])
		.filter(([k]) => !Number.isNaN(k))
		.sort((a, b) => a[0] - b[0]); // ascending
	if (entries.length === 0) return {};
	// exact match
	const exact = entries.find(([bp]) => bp === width);
	if (exact) return exact[1] || {};
	// pick the smallest key that is >= width (upper)
	const upper = entries.find(([bp]) => bp >= width);
	if (upper) return upper[1] || {};
	// otherwise use the largest available (last, since ascending)
	return entries[entries.length - 1][1] || {};
}

export function setStyleAtWidth(
	existing: BreakpointStyleProps | ComponentStyleProps | undefined,
	width: number,
	updates: Partial<ComponentStyleProps>,
): BreakpointStyleProps {
	// If existing is not a breakpoint map (legacy flat), migrate by storing it under current width
	if (!existing || !isBreakpointStyleProps(existing)) {
		const base = (existing || {}) as ComponentStyleProps;
		return {
			[width]: { ...base, ...updates },
		} as BreakpointStyleProps;
	}
	// clone map
	const map: BreakpointStyleProps = { ...(existing as BreakpointStyleProps) };
	const current = (map[width] || {}) as ComponentStyleProps;
	map[width] = { ...current, ...updates };
	return map;
}
