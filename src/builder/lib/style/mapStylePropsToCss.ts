import {
	BackgroundStyle,
	BorderCornerStyle,
	ComponentStyleProps,
	EffectsStyle,
	LayoutStyle,
	PositionStyle,
	SizeSpacingStyle,
	TypographyStyle,
} from "@/builder/types/components/properties/componentStylePropsType";
import { ColorSettings } from "@/builder/types/settings/ColorSettings";
import { FluidSize } from "@/builder/types/settings/FluidSize";
import { SectionPadding } from "@/builder/types/settings/SpacingSettings";

// Helper: resolve ColorSettings | string to hex string
function resolveColor(color?: ColorSettings | string): string | undefined {
	if (!color) return undefined;
	return typeof color === "string" ? color : color.hexCode;
}

// Helper: FluidSize to CSS value (minimal approach: use min value)
function fluidToCss(size?: FluidSize): string | undefined {
	if (!size) return undefined;
	return `${size.min}${size.sizeUnit}`;
}

// Helper: SpacingValue to CSS value
function spacingToCss(
	size?: { number: number; unit: string } | null,
): string | undefined {
	if (!size) return undefined;
	return `${size.number}${size.unit}`;
}

function applyLayout(layout?: LayoutStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!layout) return css;

	if (layout.display)
		css.display = layout.display as React.CSSProperties["display"];

	if (layout.flex) {
		// If flex properties are set but display is not, default to flex
		if (!css.display) css.display = "flex";

		const {
			direction,
			justifyContent,
			alignItems,
			wrap,
			grow,
			shrink,
			gap,
		} = layout.flex;
		if (direction) css.flexDirection = direction;
		if (justifyContent) {
			const map: Record<string, React.CSSProperties["justifyContent"]> = {
				center: "center",
				end: "flex-end",
				"space-around": "space-around",
				"space-between": "space-between",
				"space-evenly": "space-evenly",
				start: "flex-start",
			};
			css.justifyContent = map[justifyContent] ?? justifyContent;
		}
		if (alignItems) {
			const map: Record<string, React.CSSProperties["alignItems"]> = {
				center: "center",
				end: "flex-end",
				start: "flex-start",
				stretch: "stretch",
			};
			css.alignItems = map[alignItems] ?? alignItems;
		}
		if (wrap) css.flexWrap = wrap;
		if (typeof grow === "number") css.flexGrow = grow;
		if (typeof shrink === "number") css.flexShrink = shrink;
		if (gap) {
			if (gap.row) css.rowGap = fluidToCss(gap.row);
			if (gap.column) css.columnGap = fluidToCss(gap.column);
		}
	}

	if (layout.grid) {
		if (!css.display) css.display = "grid";
		const { columns, rows, gap } = layout.grid;
		if (columns !== undefined) {
			if (typeof columns === "number") {
				css.gridTemplateColumns = `repeat(${columns}, 1fr)`;
			} else {
				// e.g., "3fr" -> use 3 columns as a simple heuristic
				const n = parseInt(columns, 10);
				css.gridTemplateColumns = isNaN(n)
					? columns
					: `repeat(${n}, 1fr)`;
			}
		}
		if (rows !== undefined) {
			if (typeof rows === "number") {
				css.gridTemplateRows = `repeat(${rows}, auto)`;
			} else {
				const n = parseInt(rows, 10);
				css.gridTemplateRows = isNaN(n) ? rows : `repeat(${n}, auto)`;
			}
		}
		if (gap) {
			if (gap.row) css.rowGap = fluidToCss(gap.row);
			if (gap.column) css.columnGap = fluidToCss(gap.column);
		}
	}

	return css;
}

function applyPosition(position?: PositionStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!position) return css;

	if (position.position)
		css.position = position.position as React.CSSProperties["position"];
	if (position.top) css.top = spacingToCss(position.top);
	if (position.right) css.right = spacingToCss(position.right);
	if (position.bottom) css.bottom = spacingToCss(position.bottom);
	if (position.left) css.left = spacingToCss(position.left);
	if (typeof position.zIndex === "number") css.zIndex = position.zIndex;
	if (position.overflow)
		css.overflow = position.overflow as React.CSSProperties["overflow"];
	if (position.objectFit)
		css.objectFit = position.objectFit as React.CSSProperties["objectFit"];

	return css;
}

