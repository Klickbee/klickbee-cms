"use client";

import { useTranslations } from "next-intl";
import { CONTENT_DEFAULTS } from "@/builder/constants/contentDefaults";
import { useContentProps } from "@/builder/hooks/useContentProps";
import { useContentUpdate } from "@/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/builder/types/components/components";
import FormFieldGroup from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/FormFieldGroup";
import PropertySelect from "@/components/builder/ui/_partials/Sidebars/Right/_partials/layout/PropertySelect";
import { Input } from "@/components/ui/input";
import PropertyRow from "../layout/PropertyRow";

interface FileUploadContentProps {
	component: BuilderComponent;
}

export default function FileUploadContent({
	component,
}: FileUploadContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { name, label, required, mimeTypes, maxFileSize } = useContentProps(
		component,
		{
			label: CONTENT_DEFAULTS.FIELD_LABEL,
			maxFileSize: CONTENT_DEFAULTS.DEFAULT_MAX_FILE_SIZE,
			mimeTypes: CONTENT_DEFAULTS.DEFAULT_MIME_TYPE,
			name: CONTENT_DEFAULTS.FIELD_NAME,
			required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		},
	);

	const { updateName, updateLabel, updateRequired, updateSingleField } =
		useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<FormFieldGroup
				label={label}
				name={name}
				onLabelChange={updateLabel}
				onNameChange={updateName}
				onRequiredChange={updateRequired}
				required={required}
			/>

			<PropertySelect
				label={t("fileType")}
				layout="row"
				onChange={(value) => updateSingleField("mimeTypes", value)}
				options={[
					{
						label: t("pdf"),
						value: CONTENT_DEFAULTS.DEFAULT_MIME_TYPE,
					},
					{ label: t("image"), value: "Image" },
					{ label: t("document"), value: "Document" },
					{ label: t("video"), value: "Video" },
					{ label: t("audio"), value: "Audio" },
				]}
				value={mimeTypes as string}
			/>

			<PropertyRow label={t("maxFileSize")}>
				<div className="flex">
					<Input
						className="h-8 px-3 rounded-r-none border-r-0"
						min="1"
						onChange={(e) =>
							updateSingleField(
								"maxFileSize",
								Number(e.target.value),
							)
						}
						type="number"
						value={maxFileSize}
					/>
					<div className="bg-white border border-zinc-200 border-l-0 rounded-r-md h-8 px-2 flex items-center text-xs text-zinc-500 shadow-sm">
						mb
					</div>
				</div>
			</PropertyRow>
		</div>
	);
}
