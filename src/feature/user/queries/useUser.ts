import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/feature/user/options/userOptions";

export function useCurrentUser() {
	return useSuspenseQuery(userOptions);
}
