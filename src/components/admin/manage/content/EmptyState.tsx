import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmptyStateImage from "../../../../../public/empty_state.png";

export default function EmptyStateCollectionComponent() {
	return (
		<div className="border rounded-md p-6 flex flex-col items-center justify-center text-center">
			<div className="mb-4">
				<Image
					alt="No collections"
					height={141}
					src={EmptyStateImage}
					width={200}
				/>
			</div>
			<h2 className="text-base font-semibold mb-1">
				You don&apos;t have any collections yet
			</h2>
			<p className="text-sm text-muted-foreground mb-4 max-w-md">
				Organize your content easily with collections. Group similar
				pages, posts, or products to manage them more efficiently — all
				in one place.
			</p>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Create New Collection</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Create New Collection</DialogTitle>
						<DialogDescription>
							Create a new collection to organize your content.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="name"
							>
								Collection Name
							</label>
							<Input
								id="name"
								placeholder="Enter collection name"
							/>
						</div>
						<div className="grid gap-2">
							<label
								className="text-sm font-medium"
								htmlFor="description"
							>
								Description
							</label>
							<Input
								id="description"
								placeholder="Enter collection description"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Create Collection</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
