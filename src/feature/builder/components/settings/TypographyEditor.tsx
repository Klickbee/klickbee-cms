import { Plus } from "lucide-react";
import React, { RefObject, useCallback, useRef, useState } from "react";
import {
	Control,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
	useFieldArray,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/(dashboard)/manage/settings/builder/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TypographyItemEditor from "@/feature/builder/components/settings/_partials/TypographyItemEditor";
import { useGoogleFonts } from "@/feature/builder/utils/query/useGoogleFonts";

const TypographyEditor = React.memo(function TypographyEditor({
	control,
	register,
	setValue,
	watch,
}: {
	control: Control<FormValues>;
	register: UseFormRegister<FormValues>;
	setValue: UseFormSetValue<FormValues>;
	watch: UseFormWatch<FormValues>;
}) {
	const {
		fields: typoFields,
		append,
		remove,
	} = useFieldArray({ control, name: "typography.typographies" });
	const typography = watch("typography");
	const [openIdx, setOpenIdx] = useState<number | null>(null);
	const [dropdownOpenIdx, setDropdownOpenIdx] = useState<number | null>(null);
	const [search, setSearch] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { data: allFonts = [], isLoading } = useGoogleFonts();

	const filteredFonts = search
		? allFonts.filter((f) =>
				f.label.toLowerCase().includes(search.toLowerCase()),
			)
		: allFonts.slice(0, 20);

	const handleAdd = useCallback(() => {
		append({
			fontFamily: filteredFonts[0]?.value ?? "",
			fontSize: {
				max: 2,
				maxWidth: 1440,
				min: 1,
				sizeUnit: "rem",
				widthUnit: "px",
			},
			fontStyle: "normal",
			fontWeight: "400",
			key: "new",
			letterSpacing: 0,
			letterSpacingUnits: "px",
			lineHeight: 1,
			lineHeightUnits: "em",
			textTransform: "unset",
		});
	}, [append, filteredFonts]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Typographies</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{typoFields.map((typo, idx) => (
					<TypographyItemEditor
						allFonts={allFonts}
						control={control}
						dropdownOpenIdx={dropdownOpenIdx}
						filteredFonts={filteredFonts}
						idx={idx}
						isLoading={isLoading}
						key={typo.id}
						openIdx={openIdx}
						register={register}
						remove={remove}
						search={search}
						searchInputRef={
							searchInputRef as RefObject<HTMLInputElement>
						}
						setDropdownOpenIdx={setDropdownOpenIdx}
						setOpenIdx={setOpenIdx}
						setSearch={setSearch}
						setValue={setValue}
						typography={typography}
					/>
				))}
				<Button
					className="mt-4"
					onClick={handleAdd}
					size="sm"
					type="button"
					variant="outline"
				>
					<Plus className="w-4 h-4 mr-1" /> Ajouter une font
				</Button>
			</CardContent>
		</Card>
	);
});

export default TypographyEditor;
