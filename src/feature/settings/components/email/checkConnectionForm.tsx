"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendEmail } from "@/feature/send-email/queries/useSendEmail";
import {
	CheckConnectionSchema,
	checkConnectionSchema,
} from "@/feature/settings/schemas/emailSettingsSchema";

export default function CheckConnectionForm() {
	const checkConnectionForm = useForm<CheckConnectionSchema>({
		resolver: zodResolver(checkConnectionSchema),
	});
	const sendEmail = useSendEmail();

	const onCheckConnectionSubmit = async (data: CheckConnectionSchema) => {
		try {
			const result = await sendEmail.mutateAsync({
				subject: data.subject,
				text: data.text,
				to: data.to,
			});
			toast.success(result.message);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error";
			toast.error(errorMessage);
		}
	};

	return (
		<Form {...checkConnectionForm}>
			<form
				className="p-4 w-1/2 space-y-4"
				onSubmit={checkConnectionForm.handleSubmit(
					onCheckConnectionSubmit,
				)}
			>
				<FormField
					control={checkConnectionForm.control}
					name="to"
					render={({ field }) => (
						<FormItem>
							<FormLabel>To</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="To"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={checkConnectionForm.control}
					name="subject"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Subject</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Subject"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={checkConnectionForm.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Text</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="w-full"
									placeholder="Text"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={sendEmail.isPending} type="submit">
					{sendEmail.isPending ? "Sending..." : "Check connection"}
				</Button>
			</form>
		</Form>
	);
}
