"use server";

import prisma from "@/lib/prisma";

export const getAllAuthors = async () => {
	return prisma.user.findMany({
		select: {
			id: true,
			image: true,
			name: true,
		},
	});
};
