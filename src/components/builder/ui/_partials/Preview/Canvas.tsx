"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrentPageStore } from "@/builder/store/storeCurrentPage";
import { Breakpoint } from "@/builder/types/breakpoint";
import { BuilderComponent } from "@/builder/types/components/components";
import BuilderPreviewViewport from "@/components/builder/ui/_partials/Preview/_partials/Viewport";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	useSetSetting,
	useSetting,
} from "@/feature/settings/queries/useSettings";

export default function BuilderPreviewCanvas() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [zoom, setZoom] = useState(1);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const start = useRef({ x: 0, y: 0 });
	const [addingBreakpoint, setAddingBreakpoint] = useState(false);
	const [removingBreakpoint, setRemovingBreakpoint] = useState(false);
	const [breakpointToRemove, setBreakpointToRemove] = useState<string>("");
	const [newBreakpoint, setNewBreakpoint] = useState<Breakpoint>({
		name: "",
		width: 0,
	});
	const { data: breakpointsRaw } = useSetting("builder_breakpoints") || [];
	const breakpoints = breakpointsRaw?.value
		? JSON.parse(breakpointsRaw.value)
		: [];
	const currentPage = useCurrentPageStore((state) => state.currentPage);
	const setSettingMutation = useSetSetting();

	const addBreakpoint = (newBreakpoint: Breakpoint) => {
		const newBp = {
			name: newBreakpoint.name,
			width: newBreakpoint.width,
		};
		breakpoints.push(newBp);
		breakpoints.sort((a: Breakpoint, b: Breakpoint) => b.width - a.width);
		setSettingMutation.mutateAsync({
			key: "builder_breakpoints",
			value: JSON.stringify(breakpoints),
		});
	};

	const initiateRemoveBreakpoint = (breakpointName: string) => {
		setBreakpointToRemove(breakpointName);
		setRemovingBreakpoint(true);
	};

	const confirmRemoveBreakpoint = () => {
		const updatedBreakpoints = breakpoints.filter(
			(bp: Breakpoint) => bp.name !== breakpointToRemove,
		);
		setSettingMutation.mutateAsync({
			key: "builder_breakpoints",
			value: JSON.stringify(updatedBreakpoints),
		});
		setRemovingBreakpoint(false);
		setBreakpointToRemove("");
	};
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const handleWheel = (e: WheelEvent) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				const delta = e.deltaY > 0 ? -0.05 : 0.05;
				setZoom((z) => Math.min(2, Math.max(0.2, z + delta)));
			}
		};

		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		// Only set dragging to true when middle mouse button is pressed (button === 1)
		if (e.button === 1) {
			setIsDragging(true);
			start.current = {
				x: e.clientX - offset.x,
				y: e.clientY - offset.y,
			};
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		setOffset({
			x: e.clientX - start.current.x,
			y: e.clientY - start.current.y,
		});
	};

	const handleMouseUp = () => setIsDragging(false);

	const handleAddBreakpoint = () => {
		setAddingBreakpoint(true);
	};

	const handleSaveBreakpoint = () => {
		if (newBreakpoint.name && newBreakpoint.width > 0) {
			// Add new breakpoint (sorting is handled in the store)
			addBreakpoint(newBreakpoint);
			setNewBreakpoint({ name: "", width: 0 });
			setAddingBreakpoint(false);
		}
	};
	return (
		<>
			<div
				className="w-full h-[90vh] overflow-hidden bg-zinc-800 relative"
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseUp}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				ref={containerRef}
			>
				<div
					className="absolute top-0 left-0"
					style={{
						cursor: isDragging ? "grabbing" : "default",
						transform: `translate(${offset.x}px, ${offset.y}px)`,
					}}
				>
					<div
						className="flex gap-8 px-10 py-12"
						style={{
							transform: `scale(${zoom})`,
							transformOrigin: "top left",
						}}
					>
						{breakpoints.map((bp: Breakpoint) => (
							<BuilderPreviewViewport
								bp={bp}
								content={
									currentPage.content as BuilderComponent[]
								}
								handleAddBreakpoint={handleAddBreakpoint}
								handleRemoveBreakpoint={
									initiateRemoveBreakpoint
								}
								key={bp.name}
							/>
						))}
					</div>
				</div>
			</div>
			<Dialog onOpenChange={setAddingBreakpoint} open={addingBreakpoint}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Breakpoint</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="name">
								Name
							</Label>
							<Input
								className="col-span-3"
								id="name"
								onChange={(e) =>
									setNewBreakpoint({
										...newBreakpoint,
										name: e.target.value,
									})
								}
								placeholder="e.g. Tablet Portrait"
								value={newBreakpoint.name}
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right" htmlFor="width">
								Width (px)
							</Label>
							<Input
								className="col-span-3"
								id="width"
								onChange={(e) =>
									setNewBreakpoint({
										...newBreakpoint,
										width: parseInt(e.target.value) || 0,
									})
								}
								placeholder="e.g. 768"
								type="number"
								value={newBreakpoint.width || ""}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							onClick={() => setAddingBreakpoint(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button onClick={handleSaveBreakpoint}>
							Add Breakpoint
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog
				onOpenChange={setRemovingBreakpoint}
				open={removingBreakpoint}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Remove Breakpoint</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<p>
							Are you sure you want to remove the breakpoint "
							{breakpointToRemove}"?
						</p>
						<p className="text-sm text-muted-foreground mt-2">
							This action cannot be undone.
						</p>
					</div>
					<DialogFooter>
						<Button
							onClick={() => setRemovingBreakpoint(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							onClick={confirmRemoveBreakpoint}
							variant="destructive"
						>
							Remove Breakpoint
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
