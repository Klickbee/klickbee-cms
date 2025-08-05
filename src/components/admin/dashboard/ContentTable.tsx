"use client";

import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const contents = [
	{
		collection: "Project",
		name: "Lorem Ipsum is simply dummy text",
		profile: { initials: "LU", src: "/avatar1.png" },
		seo: 100,
		status: { color: "green", date: null, label: "Published" },
	},
	{
		collection: "Project",
		name: "Lorem Ipsum is simply dummy text",
		profile: { initials: "JD", src: "/avatar2.png" },
		seo: 100,
		status: { color: "blue", date: "11/06/25", label: "Scheduled" },
	},
	{
		collection: "News",
		name: "Lorem Ipsum is simply dummy text",
		profile: { initials: "AB", src: "/avatar1.png" },
		seo: 100,
		status: { color: "blue", date: "09/06/25", label: "Scheduled" },
	},
	{
		collection: "Project",
		name: "Lorem Ipsum is simply dummy text",
		profile: { initials: "TS", src: "/avatar1.png" },
		seo: 50,
		status: { color: "orange", date: null, label: "Draft" },
	},
	{
		collection: "Project",
		name: "Lorem Ipsum is simply dummy text",
		profile: { initials: "MK", src: "/avatar2.png" },
		seo: 0,
		status: { color: "orange", date: null, label: "Draft" },
	},
];

function getStatusBadge(status: {
	label: string;
	color: string;
	date: string | null;
}) {
	const label =
		status.label === "Scheduled" && status.date
			? `Scheduled : ${status.date}`
			: status.label;

	const colorMap: Record<string, string> = {
		blue: "bg-blue-100 text-blue-800 border-blue-100",
		green: "bg-green-100 text-green-800 border-green-100",
		orange: "bg-orange-100 text-orange-800 border-orange-100",
	};

	return (
		<Badge
			className={`text-xs px-2 py-1.5 flex items-center justify-center font-medium rounded-md ${colorMap[status.color]}`}
			variant="outline"
		>
			{label}
		</Badge>
	);
}

function getSeoBadge(value: number) {
	let color = "bg-red-100 border-red-100 text-red-800";
	if (value === 100) color = "bg-green-100 border-green-100 text-green-800";
	else if (value >= 50)
		color = "bg-orange-100 border-orange-100 text-orange-800";

	return (
		<Badge
			className={`text-xs px-2 py-1.5 flex items-center justify-center  font-medium rounded-md ${color}`}
			variant="outline"
		>
			{value} %
		</Badge>
	);
}

export default function ContentTable() {
	return (
		<div className="px-16 py-8">
			<div className="flex justify-between items-center pb-4 ">
				<p className="text-xl font-semibold text-black">
					Your last content
				</p>
				<Button
					className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
					variant="outline"
				>
					Go to Content Manager{" "}
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
			<div className="border shadow-xs rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className=" px-4 w-12">
								<Checkbox
									aria-label="Select all"
									className="border-black/70"
								/>
							</TableHead>
							<TableHead className="text-sm font-medium text-gray-700">
								Name
							</TableHead>
							<TableHead className="text-sm font-medium text-gray-700">
								Collection
							</TableHead>
							<TableHead className="text-sm font-medium text-gray-700">
								Profil
							</TableHead>
							<TableHead className="text-sm font-medium text-gray-700">
								Statut
							</TableHead>
							<TableHead className="text-sm font-medium text-gray-700">
								SEO
							</TableHead>
							<TableHead className="text-right w-8"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{contents.map((item, i) => (
							<TableRow className="hover:bg-gray-50 " key={i}>
								<TableCell className="px-4">
									<Checkbox
										aria-label={`Select row ${i}`}
										className="border-black/70"
									/>
								</TableCell>
								<TableCell>
									<span className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">
										{item.name}
									</span>
								</TableCell>
								<TableCell className="text-sm font-semibold text-gray-700">
									{item.collection}
								</TableCell>
								<TableCell>
									<Avatar className="h-8 w-8">
										<AvatarImage src={item.profile.src} />
										<AvatarFallback>
											{item.profile.initials}
										</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell>
									{getStatusBadge(item.status)}
								</TableCell>
								<TableCell>{getSeoBadge(item.seo)}</TableCell>
								<TableCell className="text-right  text-gray-500 px-4 ">
									<Button
										className="cursor-pointer"
										size={"icon"}
										variant="ghost"
									>
										<ThreeDots />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

type ThreeDotsProps = {
	size?: string;
};

export const ThreeDots = ({ size = "16" }: ThreeDotsProps) => (
	<svg
		height={size}
		viewBox="0 0 16 16"
		width={size}
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
			fill="currentColor"
		/>
	</svg>
);
