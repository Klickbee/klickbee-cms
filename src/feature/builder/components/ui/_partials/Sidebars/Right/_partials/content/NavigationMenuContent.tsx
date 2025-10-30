"use client";

import { useTranslations } from "next-intl";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import PropertySelect from "../layout/PropertySelect";

interface NavigationMenuContentProps {
	component: BuilderComponent;
}

type NavItem = { label: string; href: string; target?: string };

export default function NavigationMenuContent({
	component,
}: NavigationMenuContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");

	const { orientation, navItems } = useContentProps(component, {
		orientation: "horizontal" as "horizontal" | "vertical",
		navItems: [
			{ label: "Home", href: "#" },
			{ label: "About", href: "#" },
			{ label: "Contact", href: "#" },
		] as NavItem[],
	});

	const { updateSingleField } = useContentUpdate(component);

	const handleItemChange = (
		index: number,
		key: keyof NavItem,
		value: string,
	) => {
		const next = [...(navItems || [])] as NavItem[];
		if (!next[index]) return;
		next[index] = { ...next[index], [key]: value };
		updateSingleField("navItems", next);
	};

	const handleAddItem = () => {
		const next = ([...(navItems || [])] as NavItem[]).concat({
			label: `${t("navigationItem")} ${(navItems?.length || 0) + 1}`,
			href: "#",
		});
		updateSingleField("navItems", next);
	};

	const handleRemoveItem = (index: number) => {
		const items = (navItems || []) as NavItem[];
		if (items.length <= 1) return;
		const next = items.filter((_, i) => i !== index);
		updateSingleField("navItems", next);
	};

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

			<div className="flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<span className="text-xs font-medium text-muted-foreground">
						{t("navigationItems") || "Navigation items"}
					</span>
					<button
						className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground"
						onClick={handleAddItem}
						type="button"
					>
						{t("addItem") || "Add item"}
					</button>
				</div>

				{(navItems || []).map((item, index) => (
					<div
						className="border rounded p-2 flex flex-col gap-2"
						key={index}
					>
						<PropertyField
							label={t("label") || "Label"}
							layout="column"
							onChange={(v) =>
								handleItemChange(index, "label", v)
							}
							placeholder={t("label") || "Label"}
							value={(item as NavItem).label || ""}
						/>
						<PropertyField
							label={t("url") || "URL"}
							layout="column"
							onChange={(v) => handleItemChange(index, "href", v)}
							placeholder="https://example.com"
							value={(item as NavItem).href || ""}
						/>
						<PropertyField
							label={t("target") || "Target"}
							layout="column"
							onChange={(v) =>
								handleItemChange(index, "target", v)
							}
							placeholder="_self | _blank"
							value={(item as NavItem).target || ""}
						/>

						<div className="flex justify-end">
							<button
								className="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground"
								onClick={() => handleRemoveItem(index)}
								type="button"
							>
								{t("remove") || "Remove"}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
