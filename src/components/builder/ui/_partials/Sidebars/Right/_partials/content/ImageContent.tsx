import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import PropertyField from "../layout/PropertyField";
import FileUploader from "./FileUploader";

interface ImageContentProps {
	component: BuilderComponent;
}

export default function ImageContent({ component }: ImageContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { src, alt } = useContentProps(component, {
		alt: CONTENT_DEFAULTS.DEFAULT_ALT_TEXT,
		src: "",
	});

	const { updateSrc, updateAlt } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<FileUploader
				acceptedTypes={["png", "jpeg", "jpg", "svg"]}
				initialFile={src}
				label={t("image")}
				maxSize={10}
				mode="image"
				onFileChange={(fileUrl) => updateSrc(fileUrl || "")}
			/>

			<PropertyField
				label={t("altText")}
				layout="column"
				onChange={updateAlt}
				placeholder={CONTENT_DEFAULTS.DEFAULT_ALT_TEXT}
				value={alt}
			/>
		</div>
	);
}
