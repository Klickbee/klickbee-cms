"use client";

import {
	AlignStartVertical,
	AlignVerticalDistributeCenter,
	AlignVerticalJustifyCenter,
	AlignVerticalJustifyEnd,
	AlignVerticalSpaceAround,
	AlignVerticalSpaceBetween,
	MoveHorizontal,
	MoveVertical,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	type AlignItems,
	type DisplayType,
	type FlexDirection,
	type FlexWrap,
	type JustifyContent,
} from "@/builder/types/components/properties/componentStylePropsType";
import { type SizeUnit } from "@/builder/types/settings/FluidSize";
import BinaryToggle from "@/components/builder/ui/BinaryToggle";
import DualInput from "@/components/builder/ui/DualInput";
import IconToggleGroup from "@/components/builder/ui/IconToggleGroup";
import NumberInput from "@/components/builder/ui/NumberInput";
import PropertyColumn from "@/components/builder/ui/PropertyColumn";
import PropertyRow from "@/components/builder/ui/PropertyRow";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BuilderStyleLayout() {
	const t = useTranslations("Builder.RightSidebar.Layout");

	// Display state
	const [displayType, setDisplayType] = useState<DisplayType>("flex");

	// Flex states
	const [flexDirection, setFlexDirection] = useState<FlexDirection>("row");
	const [justifyContent, setJustifyContent] =
		useState<JustifyContent>("start");
	const [alignItems, setAlignItems] = useState<AlignItems>("stretch");
	const [flexWrap, setFlexWrap] = useState<FlexWrap>("nowrap");

	// Gap states (shared between flex and grid)
	const [gapX, setGapX] = useState<number>(0);
	const [gapY, setGapY] = useState<number>(0);
	const [gapUnit, setGapUnit] = useState<SizeUnit>("px");

	// Grid states
	const [gridColumns, setGridColumns] = useState<number>(1);
	const [gridRows, setGridRows] = useState<number>(1);

	// Determine if layout controls should be shown
	const isFlexLayout =
		displayType === "flex" || displayType === "inline-flex";
	const isGridLayout =
		displayType === "grid" || displayType === "inline-grid";
	const hasLayoutControls = isFlexLayout || isGridLayout;

	// Direction options for flex
	const directionOptions = [
		{ icon: MoveVertical, value: "column" as const },
		{ icon: MoveHorizontal, value: "row" as const },
	];

	// Justify Content options
	const justifyContentOptions = [
		{ icon: AlignStartVertical, value: "start" as const },
		{ icon: AlignVerticalJustifyCenter, value: "center" as const },
		{ icon: AlignVerticalJustifyEnd, value: "end" as const },
		{ icon: AlignVerticalSpaceBetween, value: "space-between" as const },
		{ icon: AlignVerticalSpaceAround, value: "space-around" as const },
		{
			icon: AlignVerticalDistributeCenter,
			value: "space-evenly" as const,
		},
	];

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* Display Type */}
			<PropertyRow label={t("DisplayType")}>
				<Select
					onValueChange={(value) =>
						setDisplayType(value as DisplayType)
					}
					value={displayType}
				>
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="block">Block</SelectItem>
						<SelectItem value="inline">Inline</SelectItem>
						<SelectItem value="flex">Flex</SelectItem>
						<SelectItem value="inline-flex">Inline Flex</SelectItem>
						<SelectItem value="grid">Grid</SelectItem>
						<SelectItem value="inline-grid">Inline Grid</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Flex Layout Controls */}
			{isFlexLayout && (
				<>
					{/* Direction */}
					<PropertyRow label={t("Direction")}>
						<IconToggleGroup
							onValueChange={setFlexDirection}
							options={directionOptions}
							value={flexDirection}
						/>
					</PropertyRow>

					{/* Justify Content */}
					<PropertyColumn label={t("JustifyContent")}>
						<IconToggleGroup
							onValueChange={setJustifyContent}
							options={justifyContentOptions}
							value={justifyContent}
						/>
					</PropertyColumn>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) =>
									setGapUnit(value as SizeUnit)
								}
								value={gapUnit}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									({gapUnit})
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="px">px</SelectItem>
									<SelectItem value="rem">rem</SelectItem>
									<SelectItem value="em">em</SelectItem>
								</SelectContent>
							</Select>
						}
						label={t("Gap")}
					>
						<DualInput
							onValueXChange={setGapX}
							onValueYChange={setGapY}
							placeholderX="0"
							placeholderY="0"
							valueX={gapX}
							valueY={gapY}
						/>
					</PropertyColumn>

					{/* Align Items */}
					<PropertyRow label={t("AlignItems")}>
						<Select
							onValueChange={(value) =>
								setAlignItems(value as AlignItems)
							}
							value={alignItems}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="start">Start</SelectItem>
								<SelectItem value="center">Center</SelectItem>
								<SelectItem value="end">End</SelectItem>
								<SelectItem value="stretch">Stretch</SelectItem>
							</SelectContent>
						</Select>
					</PropertyRow>

					{/* Wrap */}
					<PropertyRow label={t("FlexWrap")}>
						<BinaryToggle
							falseLabel={t("No")}
							onValueChange={(wrap) =>
								setFlexWrap(wrap ? "wrap" : "nowrap")
							}
							trueLabel={t("Yes")}
							value={flexWrap === "wrap"}
						/>
					</PropertyRow>
				</>
			)}

			{/* Grid Layout Controls */}
			{isGridLayout && (
				<>
					{/* Columns (fr) */}
					<PropertyRow label="Columns (fr)">
						<NumberInput
							onValueChange={setGridColumns}
							placeholder="1"
							value={gridColumns}
						/>
					</PropertyRow>

					{/* Rows (fr) */}
					<PropertyRow label="Rows (fr)">
						<NumberInput
							onValueChange={setGridRows}
							placeholder="1"
							value={gridRows}
						/>
					</PropertyRow>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) =>
									setGapUnit(value as SizeUnit)
								}
								value={gapUnit}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									({gapUnit})
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="px">px</SelectItem>
									<SelectItem value="rem">rem</SelectItem>
									<SelectItem value="em">em</SelectItem>
								</SelectContent>
							</Select>
						}
						label={t("Gap")}
					>
						<DualInput
							onValueXChange={setGapY}
							onValueYChange={setGapX}
							placeholderX="0"
							placeholderY="0"
							valueX={gapY}
							valueY={gapX}
						/>
					</PropertyColumn>
				</>
			)}

			{/* No controls message */}
			{!hasLayoutControls && (
				<p className="text-sm text-zinc-500">
					Select Flex or Grid to see layout controls.
				</p>
			)}
		</div>
	);
}
