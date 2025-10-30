import { useEffect, useMemo } from "react";
import { setBuilderMaxWidth } from "@/feature/builder/lib/breakpoints";
import { useSetting } from "@/feature/settings/queries/useSettings";

// Safe parser that returns an array
function parseBreakpoints(
	raw: string | null,
): Array<{ width?: number | string }> {
	try {
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function toNumber(n: unknown): number {
	const x = typeof n === "string" ? parseFloat(n) : (n as number);
	return Number.isFinite(x) ? (x as number) : 0;
}

export function useBuilderMaxWidth(): number {
	const { data } = useSetting("builder_breakpoints");

	const maxWidth = useMemo(() => {
		const bps = parseBreakpoints(data?.value ?? null);
		// biggest width
		const max = bps.reduce(
			(acc, bp) => Math.max(acc, toNumber(bp?.width)),
			0,
		);
		return max || 1440;
	}, [data?.value]);

	useEffect(() => {
		setBuilderMaxWidth(maxWidth);
	}, [maxWidth]);

	return maxWidth;
}