function applySizeSpacing(size?: SizeSpacingStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!size) return css;

	if (size.width) css.width = spacingToCss(size.width);
	if (size.height) css.height = spacingToCss(size.height);
	if (size.minWidth) css.minWidth = spacingToCss(size.minWidth);
	if (size.maxWidth) css.maxWidth = spacingToCss(size.maxWidth);
	if (size.minHeight) css.minHeight = spacingToCss(size.minHeight);
	if (size.maxHeight) css.maxHeight = spacingToCss(size.maxHeight);

	const applyPaddingMargin = (
		pm?: SectionPadding,
		prefix?: "padding" | "margin",
	) => {
		if (!pm || !prefix) return;
		const top = fluidToCss(pm.top);
		const right = fluidToCss(pm.right);
		const bottom = fluidToCss(pm.bottom);
		const left = fluidToCss(pm.left);

		type PMProp = keyof Pick<
			React.CSSProperties,
			| "paddingTop"
			| "paddingRight"
			| "paddingBottom"
			| "paddingLeft"
			| "marginTop"
			| "marginRight"
			| "marginBottom"
			| "marginLeft"
		>;
		if (top !== undefined) {
			const prop = `${prefix}Top` as PMProp;
			css[prop] = top;
		}
		if (right !== undefined) {
			const prop = `${prefix}Right` as PMProp;
			css[prop] = right;
		}
		if (bottom !== undefined) {
			const prop = `${prefix}Bottom` as PMProp;
			css[prop] = bottom;
		}
		if (left !== undefined) {
			const prop = `${prefix}Left` as PMProp;
			css[prop] = left;
		}
	};

	if (size.padding) applyPaddingMargin(size.padding, "padding");
	if (size.margin) applyPaddingMargin(size.margin, "margin");

	return css;
}

function applyTypography(typography?: TypographyStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!typography) return css;

	// If a consolidated font object is provided, use it as base
	if (typography.font) {
		const f = typography.font;
		if (f.fontFamily) css.fontFamily = f.fontFamily;
		if (f.fontSize) css.fontSize = fluidToCss(f.fontSize);
		if (typeof f.lineHeight === "number") {
			css.lineHeight = `${f.lineHeight}${f.lineHeightUnits}`;
		}
		if (f.fontWeight)
			css.fontWeight = f.fontWeight as React.CSSProperties["fontWeight"];
		if (f.fontStyle)
			css.fontStyle = f.fontStyle as React.CSSProperties["fontStyle"];
		if (typeof f.letterSpacing === "number") {
			css.letterSpacing = `${f.letterSpacing}${f.letterSpacingUnits}`;
		}
		if (f.textTransform)
			css.textTransform =
				f.textTransform as React.CSSProperties["textTransform"];
	}

	// Override with direct properties if provided
	if (typography.fontFamily) css.fontFamily = typography.fontFamily;
	if (typography.fontSize) {
		// fontSize is a FluidSize from TypographySettings
		css.fontSize = fluidToCss(typography.fontSize as FluidSize);
	}
	if (typography.lineHeight) {
		if (typeof typography.lineHeight === "string") {
			css.lineHeight = typography.lineHeight;
		} else {
			css.lineHeight = spacingToCss(typography.lineHeight);
		}
	}
	if (typography.fontWeight)
		css.fontWeight =
			typography.fontWeight as React.CSSProperties["fontWeight"];
	if (typography.fontStyle)
		css.fontStyle =
			typography.fontStyle as React.CSSProperties["fontStyle"];
	if (typography.letterSpacing)
		css.letterSpacing = spacingToCss(typography.letterSpacing);
	if (typography.color) css.color = resolveColor(typography.color);
	if (typography.textAlign)
		css.textAlign =
			typography.textAlign as React.CSSProperties["textAlign"];
	if (typography.textTransform)
		css.textTransform =
			typography.textTransform as React.CSSProperties["textTransform"];
	if (typography.textDecoration)
		css.textDecoration =
			typography.textDecoration as React.CSSProperties["textDecoration"];
	if (typography.whiteSpace)
		css.whiteSpace =
			typography.whiteSpace as React.CSSProperties["whiteSpace"];
	if (typography.listStyle) css.listStyleType = typography.listStyle;

	return css;
}

