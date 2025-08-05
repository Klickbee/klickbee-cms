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
		<Button onClick={onBulkDelete} variant="destructive">
			<Trash2 className="w-4 h-4 mr-2" />
			Delete Collections
		</Button>
	) : (
		<Button onClick={onCreate}>
			<Plus className="w-4 h-4 mr-2" />
			Create New Collection
		</Button>
	);
};

export default BulkActions;
