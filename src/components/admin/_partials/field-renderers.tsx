import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface FieldRendererProps {
	label: string;
	value: unknown;
}

interface FileFieldData {
	type: "file";
	filename: string;
	url?: string;
}

interface TextFieldData {
	type: "text";
	value: string;
}

function isFileField(data: unknown): data is FileFieldData {
	return (
		typeof data === "object" &&
		data !== null &&
		"type" in data &&
		data.type === "file" &&
		"filename" in data &&
		typeof data.filename === "string"
	);
}

function isTextField(data: unknown): data is TextFieldData {
	return (
		typeof data === "object" &&
		data !== null &&
		"type" in data &&
		data.type === "text" &&
		"value" in data &&
		typeof data.value === "string"
	);
}

function FileFieldRenderer({
	label,
	data,
}: {
	label: string;
	data: FileFieldData;
}) {
	const tCommon = useTranslations("Common");
	return (
		<div className="space-y-2">
			<p className="font-semibold">{label}</p>
			<div className="border rounded-md p-4 bg-gray-50">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<FileText className="h-5 w-5 text-blue-600" />
						<span className="text-blue-600 font-medium">
							{data.filename}
						</span>
					</div>
					{data.url && (
						<Button asChild size="sm" variant="outline">
							<Link
								download={data.filename}
								href={data.url}
								rel="noopener noreferrer"
								target="_blank"
							>
								<Download className="h-4 w-4 mr-2" />
								{tCommon("Download")}
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

function TextFieldRenderer({
	label,
	data,
}: {
	label: string;
	data: TextFieldData;
}) {
	return (
		<div className="space-y-2">
			<p className="font-semibold">{label}</p>
			<p className="border rounded-md p-2 text-gray-500">{data.value}</p>
		</div>
	);
}

function FallbackFieldRenderer({
	label,
	value,
}: {
	label: string;
	value: unknown;
}) {
	return (
		<div className="space-y-2">
			<p className="font-semibold">{label}</p>
			<p className="border rounded-md p-2 text-gray-500">
				{typeof value === "string" ? value : JSON.stringify(value)}
			</p>
		</div>
	);
}

export function FieldRenderer({ label, value }: FieldRendererProps) {
	if (isFileField(value)) {
		return <FileFieldRenderer data={value} label={label} />;
	}

	if (isTextField(value)) {
		return <TextFieldRenderer data={value} label={label} />;
	}

	return <FallbackFieldRenderer label={label} value={value} />;
}
