import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MediaLibrary from "@/feature/builder/components/ui/_partials/Sidebars/Right/_partials/content/_partials/MediaLibrary";
import type { LogoSettings } from "@/feature/builder/types/settings/LogoSettings";
import type { MediaFile } from "@/feature/media/types/media";

type Props = {
	logos: LogoSettings[];
	onChange: (_logos: LogoSettings[]) => void;
};

const FORMATS: Array<LogoSettings["format"]> = ["square", "rectangle"];
const SIZES = {
	rectangle: { h: 80, w: 180 },
	square: { h: 120, w: 120 },
} as const;

export default function LogoEditor({ logos, onChange }: Props) {
	const t = useTranslations("LogoEditor");
	const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
	const [currentFormat, setCurrentFormat] = useState<
		LogoSettings["format"] | null
	>(null);

	const LABELS = {
		rectangle: t("RectangleLogo"),
		square: t("SquareLogo"),
	} as const;

	const getLogoUrl = (format: LogoSettings["format"]) =>
		logos.find((l) => l.format === format)?.url;

	const handleMediaSelect = (media: MediaFile) => {
		if (!currentFormat) return;
		const next = logos.filter((l) => l.format !== currentFormat);
		onChange([...next, { format: currentFormat, url: media.url }]);
		setIsMediaLibraryOpen(false);
		setCurrentFormat(null);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{t("Title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-6">
					{FORMATS.map((format) => {
						const { w, h } = SIZES[format];
						const url = getLogoUrl(format);
						return (
							<div
								className="flex flex-col items-center"
								key={format}
							>
								<Label>{LABELS[format]}</Label>
								<div className="mt-2" style={{ width: w }}>
									<div
										aria-label={t("SelectLogo")}
										className="border border-[#ccc] bg-[#fafafa] dark:border-[#444] dark:bg-[#222] transition-colors"
										onClick={() => {
											setCurrentFormat(format);
											setIsMediaLibraryOpen(true);
										}}
										style={{
											alignItems: "center",
											borderRadius: 8,
											cursor: "pointer",
											display: "flex",
											height: h,
											justifyContent: "center",
											overflow: "hidden",
											position: "relative",
											width: w,
										}}
									>
										{url ? (
											<Image
												alt={LABELS[format]}
												height={h}
												src={url}
												style={{
													maxHeight: "100%",
													maxWidth: "100%",
													objectFit: "contain",
												}}
												width={w}
											/>
										) : (
											<span
												style={{
													color: "#bbb",
													fontSize: 14,
													textAlign: "center",
												}}
											>
												{t("ClickToChoose")}
												<br />
												{LABELS[format].toLowerCase()}
											</span>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<MediaLibrary
					initialTypeFilter={"IMAGE"}
					isOpen={isMediaLibraryOpen}
					onClose={() => {
						setIsMediaLibraryOpen(false);
						setCurrentFormat(null);
					}}
					onSelect={handleMediaSelect}
					title={t("Title")}
				/>
			</CardContent>
		</Card>
	);
}
