"use client";

import {
	CornerDownLeft,
	CornerDownRight,
	CornerUpLeft,
	CornerUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import PropertyColorPicker from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyColorPicker";
import PropertyQuadInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyQuadInput";
import PropertySelect from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyUnitInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyUnitInput";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { BorderStyle } from "@/feature/builder/types/components/properties/componentStylePropsType";

export default function BuilderStyleBordersAndCorners({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.BordersAndCorners");

	const styleProps = useStyleProps(component, {
		bordersAndCorners: STYLE_DEFAULTS.BORDER,
	});
	const border = styleProps.bordersAndCorners || STYLE_DEFAULTS.BORDER;
	const { updateNestedProperty } = useStyleUpdate(component);

	const borderStyleOptions: { value: BorderStyle; label: string }[] = [
		{ label: t("solid"), value: "solid" },
		{ label: t("dashed"), value: "dashed" },
		{ label: t("dotted"), value: "dotted" },
		{ label: t("double"), value: "double" },
	];

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* Border Width */}
			<PropertyUnitInput
				label={t("borderWidth")}
				layout="row"
				onUnitChange={(unit) => {
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderWidth: {
							bottom: {
								number:
									current?.borderWidth?.bottom?.number || 1,
								unit,
							},
							left: {
								number: current?.borderWidth?.left?.number || 1,
								unit,
							},
							right: {
								number:
									current?.borderWidth?.right?.number || 1,
								unit,
							},
							top: {
								number: current?.borderWidth?.top?.number || 1,
								unit,
							},
						},
					}));
				}}
				onValueChange={(number) => {
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderWidth: {
							bottom: {
								number,
								unit:
									current?.borderWidth?.bottom?.unit || "px",
							},
							left: {
								number,
								unit: current?.borderWidth?.left?.unit || "px",
							},
							right: {
								number,
								unit: current?.borderWidth?.right?.unit || "px",
							},
							top: {
								number,
								unit: current?.borderWidth?.top?.unit || "px",
							},
						},
					}));
				}}
				unit={border.borderWidth?.top?.unit || "px"}
				value={border.borderWidth?.top?.number || 1}
			/>

			{/* Border Color */}
			<PropertyColorPicker
				label={t("borderColor")}
				layout="row"
				onChange={(borderColor) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderColor,
					}))
				}
				value={border.borderColor || "#171717"}
			/>

			{/* Border Style */}
			<PropertySelect<BorderStyle>
				label={t("borderStyle")}
				layout="row"
				onChange={(borderStyle) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderStyle,
					}))
				}
				options={borderStyleOptions}
				value={border.borderStyle || "solid"}
			/>

			{/* Border Radius */}
			<PropertyQuadInput
				icons={{
					bottom: CornerDownRight,
					left: CornerDownLeft,
					right: CornerUpRight,
					top: CornerUpLeft,
				}}
				label={t("borderRadius")}
				onUnitChange={(unit) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderRadius: {
							bottom: {
								number:
									current?.borderRadius?.bottom?.number || 0,
								unit,
							},
							left: {
								number:
									current?.borderRadius?.left?.number || 0,
								unit,
							},
							right: {
								number:
									current?.borderRadius?.right?.number || 0,
								unit,
							},
							top: {
								number: current?.borderRadius?.top?.number || 0,
								unit,
							},
						},
					}))
				}
				onValuesChange={({ top, right, bottom, left }) => {
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						borderRadius: {
							...current?.borderRadius,
							...(top !== undefined && {
								top: {
									number: top,
									unit:
										current?.borderRadius?.top?.unit ||
										"px",
								},
							}),
							...(right !== undefined && {
								right: {
									number: right,
									unit:
										current?.borderRadius?.right?.unit ||
										"px",
								},
							}),
							...(bottom !== undefined && {
								bottom: {
									number: bottom,
									unit:
										current?.borderRadius?.bottom?.unit ||
										"px",
								},
							}),
							...(left !== undefined && {
								left: {
									number: left,
									unit:
										current?.borderRadius?.left?.unit ||
										"px",
								},
							}),
						},
					}));
				}}
				unit={border.borderRadius?.top?.unit || "px"}
				values={{
					bottom: border.borderRadius?.bottom?.number || 0,
					left: border.borderRadius?.left?.number || 0,
					right: border.borderRadius?.right?.number || 0,
					top: border.borderRadius?.top?.number || 0,
				}}
			/>

			{/* Outline Color */}
			<PropertyColorPicker
				label={t("outlineColor")}
				layout="row"
				onChange={(outlineColor) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						outlineColor,
					}))
				}
				value={border.outlineColor || "#171717"}
			/>

			{/* Outline Width */}
			<PropertyUnitInput
				label={t("outlineWidth")}
				layout="row"
				onUnitChange={(unit) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						outlineWidth: {
							number: current?.outlineWidth?.number || 1,
							unit,
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("bordersAndCorners", (current) => ({
						...current,
						outlineWidth: {
							number,
							unit: current?.outlineWidth?.unit || "px",
						},
					}))
				}
				unit={border.outlineWidth?.unit || "px"}
				value={border.outlineWidth?.number || 1}
			/>
		</div>
	);
}
