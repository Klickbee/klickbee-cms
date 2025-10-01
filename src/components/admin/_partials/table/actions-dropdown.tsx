import { Copy, Edit, Eye, MoreHorizontal, Search, Trash } from "lucide-react";
import Link from "next/link";
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

export interface ActionConfig {
	type: "edit" | "preview" | "duplicate" | "seo" | "delete" | "custom";
	label: string;
	href?: string;
	onClick?: () => void;
	target?: "_blank" | "_self";
	className?: string;
}

interface ActionsDropdownProps<T, TId = string | number> {
	row: { original: T };
	actions?: ActionConfig[];
	onDelete?: (id: TId) => void;
	deleteTitle?: string;
	deleteDescription?: string;
	tCommon: (key: string) => string;
	children?: React.ReactNode;
}

function getActionIcon(type: ActionConfig["type"]) {
	switch (type) {
		case "edit":
			return <Edit className="mr-2 h-4 w-4" />;
		case "preview":
			return <Eye className="mr-2 h-4 w-4" />;
		case "duplicate":
			return <Copy className="mr-2 h-4 w-4" />;
		case "seo":
			return <Search className="mr-2 h-4 w-4" />;
		case "delete":
			return <Trash className="mr-2 h-4 w-4" />;
		default:
			return null;
	}
}

export function ActionsDropdown<
	T extends { id: string | number; name?: string | null },
	TId = T["id"],
>({
	row,
	actions = [],
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
					{actions.map((action, index) => {
						if (action.type === "delete") {
							return (
								<AlertDialog key={index}>
									<AlertDialogTrigger asChild>
										<DropdownMenuItem
											className="text-destructive"
											onSelect={(e) => e.preventDefault()}
										>
											{getActionIcon(action.type)}
											{action.label}
										</DropdownMenuItem>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												{deleteTitle || "Delete Item"}
											</AlertDialogTitle>
											<AlertDialogDescription>
												{deleteDescription ||
													"This action cannot be undone."}
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												{tCommon("Cancel")}
											</AlertDialogCancel>
											<AlertDialogAction
												aria-label={`Confirm deletion of ${row.original.name || "item"}`}
												className="bg-destructive text-white hover:bg-destructive/90"
												onClick={() => {
													if (action.onClick)
														action.onClick();
													if (onDelete)
														onDelete(
															row.original
																.id as TId,
														);
												}}
											>
												{tCommon("Delete")}
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							);
						}

						if (action.href) {
							return (
								<DropdownMenuItem asChild key={index}>
									<Link
										className={action.className}
										href={action.href}
										rel={
											action.target === "_blank"
												? "noopener noreferrer"
												: undefined
										}
										target={action.target}
									>
										{getActionIcon(action.type)}
										{action.label}
									</Link>
								</DropdownMenuItem>
							);
						}

						return (
							<DropdownMenuItem
								className={action.className}
								key={index}
								onClick={action.onClick}
							>
								{getActionIcon(action.type)}
								{action.label}
							</DropdownMenuItem>
						);
					})}
					{children}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
