"use client";

import { useTranslations } from "next-intl";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertySelect from "../layout/PropertySelect";

interface DividerContentProps {
	component: BuilderComponent;
}

export default function DividerContent({ component }: DividerContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");

	const { orientation, size } = useContentProps(component, {
		orientation: "horizontal" as "horizontal" | "vertical",
		size: "md" as "sm" | "md" | "lg",
	});

	const { updateSingleField } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-4">
			<PropertySelect<"horizontal" | "vertical">
				label={t("orientation") || "Orientation"}
				layout="row"
				onChange={(val) =>
					updateSingleField(
						"orientation",
						(val as "horizontal" | "vertical") || "horizontal",
					)
				}
				options={[
					{
						label: t("horizontal") || "Horizontal",
						value: "horizontal",
					},
					{ label: t("vertical") || "Vertical", value: "vertical" },
				]}
				value={orientation ?? "horizontal"}
			/>

			<PropertySelect<"sm" | "md" | "lg">
				label={t("size") || "Size"}
				layout="row"
				onChange={(val) =>
					updateSingleField(
						"size",
						(val as "sm" | "md" | "lg") || "md",
					)
				}
				options={[
					{ label: t("small") || "Small", value: "sm" },
					{ label: t("medium") || "Medium", value: "md" },
					{ label: t("large") || "Large", value: "lg" },
				]}
				value={size ?? "md"}
			/>
		</div>
	);
}
