import React, { useMemo, useState } from "react";
import { mapStylePropsToCss } from "@/feature/builder/lib/style/mapStylePropsToCss";
import { BuilderComponent } from "../../../types/components/components";

interface SliderProps {
	component: BuilderComponent;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onDragLeave?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
	onDragOver?: ((e: React.DragEvent<HTMLDivElement>) => void) | undefined;
}

/*
  Slider expects component.props.content to contain:
  - items: array of { src: string; alt?: string } or string[] of image URLs
  - autoplay?: boolean
  - interval?: number (ms)
  - showArrows?: boolean
  - showDots?: boolean
*/
export const Slider: React.FC<SliderProps> = ({
	component,
	className,
	onClick,
	onDragLeave,
	onDragOver,
}) => {
	const rawContent = component.props?.content ?? {};
	type SliderItem = string | { src: string; alt?: string };
	type SliderContent = {
		items?: SliderItem[];
		autoplay?: boolean;
		interval?: number;
		showArrows?: boolean;
		showDots?: boolean;
	};
	const content = rawContent as SliderContent;

	const rawItems = content.items;
	const items = useMemo(
		() =>
			(rawItems && rawItems.length > 0
				? rawItems
				: [
						{
							src: "https://placehold.co/1024?text=Slide+1",
							alt: "Slide 1",
						},
						{
							src: "https://placehold.co/1024?text=Slide+2",
							alt: "Slide 2",
						},
					]
			).map((it) =>
				typeof it === "string"
					? { src: it, alt: "" }
					: (it as { src: string; alt?: string }),
			),
		[rawItems],
	);

	const autoplay = Boolean(content.autoplay);
	const interval = Number(content.interval ?? 3000);
	const showArrows = content.showArrows !== false; // default true
	const showDots = content.showDots !== false; // default true

	const [index, setIndex] = useState(0);

	React.useEffect(() => {
		if (!autoplay || items.length <= 1) return;
		const id = setInterval(
			() => {
				setIndex((prev) => (prev + 1) % items.length);
			},
			Math.max(1000, interval),
		);
		return () => clearInterval(id);
	}, [autoplay, interval, items.length]);

	const goTo = (i: number) => setIndex((i + items.length) % items.length);
	const prev = () => goTo(index - 1);
	const next = () => goTo(index + 1);

	return (
		<div
			className={["relative w-full overflow-hidden", className]
				.filter(Boolean)
				.join(" ")}
			onClick={onClick}
			onDragLeave={onDragLeave}
			onDragOver={onDragOver}
			style={{
				order: component.order || 0,
				...mapStylePropsToCss(component.props?.style),
			}}
		>
			<div
				className="flex transition-transform duration-500"
				style={{ transform: `translateX(-${index * 100}%)` }}
			>
				{items.map((item, i) => (
					<div className="min-w-full" key={i}>
						<img
							alt={item.alt || `Slide ${i + 1}`}
							className="w-full h-auto block"
							src={item.src}
						/>
					</div>
				))}
			</div>

			{showArrows && items.length > 1 && (
				<>
					<button
						aria-label="Previous slide"
						className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
						onClick={prev}
					>
						‹
					</button>
					<button
						aria-label="Next slide"
						className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
						onClick={next}
					>
						›
					</button>
				</>
			)}

			{showDots && items.length > 1 && (
				<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
					{items.map((_, i) => (
						<button
							aria-label={`Go to slide ${i + 1}`}
							className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
							key={i}
							onClick={() => goTo(i)}
						/>
					))}
				</div>
			)}
		</div>
	);
};
