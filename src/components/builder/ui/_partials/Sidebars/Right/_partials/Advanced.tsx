"use client";

import { useTranslations } from "next-intl";
import { useStyleState } from "@/builder/hooks/useStyleState";
import { AdvancedStyle } from "@/builder/types/components/properties/componentStylePropsType";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BuilderStyleAdvanced() {
	const t = useTranslations("Builder.RightSidebar.Advanced");

	const { state: advancedStyle, updateProperty } =
		useStyleState<AdvancedStyle>({
			cssClass: "",
			cssId: "",
			customCss: "",
		});

	return (
		<div className="flex flex-col gap-3">
			{/* CSS Class */}
			<div className="flex items-center gap-2">
				<Label className="text-xs font-medium text-zinc-500 w-[100px]">
					{t("cssClass")}
				</Label>
				<Input
					className="flex-1 text-xs"
					onChange={(e) => updateProperty("cssClass", e.target.value)}
					placeholder={t("cssClass")}
					type="text"
					value={advancedStyle.cssClass || ""}
				/>
			</div>

			{/* CSS ID */}
			<div className="flex items-center gap-2">
				<Label className="text-xs font-medium text-zinc-500 w-[100px]">
					{t("cssId")}
				</Label>
				<Input
					className="flex-1 text-xs"
					onChange={(e) => updateProperty("cssId", e.target.value)}
					placeholder={t("cssId")}
					type="text"
					value={advancedStyle.cssId || ""}
				/>
			</div>

			{/* Custom CSS */}
			<div className="flex flex-col gap-2">
				<Label className="text-xs font-medium text-zinc-500">
					{t("customCss")}
				</Label>
				<Textarea
					className="h-20 resize-none text-xs"
					onChange={(e) =>
						updateProperty("customCss", e.target.value)
					}
					placeholder={t("customCssPlaceholder")}
					style={{ resize: "vertical" }}
					value={advancedStyle.customCss || ""}
				/>
			</div>
		</div>
	);
}
