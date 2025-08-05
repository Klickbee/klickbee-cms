import React from "react";

export default function DefaultHeader({
	title,
	description,
}: {
	title?: string;
	description?: string;
}) {
	return (
		<div className={"px-8 py-4 flex flex-col gap-1"}>
			<h1 className="text-2xl font-semibold">{title}</h1>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
