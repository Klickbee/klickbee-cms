import { useSuspenseQuery } from "@tanstack/react-query";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";

export function useAllUsers() {
	return useSuspenseQuery(allUsersOptions);
}
