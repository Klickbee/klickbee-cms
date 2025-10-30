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

interface UserFormProps {
	schema: z.ZodType;
	title: string;
	initialValues: FieldValues;
	onSubmit: (values: FieldValues) => Promise<void>;
	isSubmitting: boolean;
	submitButtonText: string;
	submittingText: string;
	showEmailField?: boolean;
}

export default function UserForm({
	schema,
	title,
	initialValues,
	onSubmit,
	isSubmitting,
	submitButtonText,
	submittingText,
	showEmailField = false,
}: UserFormProps) {
	const tCommon = useTranslations("Common");

	const form = useForm({
		defaultValues: initialValues,
		resolver: zodResolver(
			schema as z.ZodObject<Record<string, z.ZodString>>,
		),
	});

	const handleSubmit = form.handleSubmit(async (values) => {
		await onSubmit(values);
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-4" onSubmit={handleSubmit}>
						{showEmailField && (
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{tCommon("Email")}
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder={tCommon(
													"EmailPlaceholder",
												)}
												type="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{tCommon("Name")}</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder={tCommon(
												"NamePlaceholder",
											)}
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
