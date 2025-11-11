"use client";

import {
	ArrowDownToLine,
	ArrowLeftToLine,
	ArrowRightToLine,
	ArrowUpToLine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PropertyQuadInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyQuadInput";
import PropertyUnitInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyUnitInput";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { SizeSpacingStyle } from "@/feature/builder/types/components/properties/componentStylePropsType";

export default function BuilderStyleSizeAndSpacing({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.SizeAndSpacing");

	const [showMinMax, setShowMinMax] = useState<boolean>(false);
	const styleProps = useStyleProps(component, {
		sizeAndSpacing: STYLE_DEFAULTS.SIZE_AND_SPACING,
	});
	const sizeSpacing = styleProps.sizeAndSpacing;
	const { updateNestedProperty } = useStyleUpdate(component);

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* Width */}
			<PropertyUnitInput
				label={t("width")}
				layout="row"
				onEmpty={() =>
					updateNestedProperty("sizeAndSpacing", (current) => {
						const curr = current || {};
						const { width, ...rest } = curr as SizeSpacingStyle;
						return rest as SizeSpacingStyle;
					})
				}
				onUnitChange={(unit) =>
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						width: {
							number: sizeSpacing.width?.number || 0,
							unit,
							custom: "",
						},
					}))
				}
				onValueChange={(value) =>
					updateNestedProperty("sizeAndSpacing", (current) => {
						const curr = current || {};
						if (sizeSpacing.width?.unit === "custom") {
							return {
								...curr,
								width: {
									custom: String(value),
									unit: "custom",
									number: 0,
								},
							} as SizeSpacingStyle;
						}
						return {
							...curr,
							width: {
								number: Number(value),
								unit: sizeSpacing.width?.unit || "px",
							},
						} as SizeSpacingStyle;
					})
				}
				unit={sizeSpacing.width?.unit || "px"}
				value={sizeSpacing.width?.number || 0}
			/>

			{/* Height */}
			<PropertyUnitInput
				label={t("height")}
				layout="row"
				onEmpty={() =>
					updateNestedProperty("sizeAndSpacing", (current) => {
						const curr = current || {};
						const { height, ...rest } = curr as SizeSpacingStyle;
						return rest as SizeSpacingStyle;
					})
				}
				onUnitChange={(unit) =>
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						height: {
							number: sizeSpacing.height?.number || 0,
							unit,
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						height: {
							number,
							unit: sizeSpacing.height?.unit || "px",
						},
					}))
				}
				unit={sizeSpacing.height?.unit || "px"}
				value={sizeSpacing.height?.number || 0}
			/>

			{/* Min/Max sections (conditional) */}
			{showMinMax && (
				<>
					<PropertyUnitInput
						label={t("minWidth")}
						layout="row"
						onEmpty={() =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => {
									const curr = current || {};
									const { minWidth, ...rest } =
										curr as SizeSpacingStyle;
									return rest as SizeSpacingStyle;
								},
							)
						}
						onUnitChange={(unit) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									minWidth: {
										number:
											sizeSpacing.minWidth?.number || 0,
										unit,
									},
								}),
							)
						}
						onValueChange={(number) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									minWidth: {
										number,
										unit:
											sizeSpacing.minWidth?.unit || "px",
									},
								}),
							)
						}
						unit={sizeSpacing.minWidth?.unit || "px"}
						value={sizeSpacing.minWidth?.number || 0}
					/>

					<PropertyUnitInput
						label={t("maxWidth")}
						layout="row"
						onEmpty={() =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => {
									const curr = current || {};
									const { maxWidth, ...rest } =
										curr as SizeSpacingStyle;
									return rest as SizeSpacingStyle;
								},
							)
						}
						onUnitChange={(unit) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									maxWidth: {
										number:
											sizeSpacing.maxWidth?.number || 0,
										unit,
									},
								}),
							)
						}
						onValueChange={(number) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									maxWidth: {
										number,
										unit:
											sizeSpacing.maxWidth?.unit || "px",
									},
								}),
							)
						}
						unit={sizeSpacing.maxWidth?.unit || "px"}
						value={sizeSpacing.maxWidth?.number || 0}
					/>

					<PropertyUnitInput
						label={t("minHeight")}
						layout="row"
						onEmpty={() =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => {
									const curr = current || {};
									const { minHeight, ...rest } =
										curr as SizeSpacingStyle;
									return rest as SizeSpacingStyle;
								},
							)
						}
						onUnitChange={(unit) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									minHeight: {
										number:
											sizeSpacing.minHeight?.number || 0,
										unit,
									},
								}),
							)
						}
						onValueChange={(number) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									minHeight: {
										number,
										unit:
											sizeSpacing.minHeight?.unit || "px",
									},
								}),
							)
						}
						unit={sizeSpacing.minHeight?.unit || "px"}
						value={sizeSpacing.minHeight?.number || 0}
					/>

					<PropertyUnitInput
						label={t("maxHeight")}
						layout="row"
						onEmpty={() =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => {
									const curr = current || {};
									const { maxHeight, ...rest } =
										curr as SizeSpacingStyle;
									return rest as SizeSpacingStyle;
								},
							)
						}
						onUnitChange={(unit) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									maxHeight: {
										number:
											sizeSpacing.maxHeight?.number || 0,
										unit,
									},
								}),
							)
						}
						onValueChange={(number) =>
							updateNestedProperty(
								"sizeAndSpacing",
								(current) => ({
									...current,
									maxHeight: {
										number,
										unit:
											sizeSpacing.maxHeight?.unit || "px",
									},
								}),
							)
						}
						unit={sizeSpacing.maxHeight?.unit || "px"}
						value={sizeSpacing.maxHeight?.number || 0}
					/>
				</>
			)}

			{/* Add Min & Max Toggle */}
			<Button
				className="w-full text-xs"
				onClick={() => setShowMinMax(!showMinMax)}
				size="sm"
				variant="outline"
			>
				{showMinMax ? t("hideMinMax") : t("addMinMax")}
			</Button>

			{/* Padding */}
			<PropertyQuadInput
				icons={{
					bottom: ArrowDownToLine,
					left: ArrowLeftToLine,
					right: ArrowRightToLine,
					top: ArrowUpToLine,
				}}
				label={t("padding")}
				onUnitChange={(unit) =>
					updateNestedProperty("sizeAndSpacing", (current) => {
						const currPadding = current?.padding;
						const defaultPadding =
							STYLE_DEFAULTS.SIZE_AND_SPACING.padding;
						return {
							...current,
							padding: {
								key: currPadding?.key ?? defaultPadding.key,
								top: {
									...(currPadding?.top ?? defaultPadding.top),
									sizeUnit: unit,
								},
								right: {
									...(currPadding?.right ??
										defaultPadding.right),
									sizeUnit: unit,
								},
								bottom: {
									...(currPadding?.bottom ??
										defaultPadding.bottom),
									sizeUnit: unit,
								},
								left: {
									...(currPadding?.left ??
										defaultPadding.left),
									sizeUnit: unit,
								},
							},
						};
					})
				}
				onValuesChange={({ top, right, bottom, left }) => {
					updateNestedProperty("sizeAndSpacing", (current) => {
						const currPadding = current?.padding;
						const defaultPadding =
							STYLE_DEFAULTS.SIZE_AND_SPACING.padding;
						return {
							...current,
							padding: {
								key: currPadding?.key ?? defaultPadding.key,
								top: {
									...(currPadding?.top ?? defaultPadding.top),
									max:
										top ??
										currPadding?.top?.max ??
										defaultPadding.top.max,
								},
								right: {
									...(currPadding?.right ??
										defaultPadding.right),
									max:
										right ??
										currPadding?.right?.max ??
										defaultPadding.right.max,
								},
								bottom: {
									...(currPadding?.bottom ??
										defaultPadding.bottom),
									max:
										bottom ??
										currPadding?.bottom?.max ??
										defaultPadding.bottom.max,
								},
								left: {
									...(currPadding?.left ??
										defaultPadding.left),
									max:
										left ??
										currPadding?.left?.max ??
										defaultPadding.left.max,
								},
							},
						};
					});
				}}
				unit={
					sizeSpacing.padding?.top.sizeUnit ||
					STYLE_DEFAULTS.SIZE_AND_SPACING.padding.top.sizeUnit
				}
				values={{
					bottom:
						sizeSpacing.padding?.bottom.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.padding.bottom.max,
					left:
						sizeSpacing.padding?.left.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.padding.left.max,
					right:
						sizeSpacing.padding?.right.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.padding.right.max,
					top:
						sizeSpacing.padding?.top.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.padding.top.max,
				}}
			/>

			{/* Margin */}
			<PropertyQuadInput
				icons={{
					bottom: ArrowDownToLine,
					left: ArrowLeftToLine,
					right: ArrowRightToLine,
					top: ArrowUpToLine,
				}}
				label={t("margin")}
				onUnitChange={(unit) =>
					updateNestedProperty("sizeAndSpacing", (current) => {
						const currMargin = current?.margin;
						const defaultMargin =
							STYLE_DEFAULTS.SIZE_AND_SPACING.margin;
						return {
							...current,
							margin: {
								key: currMargin?.key ?? defaultMargin.key,
								top: {
									...(currMargin?.top ?? defaultMargin.top),
									sizeUnit: unit,
								},
								right: {
									...(currMargin?.right ??
										defaultMargin.right),
									sizeUnit: unit,
								},
								bottom: {
									...(currMargin?.bottom ??
										defaultMargin.bottom),
									sizeUnit: unit,
								},
								left: {
									...(currMargin?.left ?? defaultMargin.left),
									sizeUnit: unit,
								},
							},
						};
					})
				}
				onValuesChange={({ top, right, bottom, left }) => {
					updateNestedProperty("sizeAndSpacing", (current) => {
						const currMargin = current?.margin;
						const defaultMargin =
							STYLE_DEFAULTS.SIZE_AND_SPACING.margin;
						return {
							...current,
							margin: {
								key: currMargin?.key ?? defaultMargin.key,
								top: {
									...(currMargin?.top ?? defaultMargin.top),
									max:
										top ??
										currMargin?.top?.max ??
										defaultMargin.top.max,
								},
								right: {
									...(currMargin?.right ??
										defaultMargin.right),
									max:
										right ??
										currMargin?.right?.max ??
										defaultMargin.right.max,
								},
								bottom: {
									...(currMargin?.bottom ??
										defaultMargin.bottom),
									max:
										bottom ??
										currMargin?.bottom?.max ??
										defaultMargin.bottom.max,
								},
								left: {
									...(currMargin?.left ?? defaultMargin.left),
									max:
										left ??
										currMargin?.left?.max ??
										defaultMargin.left.max,
								},
							},
						};
					});
				}}
				unit={
					sizeSpacing.margin?.top.sizeUnit ||
					STYLE_DEFAULTS.SIZE_AND_SPACING.margin.top.sizeUnit
				}
				values={{
					bottom:
						sizeSpacing.margin?.bottom.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.margin.bottom.max,
					left:
						sizeSpacing.margin?.left.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.margin.left.max,
					right:
						sizeSpacing.margin?.right.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.margin.right.max,
					top:
						sizeSpacing.margin?.top.max ??
						STYLE_DEFAULTS.SIZE_AND_SPACING.margin.top.max,
				}}
			/>
		</div>
	);
}
