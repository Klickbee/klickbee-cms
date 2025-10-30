"use client";

import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatColor } from "@/feature/builder/utils/colorUtils";
import styles from "./ColorPicker.module.css";

interface ColorPickerProps {
	closeColorPicker?: () => void;
	value: string;
	onChange: (color: string) => void;
}

const PRESET_COLORS = [
	"#000000",
	"#ff4500",
	"#ff8c00",
	"#00ff00",
	"#00ffff",
	"#0066ff",
	"#6633ff",
	"#ff1493",
	"#dc143c",
	"#ff00ff",
	"#9966ff",
	"#0099ff",
	"#00cc66",
	"#99cc00",
];

export default function ColorPicker({
	closeColorPicker,
	value,
	onChange,
}: ColorPickerProps) {
	const [colorFormat, setColorFormat] = useState<"HEX" | "RGB" | "HSL">(
		"HEX",
	);

	const handlePresetClick = (color: string) => {
		onChange(color);
		closeColorPicker?.();
	};

	return (
		<div className="space-y-3">
			{/* Color Picker with Custom Styles */}
			<div className={styles.figmaColorPicker}>
				<HexAlphaColorPicker color={value} onChange={onChange} />
			</div>

			{/* Color Format and Input */}
			<div className="flex gap-2">
				<Select
					onValueChange={(value: "HEX" | "RGB" | "HSL") =>
						setColorFormat(value)
					}
					value={colorFormat}
				>
					<SelectTrigger className="h-8 w-auto min-w-fit text-xs">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="HEX">HEX</SelectItem>
						<SelectItem value="RGB">RGB</SelectItem>
						<SelectItem value="HSL">HSL</SelectItem>
					</SelectContent>
				</Select>
				<Input
					className="h-8 text-xs flex-1"
					onChange={(e) => onChange(e.target.value)}
					value={formatColor(value, colorFormat)}
				/>
				<div className={`relative flex-1 ${styles.numberInput}`}>
					<Input
						className="h-8 w-full text-xs text-center pr-6"
						max="100"
						min="0"
						onChange={(e) => {
							const opacity = Math.max(
								0,
								Math.min(100, parseInt(e.target.value) || 0),
							);
							const alphaHex = Math.round((opacity / 100) * 255)
								.toString(16)
								.padStart(2, "0");
							const newColor =
								value.length === 9
									? value.slice(0, 7) + alphaHex
									: value + alphaHex;
							onChange(newColor);
						}}
						type="number"
						value={Math.round(
							(parseInt(value.slice(7, 9) || "ff", 16) / 255) *
								100,
						)}
					/>
					<span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500 pointer-events-none">
						%
					</span>
				</div>
			</div>

			{/* Preset Colors */}
			<div className="grid grid-cols-7 gap-x-1 gap-y-2">
				{PRESET_COLORS.map((color, index) => {
					const isSelected =
						color.toLowerCase() === value.toLowerCase().slice(0, 7);
					return (
						<button
							className="w-6 h-6 rounded-full hover:scale-110 transition-transform border-0"
							key={index}
							onClick={() => handlePresetClick(color)}
							style={{
								backgroundColor: color,
								boxShadow: isSelected
									? "0 0 0 2px white, 0 0 0 5px #6b7280"
									: "none",
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
