import { MoreHorizontal, Trash } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionsDropdownProps<T, TId = string | number> {
	row: { original: T };
	onDelete: (id: TId) => void;
	deleteTitle: string;
	deleteDescription: string;
	tCommon: (key: string) => string;
	children?: React.ReactNode;
}

export function ActionsDropdown<
	T extends { id: string | number; name?: string | null },
	TId = T["id"],
>({
	row,
	onDelete,
	deleteTitle,
	deleteDescription,
	tCommon,
	children,
}: ActionsDropdownProps<T, TId>) {
	return (
		<div className="flex justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="h-8 w-8 p-0" variant="ghost">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{children}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DropdownMenuItem
								className="text-destructive"
								onSelect={(e) => e.preventDefault()}
							>
								<Trash className="mr-2 h-4 w-4" />
								{tCommon("Delete")}
							</DropdownMenuItem>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									{deleteTitle}
								</AlertDialogTitle>
								<AlertDialogDescription>
									{deleteDescription}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>
									{tCommon("Cancel")}
								</AlertDialogCancel>
								<AlertDialogAction
									aria-label={`Confirm deletion of ${row.original.name || "item"}`}
									className="bg-destructive text-white hover:bg-destructive/90"
									onClick={() =>
										onDelete(row.original.id as TId)
									}
								>
									{tCommon("Delete")}
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
