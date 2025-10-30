"use client";

import {
	AlignHorizontalDistributeCenter,
	AlignHorizontalJustifyCenter,
	AlignHorizontalJustifyEnd,
	AlignHorizontalSpaceAround,
	AlignHorizontalSpaceBetween,
	AlignStartHorizontal,
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
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import DualInput from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/inputs/DualInput";
import UnitSelector from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyNumber from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyNumber";
import PropertySelect from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyToggle from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/layout/PropertyToggle";
import { STYLE_DEFAULTS } from "@/feature/builder/constants/styleDefaults";
import { useStyleProps } from "@/feature/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/feature/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import {
	type AlignItems,
	type DisplayType,
	type FlexDirection,
	type GridAuto,
	type JustifyContent,
} from "@/feature/builder/types/components/properties/componentStylePropsType";
import { type SizeUnit } from "@/feature/builder/types/settings/FluidSize";

export default function BuilderStyleLayout({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Layout");

	const styleProps = useStyleProps(component, {
		layout: STYLE_DEFAULTS.LAYOUT,
	});
	const layoutStyles = styleProps.layout || STYLE_DEFAULTS.LAYOUT;
	const { updateNestedProperty } = useStyleUpdate(component);

	// Determine if layout controls should be shown
	const isFlexLayout =
		layoutStyles.display === "flex" ||
		layoutStyles.display === "inline-flex";
	const isGridLayout =
		layoutStyles.display === "grid" ||
		layoutStyles.display === "inline-grid";
	const hasLayoutControls = isFlexLayout || isGridLayout;

	// Direction options for flex
	const directionOptions = [
		{ icon: MoveVertical, value: "column" as const },
		{ icon: MoveHorizontal, value: "row" as const },
	];

	// Justify Content options (switch icons based on flex direction)
	const isRowDirection = (layoutStyles.flex?.direction || "row") === "row";
	const justifyContentOptions = isRowDirection
		? [
				{ icon: AlignStartVertical, value: "start" as const },
				{
					icon: AlignHorizontalJustifyCenter,
					value: "center" as const,
				},
				{ icon: AlignHorizontalJustifyEnd, value: "end" as const },
				{
					icon: AlignHorizontalSpaceBetween,
					value: "space-between" as const,
				},
				{
					icon: AlignHorizontalSpaceAround,
					value: "space-around" as const,
				},
				{
					icon: AlignHorizontalDistributeCenter,
					value: "space-evenly" as const,
				},
			]
		: [
				{ icon: AlignStartHorizontal, value: "start" as const },
				{ icon: AlignVerticalJustifyCenter, value: "center" as const },
				{ icon: AlignVerticalJustifyEnd, value: "end" as const },
				{
					icon: AlignVerticalSpaceBetween,
					value: "space-between" as const,
				},
				{
					icon: AlignVerticalSpaceAround,
					value: "space-around" as const,
				},
				{
					icon: AlignVerticalDistributeCenter,
					value: "space-evenly" as const,
				},
			];

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* Display Type */}
			<PropertySelect<DisplayType>
				label={t("DisplayType")}
				onChange={(value) =>
					updateNestedProperty("layout", (current) => ({
						...current,
						display: value,
					}))
				}
				options={[
					{ label: "Block", value: "block" },
					{ label: "Inline", value: "inline" },
					{ label: "Flex", value: "flex" },
					{ label: "Inline Flex", value: "inline-flex" },
					{ label: "Grid", value: "grid" },
					{ label: "Inline Grid", value: "inline-grid" },
				]}
				value={layoutStyles.display || "block"}
			/>

			{/* Flex Layout Controls */}
			{isFlexLayout && (
				<>
					{/* Direction */}
					<PropertyToggle<FlexDirection>
						label={t("Direction")}
						onChange={(value) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								flex: {
									...current?.flex,
									direction: value,
								},
							}))
						}
						options={directionOptions}
						value={layoutStyles.flex?.direction || "row"}
						variant="icon"
					/>

					{/* Justify Content */}
					<PropertyToggle<JustifyContent>
						label={t("JustifyContent")}
						layout="column"
						onChange={(value) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								flex: {
									...current?.flex,
									justifyContent: value,
								},
							}))
						}
						options={justifyContentOptions}
						value={layoutStyles.flex?.justifyContent || "start"}
						variant="icon"
					/>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) => {
									const currentGap = layoutStyles.flex
										?.gap || {
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
									updateNestedProperty(
										"layout",
										(current) => ({
											...current,
											flex: {
												...current?.flex,
												gap: {
													...currentGap,
													column: {
														...currentGap.column,
														sizeUnit:
															value as SizeUnit,
													},
													row: {
														...currentGap.row,
														sizeUnit:
															value as SizeUnit,
													},
												},
											},
										}),
									);
								}}
								value={
									layoutStyles.flex?.gap?.column.sizeUnit ||
									"px"
								}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									(
									{layoutStyles.flex?.gap?.column.sizeUnit ||
										"px"}
									)
								</SelectTrigger>
								<SelectContent>
									<UnitSelector
										onUnitChange={() => "test"}
										unit={
											layoutStyles.flex?.gap?.column
												.sizeUnit || "px"
										}
										variant={"no-wrap"}
									/>
								</SelectContent>
							</Select>
						}
						label={t("Gap")}
					>
						<DualInput
							onValueXChange={(value) => {
								const currentGap = layoutStyles.flex?.gap || {
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
								updateNestedProperty("layout", (current) => ({
									...current,
									flex: {
										...current?.flex,
										gap: {
											...currentGap,
											column: {
												...currentGap.column,
												max: value,
												min: value,
											},
										},
									},
								}));
							}}
							onValueYChange={(value) => {
								const currentGap = layoutStyles.flex?.gap || {
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
								updateNestedProperty("layout", (current) => ({
									...current,
									flex: {
										...current?.flex,
										gap: {
											...currentGap,
											row: {
												...currentGap.row,
												max: value,
												min: value,
											},
										},
									},
								}));
							}}
							placeholderX="0"
							placeholderY="0"
							valueX={layoutStyles.flex?.gap?.column.min || 0}
							valueY={layoutStyles.flex?.gap?.row.min || 0}
						/>
					</PropertyColumn>

					{/* Align Items */}
					<PropertySelect<AlignItems>
						label={t("AlignItems")}
						onChange={(value) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								flex: {
									...current?.flex,
									alignItems: value,
								},
							}))
						}
						options={[
							{ label: "Start", value: "start" },
							{ label: "Center", value: "center" },
							{ label: "End", value: "end" },
							{ label: "Stretch", value: "stretch" },
						]}
						value={layoutStyles.flex?.alignItems || "stretch"}
					/>

					{/* Wrap */}
					<PropertyToggle
						falseLabel={t("No")}
						label={t("FlexWrap")}
						onChange={(wrap) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								flex: {
									...current?.flex,
									wrap: wrap ? "wrap" : "nowrap",
								},
							}))
						}
						trueLabel={t("Yes")}
						value={layoutStyles.flex?.wrap !== "nowrap"}
					/>
				</>
			)}

			{/* Grid Layout Controls */}
			{isGridLayout && (
				<>
					{/* Columns */}
					<PropertyNumber
						label={t("columns")}
						min={1}
						onChange={(value) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								grid: {
									...current?.grid,
									columns: value as GridAuto,
								},
							}))
						}
						placeholder="1"
						value={(layoutStyles.grid?.columns as number) || 1}
					/>

					{/* Rows */}
					<PropertyNumber
						label={t("rows")}
						min={1}
						onChange={(value) =>
							updateNestedProperty("layout", (current) => ({
								...current,
								grid: {
									...current?.grid,
									rows: value as GridAuto,
								},
							}))
						}
						placeholder="1"
						value={(layoutStyles.grid?.rows as number) || 1}
					/>

					{/* Gap */}
					<PropertyColumn
						action={
							<Select
								onValueChange={(value) => {
									const currentGap = layoutStyles.grid
										?.gap || {
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
									updateNestedProperty(
										"layout",
										(current) => ({
											...current,
											grid: {
												...current?.grid,
												gap: {
													...currentGap,
													column: {
														...currentGap.column,
														sizeUnit:
															value as SizeUnit,
													},
													row: {
														...currentGap.row,
														sizeUnit:
															value as SizeUnit,
													},
												},
											},
										}),
									);
								}}
								value={
									layoutStyles.grid?.gap?.column.sizeUnit ||
									"px"
								}
							>
								<SelectTrigger className="h-auto p-0 border-0 bg-transparent text-xs text-zinc-500 hover:text-zinc-700">
									(
									{layoutStyles.grid?.gap?.column.sizeUnit ||
										"px"}
									)
								</SelectTrigger>
								<SelectContent>
									<UnitSelector
										onUnitChange={() => "test"}
										unit={
											layoutStyles.flex?.gap?.column
												.sizeUnit || "px"
										}
									/>
								</SelectContent>
							</Select>
						}
						label={t("Gap")}
					>
						<DualInput
							onValueXChange={(value) => {
								const currentGap = layoutStyles.grid?.gap || {
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
								updateNestedProperty("layout", (current) => ({
									...current,
									grid: {
										...current?.grid,
										gap: {
											...currentGap,
											column: {
												...currentGap.column,
												max: value,
												min: value,
											},
										},
									},
								}));
							}}
							onValueYChange={(value) => {
								const currentGap = layoutStyles.grid?.gap || {
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
								updateNestedProperty("layout", (current) => ({
									...current,
									grid: {
										...current?.grid,
										gap: {
											...currentGap,
											row: {
												...currentGap.row,
												max: value,
												min: value,
											},
										},
									},
								}));
							}}
							placeholderX="0"
							placeholderY="0"
							valueX={layoutStyles.grid?.gap?.column.min || 0}
							valueY={layoutStyles.grid?.gap?.row.min || 0}
						/>
					</PropertyColumn>
				</>
			)}

			{/* No controls message */}
			{!hasLayoutControls && (
				<p className="text-sm text-zinc-500">
					{t("noLayoutControlsMessage")}
				</p>
			)}
		</div>
	);
}
