import { Badge } from "@/components/ui/badge";

export default function SeoBadge({ score }: { score: number }) {
	return (
		<Badge variant={score >= 80 ? "success" : "warning"}>{score}%</Badge>
	);
}
