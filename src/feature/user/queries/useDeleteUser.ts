import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/feature/auth/lib/authClient";

export function useDeleteUser() {
	return useMutation({
		mutationFn: async (userId: string) => {
			const { data: deletedUser, error } =
				await authClient.admin.removeUser({
					userId,
				});

			if (error) {
				throw new Error(error.message || "Failed to delete user");
			}

			return deletedUser;
		},
	});
}
