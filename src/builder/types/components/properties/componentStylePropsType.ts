import { ColorSettings } from "@/builder/types/settings/ColorSettings";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import {
	SectionGap,
	SectionPadding,
} from "@/builder/types/settings/SpacingSettings";
import { TypographySettings } from "@/builder/types/settings/TypographySettings";

export type DisplayType =
	| "block"
	| "inline"
	| "flex"
	| "grid"
	| "inline-flex"
	| "inline-grid";
export type PositionType =
	| "static"
	| "relative"
	| "absolute"
	| "fixed"
	| "sticky";
export type OverflowType = "visible" | "hidden" | "scroll" | "auto";
export type ObjectFitType = "cover" | "contain" | "fill" | "none";
export type JustifyContent =
	| "start"
	| "center"
	| "end"
	| "space-between"
	| "space-around"
	| "space-evenly";
export type AlignItems = "start" | "center" | "end" | "stretch";
export type FlexDirection = "row" | "column";
export type FlexWrap = "wrap" | "nowrap";
export type DirectionType = "vertical" | "horizontal";
export type GridAuto = number | `${number}fr`;
export type Side = "top" | "right" | "bottom" | "left";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform =
	| "none"
	| "uppercase"
	| "lowercase"
	| "capitalize"
	| "unset";
export type TextDecoration = "none" | "underline" | "line-through";
export type WhiteSpace = "normal" | "nowrap" | "pre-line";
export type ListStyle = "disc" | "circle" | "none";
export type GradientType = "linear" | "radial";
export type ImageSize = "cover" | "contain" | "auto";
export type ImagePosition = "top" | "center" | "bottom" | "custom";
export type ImageRepeat = "repeat" | "no-repeat";
export type BackgroundAttachment = "scroll" | "fixed";
export type BorderStyle = "solid" | "dashed" | "dotted" | "double";
export type BackdropFilter = "none" | "blur" | "brightness" | "contrast";
export type TimingFunction = "ease" | "linear";
export type AnimationType = "none" | "fade" | "slide" | "bounce";
export type PercentUnit = "%";
export type TimeUnit = "ms" | "s";

export type SpacingValue = { number: number; unit: SizeUnit };

export type PercentValue = { number: number; unit: PercentUnit };

export type LayoutStyle = {
	display?: DisplayType;
	flex?: {
		direction?: FlexDirection;
		justifyContent?: JustifyContent;
		alignItems?: AlignItems;
		wrap?: FlexWrap;
		grow?: number;
		shrink?: number;
		gap?: SectionGap;
	};
	grid?: {
		columns?: GridAuto;
		rows?: GridAuto;
		gap?: SectionGap;
	};
};

export type PositionStyle = {
	position?: PositionType;
	top?: SpacingValue;
	right?: SpacingValue;
	bottom?: SpacingValue;
	left?: SpacingValue;
	zIndex?: number;
	overflow?: OverflowType;
	objectFit?: ObjectFitType;
};

export type SizeSpacingStyle = {
	width?: SpacingValue;
	height?: SpacingValue;
	minWidth?: SpacingValue;
	maxWidth?: SpacingValue;
	minHeight?: SpacingValue;
	maxHeight?: SpacingValue;
	padding?: SectionPadding;
	margin?: SectionPadding;
};

export type TypographyStyle = {
	font?: TypographySettings;
	fontFamily?: TypographySettings["fontFamily"];
	fontSize?: TypographySettings["fontSize"];
	fontWeight?: TypographySettings["fontWeight"];
	lineHeight?: SpacingValue | "normal" | "inherit" | "initial" | "unset";
	fontStyle?: TypographySettings["fontStyle"];
	letterSpacing?: SpacingValue;
	color?: ColorSettings | string;
	textAlign?: TextAlign;
	textTransform?: TextTransform;
	textDecoration?: TextDecoration;
	whiteSpace?: WhiteSpace;
	listStyle?: ListStyle;
};

export type BackgroundStyle = {
	color?: ColorSettings | string;
	gradient?: {
		type: GradientType;
		angle?: { number: number; unit: "deg" | "rad" };
		colors: [ColorSettings | string, ColorSettings | string];
	};
	image?: {
		src: string;
		size?: ImageSize;
		position?: ImagePosition | { x: SpacingValue; y: SpacingValue };
		repeat?: ImageRepeat;
		attachment?: BackgroundAttachment;
	};
};

export type BorderCornerStyle = {
	borderWidth?: Partial<Record<Side, SpacingValue>>;
	borderColor?: ColorSettings | string;
	borderStyle?: BorderStyle;
	borderRadius?: Partial<Record<Side, SpacingValue>>;
	outlineColor?: ColorSettings | string;
	outlineWidth?: SpacingValue;
};

export type BoxShadowStyle = {
	color: ColorSettings | string;
	opacity: PercentValue;
	x: SpacingValue;
	y: SpacingValue;
	blur: PercentValue;
	spread: PercentValue;
};

export type TextShadowStyle = {
	color: ColorSettings | string;
	opacity: PercentValue;
	x: SpacingValue;
	y: SpacingValue;
	blur: PercentValue;
	spread: PercentValue;
};

export type EffectsStyle = {
	boxShadows?: BoxShadowStyle[];
	textShadows?: TextShadowStyle[];
	opacity?: number;
	backdropFilter?: BackdropFilter[];
	hover?: {
		backgroundColor?: ColorSettings | string;
		textColor?: ColorSettings | string;
		boxShadow?: boolean;
		scale?: number;
		transition?: {
			duration: { number: number; unit: "ms" | "s" };
			timingFunction: TimingFunction;
		};
	};
	animation?: {
		type: AnimationType;
		duration: { number: number; unit: "ms" | "s" };
	};
};

export type AdvancedStyle = {
	cssClass?: string;
	cssId?: string;
	customCss?: string;
};

export type ComponentStyleProps = {
	layout?: LayoutStyle;
	position?: PositionStyle;
	sizeAndSpacing?: SizeSpacingStyle;
	typography?: TypographyStyle;
	background?: BackgroundStyle;
	bordersAndCorners?: BorderCornerStyle;
	effects?: EffectsStyle;
	advanced?: AdvancedStyle;
};
