"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	type AlignContent,
	type AlignItems,
	alignContentSchema,
	alignItemsSchema,
	type DisplayType,
	displayTypeSchema,
	type FlexDirection,
	FlexWrap,
	flexDirectionSchema,
	flexWrapSchema,
	type GridAuto,
	type GridAutoFlow,
	gridAutoFlowSchema,
	type JustifyContent,
	type JustifyItems,
	justifyContentSchema,
	justifyItemsSchema,
} from "@/builder/types/components/properties/componentStylePropsSchema";
import { type SizeUnit } from "@/builder/types/settings/FluidSize";
import DynamicEnumSelect from "./DynamicEnumSelect";
import GapInput from "./GapInput";
import GridAutoInput from "./GridAutoInput";
import NumberInput from "./NumberInput";

export default function BuilderStyleLayout() {
	const t = useTranslations("Builder.RightSidebar.Layout");
	const selectedElement = true; // Replace with actual state or prop to get the selected element

	const [displayType, setDisplayType] = useState<DisplayType>("block");

	// Flex states
	const [flexDirection, setFlexDirection] = useState<FlexDirection>("row");
	const [justifyContent, setJustifyContent] =
		useState<JustifyContent>("start");
	const [alignItems, setAlignItems] = useState<AlignItems>("stretch");
	const [alignContent, setAlignContent] = useState<AlignContent>("stretch");
	const [flexWrap, setFlexWrap] = useState<FlexWrap>("nowrap");
	const [flexGrow, setFlexGrow] = useState<number>(0);
	const [flexShrink, setFlexShrink] = useState<number>(1);

	// Grid states
	const [gridColumns, setGridColumns] = useState<GridAuto>(1);
	const [gridRows, setGridRows] = useState<GridAuto>(1);
	const [gridAutoColumns, setGridAutoColumns] = useState<GridAuto>(1);
	const [gridAutoRows, setGridAutoRows] = useState<GridAuto>(1);
	const [gridAutoFlow, setGridAutoFlow] = useState<GridAutoFlow>("row");
	const [justifyItems, setJustifyItems] = useState<JustifyItems>("stretch");

	// Gap states (shared)
	const [gapX, setGapX] = useState<number>(0);
	const [gapY, setGapY] = useState<number>(0);
	const [gapUnit, setGapUnit] = useState<SizeUnit>("px");

	return (
		<div className="flex flex-col gap-4 p-4">
			{selectedElement ? (
				<>
					<DynamicEnumSelect
						enumSchema={displayTypeSchema}
						label={t("DisplayType")}
						onValueChange={setDisplayType}
						placeholder="Block"
						value={displayType}
					/>
					{(displayType === "flex" ||
						displayType === "inline-flex") && (
						<>
							<DynamicEnumSelect
								enumSchema={flexDirectionSchema}
								label={t("Direction")}
								onValueChange={setFlexDirection}
								placeholder="Row"
								value={flexDirection}
							/>
							<DynamicEnumSelect
								enumSchema={flexWrapSchema}
								label={t("FlexWrap")}
								onValueChange={setFlexWrap}
								placeholder="No Wrap"
								value={flexWrap}
							/>
							<DynamicEnumSelect
								enumSchema={justifyContentSchema}
								label={t("JustifyContent")}
								onValueChange={setJustifyContent}
								placeholder="Start"
								value={justifyContent}
							/>
							<DynamicEnumSelect
								enumSchema={alignItemsSchema}
								label={t("AlignItems")}
								onValueChange={setAlignItems}
								placeholder="Stretch"
								value={alignItems}
							/>
							<DynamicEnumSelect
								enumSchema={alignContentSchema}
								label={t("AlignContent")}
								onValueChange={setAlignContent}
								placeholder="Stretch"
								value={alignContent}
							/>
							<NumberInput
								label={t("FlexGrow")}
								min={0}
								onValueChange={setFlexGrow}
								placeholder="0"
								value={flexGrow}
							/>
							<NumberInput
								label={t("FlexShrink")}
								min={0}
								onValueChange={setFlexShrink}
								placeholder="1"
								value={flexShrink}
							/>
						</>
					)}
					{(displayType === "grid" ||
						displayType === "inline-grid") && (
						<>
							<GridAutoInput
								label={t("GridColumns")}
								onValueChange={setGridColumns}
								value={gridColumns}
							/>
							<GridAutoInput
								label={t("GridRows")}
								onValueChange={setGridRows}
								value={gridRows}
							/>
							<DynamicEnumSelect
								enumSchema={gridAutoFlowSchema}
								label={t("GridAutoFlow")}
								onValueChange={setGridAutoFlow}
								placeholder="Row"
								value={gridAutoFlow}
							/>
							<GridAutoInput
								label={t("GridAutoColumns")}
								onValueChange={setGridAutoColumns}
								value={gridAutoColumns}
							/>
							<GridAutoInput
								label={t("GridAutoRows")}
								onValueChange={setGridAutoRows}
								value={gridAutoRows}
							/>
							<DynamicEnumSelect
								enumSchema={justifyContentSchema}
								label={t("JustifyContent")}
								onValueChange={setJustifyContent}
								placeholder="Start"
								value={justifyContent}
							/>
							<DynamicEnumSelect
								enumSchema={justifyItemsSchema}
								label={t("JustifyItems")}
								onValueChange={setJustifyItems}
								placeholder="Stretch"
								value={justifyItems}
							/>
							<DynamicEnumSelect
								enumSchema={alignItemsSchema}
								label={t("AlignItems")}
								onValueChange={setAlignItems}
								placeholder="Stretch"
								value={alignItems}
							/>
							<DynamicEnumSelect
								enumSchema={alignContentSchema}
								label={t("AlignContent")}
								onValueChange={setAlignContent}
								placeholder="Stretch"
								value={alignContent}
							/>
						</>
					)}
					{(displayType === "flex" ||
						displayType === "inline-flex" ||
						displayType === "grid" ||
						displayType === "inline-grid") && (
						<GapInput
							label={t("Gap")}
							onUnitChange={setGapUnit}
							onValueXChange={setGapX}
							onValueYChange={setGapY}
							unit={gapUnit}
							valueX={gapX}
							valueY={gapY}
						/>
					)}
				</>
			) : (
				<p className="text-sm text-gray-500">
					Select an element to see its style properties.
				</p>
			)}
		</div>
	);
}
