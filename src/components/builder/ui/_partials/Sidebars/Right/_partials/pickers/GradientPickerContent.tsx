"use client";

import { BackgroundStyle } from "@/builder/types/components/properties/componentStylePropsType";
import BasicColorPicker from "@/components/builder/ui/_partials/Sidebars/Right/_partials/pickers/BasicColorPicker";
import { Input } from "@/components/ui/input";

interface GradientInputProps {
	value: number;
	onChange: (value: string) => void;
	min: number;
	max: number;
	unit: string;
	className?: string;
}

function GradientInput({
	value,
	onChange,
	min,
	max,
	unit,
	className,
}: GradientInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange(newValue);
	};

	return (
		<div className={`relative ${className || ""}`}>
			<Input
				className="h-8 w-full text-xs text-center pr-6 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				max={max}
				min={min}
				onChange={handleChange}
				type="number"
				value={value.toString()}
			/>
			<span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs pointer-events-none">
				{unit}
			</span>
		</div>
	);
}

interface ColorRowProps {
	colorValue: string;
	positionValue: number;
	angleValue?: number;
	showAngle: boolean;
	onColorChange: (color: string) => void;
	onPositionChange: (position: number) => void;
	onAngleChange?: (angle: number) => void;
}

function ColorRow({
	colorValue,
	positionValue,
	angleValue,
	showAngle,
	onColorChange,
	onPositionChange,
	onAngleChange,
}: ColorRowProps) {
	return (
		<div className="flex gap-1 items-center">
			<BasicColorPicker
				onChange={(color) => onColorChange(color as string)}
				value={colorValue}
			/>
			<div className="flex-1 flex gap-1">
				<GradientInput
					max={100}
					min={0}
					onChange={(value) => {
						const numValue = Number(value);
						if (!isNaN(numValue)) {
							onPositionChange(numValue);
						}
					}}
					unit="%"
					value={positionValue}
				/>
				{showAngle && onAngleChange && (
					<GradientInput
						max={360}
						min={0}
						onChange={(value) => {
							const numValue = Number(value);
							if (!isNaN(numValue)) {
								onAngleChange(numValue);
							}
						}}
						unit="°"
						value={angleValue || 90}
					/>
				)}
			</div>
		</div>
	);
}

interface GradientPickerContentProps {
	value: BackgroundStyle["gradient"]; // Gradient object
	onChange: (gradient: BackgroundStyle["gradient"]) => void;
}

export default function GradientPickerContent({
	value,
	onChange,
}: GradientPickerContentProps) {
	const gradient = value || {
		angle: 90,
		colors: ["#0052d4", "#6fb1fc"] as [string, string],
		positions: [0, 100] as [number, number],
		type: "linear" as const,
	};

	const updateColors = (index: 0 | 1, color: string) => {
		const newColors: [string, string] = [...gradient.colors] as [
			string,
			string,
		];
		newColors[index] = color;
		onChange({ ...gradient, colors: newColors });
	};

	const updatePositions = (index: 0 | 1, position: number) => {
		const newPositions: [number, number] = [...gradient.positions] as [
			number,
			number,
		];
		newPositions[index] = position;
		onChange({ ...gradient, positions: newPositions });
	};

	const updateAngle = (angle: number) => {
		onChange({ ...gradient, angle });
	};

	const gradientStyle = {
		background:
			gradient.type === "linear"
				? `linear-gradient(${gradient.angle || 90}deg, ${gradient.colors[0]} ${gradient.positions[0]}%, ${gradient.colors[1]} ${gradient.positions[1]}%)`
				: `radial-gradient(circle, ${gradient.colors[0]} ${gradient.positions[0]}%, ${gradient.colors[1]} ${gradient.positions[1]}%)`,
	};

	return (
		<div className="space-y-3">
			<div
				className="h-8 w-full rounded border border-zinc-200"
				style={gradientStyle}
			/>

			<ColorRow
				angleValue={gradient.angle}
				colorValue={gradient.colors[0] as string}
				onAngleChange={updateAngle}
				onColorChange={(color) => updateColors(0, color)}
				onPositionChange={(position) => updatePositions(0, position)}
				positionValue={gradient.positions[0]}
				showAngle={gradient.type === "linear"}
			/>

			<ColorRow
				angleValue={gradient.angle}
				colorValue={gradient.colors[1] as string}
				onAngleChange={updateAngle}
				onColorChange={(color) => updateColors(1, color)}
				onPositionChange={(position) => updatePositions(1, position)}
				positionValue={gradient.positions[1]}
				showAngle={gradient.type === "linear"}
			/>
		</div>
	);
}