function applyBackground(bg?: BackgroundStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!bg) return css;

	if (bg.color) css.backgroundColor = resolveColor(bg.color);

	if (bg.gradient) {
		const angle = bg.gradient.angle ?? 180;
		const c0 = resolveColor(bg.gradient.colors[0]) ?? "transparent";
		const c1 = resolveColor(bg.gradient.colors[1]) ?? "transparent";
		const p0 = bg.gradient.positions?.[0] ?? 0;
		const p1 = bg.gradient.positions?.[1] ?? 100;
		css.backgroundImage = `linear-gradient(${angle}deg, ${c0} ${p0}%, ${c1} ${p1}%)`;
	}

	if (bg.image) {
		css.backgroundImage = `url(${bg.image.src})`;
		if (bg.image.size) css.backgroundSize = bg.image.size;
		if (bg.image.repeat) css.backgroundRepeat = bg.image.repeat;
		if (bg.image.attachment) css.backgroundAttachment = bg.image.attachment;
		if (bg.image.position) {
			if (typeof bg.image.position === "string") {
				const map: Record<string, string> = {
					bottom: "bottom",
					center: "center",
					custom: "center",
					top: "top",
				};
				css.backgroundPosition =
					map[bg.image.position] ?? bg.image.position;
			} else {
				const x = spacingToCss(bg.image.position.x) ?? "0";
				const y = spacingToCss(bg.image.position.y) ?? "0";
				css.backgroundPosition = `${x} ${y}`;
			}
		}
	}

	return css;
}

function applyBorders(bc?: BorderCornerStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!bc) return css;

	if (bc.borderColor) css.borderColor = resolveColor(bc.borderColor);
	if (bc.borderStyle)
		css.borderStyle = bc.borderStyle as React.CSSProperties["borderStyle"];

	// Width per side
	if (bc.borderWidth) {
		if (bc.borderWidth.top)
			css.borderTopWidth = spacingToCss(bc.borderWidth.top);
		if (bc.borderWidth.right)
			css.borderRightWidth = spacingToCss(bc.borderWidth.right);
		if (bc.borderWidth.bottom)
			css.borderBottomWidth = spacingToCss(bc.borderWidth.bottom);
		if (bc.borderWidth.left)
			css.borderLeftWidth = spacingToCss(bc.borderWidth.left);
	}

	// Border radius: if partial sides provided, use the first value as uniform radius (minimal impl.)
	if (bc.borderRadius) {
		const first =
			bc.borderRadius.top ||
			bc.borderRadius.right ||
			bc.borderRadius.bottom ||
			bc.borderRadius.left;
		if (first) css.borderRadius = spacingToCss(first);
	}

	if (bc.outlineColor) css.outlineColor = resolveColor(bc.outlineColor);
	if (bc.outlineWidth) css.outlineWidth = spacingToCss(bc.outlineWidth);

	return css;
}

function applyEffects(e?: EffectsStyle): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!e) return css;

	if (typeof e.opacity === "number") css.opacity = e.opacity;
	// Skipping complex shadows/filters/animations for minimal implementation

	return css;
}

export function mapStylePropsToCss(
	style?: ComponentStyleProps,
): React.CSSProperties {
	const css: React.CSSProperties = {};
	if (!style) return css;

	Object.assign(css, applyLayout(style.layout));
	Object.assign(css, applyPosition(style.position));
	Object.assign(css, applySizeSpacing(style.sizeAndSpacing));
	Object.assign(css, applyTypography(style.typography));
	Object.assign(css, applyBackground(style.background));
	Object.assign(css, applyBorders(style.bordersAndCorners));
	Object.assign(css, applyEffects(style.effects));

	// Advanced custom CSS is intentionally not applied here.
	return css;
}
