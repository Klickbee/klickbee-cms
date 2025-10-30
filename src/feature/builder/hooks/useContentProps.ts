"use client";

import { useMemo } from "react";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentContentProps } from "@/feature/builder/types/components/properties/componentContentPropsType";

/**
 * Hook to extract and manage content properties with default values
 */
export function useContentProps<T extends Partial<ComponentContentProps>>(
	component: BuilderComponent,
	defaults: T,
): T & ComponentContentProps {
	return useMemo(() => {
		const content = component.props.content || {};

		// Merge defaults with actual content, giving priority to actual content
		const mergedProps = { ...defaults } as T & ComponentContentProps;

		(Object.keys(defaults) as Array<keyof T>).forEach((key) => {
			const contentValue = content[key as keyof ComponentContentProps];
			if (contentValue !== undefined && contentValue !== null) {
				(mergedProps as Record<keyof T, unknown>)[key] = contentValue;
			}
		});

		return mergedProps;
	}, [component.props.content, defaults]);
}
