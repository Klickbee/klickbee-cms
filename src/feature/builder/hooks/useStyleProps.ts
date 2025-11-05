"use client";

import { useMemo } from "react";
import { useCurrentBreakpoint } from "@/feature/builder/contexts/BreakpointContext";
import { resolveStyleAtWidth } from "@/feature/builder/lib/style/breakpointStyle";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import {
	BreakpointStyleProps,
	ComponentStyleProps,
} from "@/feature/builder/types/components/properties/componentStylePropsType";

/**
 * Hook to extract style properties from a component with defaults
 */
export function useStyleProps<T extends Partial<ComponentStyleProps>>(
	component: BuilderComponent,
	defaults: T,
): T & ComponentStyleProps {
	const { width } = useCurrentBreakpoint();

	return useMemo(() => {
		// Be defensive: component may not have props or style defined yet
		const styleMap = (component.props?.style ?? {}) as BreakpointStyleProps;

		// Resolve the style for the current breakpoint
		const resolved = resolveStyleAtWidth(
			styleMap,
			width,
		) as ComponentStyleProps;

		// Start with provided defaults, then override with any resolved values
		const mergedProps = { ...defaults } as T & ComponentStyleProps;

		// Copy over any keys from defaults that are present in the resolved style
		(Object.keys(defaults) as Array<keyof T>).forEach((key) => {
			const propKey = key as unknown as keyof ComponentStyleProps;
			const resolvedValue = resolved[propKey];
			if (resolvedValue !== undefined) {
				(mergedProps as Record<string, unknown>)[key as string] =
					resolvedValue as unknown;
			}
		});

		return mergedProps;
	}, [component.props?.style, defaults, width]);
}

/**
 * Helper function to get a specific style property with fallback
 */
export function useStyleProperty<K extends keyof ComponentStyleProps>(
	component: BuilderComponent,
	property: K,
	defaultValue: ComponentStyleProps[K],
): ComponentStyleProps[K] {
	const { width } = useCurrentBreakpoint();
	return useMemo(() => {
		const styleMap = (component.props?.style ?? {}) as BreakpointStyleProps;
		const resolved = resolveStyleAtWidth(
			styleMap,
			width,
		) as ComponentStyleProps;
		return resolved[property] ?? defaultValue;
	}, [component.props?.style, property, defaultValue, width]);
}
