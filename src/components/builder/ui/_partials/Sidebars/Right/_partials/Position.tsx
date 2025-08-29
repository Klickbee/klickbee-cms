"use client";

import {
	ArrowDownToLine,
	ArrowLeftToLine,
	ArrowRightToLine,
	ArrowUpToLine,
	MoveHorizontal,
	MoveVertical,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useStyleState } from "@/builder/hooks/useStyleState";
import {
	DirectionType,
	ObjectFitType,
	OverflowType,
	PositionStyle,
	PositionType,
} from "@/builder/types/components/properties/componentStylePropsType";
import IconToggleGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/IconToggleGroup";
import NumberInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/NumberInput";
import QuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/QuadInput";
import UnitSelector from "@/components/builder/ui/_partials/Sidebars/Right/_partials/inputs/UnitSelector";
import PropertyColumn from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyColumn";
import PropertyRow from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyRow";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function BuilderStylePosition() {
	const t = useTranslations("Builder.RightSidebar.Position");

	const { state: positionStyle, updateProperty } =
		useStyleState<PositionStyle>({
			bottom: { number: 0, unit: "px" },
			left: { number: 0, unit: "px" },
			objectFit: "cover",
			overflow: "auto",
			position: "relative",
			right: { number: 0, unit: "px" },
			top: { number: 0, unit: "px" },
			zIndex: 1,
		});

	// Direction state (separate since it's not part of PositionStyle)
	const [direction, setDirection] = useState<DirectionType>("vertical");

	// Direction options
	const directionOptions = [
		{ icon: MoveVertical, value: "vertical" as const },
		{ icon: MoveHorizontal, value: "horizontal" as const },
	];

	return (
		<div className="flex flex-col gap-3">
			{/* Position */}
			<PropertyRow label={t("position")}>
				<Select
					onValueChange={(value: PositionType) =>
						updateProperty("position", value)
					}
					value={positionStyle.position || "relative"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="static">
							{t("positionStatic")}
						</SelectItem>
						<SelectItem value="relative">
							{t("positionRelative")}
						</SelectItem>
						<SelectItem value="absolute">
							{t("positionAbsolute")}
						</SelectItem>
						<SelectItem value="fixed">
							{t("positionFixed")}
						</SelectItem>
						<SelectItem value="sticky">
							{t("positionSticky")}
						</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Spacing */}
			<PropertyColumn
				action={
					<UnitSelector
						onUnitChange={(unit) => {
							updateProperty("bottom", {
								number: positionStyle.bottom?.number || 0,
								unit,
							});
							updateProperty("left", {
								number: positionStyle.left?.number || 0,
								unit,
							});
							updateProperty("right", {
								number: positionStyle.right?.number || 0,
								unit,
							});
							updateProperty("top", {
								number: positionStyle.top?.number || 0,
								unit,
							});
						}}
						unit={positionStyle.top?.unit || "px"}
					/>
				}
				label={t("spacing")}
			>
				<QuadInput
					bottomIcon={ArrowDownToLine}
					bottomValue={positionStyle.bottom?.number || 0}
					leftIcon={ArrowLeftToLine}
					leftValue={positionStyle.left?.number || 0}
					onBottomChange={(value) =>
						updateProperty("bottom", {
							number: value,
							unit: positionStyle.bottom?.unit || "px",
						})
					}
					onLeftChange={(value) =>
						updateProperty("left", {
							number: value,
							unit: positionStyle.left?.unit || "px",
						})
					}
					onRightChange={(value) =>
						updateProperty("right", {
							number: value,
							unit: positionStyle.right?.unit || "px",
						})
					}
					onTopChange={(value) =>
						updateProperty("top", {
							number: value,
							unit: positionStyle.top?.unit || "px",
						})
					}
					rightIcon={ArrowRightToLine}
					rightValue={positionStyle.right?.number || 0}
					topIcon={ArrowUpToLine}
					topValue={positionStyle.top?.number || 0}
				/>
			</PropertyColumn>

			{/* Z-index */}
			<PropertyRow label={t("zIndex")}>
				<NumberInput
					onValueChange={(value) => updateProperty("zIndex", value)}
					value={positionStyle.zIndex || 1}
				/>
			</PropertyRow>

			{/* Direction */}
			<PropertyRow label={t("direction")}>
				<IconToggleGroup
					onValueChange={setDirection}
					options={directionOptions}
					value={direction}
				/>
			</PropertyRow>

			{/* Overflow */}
			<PropertyRow label={t("overflow")}>
				<Select
					onValueChange={(value: OverflowType) =>
						updateProperty("overflow", value)
					}
					value={positionStyle.overflow || "auto"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="visible">
							{t("overflowVisible")}
						</SelectItem>
						<SelectItem value="hidden">
							{t("overflowHidden")}
						</SelectItem>
						<SelectItem value="scroll">
							{t("overflowScroll")}
						</SelectItem>
						<SelectItem value="auto">
							{t("overflowAuto")}
						</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			{/* Object Fit */}
			<PropertyRow label={t("objectFit")}>
				<Select
					onValueChange={(value: ObjectFitType) =>
						updateProperty("objectFit", value)
					}
					value={positionStyle.objectFit || "cover"}
				>
					<SelectTrigger className="h-8 w-full text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="fill">
							{t("objectFitFill")}
						</SelectItem>
						<SelectItem value="contain">
							{t("objectFitContain")}
						</SelectItem>
						<SelectItem value="cover">
							{t("objectFitCover")}
						</SelectItem>
						<SelectItem value="none">
							{t("objectFitNone")}
						</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>
		</div>
	);
}
