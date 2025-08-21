"use server";

import { isAuthenticatedGuard } from "@/feature/auth/lib/session";
import { askChatgpt, askDeepseek, askMistral } from "@/lib/ai";

export async function generateTextWithAI(
	model: string,
	instructions: string,
	prompt: string,
): Promise<string> {
	const authError = await isAuthenticatedGuard();
	if (authError) {
		throw new Error("Authentication required");
	}

	try {
		switch (model) {
			case "chatgpt":
				return await askChatgpt(instructions, prompt);
			case "mistral":
				return await askMistral(instructions, prompt);
			case "deepseek":
				return await askDeepseek(instructions, prompt);
			default:
				throw new Error("Unsupported model");
		}
	} catch (error) {
		console.error("Error generating text with AI", error);
		throw new Error("Failed to generate text with AI");
	}
}
