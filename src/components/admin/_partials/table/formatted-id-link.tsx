import Link from "next/link";

interface FormattedIdLinkProps {
	id: number;
	href: string;
	className?: string;
}

export function FormattedIdLink({
	id,
	href,
	className = "text-blue-600 hover:text-blue-800 hover:underline font-medium",
}: FormattedIdLinkProps) {
	const formattedId = `#${id.toString().padStart(3, "0")}`;

	return (
		<Link className={className} href={href}>
			{formattedId}
		</Link>
	);
}
