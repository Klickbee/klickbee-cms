"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAutoSlug } from "@/hooks/useAutoSlug";

interface CollectionItemFormProps {
	schema: z.ZodType;
	title: string;
	initialValues: FieldValues;
	onSubmit: (values: FieldValues) => Promise<void>;
	isSubmitting: boolean;
	submitButtonText: string;
	submittingText: string;
}

export default function CollectionItemForm({
	schema,
	title,
	initialValues,
	onSubmit,
	isSubmitting,
	submitButtonText,
	submittingText,
}: CollectionItemFormProps) {
	const t = useTranslations("CollectionItems");

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
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-8" onSubmit={handleSubmit}>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("Title")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("TitlePlaceholder")}
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleNameChange(
													e.target.value,
												);
											}}
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
									<FormLabel>{t("Slug")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("SlugPlaceholder")}
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleSlugChange(
													e.target.value,
												);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="author"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("Author")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("AuthorPlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("ContentJSON")}</FormLabel>
									<FormControl>
										<Textarea
											placeholder={t(
												"ContentJSONPlaceholder",
											)}
											rows={10}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* SEO Settings */}
						<div className="pt-4 border-t">
							<h3 className="text-lg font-medium mb-4">
								{t("SEOSettings")}
							</h3>
							<div className="space-y-8">
								<FormField
									control={form.control}
									name="metaTitle"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("MetaTitle")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"MetaTitlePlaceholder",
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaDescription"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("MetaDescription")}
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t(
														"MetaDescriptionPlaceholder",
													)}
													rows={10}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaKeywords"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("MetaKeywords")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"MetaKeywordsPlaceholder",
													)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Publishing Settings */}
						<div className="pt-4 border-t">
							<h3 className="text-lg font-medium mb-4">
								{t("PublishingSettings")}
							</h3>
							<div className="space-y-8">
								<FormField
									control={form.control}
									name="isPublished"
									render={({ field }) => (
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={(
														checked,
													) =>
														field.onChange(checked)
													}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												{t("IsPublished")}
											</FormLabel>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="publishedAt"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("PublishDate")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"PublishDatePlaceholder",
													)}
													type="datetime-local"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* Submit Button */}
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
