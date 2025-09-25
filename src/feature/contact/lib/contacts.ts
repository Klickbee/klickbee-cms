"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import {
	getMockContactById,
	mockContacts,
} from "@/feature/contact/lib/mockContacts";
import { prisma } from "@/lib/prisma";

export const getAllContacts = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	if (process.env.NODE_ENV === "development") {
		return mockContacts;
	}

	return prisma.contact.findMany({
		orderBy: {
			createdAt: "desc",
		},
		select: {
			content: true,
			createdAt: true,
			email: true,
			id: true,
			name: true,
			number: true,
			submitDate: true,
		},
	});
};

export const getContactById = async (id: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	if (process.env.NODE_ENV === "development") {
		return getMockContactById(parseInt(id));
	}

	return prisma.contact.findUnique({
		select: {
			content: true,
			createdAt: true,
			email: true,
			id: true,
			name: true,
			number: true,
			submitDate: true,
		},
		where: { id: parseInt(id) },
	});
};

export const deleteContacts = async (ids: string[]) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	if (process.env.NODE_ENV === "development") {
		// delete mock contacts from mockContacts
		ids.forEach((id) => {
			const mock = getMockContactById(parseInt(id));
			if (mock) {
				const index = mockContacts.findIndex(
					(contact) => contact.id === parseInt(id),
				);
				if (index !== -1) {
					mockContacts.splice(index, 1);
				}
			}
		});
		return {
			count: ids.length,
		};
	}

	return prisma.contact.deleteMany({
		where: {
			id: {
				in: ids.map((id) => parseInt(id)),
			},
		},
	});
};
