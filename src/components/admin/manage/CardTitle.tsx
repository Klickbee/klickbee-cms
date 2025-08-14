export default function DefaultCardTitle({
	children,
}: {
	children: React.ReactNode;
}) {
	return <h1 className={"text-xl font-semibold "}>{children}</h1>;
}
