let builderMaxWidth: number | undefined;

export function setBuilderMaxWidth(width?: number) {
	if (typeof width === "number" && width > 0) {
		builderMaxWidth = width;
	}
}

export function getBuilderMaxWidth(): number | undefined {
	return builderMaxWidth;
}
