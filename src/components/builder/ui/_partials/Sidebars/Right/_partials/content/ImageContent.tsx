import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import PropertyToggle from "../layout/PropertyToggle";
import FileUploader from "./FileUploader";

interface ImageContentProps {
	component: BuilderComponent;
}

export default function ImageContent({ component }: ImageContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { src, alt, href, openInNewTab } = useContentProps(component, {
		alt: CONTENT_DEFAULTS.DEFAULT_ALT_TEXT,
		href: "",
		openInNewTab: false,
		src: "",
	});

	const { updateSrc, updateAlt, updateHref, updateOpenInNewTab } =
		useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<FileUploader
				acceptedTypes={["png", "jpeg", "jpg", "svg"]}
				initialFile={src}
				label={t("image")}
				maxSize={10}
				mode="image"
				onFileChange={(fileUrl) => updateSrc(fileUrl || "")}
				openMediaLibrary={true}
			/>

			<PropertyField
				label={t("altText")}
				layout="column"
				onChange={updateAlt}
				placeholder={CONTENT_DEFAULTS.DEFAULT_ALT_TEXT}
				value={alt}
			/>

			<PropertyField
				label={t("linkUrl")}
				layout="column"
				onChange={updateHref}
				placeholder={CONTENT_DEFAULTS.DEFAULT_URL}
				type="url"
				value={href}
			/>

			<PropertyToggle
				label={t("newTab")}
				onChange={updateOpenInNewTab}
				value={openInNewTab}
			/>
		</div>
	);
}
