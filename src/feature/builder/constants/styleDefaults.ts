import {
	AdvancedStyle,
	BackgroundStyle,
	BorderCornerStyle,
	DisplayType,
	EffectsStyle,
	LayoutStyle,
	PositionStyle,
	SizeSpacingStyle,
	TypographyStyle,
} from "@/feature/builder/types/components/properties/componentStylePropsType";

export const STYLE_DEFAULTS = {
	// Advanced defaults
	ADVANCED: {
		cssClass: "",
		cssId: "",
		customCss: "",
	} satisfies AdvancedStyle,

	// Background defaults
	BACKGROUND: {
		color: "#FFFFFF",
		gradient: undefined,
		image: undefined,
	} satisfies BackgroundStyle,

	// Border defaults
	BORDER: {
		borderColor: "#e5e7eb",
		borderRadius: {
			bottom: { number: 0, unit: "px" as const },
			left: { number: 0, unit: "px" as const },
			right: { number: 0, unit: "px" as const },
			top: { number: 0, unit: "px" as const },
		},
		borderStyle: "solid" as const,
		borderWidth: {
			bottom: { number: 0, unit: "px" as const },
			left: { number: 0, unit: "px" as const },
			right: { number: 0, unit: "px" as const },
			top: { number: 0, unit: "px" as const },
		},
		outlineColor: "#000000",
		outlineWidth: { number: 0, unit: "px" as const },
	} satisfies BorderCornerStyle,

	// Effect defaults
	EFFECT: {
		animation: {
			duration: { number: 500, unit: "ms" as const },
			type: "none" as const,
		},
		backdropFilter: ["none" as const],
		hover: {
			backgroundColor: "#171717",
			transition: {
				duration: { number: 300, unit: "ms" as const },
				timingFunction: "ease" as const,
			},
		},
		opacity: 100,
	} satisfies EffectsStyle,

	// Layout defaults
	LAYOUT: {
		display: "flex" as DisplayType,
		flex: {
			alignItems: "stretch" as const,
			direction: "row" as const,
			gap: {
				column: {
					max: 0,
					maxWidth: 1440,
					min: 0,
					sizeUnit: "px" as const,
				},
				key: "layout-gap",
				row: {
					max: 0,
					maxWidth: 1440,
					min: 0,
					sizeUnit: "px" as const,
				},
			},
			justifyContent: "start" as const,
			wrap: "nowrap" as const,
		},
		grid: {
			columns: 1,
			gap: {
				column: {
					max: 0,
					maxWidth: 1440,
					min: 0,
					sizeUnit: "px" as const,
				},
				key: "layout-gap",
				row: {
					max: 0,
					maxWidth: 1440,
					min: 0,
					sizeUnit: "px" as const,
				},
			},
			rows: 1,
		},
	} satisfies LayoutStyle,

	// Position defaults
	POSITION: {
		bottom: { number: 0, unit: "px" as const },
		left: { number: 0, unit: "px" as const },
		objectFit: "cover" as const,
		overflow: "auto" as const,
		position: "static" as const,
		right: { number: 0, unit: "px" as const },
		top: { number: 0, unit: "px" as const },
		zIndex: 1,
	} satisfies PositionStyle,

	// Size and Spacing defaults
	SIZE_AND_SPACING: {
		height: { number: 0, unit: "px" as const },
		margin: {
			bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			key: "default-margin",
			left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
		},
		maxHeight: { number: 0, unit: "px" as const },
		maxWidth: { number: 0, unit: "px" as const },
		minHeight: { number: 0, unit: "px" as const },
		minWidth: { number: 0, unit: "px" as const },
		padding: {
			bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			key: "default-padding",
			left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
			top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" as const },
		},
		width: { number: 0, unit: "px" as const },
	} satisfies SizeSpacingStyle,
	// Typography defaults
	TYPOGRAPHY: {
		color: "#171717",
		fontFamily: "Poppins",
		fontSize: { max: 16, maxWidth: 1440, min: 16, sizeUnit: "px" as const },
		fontStyle: "normal" as const,
		fontWeight: "normal" as const,
		letterSpacing: { number: 0, unit: "px" as const },
		lineHeight: { number: 1.5, unit: "em" as const },
		listStyle: "none" as const,
		textAlign: "left" as const,
		textDecoration: "none" as const,
		textTransform: "unset" as const,
		whiteSpace: "normal" as const,
	} satisfies TypographyStyle,
};
