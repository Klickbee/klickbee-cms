import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { ZodTranslationProvider } from "@/providers/ZodTranslationProvider";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const messages = await getMessages();
	const locale = await getLocale();
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<ZodTranslationProvider>
				{children}
				<Toaster />
			</ZodTranslationProvider>
		</NextIntlClientProvider>
	);
}
