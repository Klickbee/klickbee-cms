"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { prisma } from "@/lib/prisma";

export const getSetting = async (key: string, userId?: string | null) => {
	// const authError = await isAuthenticatedGuard();
	// if (authError) {
	// 	return authError as never;
	// }

	if (userId) {
		const userSetting = await prisma.userSettings.findUnique({
			where: { key_userId: { key, userId } },
		});
		if (userSetting) return userSetting.value;
	}
	const setting = await prisma.settings.findUnique({ where: { key } });
	return setting?.value ?? null;
};

export const setUserSetting = async (
	key: string,
	value: string,
	userId: string,
) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError as never;
	}
	return prisma.userSettings.upsert({
		create: { key, userId, value },
		update: { value },
		where: { key_userId: { key, userId } },
	});
};

export const setSetting = async (key: string, value: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError as never;
	}
	return prisma.settings.upsert({
		create: { key, value },
		update: { value },
		where: { key },
	});
};

export const deleteSetting = async (key: string) => {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		return authError as never;
	}
	return prisma.settings.delete({
		where: { key },
	});
};
