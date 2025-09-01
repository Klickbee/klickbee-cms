// Utility functions for color conversion and formatting

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				b: parseInt(result[3], 16),
				g: parseInt(result[2], 16),
				r: parseInt(result[1], 16),
			}
		: { b: 0, g: 0, r: 0 };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
	const { r, g, b } = hexToRgb(hex);
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	let h = 0,
		s = 0;
	const l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case rNorm:
				h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
				break;
			case gNorm:
				h = (bNorm - rNorm) / d + 2;
				break;
			case bNorm:
				h = (rNorm - gNorm) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		l: Math.round(l * 100),
		s: Math.round(s * 100),
	};
}

export function formatColor(
	color: string,
	format: "HEX" | "RGB" | "HSL",
): string {
	switch (format) {
		case "RGB": {
			const { r, g, b } = hexToRgb(color);
			return `rgb(${r}, ${g}, ${b})`;
		}
		case "HSL": {
			const { h, s, l } = hexToHsl(color);
			return `hsl(${h}, ${s}%, ${l}%)`;
		}
		default:
			return color;
	}
}

export function cleanColor(color: string): string {
	return color.replace(/\s+\d+%/g, "").trim();
}
