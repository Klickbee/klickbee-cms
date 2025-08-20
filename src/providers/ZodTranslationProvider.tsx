"use client";

import { useMessages } from "next-intl";
import { useEffect } from "react";
import { initializeGlobalZodErrorMap } from "@/lib/zodTranslation";

interface ZodTranslationProviderProps {
	children: React.ReactNode;
}

export function ZodTranslationProvider({
	children,
}: ZodTranslationProviderProps) {
	const messages = useMessages();

	useEffect(() => {
		const validationMessages = messages?.Validation || {};
		initializeGlobalZodErrorMap(validationMessages);
	}, [messages]);

	return <>{children}</>;
}
