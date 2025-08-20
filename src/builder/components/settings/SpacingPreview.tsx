// SpacingPreview.tsx

import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SpacingPreviewProps = {
	spacing: FormValues["spacing"];
};

export default function SpacingPreview({ spacing }: SpacingPreviewProps) {
	return (
		<>
			{spacing.sectionPadding.map((space, idx) => (
				<Card key={idx}>
					<CardHeader>
						<CardTitle>
							Preview spacing: {space.key || `Spacing ${idx + 1}`}
						</CardTitle>
					</CardHeader>
					<CardContent
						style={{
							background: "#000",
							color: "#fff",
							maxWidth: spacing.maxWidth,
							paddingBottom: space.bottom.min,
							paddingLeft: space.left.min,
							paddingRight: space.right.min,
							paddingTop: space.top.min,
						}}
					>
						<p>I love Klickbee CMS! Woaw.</p>
					</CardContent>
				</Card>
			))}
		</>
	);
}
