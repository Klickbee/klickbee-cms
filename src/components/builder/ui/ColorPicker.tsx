"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import styles from "./ColorPicker.module.css";

interface ColorPickerProps {
	value: string;
	onChange: (color: string) => void;
	className?: string;
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

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				b: parseInt(result[3], 16),
				g: parseInt(result[2], 16),
				r: parseInt(result[1], 16),
			}
		: { b: 0, g: 0, r: 0 };
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
	const { r, g, b } = hexToRgb(hex);
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	let h = 0,
		s = 0;
	const l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case rNorm:
				h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
				break;
			case gNorm:
				h = (bNorm - rNorm) / d + 2;
				break;
			case bNorm:
				h = (rNorm - gNorm) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		l: Math.round(l * 100),
		s: Math.round(s * 100),
	};
}

export default function ColorPicker({
	value,
	onChange,
	className,
}: ColorPickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [colorFormat, setColorFormat] = useState<"HEX" | "RGB" | "HSL">(
		"HEX",
	);

	const handlePresetClick = (color: string) => {
		onChange(color);
		setIsOpen(false);
	};

	const formatColor = (color: string) => {
		switch (colorFormat) {
			case "RGB": {
				const { r, g, b } = hexToRgb(color);
				return `rgb(${r}, ${g}, ${b})`;
			}
			case "HSL": {
				const { h, s, l } = hexToHsl(color);
				return `hsl(${h}, ${s}%, ${l}%)`;
			}
			default:
				return color;
		}
	};

	return (
		<Popover onOpenChange={setIsOpen} open={isOpen}>
			<PopoverTrigger asChild>
				<Button
					className={cn(
						"h-8 w-[150px] justify-start text-left font-normal",
						!value && "text-muted-foreground",
						className,
					)}
					variant="outline"
				>
					<div
						className="w-4 h-4 rounded border border-zinc-200 mr-2"
						style={{ backgroundColor: value }}
					/>
					<span className="flex-1 text-xs">{formatColor(value)}</span>
					<ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="center"
				className="w-[310px] p-3 m-3"
				side="bottom"
			>
				<div className="space-y-3">
					{/* Color Picker with Custom Styles */}
					<div className={styles.figmaColorPicker}>
						<HexAlphaColorPicker
							color={value}
							onChange={onChange}
						/>
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
							value={formatColor(value)}
						/>
						<div
							className={`relative flex-1 ${styles.numberInput}`}
						>
							<Input
								className="h-8 w-full text-xs text-center pr-6"
								max="100"
								min="0"
								onChange={(e) => {
									const opacity = Math.max(
										0,
										Math.min(
											100,
											parseInt(e.target.value) || 0,
										),
									);
									const alphaHex = Math.round(
										(opacity / 100) * 255,
									)
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
									(parseInt(value.slice(7, 9) || "ff", 16) /
										255) *
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
								color.toLowerCase() ===
								value.toLowerCase().slice(0, 7);
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
			</PopoverContent>
		</Popover>
	);
}
