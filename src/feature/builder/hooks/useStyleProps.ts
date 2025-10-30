"use client";

import { useMemo } from "react";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { ComponentStyleProps } from "@/feature/builder/types/components/properties/componentStylePropsType";

/**
 * Hook to extract style properties from a component with defaults
 */
export function useStyleProps<T extends Partial<ComponentStyleProps>>(
	component: BuilderComponent,
	defaults: T,
): T & ComponentStyleProps {
	return useMemo(() => {
		const currentStyle = component.props.style || {};

		// Merge defaults with current style properties
		const mergedProps = { ...defaults } as T & ComponentStyleProps;

		// Override with actual values from component
		(Object.keys(defaults) as Array<keyof T>).forEach((key) => {
			const styleKey = key as keyof ComponentStyleProps;
			if (currentStyle[styleKey] !== undefined) {
				(mergedProps as Record<keyof T, unknown>)[key] =
					currentStyle[styleKey];
			}
		});

		return mergedProps;
	}, [component.props.style, defaults]);
}

/**
 * Helper function to get a specific style property with fallback
 */
export function useStyleProperty<K extends keyof ComponentStyleProps>(
	component: BuilderComponent,
	property: K,
	defaultValue: ComponentStyleProps[K],
): ComponentStyleProps[K] {
	return useMemo(() => {
		return component.props.style?.[property] ?? defaultValue;
	}, [component.props.style, property, defaultValue]);
}
