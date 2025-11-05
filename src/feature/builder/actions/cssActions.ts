"use server";

import { promises as fs } from "fs";
import path from "path";

export async function generateCssAction({
	css,
	pageId,
	fileName,
}: {
	css: string;
	pageId: number | string;
	fileName: string; // sanitized filename computed client-side
}): Promise<{ ok: boolean; file?: string; error?: string }> {
	if (!css || !fileName || (!pageId && pageId !== 0)) {
		return { ok: false, error: "Missing css, fileName, or pageId" };
	}

	try {
		const cwd = process.cwd();
		const appDir = path.join(cwd, "src", "app");
		const generatedDir = path.join(appDir, "generated");
		const generated = path.join(appDir, "generated.css");
		const targetCssPath = path.join(generatedDir, fileName);

		// Ensure generated directory exists
		await fs.mkdir(generatedDir, { recursive: true });

		// Write or replace the per-page CSS file
		await fs.writeFile(targetCssPath, css, "utf8");

		// Update globals.css to import this CSS
		let globals = "";
		try {
			globals = await fs.readFile(generated, "utf8");
		} catch (_e) {
			// If globals.css doesn't exist, create it
			globals = "";
		}

		const pageIdStr = String(pageId);
		const importRegex = new RegExp(
			String.raw`^\s*@import\s+["']\.\/generated\/page-${pageIdStr}-[^"']+["'];\s*$`,
			"gm",
		);

		// Remove any existing imports for this page id
		globals = globals.replace(importRegex, "").trimEnd() + "\n";

		const newImport = `@import "./generated/${fileName}";`;

		if (!globals.includes(newImport)) {
			// Append the new import near the top, after existing imports if any
			const lines = globals.split(/\r?\n/);
			let insertIndex = 0;
			while (
				insertIndex < lines.length &&
				lines[insertIndex].trim().startsWith("@import")
			) {
				insertIndex++;
			}
			lines.splice(insertIndex, 0, newImport);
			globals = lines.join("\n");
			await fs.writeFile(generated, globals, "utf8");
		}

		return {
			ok: true,
			file: `src/app/generated/${fileName}`,
		};
	} catch (error) {
		return {
			ok: false,
			error: (error as { message: string })?.message ?? String(error),
		};
	}
}
