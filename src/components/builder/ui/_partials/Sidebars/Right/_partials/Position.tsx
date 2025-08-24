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
import {
	DirectionType,
	ObjectFitType,
	OverflowType,
	PositionType,
} from "@/builder/types/components/properties/componentStylePropsType";
import { SizeUnit } from "@/builder/types/settings/FluidSize";
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

	// Position states
	const [position, setPosition] = useState<PositionType>("relative");

	// Spacing states (reuse spacing logic from SizeAndSpacing)
	const [spacingTop, setSpacingTop] = useState<number>(0);
	const [spacingRight, setSpacingRight] = useState<number>(0);
	const [spacingBottom, setSpacingBottom] = useState<number>(0);
	const [spacingLeft, setSpacingLeft] = useState<number>(0);
	const [spacingUnit, setSpacingUnit] = useState<SizeUnit>("px");

	// Z-index state
	const [zIndex, setZIndex] = useState<number>(1);

	// Direction state
	const [direction, setDirection] = useState<DirectionType>("vertical");

	// Overflow state
	const [overflow, setOverflow] = useState<OverflowType>("auto");

	// Object Fit state
	const [objectFit, setObjectFit] = useState<ObjectFitType>("cover");

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
					onValueChange={(value: PositionType) => setPosition(value)}
					value={position}
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
						onUnitChange={setSpacingUnit}
						unit={spacingUnit}
					/>
				}
				label={t("spacing")}
			>
				<QuadInput
					bottomIcon={ArrowDownToLine}
					bottomValue={spacingBottom}
					leftIcon={ArrowLeftToLine}
					leftValue={spacingLeft}
					onBottomChange={setSpacingBottom}
					onLeftChange={setSpacingLeft}
					onRightChange={setSpacingRight}
					onTopChange={setSpacingTop}
					rightIcon={ArrowRightToLine}
					rightValue={spacingRight}
					topIcon={ArrowUpToLine}
					topValue={spacingTop}
				/>
			</PropertyColumn>

			{/* Z-index */}
			<PropertyRow label={t("zIndex")}>
				<NumberInput onValueChange={setZIndex} value={zIndex} />
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
					onValueChange={(value: OverflowType) => setOverflow(value)}
					value={overflow}
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
						setObjectFit(value)
					}
					value={objectFit}
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
