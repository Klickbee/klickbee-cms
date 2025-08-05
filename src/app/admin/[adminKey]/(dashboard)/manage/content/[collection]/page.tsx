"use client";

import React, { Usable, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const mockData = [
	{
		author: "Louis",
		collection: "Projects",
		date: "Feb 11, 2025",
		name: "Spring Launch Campaign",
		seo: "100%",
		status: "Published",
	},
	{
		author: "Louis",
		collection: "Projects",
		date: "Feb 11, 2025",
		name: "Brand Refresh – NovaTech",
		seo: "100%",
		status: "Published",
	},
	{
		author: "Louis",
		collection: "Projects",
		date: "Feb 11, 2025",
		name: "Q4 Paid Ads Strategy – Solara Skin",
		seo: "100%",
		status: "Scheduled",
	},
	{
		author: "Louis",
		collection: "Projects",
		date: "Feb 11, 2025",
		name: "E-commerce UX Revamp – UrbanNest",
		seo: "100%",
		status: "Scheduled",
	},
	{
		author: "Louis",
		collection: "Projects",
		date: "Feb 11, 2025",
		name: "Social Launch Campaign – Drip Coffee Co.",
		seo: "50%",
		status: "Draft",
	},
];

type statusColor = {
	Published: string;
	Scheduled: string;
	Draft: string;
};
const statusColor: statusColor = {
	Draft: "bg-gray-200 text-gray-600",
	Published: "bg-green-100 text-green-700",
	Scheduled: "bg-blue-100 text-blue-700",
};

export default function AdminContentItemsPage({
	params,
}: {
	params: Usable<unknown>;
}) {
	const paramsSynced = React.use(params) as { collection: string };
	const [statusFilter, setStatusFilter] = useState<string>("All");
	const [search, setSearch] = useState<string>("");

	const filteredData = mockData.filter((item) => {
		return (
			(statusFilter === "All" || item.status === statusFilter) &&
			item.name.toLowerCase().includes(search.toLowerCase())
		);
	});

	return (
		<div className="p-6 space-y-6">
			<div>
				<h1 className="text-2xl font-bold">
					Contents Manager / {paramsSynced.collection}
				</h1>
				<p className="text-sm text-muted-foreground">
					View and manage all posts in this collection.
				</p>
			</div>

			<div className="flex items-center justify-between">
				<Input
					className="w-1/3"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search"
					value={search}
				/>
				<div className="flex items-center gap-2">
					<Select
						onValueChange={setStatusFilter}
						value={statusFilter}
					>
						<SelectTrigger className="w-40">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All Status</SelectItem>
							<SelectItem value="Published">Published</SelectItem>
							<SelectItem value="Scheduled">Scheduled</SelectItem>
							<SelectItem value="Draft">Draft</SelectItem>
						</SelectContent>
					</Select>
					<Button>+ Create Project</Button>
				</div>
			</div>

			<ScrollArea className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Collection</TableHead>
							<TableHead>Author</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date Post</TableHead>
							<TableHead>SEO Score</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredData.map((item, i) => (
							<TableRow key={i}>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.collection}</TableCell>
								<TableCell>{item.author}</TableCell>
								<TableCell>
									<span
										className={`text-xs px-2 py-1 rounded ${statusColor[item.status as keyof statusColor]}`}
									>
										{item.status}
									</span>
								</TableCell>
								<TableCell>{item.date}</TableCell>
								<TableCell>
									<Badge
										className={
											item.seo === "100%"
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-800"
										}
									>
										{item.seo}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</ScrollArea>
		</div>
	);
}
