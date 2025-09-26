"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import GoogleSearchPreview from "@/components/admin/_partials/googleSearchPreview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datepicker";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAllAuthors } from "@/feature/collectionItem/queries/useAllAuthors";

interface CollectionItemFormProps {
	schema: z.ZodType;
	initialValues: FieldValues;
	onSubmit: (values: FieldValues) => Promise<void>;
}

export default function CollectionItemForm({
	schema,
	initialValues,
	onSubmit,
}: CollectionItemFormProps) {
	const t = useTranslations("CollectionItems");
	const { data: authors } = useAllAuthors();

	const form = useForm({
		defaultValues: {
			...initialValues,
			publishedAt: initialValues.publishedAt || new Date().toISOString(),
		},
		resolver: zodResolver(
			schema as z.ZodObject<Record<string, z.ZodString>>,
		),
	});

	return (
		<Form {...form}>
			<form
				className="space-y-8 flex gap-8"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex flex-1 flex-col gap-8">
					<Card className="gap-0 py-0">
						<CardHeader className="py-6 px-4 gap-0 flex flex-row justify-between items-center border-b">
							<CardTitle>Détails</CardTitle>
						</CardHeader>
						<CardContent className="p-4 flex flex-col gap-4"></CardContent>
					</Card>

					<Card className="gap-0 py-0">
						<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b border-zinc-200">
							<p className="font-semibold text-zinc-950 text-[16px] leading-6">
								SEO Settings
							</p>
						</CardHeader>
						<CardContent className="p-4 flex flex-col gap-6">
							{(form.watch("metaTitle") ||
								form.watch("metaDescription") ||
								form.watch("slug")) && (
								<div>
									<FormLabel className="text-sm font-medium text-zinc-700 mb-3 block">
										Aperçu Google Search
									</FormLabel>
									<GoogleSearchPreview
										baseUrl="https://example.com"
										formValues={{
											metaDescription:
												form.watch("metaDescription") ||
												"",
											metaTitle:
												form.watch("metaTitle") || "",
											slug: form.watch("slug") || "",
										}}
										page={{
											metaDescription: "",
											metaTitle: "",
											slug: form.watch("slug") || "",
											title:
												initialValues.name ||
												"Untitled",
										}}
									/>
								</div>
							)}
							<div className="space-y-6">
								<FormField
									control={form.control}
									name="slug"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("Slug")}</FormLabel>
											<FormControl>
												<Input
													placeholder={t(
														"SlugPlaceholder",
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
													rows={4}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									className="flex items-center gap-2 text-white hover:text-white bg-gradient-to-b from-[#AB57F7] to-[#9333EA]"
									size="sm"
									type="button"
									variant="outline"
								>
									<Sparkles className="w-4 h-4" />
									Generate with AI
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="gap-0 py-0 flex-1 max-w-[300px] h-fit">
					<CardHeader className="py-6 px-4 gap-0 flex flex-row justify-between items-center border-b">
						<CardTitle>{t("PublishingSettings")}</CardTitle>
					</CardHeader>
					<CardContent className="p-4 flex flex-col gap-6">
						<div className="space-y-6">
							<FormField
								control={form.control}
								name="publishedAt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{t("PublishDate")}
										</FormLabel>
										<FormControl>
											<DatePicker
												onChange={(date) =>
													field.onChange(
														date?.toISOString(),
													)
												}
												placeholder={t(
													"PublishDatePlaceholder",
												)}
												value={
													field.value
														? new Date(field.value)
														: undefined
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="authorId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("Author")}</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue
														placeholder={t(
															"SelectAuthor",
														)}
													/>
												</SelectTrigger>
												<SelectContent>
													{authors &&
														authors.length ===
															0 && (
															<p className="p-4 text-zinc-500">
																No authors
																found.
															</p>
														)}
													{authors &&
														authors.map(
															(author) => (
																<SelectItem
																	key={
																		author.id
																	}
																	value={
																		author.id
																	}
																>
																	<div className="flex items-center w-full">
																		<Avatar className="w-5 h-5 mr-2">
																			<AvatarImage
																				alt={
																					author.name ||
																					"Author Avatar"
																				}
																				src={
																					author.image ||
																					undefined
																				}
																			/>
																			<AvatarFallback>
																				{author.name
																					? author.name.charAt(
																							0,
																						)
																					: "A"}
																			</AvatarFallback>
																		</Avatar>
																		{author.name ||
																			"Unknown Author"}
																	</div>
																</SelectItem>
															),
														)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col gap-3">
								<Button
									className="w-full bg-zinc-950 hover:bg-zinc-800 text-white disabled:opacity-50"
									disabled={!form.formState.isValid}
									onClick={() => {
										const values = form.getValues();
										onSubmit({
											...values,
											isPublished: true,
										});
									}}
									type="button"
								>
									Publish
								</Button>
								<Button
									className="w-full"
									disabled={!form.formState.isValid}
									onClick={() => {
										const values = form.getValues();
										onSubmit({
											...values,
											isPublished: false,
										});
									}}
									type="button"
									variant="outline"
								>
									Save as Draft
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</form>
		</Form>
	);
}
