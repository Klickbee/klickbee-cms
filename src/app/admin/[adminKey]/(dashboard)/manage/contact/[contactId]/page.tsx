import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import DashboardTitle from "@/components/admin/_partials/dashboardTitle";
import ContactDetail from "@/feature/contact/components/contactDetail";
import { contactByIdOptions } from "@/feature/contact/options/contactByIdOptions";
import { Contact } from "@/feature/contact/types/contact";
import { getQueryClient } from "@/lib/getQueryClient";

interface PageProps {
	params: Promise<{
		adminKey: string;
		contactId: string;
	}>;
}

export default async function Page({ params }: PageProps) {
	const { adminKey, contactId } = await params;

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(contactByIdOptions(contactId));

	const contact = queryClient.getQueryData(
		contactByIdOptions(contactId).queryKey,
	) as Contact | undefined;

	if (!adminKey || !contact) {
		redirect(`/admin/${adminKey}/manage/contact`);
	}

	const contactIdFormatted = `#${contact.id.toString().padStart(3, "0")}`;

	const contactDate = new Date(contact.submitDate).toLocaleDateString(
		"fr-FR",
		{
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<section className="flex flex-col gap-4">
				<DashboardTitle
					hasBackButton
					subtitle="FromContactAt"
					subtitleParams={{ date: contactDate }}
					title=""
					titleContent={
						<span>
							{contactIdFormatted}
							{contact.name && (
								<>
									{" - "}
									<span className="text-primary">
										{contact.name}
									</span>
								</>
							)}
						</span>
					}
					translationNamespace="Contacts"
				/>
				<div className="p-12">
					<ContactDetail contactId={contactId} />
				</div>
			</section>
		</HydrationBoundary>
	);
}
