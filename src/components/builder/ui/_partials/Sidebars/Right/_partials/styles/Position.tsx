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
import { STYLE_DEFAULTS } from "@/builder/constants/styleDefaults";
import { useStyleProps } from "@/builder/hooks/useStyleProps";
import { useStyleUpdate } from "@/builder/hooks/useStyleUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import {
	DirectionType,
	ObjectFitType,
	OverflowType,
	PositionType,
} from "@/builder/types/components/properties/componentStylePropsType";
import PropertyNumber from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyNumber";
import PropertyQuadInput from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyQuadInput";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import PropertyToggle from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertyToggle";

export default function BuilderStylePosition({
	component,
}: {
	component: BuilderComponent;
}) {
	const t = useTranslations("Builder.RightSidebar.Position");

	const styleProps = useStyleProps(component, {
		position: STYLE_DEFAULTS.POSITION,
	});
	const positionStyle = styleProps.position || STYLE_DEFAULTS.POSITION;
	const { updateNestedProperty } = useStyleUpdate(component);

	// Direction state (separate since it's not part of PositionStyle)
	const [direction, setDirection] = useState<DirectionType>("vertical");

	// Direction options
	const directionOptions = [
		{ icon: MoveVertical, value: "vertical" as const },
		{ icon: MoveHorizontal, value: "horizontal" as const },
	];

	return (
		<div className="flex flex-col gap-3 pt-3">
			{/* Position Type */}
			<PropertySelect<PositionType>
				label={t("positionType")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("position", (current) => ({
						...current,
						position: value,
					}))
				}
				options={[
					{ label: "Static", value: "static" },
					{ label: "Relative", value: "relative" },
					{ label: "Absolute", value: "absolute" },
					{ label: "Fixed", value: "fixed" },
					{ label: "Sticky", value: "sticky" },
				]}
				value={positionStyle.position || "static"}
			/>

			{/* Position Values (for absolute, relative, fixed, sticky) */}
			{positionStyle?.position !== "static" && (
				<PropertyQuadInput
					icons={{
						bottom: ArrowDownToLine,
						left: ArrowLeftToLine,
						right: ArrowRightToLine,
						top: ArrowUpToLine,
					}}
					label={t("position")}
					onUnitChange={(unit) =>
						updateNestedProperty("position", (current) => ({
							...current,
							bottom: {
								number: current?.bottom?.number || 0,
								unit,
							},
							left: {
								number: current?.left?.number || 0,
								unit,
							},
							right: {
								number: current?.right?.number || 0,
								unit,
							},
							top: {
								number: current?.top?.number || 0,
								unit,
							},
						}))
					}
					onValuesChange={({ top, right, bottom, left }) => {
						updateNestedProperty("position", (current) => ({
							...current,
							...(top !== undefined && {
								top: {
									number: top,
									unit: current?.top?.unit || "px",
								},
							}),
							...(right !== undefined && {
								right: {
									number: right,
									unit: current?.right?.unit || "px",
								},
							}),
							...(bottom !== undefined && {
								bottom: {
									number: bottom,
									unit: current?.bottom?.unit || "px",
								},
							}),
							...(left !== undefined && {
								left: {
									number: left,
									unit: current?.left?.unit || "px",
								},
							}),
						}));
					}}
					unit={positionStyle.top?.unit || "px"}
					values={{
						bottom: positionStyle.bottom?.number || 0,
						left: positionStyle.left?.number || 0,
						right: positionStyle.right?.number || 0,
						top: positionStyle.top?.number || 0,
					}}
				/>
			)}

			{/* Z-Index */}
			<PropertyNumber
				label={t("zIndex")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("position", (current) => ({
						...current,
						zIndex: value,
					}))
				}
				value={positionStyle.zIndex || 1}
			/>

			{/* Direction Toggle */}
			<PropertyToggle<DirectionType>
				label={t("direction")}
				layout="row"
				onChange={(value) => setDirection(value)}
				options={directionOptions}
				value={direction}
				variant="icon"
			/>

			{/* Overflow */}
			<PropertySelect<OverflowType>
				label={t("overflow")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("position", (current) => ({
						...current,
						overflow: value,
					}))
				}
				options={[
					{ label: "Visible", value: "visible" },
					{ label: "Hidden", value: "hidden" },
					{ label: "Scroll", value: "scroll" },
					{ label: "Auto", value: "auto" },
				]}
				value={positionStyle.overflow || "auto"}
			/>

			{/* Object Fit */}
			<PropertySelect<ObjectFitType>
				label={t("objectFit")}
				layout="row"
				onChange={(value) =>
					updateNestedProperty("position", (current) => ({
						...current,
						objectFit: value,
					}))
				}
				options={[
					{ label: "Cover", value: "cover" },
					{ label: "Contain", value: "contain" },
					{ label: "Fill", value: "fill" },
					{ label: "None", value: "none" },
				]}
				value={positionStyle.objectFit || "cover"}
			/>
		</div>
	);
}
