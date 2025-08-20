import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ColorPreviewProps = {
	colors: FormValues["colors"];
};

export default function ColorPreview({ colors }: ColorPreviewProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Preview couleurs</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-2 gap-2">
				{colors.map((color, idx) => (
					<div className="flex flex-col items-center" key={idx}>
						<div
							className="w-full h-10 rounded"
							style={{ backgroundColor: color.hexCode }}
						></div>
						<span className="text-sm mt-1">{color.name}</span>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
