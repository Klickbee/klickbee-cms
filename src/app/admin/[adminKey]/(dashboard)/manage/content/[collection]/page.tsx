import React, { Usable } from "react";

export default function AdminContentItemsPage({
	params,
}: {
	params: Usable<unknown>;
}) {
	const paramsSynced = React.use(params) as { slug: string };

	return (
		<div>
			<p>Will show items for collection:{paramsSynced.slug}</p>
		</div>
	);
}
