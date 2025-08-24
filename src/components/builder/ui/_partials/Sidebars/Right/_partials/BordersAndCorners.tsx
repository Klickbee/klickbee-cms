"use client";

import {
	CornerDownLeft,
	CornerDownRight,
	CornerUpLeft,
	CornerUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import QuadInput from "./inputs/QuadInput";
import SimpleUnitInput from "./inputs/SimpleUnitInput";
import PropertyRow from "./layout/PropertyRow";
import BasicColorPicker from "./pickers/BasicColorPicker";

type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";

interface BorderState {
	width: number;
	widthUnit: SizeUnit;
	color: string;
	borderStyle: BorderStyle;
	outlineStyle: BorderStyle;
	radiusTopLeft: number;
	radiusTopRight: number;
	radiusBottomLeft: number;
	radiusBottomRight: number;
	radiusUnit: SizeUnit;
	outlineColor: string;
	outlineWidth: number;
	outlineWidthUnit: SizeUnit;
}

export default function BuilderStyleBordersAndCorners() {
	const t = useTranslations("Builder.RightSidebar.BordersAndCorners");
	const [border, setBorder] = useState<BorderState>({
		borderStyle: "solid",
		color: "#171717",
		outlineColor: "#171717",
		outlineStyle: "solid",
		outlineWidth: 1,
		outlineWidthUnit: "px",
		radiusBottomLeft: 0,
		radiusBottomRight: 0,
		radiusTopLeft: 0,
		radiusTopRight: 0,
		radiusUnit: "px",
		width: 1,
		widthUnit: "px",
	});

	const borderStyleOptions: { value: BorderStyle; label: string }[] = [
		{ label: t("none"), value: "none" },
		{ label: t("solid"), value: "solid" },
		{ label: t("dashed"), value: "dashed" },
		{ label: t("dotted"), value: "dotted" },
		{ label: t("double"), value: "double" },
	];

	return (
		<div className="flex flex-col gap-3">
			{/* Border Width */}
			<PropertyRow label={t("borderWidth")}>
				<SimpleUnitInput
					onUnitChange={(widthUnit) =>
						setBorder((prev) => ({ ...prev, widthUnit }))
					}
					onValueChange={(width) =>
						setBorder((prev) => ({ ...prev, width }))
					}
					unit={border.widthUnit}
					value={border.width}
				/>
			</PropertyRow>

			{/* Border Color */}
			<PropertyRow label={t("borderColor")}>
				<BasicColorPicker
					onChange={(color) =>
						setBorder((prev) => ({ ...prev, color }))
					}
					value={border.color}
				/>
			</PropertyRow>

			{/* Border Style */}
			<PropertyRow label={t("borderStyle")}>
				<Select
					onValueChange={(borderStyle) =>
						setBorder((prev) => ({
							...prev,
							borderStyle: borderStyle as BorderStyle,
						}))
					}
					value={border.borderStyle}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{borderStyleOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Border Radius */}
			<PropertyColumn
				action={
					<UnitSelector
						onUnitChange={(radiusUnit) =>
							setBorder((prev) => ({ ...prev, radiusUnit }))
						}
						unit={border.radiusUnit}
					/>
				}
				label={t("borderRadius")}
			>
				<QuadInput
					bottomIcon={CornerDownRight}
					bottomValue={border.radiusBottomLeft}
					leftIcon={CornerDownLeft}
					leftValue={border.radiusBottomRight}
					onBottomChange={(radiusBottomLeft) =>
						setBorder((prev) => ({ ...prev, radiusBottomLeft }))
					}
					onLeftChange={(radiusBottomRight) =>
						setBorder((prev) => ({ ...prev, radiusBottomRight }))
					}
					onRightChange={(radiusTopRight) =>
						setBorder((prev) => ({ ...prev, radiusTopRight }))
					}
					onTopChange={(radiusTopLeft) =>
						setBorder((prev) => ({ ...prev, radiusTopLeft }))
					}
					rightIcon={CornerUpRight}
					rightValue={border.radiusTopRight}
					topIcon={CornerUpLeft}
					topValue={border.radiusTopLeft}
				/>
			</PropertyColumn>

			{/* Outline Color */}
			<PropertyRow label={t("outlineColor")}>
				<BasicColorPicker
					onChange={(outlineColor) =>
						setBorder((prev) => ({ ...prev, outlineColor }))
					}
					value={border.outlineColor}
				/>
			</PropertyRow>

			{/* Outline Style */}
			<PropertyRow label={t("outlineStyle")}>
				<Select
					onValueChange={(outlineStyle) =>
						setBorder((prev) => ({
							...prev,
							outlineStyle: outlineStyle as BorderStyle,
						}))
					}
					value={border.outlineStyle}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{borderStyleOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Outline Width */}
			<PropertyRow label={t("outlineWidth")}>
				<SimpleUnitInput
					onUnitChange={(outlineWidthUnit) =>
						setBorder((prev) => ({ ...prev, outlineWidthUnit }))
					}
					onValueChange={(outlineWidth) =>
						setBorder((prev) => ({ ...prev, outlineWidth }))
					}
					unit={border.outlineWidthUnit}
					value={border.outlineWidth}
				/>
			</PropertyRow>
		</div>
	);
}
