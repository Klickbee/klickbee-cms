"use client";

import CodeBlock from "@tiptap/extension-code-block";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	ChevronDown,
	Code,
	Eraser,
	Image as ImageIcon,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Minus,
	Palette,
	Quote,
	Redo,
	Strikethrough,
	Type,
	Underline as UnderlineIcon,
	Undo,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useContentProps } from "@/feature/builder/hooks/useContentProps";
import { useContentUpdate } from "@/feature/builder/hooks/useContentUpdate";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import ColorPicker from "../pickers/ColorPickerContent";

interface RichTextContentProps {
	component: BuilderComponent;
}

export default function RichTextContent({ component }: RichTextContentProps) {
	const t = useTranslations("Builder.RightSidebar.Content");
	const { content } = useContentProps(component, {
		content: "",
	});

	const { updateSingleField } = useContentUpdate(component);

	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const [textColor, setTextColor] = useState("#000000");

	const editor = useEditor({
		content: content || "",
		editorProps: {
			attributes: {
				class: "focus:outline-none min-h-[120px] p-3 text-sm prose prose-sm max-w-none",
			},
		},
		extensions: [
			StarterKit.configure({
				// Enable headings for text style dropdown
				heading: {
					levels: [1, 2, 3, 4, 5, 6],
				},
			}),
			Underline,
			TextStyle,
			Color.configure({
				types: ["textStyle"],
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Link.configure({
				HTMLAttributes: {
					class: "text-blue-600 underline cursor-pointer",
				},
				linkOnPaste: true,
				openOnClick: false,
			}),
			Image.configure({
				HTMLAttributes: {
					class: "max-w-full h-auto rounded",
				},
			}),
			CodeBlock.configure({
				HTMLAttributes: {
					class: "bg-gray-100 p-3 rounded text-sm font-mono",
				},
			}),
		],
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			updateSingleField("content", html);
		},
	});

	// Update editor content when content prop changes
	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content || "", { emitUpdate: false });
		}
	}, [content, editor]);

	if (!editor) {
		return null;
	}

	// Toolbar action handlers
	const handleUndo = () => editor.chain().focus().undo().run();
	const handleRedo = () => editor.chain().focus().redo().run();
	const toggleBold = () => editor.chain().focus().toggleBold().run();
	const toggleItalic = () => editor.chain().focus().toggleItalic().run();
	const toggleUnderline = () =>
		editor.chain().focus().toggleUnderline().run();
	const toggleStrike = () => editor.chain().focus().toggleStrike().run();
	const toggleCode = () => editor.chain().focus().toggleCode().run();
	const clearFormat = () => editor.chain().focus().unsetAllMarks().run();
	const toggleBulletList = () =>
		editor.chain().focus().toggleBulletList().run();
	const toggleOrderedList = () =>
		editor.chain().focus().toggleOrderedList().run();
	const toggleBlockquote = () =>
		editor.chain().focus().toggleBlockquote().run();
	const addHorizontalRule = () =>
		editor.chain().focus().setHorizontalRule().run();

	// Text style helpers
	const setTextStyle = (style: string) => {
		switch (style) {
			case "paragraph":
				editor.chain().focus().setParagraph().run();
				break;
			case "h1":
				editor.chain().focus().toggleHeading({ level: 1 }).run();
				break;
			case "h2":
				editor.chain().focus().toggleHeading({ level: 2 }).run();
				break;
			case "h3":
				editor.chain().focus().toggleHeading({ level: 3 }).run();
				break;
			case "h4":
				editor.chain().focus().toggleHeading({ level: 4 }).run();
				break;
			case "h5":
				editor.chain().focus().toggleHeading({ level: 5 }).run();
				break;
			case "h6":
				editor.chain().focus().toggleHeading({ level: 6 }).run();
				break;
		}
	};

	// Get current text style
	const getCurrentTextStyle = () => {
		if (editor.isActive("heading", { level: 1 })) return t("heading1");
		if (editor.isActive("heading", { level: 2 })) return t("heading2");
		if (editor.isActive("heading", { level: 3 })) return t("heading3");
		if (editor.isActive("heading", { level: 4 })) return t("heading4");
		if (editor.isActive("heading", { level: 5 })) return t("heading5");
		if (editor.isActive("heading", { level: 6 })) return t("heading6");
		return t("normalText");
	};

	// Text alignment handlers
	const setTextAlign = (
		alignment: "left" | "center" | "right" | "justify",
	) => {
		editor.chain().focus().setTextAlign(alignment).run();
	};

	// Get current alignment
	const getCurrentAlignment = () => {
		if (editor.isActive({ textAlign: "center" })) return "center";
		if (editor.isActive({ textAlign: "right" })) return "right";
		if (editor.isActive({ textAlign: "justify" })) return "justify";
		return "left";
	};

	// Color change handler
	const handleColorChange = (color: string) => {
		setTextColor(color);
		editor.chain().focus().setColor(color).run();
	};

	// Link handler
	const toggleLink = () => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		// update link
		editor
			.chain()
			.focus()
			.extendMarkRange("link")
			.setLink({ href: url })
			.run();
	};

	// Image handler
	const addImage = () => {
		const url = window.prompt("Enter image URL:");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div className="space-y-4">
			<div className="bg-white rounded-md border border-gray-200 shadow-sm">
				{/* Comprehensive Toolbar */}
				<div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
					{/* History Group */}
					<div className="flex items-center gap-1">
						<Button
							className="h-8 w-8 p-0"
							disabled={!editor.can().undo()}
							onClick={handleUndo}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Undo className="w-4 h-4" />
						</Button>
						<Button
							className="h-8 w-8 p-0"
							disabled={!editor.can().redo()}
							onClick={handleRedo}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Redo className="w-4 h-4" />
						</Button>
					</div>

					<Separator className="h-6 mx-1" orientation="vertical" />

					{/* Text Style Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="h-8 px-3 gap-1"
								size="sm"
								variant="ghost"
							>
								<Type className="w-4 h-4" />
								<span className="text-sm">
									{getCurrentTextStyle()}
								</span>
								<ChevronDown className="w-3 h-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-40">
							<DropdownMenuItem
								onClick={() => setTextStyle("paragraph")}
							>
								{t("normalText")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h1")}
							>
								{t("heading1")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h2")}
							>
								{t("heading2")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h3")}
							>
								{t("heading3")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h4")}
							>
								{t("heading4")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h5")}
							>
								{t("heading5")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextStyle("h6")}
							>
								{t("heading6")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Separator className="h-6 mx-1" orientation="vertical" />

					{/* Text Alignment Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="h-8 w-8 p-0"
								size="sm"
								variant="ghost"
							>
								{getCurrentAlignment() === "center" && (
									<AlignCenter className="w-4 h-4" />
								)}
								{getCurrentAlignment() === "right" && (
									<AlignRight className="w-4 h-4" />
								)}
								{getCurrentAlignment() === "justify" && (
									<AlignJustify className="w-4 h-4" />
								)}
								{getCurrentAlignment() === "left" && (
									<AlignLeft className="w-4 h-4" />
								)}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start">
							<DropdownMenuItem
								onClick={() => setTextAlign("left")}
							>
								<AlignLeft className="w-4 h-4 mr-2" />
								{t("alignLeft")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextAlign("center")}
							>
								<AlignCenter className="w-4 h-4 mr-2" />
								{t("alignCenter")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextAlign("right")}
							>
								<AlignRight className="w-4 h-4 mr-2" />
								{t("alignRight")}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTextAlign("justify")}
							>
								<AlignJustify className="w-4 h-4 mr-2" />
								{t("alignJustify")}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Color Picker */}
					<Popover
						onOpenChange={setIsColorPickerOpen}
						open={isColorPickerOpen}
					>
						<PopoverTrigger asChild>
							<Button
								className="h-8 w-8 p-0"
								size="sm"
								variant="ghost"
							>
								<div className="relative">
									<Palette className="w-4 h-4" />
									<div
										className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-3 h-1 rounded-sm border border-gray-300"
										style={{
											backgroundColor: textColor,
										}}
									/>
								</div>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-64 p-3">
							<ColorPicker
								closeColorPicker={() =>
									setIsColorPickerOpen(false)
								}
								onChange={handleColorChange}
								value={textColor}
							/>
						</PopoverContent>
					</Popover>

					<Separator className="h-6 mx-1" orientation="vertical" />

					{/* Text Formatting Group */}
					<div className="flex items-center gap-1">
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-accent" : ""}`}
							onClick={toggleBold}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Bold className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-accent" : ""}`}
							onClick={toggleItalic}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Italic className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("underline") ? "bg-accent" : ""}`}
							onClick={toggleUnderline}
							size="sm"
							type="button"
							variant="ghost"
						>
							<UnderlineIcon className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("strike") ? "bg-accent" : ""}`}
							onClick={toggleStrike}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Strikethrough className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("code") ? "bg-accent" : ""}`}
							onClick={toggleCode}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Code className="w-4 h-4" />
						</Button>
						<Button
							className="h-8 w-8 p-0"
							onClick={clearFormat}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Eraser className="w-4 h-4" />
						</Button>
					</div>

					<Separator className="h-6 mx-1" orientation="vertical" />

					{/* Lists Group */}
					<div className="flex items-center gap-1">
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-accent" : ""}`}
							onClick={toggleBulletList}
							size="sm"
							type="button"
							variant="ghost"
						>
							<List className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-accent" : ""}`}
							onClick={toggleOrderedList}
							size="sm"
							type="button"
							variant="ghost"
						>
							<ListOrdered className="w-4 h-4" />
						</Button>
					</div>

					<Separator className="h-6 mx-1" orientation="vertical" />

					{/* Elements Group */}
					<div className="flex items-center gap-1">
						<Button
							className="h-8 w-8 p-0"
							onClick={toggleLink}
							size="sm"
							type="button"
							variant="ghost"
						>
							<LinkIcon className="w-4 h-4" />
						</Button>
						<Button
							className="h-8 w-8 p-0"
							onClick={addImage}
							size="sm"
							type="button"
							variant="ghost"
						>
							<ImageIcon className="w-4 h-4" />
						</Button>
						<Button
							className={`h-8 w-8 p-0 ${editor.isActive("blockquote") ? "bg-accent" : ""}`}
							onClick={toggleBlockquote}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Quote className="w-4 h-4" />
						</Button>
						<Button
							className="h-8 w-8 p-0"
							onClick={addHorizontalRule}
							size="sm"
							type="button"
							variant="ghost"
						>
							<Minus className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Editor Content Area */}
				<div className="relative bg-white rounded-b-md">
					<EditorContent
						className="[&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-3 [&_.ProseMirror]:text-sm [&_.ProseMirror]:prose [&_.ProseMirror]:prose-sm [&_.ProseMirror]:max-w-none"
						editor={editor}
					/>
					{(!content ||
						content.trim() === "" ||
						content === "<p></p>") && (
						<div className="absolute top-3 left-3 text-muted-foreground text-sm pointer-events-none">
							{t("enterRichTextContent")}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
