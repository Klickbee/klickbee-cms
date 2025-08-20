import { useSuspenseQuery } from "@tanstack/react-query";
import { userByIdForEditOptions } from "@/feature/user/options/userByIdOptions";

export function useUserForEdit(userId: string) {
	return useSuspenseQuery(userByIdForEditOptions(userId));
}
