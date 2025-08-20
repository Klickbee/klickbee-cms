import { HelpCircle, Pencil } from "lucide-react";
import React from "react";
import {
	Control,
	UseFormRegister,
	UseFormSetValue,
	useController,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { InputWithUnit } from "@/builder/components/settings/_partials/InputWithUnit";
import { sizeUnits } from "@/builder/types/settings/FluidSize";
import {
	TypographyFontStyle,
	TypographyFontWeight,
	TypographyTextTransform,
	typographyFontStyles,
	typographyFontWeights,
	typographyTextTransforms,
} from "@/builder/types/settings/TypographySettings";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const TypographyItemEditor = ({
	idx,
	control,
	register,
	setValue,
	remove,
	openIdx,
	setOpenIdx,
	dropdownOpenIdx,
	setDropdownOpenIdx,
	search,
	setSearch,
	searchInputRef,
	allFonts,
	isLoading,
	filteredFonts,
	typography,
}: {
	idx: number;
	control: Control<FormValues>;
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	remove: (_index: number) => void;
	openIdx: number | null;
	setOpenIdx: (_idx: number | null) => void;
	dropdownOpenIdx: number | null;
	setDropdownOpenIdx: (_idx: number | null) => void;
	search: string;
	setSearch: (_val: string) => void;
	searchInputRef: React.RefObject<HTMLInputElement>;
	allFonts: { label: string; value: string }[];
	isLoading: boolean;
	filteredFonts: { label: string; value: string }[];
	typography: FormValues["typography"];
}) => {
	const { field: lineHeightField } = useController({
		control,
		name: `typography.typographies.${idx}.lineHeight`,
	});
	const { field: fontSizeMinField } = useController({
		control,
		name: `typography.typographies.${idx}.fontSize.min`,
	});
	const { field: fontSizeMaxField } = useController({
		control,
		name: `typography.typographies.${idx}.fontSize.max`,
	});
	const { field: fontSizeUnitField } = useController({
		control,
		name: `typography.typographies.${idx}.fontSize.sizeUnit`,
	});
	const { field: letterSpacingField } = useController({
		control,
		name: `typography.typographies.${idx}.letterSpacing`,
	});
	const { field: letterSpacingUnitField } = useController({
		control,
		name: `typography.typographies.${idx}.letterSpacingUnits`,
	});

	return (
		<div className="flex items-start gap-2">
			<Input
				{...register(`typography.typographies.${idx}.key`)}
				className="w-24 h-7 text-xs"
				placeholder="Nom"
			/>
			<Popover
				onOpenChange={(open) => setOpenIdx(open ? idx : null)}
				open={openIdx === idx}
			>
				<PopoverTrigger asChild>
					<Button className="mt-1" size="icon" variant="ghost">
						<Pencil className="w-4 h-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="grid grid-cols-2 gap-4 w-80">
					<Label className="flex items-center gap-1">
						Font Family
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font family from Google Fonts
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<div className="col-span-2">
						<DropdownMenu
							onOpenChange={(open) => {
								setDropdownOpenIdx(open ? idx : null);
								if (open)
									setTimeout(
										() => searchInputRef.current?.focus(),
										10,
									);
								if (!open) setSearch("");
							}}
							open={dropdownOpenIdx === idx}
						>
							<DropdownMenuTrigger asChild>
								<Button
									className="w-full justify-between"
									size="sm"
									variant="outline"
								>
									{allFonts.find(
										(opt) =>
											opt.value ===
											typography?.typographies?.[idx]
												?.fontFamily,
									)?.label || "Select a font"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<div className="px-2 py-1">
									<Input
										className="mb-2"
										onChange={(e) =>
											setSearch(e.target.value)
										}
										onKeyDown={(e) => e.stopPropagation()}
										placeholder="Search fonts..."
										ref={searchInputRef}
										value={search}
									/>
								</div>
								{isLoading && (
									<div className="px-2 py-1 text-xs">
										Loading...
									</div>
								)}
								{filteredFonts.length === 0 && !isLoading && (
									<div className="px-2 py-1 text-xs text-muted-foreground">
										No fonts found
									</div>
								)}
								{filteredFonts.map((opt) => (
									<DropdownMenuItem
										key={opt.value}
										onClick={() => {
											setValue(
												`typography.typographies.${idx}.fontFamily`,
												opt.value,
											);
											setDropdownOpenIdx(null);
										}}
									>
										{opt.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Label className="flex items-center gap-1">
						Min Size
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Minimum font size (for smallest
										viewport)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						onChange={(v) => fontSizeMinField.onChange(Number(v))}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						unit={fontSizeUnitField.value ?? "rem"}
						units={sizeUnits}
						value={fontSizeMinField.value}
					/>

					<Label className="flex items-center gap-1">
						Max Size
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Maximum font size (for largest viewport)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						onChange={(v) => fontSizeMaxField.onChange(Number(v))}
						onUnitChange={(u) => fontSizeUnitField.onChange(u)}
						unit={fontSizeUnitField.value ?? "rem"}
						units={sizeUnits}
						value={fontSizeMaxField.value}
					/>

					<Label className="flex items-center gap-1">
						Max Width
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Viewport width at which max size is
										reached
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Input
						type="number"
						{...register(
							`typography.typographies.${idx}.fontSize.maxWidth`,
							{
								valueAsNumber: true,
							},
						)}
					/>

					<Label className="flex items-center gap-1">
						Line Height
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Line height for better readability
										(1.2-1.6 recommended)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						onChange={(v) => lineHeightField.onChange(Number(v))}
						onUnitChange={(u) =>
							setValue(
								`typography.typographies.${idx}.lineHeightUnits`,
								u,
							)
						}
						unit={
							typography?.typographies?.[idx]?.lineHeightUnits ??
							"em"
						}
						units={sizeUnits}
						value={lineHeightField.value}
					/>
					<Label className="flex items-center gap-1">
						Font Weight
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font weight (100-900, normal,
										bold, bolder)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.fontWeight
						}
						onValueChange={(value: TypographyFontWeight) =>
							setValue(
								`typography.typographies.${idx}.fontWeight`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select font weight" />
						</SelectTrigger>
						<SelectContent>
							{typographyFontWeights.map((weight) => (
								<SelectItem key={weight} value={weight}>
									{weight}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Label className="flex items-center gap-1">
						Font Style
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Select a font style or text transform
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.fontStyle
						}
						onValueChange={(value: TypographyFontStyle) =>
							setValue(
								`typography.typographies.${idx}.fontStyle`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select font style" />
						</SelectTrigger>
						<SelectContent>
							{typographyFontStyles.map((style) => (
								<SelectItem key={style} value={style}>
									{style.charAt(0).toUpperCase() +
										style.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Label className="flex items-center gap-1">
						Letter Spacing
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										Space between letters (0 for normal,
										negative for tighter, positive for
										looser)
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<InputWithUnit
						onChange={(v) => letterSpacingField.onChange(Number(v))}
						onUnitChange={(u) => letterSpacingUnitField.onChange(u)}
						unit={letterSpacingUnitField.value ?? "px"}
						units={sizeUnits}
						value={letterSpacingField.value}
					/>

					<Label className="flex items-center gap-1">
						Semantic Usage
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">
										The semantic purpose of this typography
										style
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Label>
					<Select
						defaultValue={
							typography?.typographies?.[idx]?.textTransform
						}
						onValueChange={(value: TypographyTextTransform) =>
							setValue(
								`typography.typographies.${idx}.textTransform`,
								value,
							)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select text transform" />
						</SelectTrigger>
						<SelectContent>
							{typographyTextTransforms.map((transform) => (
								<SelectItem key={transform} value={transform}>
									{transform.charAt(0).toUpperCase() +
										transform.slice(1)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</PopoverContent>
			</Popover>
			<Button
				className="ml-1"
				onClick={() => remove(idx)}
				size="icon"
				type="button"
				variant="ghost"
			>
				✕
			</Button>
		</div>
	);
};

export default TypographyItemEditor;
