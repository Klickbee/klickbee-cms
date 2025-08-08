import React from "react";

interface PageTitleProps {
	title: string;
}

export function PageTitle({ title }: PageTitleProps) {
	return <div className="text-primary font-medium px-4 py-3">{title}</div>;
}
