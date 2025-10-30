"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePageSeo } from "@/feature/page/queries/usePageActions";
import type { Page } from "@/feature/page/types/page";

// SEO form schema
const seoFormSchema = z.object({
	metaDescription: z
		.string()
		.max(160, "Meta Description should be under 160 characters"),
	metaTitle: z.string().max(60, "Meta Title should be under 60 characters"),
	slug: z.string().min(1, "URL is required"),
});

type SeoFormValues = z.infer<typeof seoFormSchema>;

interface GooglePreviewProps {
	page?: Page;
	baseUrl?: string;
	formValues?: SeoFormValues;
}

function GoogleSearchPreview({
	page,
	baseUrl,
	formValues,
}: GooglePreviewProps) {
	if (!page) return null;

	// Use form values if available, otherwise fallback to page data
	const currentSlug = formValues?.slug || page.slug || "";
	const currentMetaTitle = formValues?.metaTitle || page.metaTitle || "";
	const currentMetaDescription =
		formValues?.metaDescription || page.metaDescription || "";

	// Use metaTitle if available, otherwise fallback to page title
	const displayTitle = currentMetaTitle || page.title || "Page sans titre";
	// Use metaDescription if available, otherwise generate a default description
	const description =
		currentMetaDescription || `Découvrez ${page.title} sur notre site web.`;
	// Limit description to ~160 characters like Google
	const truncatedDescription =
		description.length > 160
			? description.substring(0, 157) + "..."
			: description;

	return (
		<div className="rounded-lg p-4 bg-muted w-full">
			<div className="flex items-center gap-0 mb-3">
				{baseUrl} <ChevronRight className="w-4 h-4 text-gray-500" />
				<span className="text-gray-500 text-xs">{currentSlug}</span>
			</div>
			<span className="text-xl text-blue-800 mb-2">{displayTitle}</span>
			<p className="text-sm text-gray-900">{truncatedDescription}</p>
		</div>
	);
}

export default function SeoPage({ page }: { page?: Page }) {
	const pageUpdateSeo = useUpdatePageSeo();
	const t = useTranslations("Pages");
	const tCommon = useTranslations("Common");
	const [baseUrl, setBaseUrl] = useState<string>("https://example.com");

	// Get base URL from current URL
	useEffect(() => {
		if (typeof window !== "undefined") {
			const { protocol, hostname, port } = window.location;
			const portSuffix =
				port && port !== "80" && port !== "443" ? `:${port}` : "";
			setBaseUrl(`${protocol}//${hostname}${portSuffix}`);
		}
	}, []);

	// SEO form setup
	const seoForm = useForm<SeoFormValues>({
		defaultValues: {
			metaDescription: page?.metaDescription || "",
			metaTitle: page?.metaTitle || "",
			slug: page?.slug || "",
		},
		mode: "onChange", // Enable real-time validation and form value updates
		resolver: zodResolver(seoFormSchema),
	});

	// Watch form values for real-time preview updates
	const watchedValues = seoForm.watch();

	// Form submission handler
	async function onSubmit(values: SeoFormValues) {
		try {
			await pageUpdateSeo.mutateAsync({
				data: values,
				pageId: page?.id || 0,
			});
			toast.success("SEO settings updated successfully!");
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: typeof error === "string"
						? error
						: "UnknownError";
			toast.error(t(errorMessage));
			console.error(error);
		}
	}

	return (
		<Card className="gap-0 py-0">
			<CardHeader className="py-3 px-4 gap-0 flex flex-row justify-between items-center border-b">
				<CardTitle>
					{t("SeoTitle", { title: page?.title || "" })}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4 space-y-6">
				{/* Google preview section */}
				<div>
					<p className="text-sm font-medium mb-2">
						{t("GoogleSeo")} :
					</p>
					<GoogleSearchPreview
						baseUrl={baseUrl}
						formValues={watchedValues}
						page={page}
					/>
				</div>

				{/* SEO Form */}
				<Form {...seoForm}>
					<form
						className="space-y-4"
						onSubmit={seoForm.handleSubmit(onSubmit)}
					>
						<FormField
							control={seoForm.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("Slug")}</FormLabel>
									<FormControl>
										<Input
											placeholder="my-page"
											{...field}
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={seoForm.control}
							name="metaTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("MetaTitle")}</FormLabel>
									<FormControl>
										<Input
											placeholder="Meta Title"
											{...field}
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={seoForm.control}
							name="metaDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{t("MetaDescription")}
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Meta Description"
											{...field}
											className="w-full"
											rows={3}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-start">
							<Button
								className="bg-black text-white hover:bg-gray-800"
								disabled={seoForm.formState.isSubmitting}
								type="submit"
							>
								<Save />
								{seoForm.formState.isSubmitting
									? tCommon("Saving")
									: tCommon("Save")}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
