import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import PropertyColumn from "../layout/PropertyColumn";
import PropertyToggle from "../layout/PropertyToggle";

interface VideoContentProps {
	component: BuilderComponent;
}

export default function VideoContent({ component }: VideoContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { src, autoplay, controls } = useContentProps(component, {
		autoplay: true,
		controls: true,
		src: "https://www.google.com/",
	});

	const { updateSrc, updateSingleField } = useContentUpdate(component);

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label={t("videoUrl")}>
				<Input
					className="h-8"
					onChange={(e) => updateSrc(e.target.value)}
					placeholder="https://www.google.com/"
					value={src}
				/>
			</PropertyColumn>

			<PropertyToggle
				label={t("autoplay")}
				onChange={(value) => updateSingleField("autoplay", value)}
				value={autoplay}
			/>

			<PropertyToggle
				label={t("showControls")}
				onChange={(value) => updateSingleField("controls", value)}
				value={controls}
			/>
		</div>
	);
}
