import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Sidebar } from "@/components/admin/_partials/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { userServerOptions } from "@/feature/user/options/userServerOptions";
import { getQueryClient } from "@/lib/getQueryClient";
import { UserProvider } from "@/providers/UserProvider";
import { ZodTranslationProvider } from "@/providers/ZodTranslationProvider";

export default async function AdminLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { adminKey: string };
}) {
	const messages = await getMessages();
	const locale = await getLocale();

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(userServerOptions);

	const currentUser = queryClient.getQueryData(userServerOptions.queryKey);

	if (!currentUser) {
		const { adminKey } = params;
		redirect(`/admin/${adminKey}/auth/login`);
	}
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<UserProvider>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ZodTranslationProvider>
						<div className="flex min-h-screen">
							<SidebarProvider>
								{currentUser && <Sidebar />}
								<main className="flex-1">
									{children}
									<Toaster />
								</main>
							</SidebarProvider>
						</div>
					</ZodTranslationProvider>
				</NextIntlClientProvider>
			</UserProvider>
		</HydrationBoundary>
	);
}
