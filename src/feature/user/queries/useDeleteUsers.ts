import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/feature/auth/lib/authClient";

export function useDeleteUsers() {
	return useMutation({
		mutationFn: async (userIds: string[]) => {
			const deletePromises = userIds.map(async (userId) => {
				const { data: deletedUser, error } =
					await authClient.admin.removeUser({
						userId,
					});

				if (error) {
					throw new Error(
						`Failed to delete user ${userId}: ${error.message}`,
					);
				}

				return deletedUser;
			});

			return await Promise.all(deletePromises);
		},
	});
}
