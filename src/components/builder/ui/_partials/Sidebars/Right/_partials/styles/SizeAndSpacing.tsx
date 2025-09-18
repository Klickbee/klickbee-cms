"use client";

import {
	ArrowDownToLine,
	ArrowLeftToLine,
	ArrowRightToLine,
	ArrowUpToLine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { STYLE_DEFAULTS } from "@/builder/constants/styleDefaults";
import { useStyleProps } from "@/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import { SizeSpacingStyle } from "@/builder/types/components/properties/componentStylePropsType";
import PropertyQuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyQuadInput";
import PropertyUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyUnitInput";
import { Button } from "@/components/ui/button";

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
						},
					}))
				}
				onValueChange={(number) =>
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						width: {
							number,
							unit: sizeSpacing.width?.unit || "px",
						},
					}))
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
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						padding: current?.padding
							? {
									...current.padding,
									bottom: {
										...current.padding.bottom,
										sizeUnit: unit,
									},
									left: {
										...current.padding.left,
										sizeUnit: unit,
									},
									right: {
										...current.padding.right,
										sizeUnit: unit,
									},
									top: {
										...current.padding.top,
										sizeUnit: unit,
									},
								}
							: undefined,
					}))
				}
				onValuesChange={({ top, right, bottom, left }) => {
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						padding: current?.padding
							? {
									...current.padding,
									...(top !== undefined && {
										top: {
											...current.padding.top,
											min: top,
										},
									}),
									...(right !== undefined && {
										right: {
											...current.padding.right,
											min: right,
										},
									}),
									...(bottom !== undefined && {
										bottom: {
											...current.padding.bottom,
											min: bottom,
										},
									}),
									...(left !== undefined && {
										left: {
											...current.padding.left,
											min: left,
										},
									}),
								}
							: undefined,
					}));
				}}
				unit={sizeSpacing.padding?.top.sizeUnit || "px"}
				values={{
					bottom: sizeSpacing.padding?.bottom.min || 0,
					left: sizeSpacing.padding?.left.min || 0,
					right: sizeSpacing.padding?.right.min || 0,
					top: sizeSpacing.padding?.top.min || 0,
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
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						margin: current?.margin
							? {
									...current.margin,
									bottom: {
										...current.margin.bottom,
										sizeUnit: unit,
									},
									left: {
										...current.margin.left,
										sizeUnit: unit,
									},
									right: {
										...current.margin.right,
										sizeUnit: unit,
									},
									top: {
										...current.margin.top,
										sizeUnit: unit,
									},
								}
							: undefined,
					}))
				}
				onValuesChange={({ top, right, bottom, left }) => {
					updateNestedProperty("sizeAndSpacing", (current) => ({
						...current,
						margin: current?.margin
							? {
									...current.margin,
									...(top !== undefined && {
										top: {
											...current.margin.top,
											min: top,
										},
									}),
									...(right !== undefined && {
										right: {
											...current.margin.right,
											min: right,
										},
									}),
									...(bottom !== undefined && {
										bottom: {
											...current.margin.bottom,
											min: bottom,
										},
									}),
									...(left !== undefined && {
										left: {
											...current.margin.left,
											min: left,
										},
									}),
								}
							: undefined,
					}));
				}}
				unit={sizeSpacing.margin?.top.sizeUnit || "px"}
				values={{
					bottom: sizeSpacing.margin?.bottom.min || 0,
					left: sizeSpacing.margin?.left.min || 0,
					right: sizeSpacing.margin?.right.min || 0,
					top: sizeSpacing.margin?.top.min || 0,
				}}
			/>
		</div>
	);
}
