import { getBuilderMaxWidth } from "@/feature/builder/lib/breakpoints";
import { FluidSize } from "@/feature/builder/types/settings/FluidSize";

export function toClamp(size: FluidSize, breakpointMaxWidth?: number): string {
	const maxWidth = breakpointMaxWidth ?? getBuilderMaxWidth() ?? 1440;

	const rootFontSize =
		parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

	if (size.max == size.min) {
		size.min = compressNumber(size.max, size.sizeUnit, rootFontSize);
	}
	if (size.min == undefined) {
		size.min = compressNumber(size.max, size.sizeUnit, rootFontSize);
	}
	if ((size.max == undefined || size.max == 0) && size.min > 0) {
		size.max = expandNumber(size.min, size.sizeUnit, rootFontSize);
	}

	if (size.max < size.min) {
		const temp = size.max;
		size.max = size.min;
		size.min = temp;
	}

	const min = size.min;
	const max = size.max;

	const sizeUnit = size.sizeUnit;

	// console.log({min, max, maxWidth, sizeUnit})

	let slope: number;
	if (sizeUnit === "rem" && typeof window !== "undefined") {
		slope = max / (maxWidth / rootFontSize);
	} else if (sizeUnit === "px") {
		slope = max / maxWidth;
	} else {
		return `${max}${sizeUnit}`;
	}

	return `clamp(${min}${sizeUnit}, ${(slope * 100).toFixed(4)}cqw, ${max}${sizeUnit})`;
}

function compressNumber(
	x: number,
	sizeUnit?: string,
	rootSize?: number,
): number {
	let multiplier;
	const p = 0.9; // facteur de puissance
	if (sizeUnit === "px" && rootSize) {
		x = x / rootSize;
	}
	if (x >= 1)
		multiplier = Math.pow(x, p); // x > 1 → racine p
	else multiplier = 1 - Math.pow(1 - x, p); // x < 1 → symétrique vers le bas
	if (sizeUnit === "px" && rootSize) {
		return multiplier * rootSize;
	} else return multiplier;
}

function expandNumber(x: number, sizeUnit?: string, rootSize?: number): number {
	const p = 1.9; // facteur de puissance
	let multiplier;
	if (sizeUnit === "px" && rootSize) {
		x = x / rootSize;
	}
	if (x >= 1)
		multiplier = Math.pow(x, 1 / p); // x > 1
	else multiplier = 1 - Math.pow(1 - x, 1 / p); // x < 1
	if (sizeUnit === "px" && rootSize) {
		return multiplier * rootSize;
	} else return multiplier;
}
