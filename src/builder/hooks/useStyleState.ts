import { useState } from "react";

export const useStyleState = <T>(initialState: T) => {
	const [state, setState] = useState<T>(initialState);

	const updateProperty = <K extends keyof T>(
		property: K,
		value: Partial<T[K]> | T[K],
	) => {
		setState((prev) => ({
			...prev,
			[property]:
				typeof value === "object" &&
				value !== null &&
				!Array.isArray(value)
					? { ...(prev[property] as object), ...(value as object) }
					: value,
		}));
	};

	const addArrayItem = <K extends keyof T, V>(property: K, value: V) => {
		setState((prev) => ({
			...prev,
			[property]: Array.isArray(prev[property])
				? [...(prev[property] as V[]), value]
				: [value],
		}));
	};

	const removeArrayItem = <K extends keyof T>(property: K, index: number) => {
		setState((prev) => ({
			...prev,
			[property]: Array.isArray(prev[property])
				? (prev[property] as unknown[]).filter((_, i) => i !== index)
				: prev[property],
		}));
	};

	const updateArrayItemProperty = <
		K extends keyof T,
		V extends Record<string, unknown>,
	>(
		arrayName: K,
		index: number,
		prop: keyof V,
		value: V[keyof V],
	) => {
		setState((prev) => ({
			...prev,
			[arrayName]: Array.isArray(prev[arrayName])
				? (prev[arrayName] as V[]).map((item, i) =>
						i === index ? { ...item, [prop]: value } : item,
					)
				: prev[arrayName],
		}));
	};

	const updateNestedProperty = <K extends keyof T>(
		property: K,
		nestedUpdate: (current: T[K]) => T[K],
	) => {
		setState((prev) => ({
			...prev,
			[property]: nestedUpdate(prev[property]),
		}));
	};

	return {
		addArrayItem,
		removeArrayItem,
		state,
		updateArrayItemProperty,
		updateNestedProperty,
		updateProperty,
	};
};
