import React, { RefObject, useCallback, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
	Control,
	useFieldArray,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from "react-hook-form";
import type { FormValues } from "@/app/admin/[adminKey]/builder/settings/page";
import { useGoogleFonts } from "@/builder/utils/query/useGoogleFonts";
import TypographyItemEditor from "@/builder/components/settings/_partials/TypographyItemEditor";

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
			key: "new",
			fontFamily: filteredFonts[0]?.value ?? "",
			fontSize: {
				min: 1,
				sizeUnit: "rem",
				widthUnit: "px",
				max: 2,
				maxWidth: 1440,
			},
			lineHeight: 1,
			lineHeightUnits: "em",
			fontWeight: "400",
			fontStyle: "normal",
			letterSpacing: 0,
			letterSpacingUnits: "px",
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
						key={typo.id}
						idx={idx}
						control={control}
						register={register}
						setValue={setValue}
						remove={remove}
						openIdx={openIdx}
						setOpenIdx={setOpenIdx}
						dropdownOpenIdx={dropdownOpenIdx}
						setDropdownOpenIdx={setDropdownOpenIdx}
						search={search}
						setSearch={setSearch}
						searchInputRef={
							searchInputRef as RefObject<HTMLInputElement>
						}
						allFonts={allFonts}
						isLoading={isLoading}
						filteredFonts={filteredFonts}
						typography={typography}
					/>
				))}
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="mt-4"
					onClick={handleAdd}
				>
					<Plus className="w-4 h-4 mr-1" /> Ajouter une font
				</Button>
			</CardContent>
		</Card>
	);
});

export default TypographyEditor;
