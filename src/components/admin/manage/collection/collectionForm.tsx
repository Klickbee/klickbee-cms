"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAutoSlug } from "@/hooks/useAutoSlug";

interface CollectionFormProps {
	schema: z.ZodType;
	title: string;
	initialValues: FieldValues;
	onSubmit: (values: FieldValues) => Promise<void>;
	isSubmitting: boolean;
	submitButtonText: string;
	submittingText: string;
}

export default function CollectionForm({
	schema,
	title,
	initialValues,
	onSubmit,
	isSubmitting,
	submitButtonText,
	submittingText,
}: CollectionFormProps) {
	const t = useTranslations("Contents");

	const form = useForm({
		defaultValues: initialValues,
		resolver: zodResolver(
			schema as z.ZodObject<Record<string, z.ZodString>>,
		),
	});

	const { handleNameChange, handleSlugChange } = useAutoSlug(
		form,
		initialValues.slug,
	);

	const handleSubmit = form.handleSubmit(async (values) => {
		await onSubmit(values);
	});

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="p-4 flex flex-col gap-4">
				<Form {...form}>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("CollectionName")}</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleNameChange(
													e.target.value,
												);
											}}
											placeholder={t(
												"CollectionNamePlaceholder",
											)}
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Slug</FormLabel>
									<FormControl>
										<Input
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleSlugChange(
													e.target.value,
												);
											}}
											placeholder="collection-slug"
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className="w-fit bg-blue-500 text-white hover:bg-blue-600"
							disabled={!form.formState.isValid || isSubmitting}
							type="submit"
						>
							{isSubmitting ? submittingText : submitButtonText}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
