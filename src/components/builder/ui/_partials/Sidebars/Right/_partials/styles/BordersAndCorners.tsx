"use client";

import {
	CornerDownLeft,
	CornerDownRight,
	CornerUpLeft,
	CornerUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useStyleState } from "@/builder/hooks/useStyleState";
import {
	BorderCornerStyle,
	BorderStyle,
} from "@/builder/types/components/properties/componentStylePropsType";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import QuadInput from "../inputs/QuadInput";
import SimpleUnitInput from "../inputs/SimpleUnitInput";
import PropertyRow from "../layout/PropertyRow";
import BasicColorPicker from "../pickers/BasicColorPicker";

export default function BuilderStyleBordersAndCorners() {
	const t = useTranslations("Builder.RightSidebar.BordersAndCorners");
	const {
		state: border,
		updateProperty,
		updateNestedProperty,
	} = useStyleState<BorderCornerStyle>({
		borderColor: "#171717",
		borderRadius: {
			bottom: { number: 0, unit: "px" },
			left: { number: 0, unit: "px" },
			right: { number: 0, unit: "px" },
			top: { number: 0, unit: "px" },
		},
		borderStyle: "solid",
		borderWidth: {
			bottom: { number: 1, unit: "px" },
			left: { number: 1, unit: "px" },
			right: { number: 1, unit: "px" },
			top: { number: 1, unit: "px" },
		},
		outlineColor: "#171717",
		outlineWidth: { number: 1, unit: "px" },
	});

	const borderStyleOptions: { value: BorderStyle; label: string }[] = [
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
					onUnitChange={(unit) => {
						updateNestedProperty("borderWidth", (current) => ({
							bottom: {
								number: current?.bottom?.number || 1,
								unit,
							},
							left: {
								number: current?.left?.number || 1,
								unit,
							},
							right: {
								number: current?.right?.number || 1,
								unit,
							},
							top: {
								number: current?.top?.number || 1,
								unit,
							},
						}));
					}}
					onValueChange={(number) => {
						updateNestedProperty("borderWidth", (current) => ({
							bottom: {
								number,
								unit: current?.bottom?.unit || "px",
							},
							left: {
								number,
								unit: current?.left?.unit || "px",
							},
							right: {
								number,
								unit: current?.right?.unit || "px",
							},
							top: {
								number,
								unit: current?.top?.unit || "px",
							},
						}));
					}}
					unit={border.borderWidth?.top?.unit || "px"}
					value={border.borderWidth?.top?.number || 1}
				/>
			</PropertyRow>

			{/* Border Color */}
			<PropertyRow label={t("borderColor")}>
				<BasicColorPicker
					onChange={(borderColor) =>
						updateProperty("borderColor", borderColor)
					}
					value={border.borderColor || "#171717"}
				/>
			</PropertyRow>

			{/* Border Style */}
			<PropertyRow label={t("borderStyle")}>
				<Select
					onValueChange={(borderStyle) =>
						updateProperty(
							"borderStyle",
							borderStyle as BorderStyle,
						)
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
						onUnitChange={(unit) =>
							updateNestedProperty("borderRadius", (current) => ({
								bottom: {
									number: current?.bottom?.number || 0,
									unit,
								},
								left: {
									number: current?.left?.number || 0,
									unit,
								},
								right: {
									number: current?.right?.number || 0,
									unit,
								},
								top: {
									number: current?.top?.number || 0,
									unit,
								},
							}))
						}
						unit={border.borderRadius?.top?.unit || "px"}
					/>
				}
				label={t("borderRadius")}
			>
				<QuadInput
					bottomIcon={CornerDownRight}
					bottomValue={border.borderRadius?.bottom?.number || 0}
					leftIcon={CornerDownLeft}
					leftValue={border.borderRadius?.left?.number || 0}
					onBottomChange={(number) =>
						updateNestedProperty("borderRadius", (current) => ({
							...current,
							bottom: {
								number,
								unit: current?.bottom?.unit || "px",
							},
						}))
					}
					onLeftChange={(number) =>
						updateNestedProperty("borderRadius", (current) => ({
							...current,
							left: {
								number,
								unit: current?.left?.unit || "px",
							},
						}))
					}
					onRightChange={(number) =>
						updateNestedProperty("borderRadius", (current) => ({
							...current,
							right: {
								number,
								unit: current?.right?.unit || "px",
							},
						}))
					}
					onTopChange={(number) =>
						updateNestedProperty("borderRadius", (current) => ({
							...current,
							top: {
								number,
								unit: current?.top?.unit || "px",
							},
						}))
					}
					rightIcon={CornerUpRight}
					rightValue={border.borderRadius?.right?.number || 0}
					topIcon={CornerUpLeft}
					topValue={border.borderRadius?.top?.number || 0}
				/>
			</PropertyColumn>

			{/* Outline Color */}
			<PropertyRow label={t("outlineColor")}>
				<BasicColorPicker
					onChange={(outlineColor) =>
						updateProperty("outlineColor", outlineColor)
					}
					value={border.outlineColor || "#171717"}
				/>
			</PropertyRow>

			{/* Outline Width */}
			<PropertyRow label={t("outlineWidth")}>
				<SimpleUnitInput
					onUnitChange={(unit) =>
						updateProperty("outlineWidth", {
							number: border.outlineWidth?.number || 1,
							unit,
						})
					}
					onValueChange={(number) =>
						updateProperty("outlineWidth", {
							number,
							unit: border.outlineWidth?.unit || "px",
						})
					}
					unit={border.outlineWidth?.unit || "px"}
					value={border.outlineWidth?.number || 1}
				/>
			</PropertyRow>
		</div>
	);
}
