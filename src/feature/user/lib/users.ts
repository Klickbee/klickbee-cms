"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getAllUsers = async () => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.user.findMany({
		select: {
			createdAt: true,
			id: true,
			image: true,
			name: true,
		},
	});
};

export const getUserByIdForEdit = async (userId: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError;
	}

	return prisma.user.findUnique({
		select: {
			email: true,
			id: true,
			image: true,
			name: true,
		},
		where: {
			id: userId,
		},
	});
};
