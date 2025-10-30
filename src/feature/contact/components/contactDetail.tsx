"use client";

import { useTranslations } from "next-intl";
import { useContactById } from "@/feature/contact/queries/useContactById";
import { Contact } from "@/feature/contact/types/contact";
import { ContentRenderer } from "../../../components/admin/_partials/content-renderer";

interface ContactDetailProps {
	contactId: string;
}

export default function ContactDetail({ contactId }: ContactDetailProps) {
	const { data: contact } = useContactById(contactId);
	const tCommon = useTranslations("Common");

	const contactData = contact as Contact;

	if (!contactData) {
		return <div>Contact not found</div>;
	}

	return (
		<div className="space-y-6">
			{contactData.email && (
				<div className="space-y-2">
					<p className="font-semibold">{tCommon("Email")}</p>
					<p className="border rounded-md p-2 text-gray-500">
						{contactData.email}
					</p>
				</div>
			)}
			{contactData.number && (
				<div className="space-y-2">
					<p className="font-semibold">{tCommon("PhoneNumber")}</p>
					<p className="border rounded-md p-2 text-gray-500">
						{contactData.number}
					</p>
				</div>
			)}
			{contactData.content && (
				<ContentRenderer content={contactData.content} />
			)}
		</div>
	);
}
