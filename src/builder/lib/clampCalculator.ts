import { FluidSize } from "@/builder/types/settings/FluidSize";

export function toClamp(
	size: FluidSize,
	globalMaxWidth: string = "1440px",
): string {
	if (size.max == size.min) {
		size.min = size.max * 0.75;
	}
	if (size.min == undefined) {
		size.min = size.max * 0.75;
	}

	if (size.max == undefined) {
		size.max = size.min * 1.25;
	}

	const min = size.min;
	const max = size.max;

	const maxWidth = size.maxWidth || parseFloat(globalMaxWidth);
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

	return `clamp(${min}${sizeUnit}, ${(slope * 100).toFixed(4)}vw, ${max}${sizeUnit})`;
}
