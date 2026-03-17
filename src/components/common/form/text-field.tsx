import { useStore } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/contexts/form-context";
import { cn } from "@/lib/utils";

type TextFieldProps = ComponentProps<typeof Input> & {
	label?: string;
	description?: string;
};
export default function TextField({
	label,
	description,
	className,
	...inputProps
}: TextFieldProps) {
	const field = useFieldContext<string>();

	const errors = useStore(field.store, (state) => state.meta.errors);
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			{label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
			<Input
				aria-invalid={isInvalid}
				className={cn("", className)}
				id={field.name}
				name={field.name}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				type="text"
				value={field.state.value}
				{...inputProps}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={errors} />}
		</Field>
	);
}
