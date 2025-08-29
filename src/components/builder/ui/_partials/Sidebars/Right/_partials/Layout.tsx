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
import { useStyleState } from "@/builder/hooks/useStyleState";
import {
	type AlignItems,
	type DisplayType,
	type FlexDirection,
	type GridAuto,
	type JustifyContent,
	type LayoutStyle,
} from "@/builder/types/components/properties/componentStylePropsType";
import { type SizeUnit } from "@/builder/types/settings/FluidSize";
import BinaryToggle from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/BinaryToggle";
import DualInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/DualInput";
import IconToggleGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/IconToggleGroup";
import NumberInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/NumberInput";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BuilderStyleLayout() {
	const t = useTranslations("Builder.RightSidebar.Layout");

	const {
		state: layout,
		updateProperty,
		updateNestedProperty,
	} = useStyleState<LayoutStyle>({
		display: "flex",
		flex: {
			alignItems: "stretch",
			direction: "row",
			gap: {
				column: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
				key: "layout-gap",
				row: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			},
			justifyContent: "start",
			wrap: "nowrap",
		},
		grid: {
			columns: 1,
			gap: {
				column: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
				key: "layout-gap",
				row: { max: 0, maxWidth: 1440, min: 0, sizeUnit: "px" },
			},
			rows: 1,
		},
	});

	// Determine if layout controls should be shown
	const isFlexLayout =
		layout.display === "flex" || layout.display === "inline-flex";
	const isGridLayout =
		layout.display === "grid" || layout.display === "inline-grid";
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
						updateProperty("display", value as DisplayType)
					}
					value={layout.display || "flex"}
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
							onValueChange={(value) =>
								updateNestedProperty("flex", (current) => ({
									...current,
									direction: value as FlexDirection,
								}))
							}
							options={directionOptions}
							value={layout.flex?.direction || "row"}
						/>
					</PropertyRow>

					{/* Justify Content */}
					<PropertyColumn label={t("JustifyContent")}>
						<IconToggleGroup
							onValueChange={(value) =>
								updateNestedProperty("flex", (current) => ({
									...current,
									justifyContent: value as JustifyContent,
								}))
							}
							options={justifyContentOptions}
							value={layout.flex?.justifyContent || "start"}
						/>
					</PropertyColumn>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) => {
									const currentGap = layout.flex?.gap || {
										column: {
											max: 0,
											maxWidth: 1440,
											min: 0,
											sizeUnit: "px",
										},
										key: "layout-gap",
										row: {
											max: 0,
											maxWidth: 1440,
											min: 0,
											sizeUnit: "px",
										},
									};
									updateNestedProperty("flex", (current) => ({
										...current,
										gap: {
											...currentGap,
											column: {
												...currentGap.column,
												sizeUnit: value as SizeUnit,
											},
											row: {
												...currentGap.row,
												sizeUnit: value as SizeUnit,
											},
										},
									}));
								}}
								value={
									layout.flex?.gap?.column.sizeUnit || "px"
								}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									({layout.flex?.gap?.column.sizeUnit || "px"}
									)
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
							onValueXChange={(value) => {
								const currentGap = layout.flex?.gap || {
									column: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
									key: "layout-gap",
									row: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
								};
								updateNestedProperty("flex", (current) => ({
									...current,
									gap: {
										...currentGap,
										column: {
											...currentGap.column,
											max: value,
											min: value,
										},
									},
								}));
							}}
							onValueYChange={(value) => {
								const currentGap = layout.flex?.gap || {
									column: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
									key: "layout-gap",
									row: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
								};
								updateNestedProperty("flex", (current) => ({
									...current,
									gap: {
										...currentGap,
										row: {
											...currentGap.row,
											max: value,
											min: value,
										},
									},
								}));
							}}
							placeholderX="0"
							placeholderY="0"
							valueX={layout.flex?.gap?.column.min || 0}
							valueY={layout.flex?.gap?.row.min || 0}
						/>
					</PropertyColumn>

					{/* Align Items */}
					<PropertyRow label={t("AlignItems")}>
						<Select
							onValueChange={(value) =>
								updateNestedProperty("flex", (current) => ({
									...current,
									alignItems: value as AlignItems,
								}))
							}
							value={layout.flex?.alignItems || "stretch"}
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
								updateNestedProperty("flex", (current) => ({
									...current,
									wrap: wrap ? "wrap" : "nowrap",
								}))
							}
							trueLabel={t("Yes")}
							value={layout.flex?.wrap === "wrap"}
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
							onValueChange={(value) =>
								updateNestedProperty("grid", (current) => ({
									...current,
									columns: value as GridAuto,
								}))
							}
							placeholder="1"
							value={(layout.grid?.columns as number) || 1}
						/>
					</PropertyRow>

					{/* Rows (fr) */}
					<PropertyRow label="Rows (fr)">
						<NumberInput
							onValueChange={(value) =>
								updateNestedProperty("grid", (current) => ({
									...current,
									rows: value as GridAuto,
								}))
							}
							placeholder="1"
							value={(layout.grid?.rows as number) || 1}
						/>
					</PropertyRow>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) => {
									const currentGap = layout.grid?.gap || {
										column: {
											max: 0,
											maxWidth: 1440,
											min: 0,
											sizeUnit: "px",
										},
										key: "layout-gap",
										row: {
											max: 0,
											maxWidth: 1440,
											min: 0,
											sizeUnit: "px",
										},
									};
									updateNestedProperty("grid", (current) => ({
										...current,
										gap: {
											...currentGap,
											column: {
												...currentGap.column,
												sizeUnit: value as SizeUnit,
											},
											row: {
												...currentGap.row,
												sizeUnit: value as SizeUnit,
											},
										},
									}));
								}}
								value={
									layout.grid?.gap?.column.sizeUnit || "px"
								}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									({layout.grid?.gap?.column.sizeUnit || "px"}
									)
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
							onValueXChange={(value) => {
								const currentGap = layout.grid?.gap || {
									column: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
									key: "layout-gap",
									row: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
								};
								updateNestedProperty("grid", (current) => ({
									...current,
									gap: {
										...currentGap,
										column: {
											...currentGap.column,
											max: value,
											min: value,
										},
									},
								}));
							}}
							onValueYChange={(value) => {
								const currentGap = layout.grid?.gap || {
									column: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
									key: "layout-gap",
									row: {
										max: 0,
										maxWidth: 1440,
										min: 0,
										sizeUnit: "px",
									},
								};
								updateNestedProperty("grid", (current) => ({
									...current,
									gap: {
										...currentGap,
										row: {
											...currentGap.row,
											max: value,
											min: value,
										},
									},
								}));
							}}
							placeholderX="0"
							placeholderY="0"
							valueX={layout.grid?.gap?.column.min || 0}
							valueY={layout.grid?.gap?.row.min || 0}
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
