// Hook pour exposer l'instance table aux composants de pagination

import { ColumnDef } from "@tanstack/react-table";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { useAdminKeyStore } from "@/feature/admin-key/stores/storeAdminKey";
import { createColumns } from "@/feature/settings/components/users/usersTableColumns";
import { allUsersOptions } from "@/feature/user/options/allUsersOptions";
import { useAllUsers } from "@/feature/user/queries/useAllUsers";
import { useDeleteUser } from "@/feature/user/queries/useDeleteUser";
import { useUserSearchStore } from "@/feature/user/stores/storeUserSearch";
import { useUserSelectionStore } from "@/feature/user/stores/storeUserSelection";
import { getQueryClient } from "@/lib/getQueryClient";
import { useGenericTable } from "@/lib/hooks/useGenericTable";

export function useUsersTable() {
	const { data: users } = useAllUsers();
	const deleteUserMutation = useDeleteUser();
	const queryClient = getQueryClient();
	const { setSelectedItems } = useUserSelectionStore();
	const { searchQuery } = useUserSearchStore();
	const adminKey = useAdminKeyStore((state) => state.adminKey);
	const t = useTranslations("SettingsUsers");
	const tCommon = useTranslations("Common");
	const locale = useLocale();

	const userData = Array.isArray(users) ? users : [];

	const handleDeleteUser = useCallback(
		(userId: string) => {
			deleteUserMutation.mutate(userId, {
				onError: () => {
					toast.error(t("DeleteUserError"));
				},
				onSuccess: async (result) => {
					if (result) {
						await queryClient.invalidateQueries({
							queryKey: allUsersOptions.queryKey,
						});
						toast.success(t("DeleteUserSuccess"));
					}
				},
			});
		},
		[deleteUserMutation, queryClient, t],
	);

	const columns = createColumns(
		t,
		tCommon,
		locale,
		adminKey ?? "",
		handleDeleteUser,
	);

	return useGenericTable({
		columns: columns as ColumnDef<(typeof userData)[number]>[],
		data: userData,
		searchQuery,
		setSelectedItems,
	});
}
