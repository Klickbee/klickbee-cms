// PreviewPanel.tsx

import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import ColorPreview from "./ColorPreview";
import SpacingPreview from "./SpacingPreview";
import TypographyPreview from "./TypographyPreview";

type PreviewPanelProps = {
	typography: FormValues["typography"];
	colors: FormValues["colors"];
	spacing: FormValues["spacing"];
};

export default function PreviewPanel({
	typography,
	colors,
	spacing,
}: PreviewPanelProps) {
	return (
		<div className="flex flex-col gap-6">
			<TypographyPreview typography={typography} />
			<ColorPreview colors={colors} />
			<SpacingPreview spacing={spacing} />
		</div>
	);
}
