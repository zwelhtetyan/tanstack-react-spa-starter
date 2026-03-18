import { type SubmitEvent, useId } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/lib/form";
import type { CommonFormProps } from "@/types/form";
import { type SignInData, signInSchema } from "../../schema";

const defaultValues: SignInData = { email: "", password: "" };

type SignInFormProps = CommonFormProps<SignInData>;

export function SignInForm(props: SignInFormProps) {
	const formId = useId();
	const form = useAppForm({
		defaultValues,
		validators: { onSubmit: signInSchema },
		onSubmit: ({ formApi, value }) => props.onSubmit(value, formApi.reset),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<form id={formId} onSubmit={handleSubmit}>
			<FieldGroup>
				<form.AppField name="email">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Email"
							placeholder="name@example.com"
							type="email"
						/>
					)}
				</form.AppField>

				<form.AppField name="password">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Password"
							type="password"
						/>
					)}
				</form.AppField>

				<form.AppForm>
					<Field className="justify-end" orientation="horizontal">
						<form.SubscribeButton form={formId} label="Sign in" type="submit" />
					</Field>
				</form.AppForm>
			</FieldGroup>
		</form>
	);
}
