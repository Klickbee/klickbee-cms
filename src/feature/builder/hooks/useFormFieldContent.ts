import { CONTENT_DEFAULTS } from "@/feature/builder/constants/contentDefaults";
import { BuilderComponent } from "@/feature/builder/types/components/components";
import { FormFieldContentProps } from "@/feature/builder/types/contentCategories";
import { useContentProps } from "./useContentProps";
import { useContentUpdate } from "./useContentUpdate";

export function useFormFieldContent<T extends Partial<FormFieldContentProps>>(
	component: BuilderComponent,
	additionalDefaults?: T,
) {
	const defaults = {
		label: CONTENT_DEFAULTS.FIELD_LABEL,
		name: CONTENT_DEFAULTS.FIELD_NAME,
		required: CONTENT_DEFAULTS.FIELD_REQUIRED,
		...additionalDefaults,
	};

	const contentProps = useContentProps(component, defaults);
	const { updateName, updateLabel, updateRequired, ...otherUpdaters } =
		useContentUpdate(component);

	return {
		formProps: {
			label: contentProps.label,
			name: contentProps.name,
			required: contentProps.required,
		} as FormFieldContentProps,

		...contentProps,

		updateFormField: {
			updateLabel,
			updateName,
			updateRequired,
		},

		...otherUpdaters,
		updateLabel,
		updateName,
		updateRequired,
	};
}
