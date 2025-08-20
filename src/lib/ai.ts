export async function askChatgpt(
	instructions: string,
	prompt: string,
): Promise<string> {
	try {
		const res = await fetch("https://api.openai.com/v1/chat/completions", {
			body: JSON.stringify({
				messages: [
					{
						content: instructions,
						role: "developer",
					},
					{ content: prompt, role: "user" },
				],
				// TODO: replace by ai setting
				model: process.env.OPENAI_MODEL,
			}),
			headers: {
				// TODO: replace by ai setting
				Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const data = await res.json();
		return data.choices[0].message.content;
	} catch (error) {
		console.error("Error asking ChatGPT", error);
		throw new Error("Failed to ask ChatGPT");
	}
}

export async function askMistral(
	instructions: string,
	prompt: string,
): Promise<string> {
	try {
		const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
			body: JSON.stringify({
				messages: [
					{
						content: instructions,
						role: "system",
					},
					{ content: prompt, role: "user" },
				],
				// TODO: replace by ai setting
				model: process.env.MISTRAL_MODEL,
			}),
			headers: {
				// TODO: replace by ai setting
				Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const data = await res.json();
		return data.choices[0].message.content;
	} catch (error) {
		console.error("Error asking Mistral", error);
		throw new Error("Failed to ask Mistral");
	}
}

export async function askDeepseek(
	instructions: string,
	prompt: string,
): Promise<string> {
	try {
		const res = await fetch("https://api.deepseek.com/chat/completions", {
			body: JSON.stringify({
				messages: [
					{
						content: instructions,
						role: "system",
					},
					{ content: prompt, role: "user" },
				],
				// TODO: replace by ai setting
				model: process.env.DEEPSEEK_MODEL,
			}),
			headers: {
				// TODO: replace by ai setting
				Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const data = await res.json();
		return data.choices[0].message.content;
	} catch (error) {
		console.error("Error asking Deepseek", error);
		throw new Error("Failed to ask Deepseek");
	}
}
