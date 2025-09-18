import { getBuilderMaxWidth } from "@/builder/lib/breakpoints";
import { FluidSize } from "@/builder/types/settings/FluidSize";

export function toClamp(size: FluidSize, breakpointMaxWidth?: number): string {
	const maxWidth = breakpointMaxWidth ?? getBuilderMaxWidth() ?? 1440;

	if (size.max == size.min) return `${size.max}${size.sizeUnit}`;
	if (size.min == undefined) {
		size.min = compressNumber(size.max);
	}
	if (size.max == undefined) {
		size.max = expandNumber(size.min);
	}

	const min = size.min;
	const max = size.max;

	const sizeUnit = size.sizeUnit;

	let slope: number;
	if (sizeUnit === "rem" && typeof window !== "undefined") {
		const rootFontSize =
			parseFloat(getComputedStyle(document.documentElement).fontSize) ||
			16;
		slope = max / (maxWidth / rootFontSize);
	} else if (sizeUnit === "px" && typeof window !== "undefined") {
		slope = max / maxWidth;
	} else {
		return `${max}${sizeUnit}`;
	}

	return `clamp(${min}${sizeUnit}, ${(slope * 100).toFixed(4)}cqw, ${max}${sizeUnit})`;
}

function compressNumber(x: number, p = 0.35): number {
	if (x >= 1) return Math.pow(x, p); // x > 1 → racine p
	return 1 - Math.pow(1 - x, p); // x < 1 → symétrique vers le bas
}

function expandNumber(x: number, p = 0.35): number {
	if (x >= 1) return Math.pow(x, 1 / p); // x > 1
	return 1 - Math.pow(1 - x, 1 / p); // x < 1
}
