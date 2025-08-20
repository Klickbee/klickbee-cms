import { queryOptions } from "@tanstack/react-query";
import { getAllUsers } from "@/feature/user/lib/users";

export const allUsersOptions = queryOptions({
	queryFn: async () => await getAllUsers(),
	queryKey: ["all_users"] as const,
});
