import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteSetting,
	getSetting,
	setSetting,
	setUserSetting,
} from "@/feature/settings/lib/settings";

export function useSetting(key: string, userId?: string | null) {
	return useQuery({
		queryFn: async () => {
			const value = await getSetting(key, userId);
			return { value } as { value: string | null };
		},
		queryKey: ["setting", key, userId],
	});
}

export function useSetSetting() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: {
			key: string;
			value: string;
			userId?: string;
		}) => {
			if (!data.value) {
				await deleteSetting(data.key);
				return { message: "deleted" };
			}
			if (data.userId) {
				await setUserSetting(data.key, data.value, data.userId);
			} else {
				await setSetting(data.key, data.value);
			}
			return { message: "ok" };
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["setting", variables.key, variables.userId],
			});
		},
	});
}
