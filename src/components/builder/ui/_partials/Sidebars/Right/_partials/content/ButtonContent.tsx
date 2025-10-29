import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyColorPicker from "../layout/PropertyColorPicker";
import PropertyField from "../layout/PropertyField";
import FileUploader from "./FileUploader";

interface ButtonContentProps {
	component: BuilderComponent;
}

export default function ButtonContent({ component }: ButtonContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { text, href, icon, iconColor } = useContentProps(component, {
		href: CONTENT_DEFAULTS.DEFAULT_URL,
		icon: undefined,
		iconColor: undefined,
		text: CONTENT_DEFAULTS.BUTTON_TEXT,
	});

	const { updateText, updateHref, updateIcon, updateSingleField } =
		useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyField
				label={t("buttonText")}
				layout="column"
				onChange={updateText}
				placeholder={CONTENT_DEFAULTS.BUTTON_TEXT}
				value={text}
			/>

			<PropertyField
				label={t("url")}
				layout="column"
				onChange={updateHref}
				placeholder={CONTENT_DEFAULTS.DEFAULT_URL}
				type="url"
				value={href}
			/>

			<FileUploader
				acceptedTypes={["svg"]}
				initialFile={icon}
				label={t("icon")}
				maxSize={2}
				mode="icon"
				onFileChange={(fileUrl) => updateIcon(fileUrl || "")}
				openMediaLibrary={true}
			/>

			<PropertyColorPicker
				label={t("iconColor") || "Icon color"}
				layout="column"
				onChange={(color) => {
					const value =
						typeof color === "string"
							? color
							: typeof (color as { hexCode?: string })
										?.hexCode === "string"
								? (color as { hexCode?: string }).hexCode!
								: String(color);
					updateSingleField("iconColor", value);
				}}
				value={iconColor ?? ""}
			/>
		</div>
	);
}
