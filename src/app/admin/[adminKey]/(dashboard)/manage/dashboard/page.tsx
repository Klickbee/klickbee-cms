import React from "react";
import ContentTable from "@/components/admin/dashboard/ContentTable";

function page() {
	return (
		<main className="h-auto flex-1">
			<div className="py-8 px-16 border-b">
				<h1 className="text-3xl font-semibold">
					Welcome <span className="text-blue-500">Louis</span>
				</h1>
				<p className="text-base text-gray-500 mb-6">
					Manage your content your way.
				</p>
			</div>

			<ContentTable />
		</main>
	);
}

export default page;
