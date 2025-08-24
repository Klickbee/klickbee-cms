"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
import QuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/QuadInput";
import SimpleUnitInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/SimpleUnitInput";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import { Button } from "@/components/ui/button";

export default function BuilderStyleSizeAndSpacing() {
	const t = useTranslations("Builder.RightSidebar.SizeAndSpacing");

	// Size states
	const [width, setWidth] = useState<number>(0);
	const [widthUnit, setWidthUnit] = useState<SizeUnit>("px");
	const [height, setHeight] = useState<number>(0);
	const [heightUnit, setHeightUnit] = useState<SizeUnit>("px");

	// Min/Max states
	const [showMinMax, setShowMinMax] = useState<boolean>(false);
	const [minWidth, setMinWidth] = useState<number>(0);
	const [minWidthUnit, setMinWidthUnit] = useState<SizeUnit>("px");
	const [maxWidth, setMaxWidth] = useState<number>(0);
	const [maxWidthUnit, setMaxWidthUnit] = useState<SizeUnit>("px");
	const [minHeight, setMinHeight] = useState<number>(0);
	const [minHeightUnit, setMinHeightUnit] = useState<SizeUnit>("px");
	const [maxHeight, setMaxHeight] = useState<number>(0);
	const [maxHeightUnit, setMaxHeightUnit] = useState<SizeUnit>("px");

	// Padding states
	const [paddingTop, setPaddingTop] = useState<number>(0);
	const [paddingRight, setPaddingRight] = useState<number>(0);
	const [paddingBottom, setPaddingBottom] = useState<number>(0);
	const [paddingLeft, setPaddingLeft] = useState<number>(0);
	const [paddingUnit, setPaddingUnit] = useState<SizeUnit>("px");

	// Margin states
	const [marginTop, setMarginTop] = useState<number>(0);
	const [marginRight, setMarginRight] = useState<number>(0);
	const [marginBottom, setMarginBottom] = useState<number>(0);
	const [marginLeft, setMarginLeft] = useState<number>(0);
	const [marginUnit, setMarginUnit] = useState<SizeUnit>("px");

	return (
		<div className="flex flex-col gap-3">
			{/* Width */}
			<PropertyRow label={t("width")}>
				<SimpleUnitInput
					onUnitChange={setWidthUnit}
					onValueChange={setWidth}
					unit={widthUnit}
					value={width}
				/>
			</PropertyRow>

			{/* Height */}
			<PropertyRow label={t("height")}>
				<SimpleUnitInput
					onUnitChange={setHeightUnit}
					onValueChange={setHeight}
					unit={heightUnit}
					value={height}
				/>
			</PropertyRow>

			{/* Min/Max sections (conditional) */}
			{showMinMax && (
				<>
					<PropertyRow label={t("minWidth")}>
						<SimpleUnitInput
							onUnitChange={setMinWidthUnit}
							onValueChange={setMinWidth}
							unit={minWidthUnit}
							value={minWidth}
						/>
					</PropertyRow>

					<PropertyRow label={t("maxWidth")}>
						<SimpleUnitInput
							onUnitChange={setMaxWidthUnit}
							onValueChange={setMaxWidth}
							unit={maxWidthUnit}
							value={maxWidth}
						/>
					</PropertyRow>

					<PropertyRow label={t("minHeight")}>
						<SimpleUnitInput
							onUnitChange={setMinHeightUnit}
							onValueChange={setMinHeight}
							unit={minHeightUnit}
							value={minHeight}
						/>
					</PropertyRow>

					<PropertyRow label={t("maxHeight")}>
						<SimpleUnitInput
							onUnitChange={setMaxHeightUnit}
							onValueChange={setMaxHeight}
							unit={maxHeightUnit}
							value={maxHeight}
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
						onUnitChange={setPaddingUnit}
						unit={paddingUnit}
					/>
				}
				label={t("padding")}
			>
				<QuadInput
					bottomValue={paddingBottom}
					leftValue={paddingLeft}
					onBottomChange={setPaddingBottom}
					onLeftChange={setPaddingLeft}
					onRightChange={setPaddingRight}
					onTopChange={setPaddingTop}
					rightValue={paddingRight}
					topValue={paddingTop}
				/>
			</PropertyColumn>

			{/* Margin */}
			<PropertyColumn
				action={
					<UnitSelector
						onUnitChange={setMarginUnit}
						unit={marginUnit}
					/>
				}
				label={t("margin")}
			>
				<QuadInput
					bottomValue={marginBottom}
					leftValue={marginLeft}
					onBottomChange={setMarginBottom}
					onLeftChange={setMarginLeft}
					onRightChange={setMarginRight}
					onTopChange={setMarginTop}
					rightValue={marginRight}
					topValue={marginTop}
				/>
			</PropertyColumn>
		</div>
	);
}
