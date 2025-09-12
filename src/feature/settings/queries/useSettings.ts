import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSetting(key: string, userId?: string | null) {
	return useQuery({
		queryFn: async () => {
			const params = new URLSearchParams({
				key,
				...(userId ? { userId } : {}),
			});
			const res = await fetch(`/api/admin/settings?${params}`);
			if (!res.ok) throw new Error("Loading error");
			return res.json() as Promise<{ value: string | null }>;
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
			const res = await fetch("/api/admin/settings", {
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			});
			if (!res.ok) throw new Error(`Save error on setting: ${data.key}`);
			return res.json();
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["setting", variables.key, variables.userId],
			});
		},
	});
}
