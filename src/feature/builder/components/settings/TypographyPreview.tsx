import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBuilderMaxWidth } from "@/feature/builder/hooks/useBuilderMaxWidth";
import { toClamp } from "@/feature/builder/lib/clampCalculator";
import { useGoogleFontLink } from "@/feature/builder/utils/query/useGoogleFontLink";

type TypographyPreviewProps = {
	typography: FormValues["typography"];
};

function GoogleFontLoader({ fontFamily }: { fontFamily: string }) {
	useGoogleFontLink(fontFamily);
	return null;
}

export default function TypographyPreview({
	typography,
}: TypographyPreviewProps) {
	// Initialize the builder max width cache from settings for clamp()
	useBuilderMaxWidth();
	// Liste unique des familles de polices
	const fontFamilies = Array.from(
		new Set(typography.typographies.map((t) => t.fontFamily)),
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Preview typographies</CardTitle>
			</CardHeader>
			<CardContent className={"space-y-4"}>
				{fontFamilies.map((font) => (
					<GoogleFontLoader fontFamily={font} key={font} />
				))}
				{typography.typographies.map((typo, idx) => (
					<p
						key={typo.key ? typo.key : idx}
						style={{
							fontFamily: typo.fontFamily,
							fontSize: toClamp(typo.fontSize),
							fontStyle: typo.fontStyle,
							fontWeight: typo.fontWeight,
							letterSpacing: `${typo.letterSpacing}${typo.letterSpacingUnits}`,
							lineHeight: `${typo.lineHeight}${typo.lineHeightUnits}`,
							textTransform: typo.textTransform,
						}}
					>
						<b>{typo.key as string}</b> : I love Klickbee CMS! Woaw.
					</p>
				))}
			</CardContent>
		</Card>
	);
}
