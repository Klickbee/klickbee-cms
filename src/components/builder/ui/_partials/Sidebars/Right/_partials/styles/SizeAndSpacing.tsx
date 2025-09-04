"use client";

import {
	ArrowDownToLine,
	ArrowLeftToLine,
	ArrowRightToLine,
	ArrowUpToLine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useStyleState } from "@/builder/hooks/useStyleState";
import { SizeSpacingStyle } from "@/builder/types/components/properties/componentStylePropsType";
import QuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/QuadInput";
import SimpleUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { Button } from "@/components/ui/button";

export default function BuilderStyleSizeAndSpacing() {
	const t = useTranslations("Builder.RightSidebar.SizeAndSpacing");

	const [showMinMax, setShowMinMax] = useState<boolean>(false);
	const {
		state: sizeSpacing,
		updateProperty,
		updateNestedProperty,
	} = useStyleState<SizeSpacingStyle>({
		height: { number: 0, unit: "px" },
		margin: {
			bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			key: "default-margin",
			left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
		},
		maxHeight: { number: 0, unit: "px" },
		maxWidth: { number: 0, unit: "px" },
		minHeight: { number: 0, unit: "px" },
		minWidth: { number: 0, unit: "px" },
		padding: {
			bottom: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			key: "default-padding",
			left: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			right: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			top: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
		},
		width: { number: 0, unit: "px" },
	});

	return (
		<div className="flex flex-col gap-3">
			{/* Width */}
			<PropertyRow label={t("width")}>
				<SimpleUnitInput
					onUnitChange={(unit) =>
						updateProperty("width", {
							number: sizeSpacing.width?.number || 0,
							unit,
						})
					}
					onValueChange={(number) =>
						updateProperty("width", {
							number,
							unit: sizeSpacing.width?.unit || "px",
						})
					}
					unit={sizeSpacing.width?.unit || "px"}
					value={sizeSpacing.width?.number || 0}
				/>
			</PropertyRow>

			{/* Height */}
			<PropertyRow label={t("height")}>
				<SimpleUnitInput
					onUnitChange={(unit) =>
						updateProperty("height", {
							number: sizeSpacing.height?.number || 0,
							unit,
						})
					}
					onValueChange={(number) =>
						updateProperty("height", {
							number,
							unit: sizeSpacing.height?.unit || "px",
						})
					}
					unit={sizeSpacing.height?.unit || "px"}
					value={sizeSpacing.height?.number || 0}
				/>
			</PropertyRow>

			{/* Min/Max sections (conditional) */}
			{showMinMax && (
				<>
					<PropertyRow label={t("minWidth")}>
						<SimpleUnitInput
							onUnitChange={(unit) =>
								updateProperty("minWidth", {
									number: sizeSpacing.minWidth?.number || 0,
									unit,
								})
							}
							onValueChange={(number) =>
								updateProperty("minWidth", {
									number,
									unit: sizeSpacing.minWidth?.unit || "px",
								})
							}
							unit={sizeSpacing.minWidth?.unit || "px"}
							value={sizeSpacing.minWidth?.number || 0}
						/>
					</PropertyRow>

					<PropertyRow label={t("maxWidth")}>
						<SimpleUnitInput
							onUnitChange={(unit) =>
								updateProperty("maxWidth", {
									number: sizeSpacing.maxWidth?.number || 0,
									unit,
								})
							}
							onValueChange={(number) =>
								updateProperty("maxWidth", {
									number,
									unit: sizeSpacing.maxWidth?.unit || "px",
								})
							}
							unit={sizeSpacing.maxWidth?.unit || "px"}
							value={sizeSpacing.maxWidth?.number || 0}
						/>
					</PropertyRow>

					<PropertyRow label={t("minHeight")}>
						<SimpleUnitInput
							onUnitChange={(unit) =>
								updateProperty("minHeight", {
									number: sizeSpacing.minHeight?.number || 0,
									unit,
								})
							}
							onValueChange={(number) =>
								updateProperty("minHeight", {
									number,
									unit: sizeSpacing.minHeight?.unit || "px",
								})
							}
							unit={sizeSpacing.minHeight?.unit || "px"}
							value={sizeSpacing.minHeight?.number || 0}
						/>
					</PropertyRow>

					<PropertyRow label={t("maxHeight")}>
						<SimpleUnitInput
							onUnitChange={(unit) =>
								updateProperty("maxHeight", {
									number: sizeSpacing.maxHeight?.number || 0,
									unit,
								})
							}
							onValueChange={(number) =>
								updateProperty("maxHeight", {
									number,
									unit: sizeSpacing.maxHeight?.unit || "px",
								})
							}
							unit={sizeSpacing.maxHeight?.unit || "px"}
							value={sizeSpacing.maxHeight?.number || 0}
						/>
					</PropertyRow>
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
			<PropertyColumn
				action={
					<UnitSelector
						onUnitChange={(unit) =>
							updateNestedProperty("padding", (current) =>
								current
									? {
											...current,
											bottom: {
												...current.bottom,
												sizeUnit: unit,
											},
											left: {
												...current.left,
												sizeUnit: unit,
											},
											right: {
												...current.right,
												sizeUnit: unit,
											},
											top: {
												...current.top,
												sizeUnit: unit,
											},
										}
									: undefined,
							)
						}
						unit={sizeSpacing.padding?.top.sizeUnit || "px"}
					/>
				}
				label={t("padding")}
			>
				<QuadInput
					bottomIcon={ArrowDownToLine}
					bottomValue={sizeSpacing.padding?.bottom.min || 0}
					leftIcon={ArrowLeftToLine}
					leftValue={sizeSpacing.padding?.left.min || 0}
					onBottomChange={(value) =>
						updateNestedProperty("padding", (current) =>
							current
								? {
										...current,
										bottom: {
											...current.bottom,
											min: value,
										},
									}
								: undefined,
						)
					}
					onLeftChange={(value) =>
						updateNestedProperty("padding", (current) =>
							current
								? {
										...current,
										left: { ...current.left, min: value },
									}
								: undefined,
						)
					}
					onRightChange={(value) =>
						updateNestedProperty("padding", (current) =>
							current
								? {
										...current,
										right: { ...current.right, min: value },
									}
								: undefined,
						)
					}
					onTopChange={(value) =>
						updateNestedProperty("padding", (current) =>
							current
								? {
										...current,
										top: { ...current.top, min: value },
									}
								: undefined,
						)
					}
					rightIcon={ArrowRightToLine}
					rightValue={sizeSpacing.padding?.right.min || 0}
					topIcon={ArrowUpToLine}
					topValue={sizeSpacing.padding?.top.min || 0}
				/>
			</PropertyColumn>

			{/* Margin */}
			<PropertyColumn
				action={
					<UnitSelector
						onUnitChange={(unit) =>
							updateNestedProperty("margin", (current) =>
								current
									? {
											...current,
											bottom: {
												...current.bottom,
												sizeUnit: unit,
											},
											left: {
												...current.left,
												sizeUnit: unit,
											},
											right: {
												...current.right,
												sizeUnit: unit,
											},
											top: {
												...current.top,
												sizeUnit: unit,
											},
										}
									: undefined,
							)
						}
						unit={sizeSpacing.margin?.top.sizeUnit || "px"}
					/>
				}
				label={t("margin")}
			>
				<QuadInput
					bottomIcon={ArrowDownToLine}
					bottomValue={sizeSpacing.margin?.bottom.min || 0}
					leftIcon={ArrowLeftToLine}
					leftValue={sizeSpacing.margin?.left.min || 0}
					onBottomChange={(value) =>
						updateNestedProperty("margin", (current) =>
							current
								? {
										...current,
										bottom: {
											...current.bottom,
											min: value,
										},
									}
								: undefined,
						)
					}
					onLeftChange={(value) =>
						updateNestedProperty("margin", (current) =>
							current
								? {
										...current,
										left: { ...current.left, min: value },
									}
								: undefined,
						)
					}
					onRightChange={(value) =>
						updateNestedProperty("margin", (current) =>
							current
								? {
										...current,
										right: { ...current.right, min: value },
									}
								: undefined,
						)
					}
					onTopChange={(value) =>
						updateNestedProperty("margin", (current) =>
							current
								? {
										...current,
										top: { ...current.top, min: value },
									}
								: undefined,
						)
					}
					rightIcon={ArrowRightToLine}
					rightValue={sizeSpacing.margin?.right.min || 0}
					topIcon={ArrowUpToLine}
					topValue={sizeSpacing.margin?.top.min || 0}
				/>
			</PropertyColumn>
		</div>
	);
}
