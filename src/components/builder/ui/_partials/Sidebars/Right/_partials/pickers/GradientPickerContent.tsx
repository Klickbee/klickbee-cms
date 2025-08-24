"use client";

import { Input } from "@/components/ui/input";

interface GradientConfig {
	type: "linear" | "radial";
	color1: string;
	color2: string;
	position1: number; // 0-100%
	position2: number; // 0-100%
	angle: number; // 0-360° (pour linear)
}

interface GradientPickerContentProps {
	value: string; // Gradient CSS string
	onChange: (gradient: string) => void;
	closeGradientPicker: () => void;
}

// Fonction utilitaire pour parser un gradient CSS en GradientConfig
const parseGradientString = (gradientString: string): GradientConfig => {
	// Valeurs par défaut
	const defaultConfig: GradientConfig = {
		angle: 0,
		color1: "#ff0000",
		color2: "#0000ff",
		position1: 0,
		position2: 100,
		type: "linear",
	};

	if (!gradientString) return defaultConfig;

	try {
		if (gradientString.includes("linear-gradient")) {
			// Parse linear gradient: linear-gradient(45deg, #ff0000 0%, #0000ff 100%)
			const match = gradientString.match(
				/linear-gradient\(([^,]+),\s*([^,]+)\s+(\d+)%,\s*([^)]+)\s+(\d+)%\)/,
			);
			if (match) {
				return {
					angle: parseInt(match[1].replace("deg", "")) || 0,
					color1: match[2].trim(),
					color2: match[4].trim(),
					position1: parseInt(match[3]) || 0,
					position2: parseInt(match[5]) || 100,
					type: "linear",
				};
			}
		} else if (gradientString.includes("radial-gradient")) {
			// Parse radial gradient: radial-gradient(circle, #ff0000 0%, #0000ff 100%)
			const match = gradientString.match(
				/radial-gradient\([^,]+,\s*([^,]+)\s+(\d+)%,\s*([^)]+)\s+(\d+)%\)/,
			);
			if (match) {
				return {
					angle: 0,
					color1: match[1].trim(),
					color2: match[3].trim(),
					position1: parseInt(match[2]) || 0,
					position2: parseInt(match[4]) || 100,
					type: "radial",
				};
			}
		}
	} catch (error) {
		console.warn("Failed to parse gradient string:", error);
	}

	return defaultConfig;
};

// Fonction utilitaire pour convertir GradientConfig en string CSS
const gradientConfigToString = (config: GradientConfig): string => {
	const { type, color1, color2, angle, position1, position2 } = config;

	if (type === "linear") {
		return `linear-gradient(${angle}deg, ${color1} ${position1}%, ${color2} ${position2}%)`;
	} else {
		return `radial-gradient(circle, ${color1} ${position1}%, ${color2} ${position2}%)`;
	}
};

export default function GradientPickerContent({
	value,
	onChange,
}: GradientPickerContentProps) {
	const gradientConfig = parseGradientString(value);

	const handleGradientChange = (updates: Partial<GradientConfig>) => {
		const newConfig = { ...gradientConfig, ...updates };
		const newGradientString = gradientConfigToString(newConfig);
		onChange(newGradientString);
	};

	const getGradientStyle = () => {
		return { background: value || gradientConfigToString(gradientConfig) };
	};

	return (
		<div className="space-y-3">
			{/* Aperçu du gradient */}
			<div
				className="h-8 w-full rounded border border-zinc-200"
				style={getGradientStyle()}
			/>

			{/* Contrôles couleur 1 */}
			<div className="flex gap-1 items-center">
				<Input
					className="flex-1 h-8 text-xs"
					onChange={(e) =>
						handleGradientChange({ color1: e.target.value })
					}
					placeholder="#ff0000"
					type="text"
					value={gradientConfig.color1}
				/>
				<Input
					className="h-8 w-[55px] text-xs text-center"
					max="100"
					min="0"
					onChange={(e) =>
						handleGradientChange({
							position1: Number(e.target.value),
						})
					}
					type="number"
					value={gradientConfig.position1}
				/>
				<Input
					className="h-8 w-[55px] text-xs text-center"
					max="360"
					min="0"
					onChange={(e) =>
						handleGradientChange({ angle: Number(e.target.value) })
					}
					type="number"
					value={gradientConfig.angle}
				/>
			</div>

			{/* Contrôles couleur 2 */}
			<div className="flex gap-1 items-center">
				<Input
					className="flex-1 h-8 text-xs"
					onChange={(e) =>
						handleGradientChange({ color2: e.target.value })
					}
					placeholder="#0000ff"
					type="text"
					value={gradientConfig.color2}
				/>
				<Input
					className="h-8 w-[55px] text-xs text-center"
					max="100"
					min="0"
					onChange={(e) =>
						handleGradientChange({
							position2: Number(e.target.value),
						})
					}
					type="number"
					value={gradientConfig.position2}
				/>
				<Input
					className="h-8 w-[55px] text-xs text-center bg-gray-50"
					disabled
					type="number"
					value={90}
				/>
			</div>
		</div>
	);
}

export type { GradientConfig };
