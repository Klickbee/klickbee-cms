import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface BulkActionsProps {
	checkedRows: number[];
	collectionsLength: number;
	onBulkDelete: () => void;
	onCreate: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
	checkedRows,
	collectionsLength,
	onBulkDelete,
	onCreate,
}) => {
	return checkedRows.length > 0 ? (
		<Button
			className={"flex flex-row gap-0"}
			onClick={onBulkDelete}
			variant="destructive"
		>
			<Trash2 className="w-4 h-4 mr-2" />
			Delete
		</Button>
	) : (
		<Button className={"flex flex-row gap-0"} onClick={onCreate}>
			<Plus className="w-4 h-4 mr-2" />
			Create New
		</Button>
	);
};

export default BulkActions;
