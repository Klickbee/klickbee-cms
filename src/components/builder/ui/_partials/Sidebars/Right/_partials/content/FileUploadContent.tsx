"use client";

import { useState } from "react";
import { BuilderComponent } from "@/builder/types/components/components";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import PropertyColumn from "../layout/PropertyColumn";
import PropertyRow from "../layout/PropertyRow";
import ToggleButton from "./ToggleButton";

interface FileUploadContentProps {
	component: BuilderComponent;
}

export default function FileUploadContent({
	component,
}: FileUploadContentProps) {
	const fieldName = component.props.content?.name || "Field Name Here";
	const fieldLabel = component.props.content?.label || "Label Name Here";
	const required = component.props.content?.required ?? true;
	const mimeType = component.props.content?.mimeTypes || "PDF";
	const [maxFileSize, setMaxFileSize] = useState(
		component.props.content?.maxFileSize || 2,
	);

	return (
		<div className="flex flex-col gap-3">
			<PropertyColumn label="Field Name">
				<Input
					className="h-8"
					placeholder="Field Name Here"
					value={fieldName}
				/>
			</PropertyColumn>

			<PropertyColumn label="Label">
				<Input
					className="h-8"
					placeholder="Label Name Here"
					value={fieldLabel}
				/>
			</PropertyColumn>

			<ToggleButton
				label="Required"
				onChange={(value) => {
					// TODO: Update component props in store
				}}
				value={required}
			/>

			<PropertyRow label="File Type">
				<Select value={mimeType}>
					<SelectTrigger className="h-8">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="PDF">PDF</SelectItem>
					</SelectContent>
				</Select>
			</PropertyRow>

			<PropertyRow label="Max File Size">
				<div className="flex">
					<Input
						className="h-8 px-3 rounded-r-none border-r-0"
						min="1"
						onChange={(e) => setMaxFileSize(Number(e.target.value))}
						type="number"
						value={maxFileSize}
					/>
					<div className="bg-white border border-zinc-200 border-l-0 rounded-r-md h-8 px-2 flex items-center text-xs text-zinc-500 shadow-sm">
						mb
					</div>
				</div>
			</PropertyRow>
		</div>
	);
}
