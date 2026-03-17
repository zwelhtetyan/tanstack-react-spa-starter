import type { SubmitEvent } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/lib/form";
import type { CommonFormProps } from "@/types/form";
import { type SignUpData, signUpSchema } from "../../schema";

const defaultValues: SignUpData = { name: "", email: "", password: "" };

type SignUpFormProps = CommonFormProps<SignUpData>;

export function SignUpForm(props: SignUpFormProps) {
	const form = useAppForm({
		validators: { onSubmit: signUpSchema },
		defaultValues,
		onSubmit: ({ formApi, value }) => props.onSubmit(value, formApi.reset),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<form id="sign-up-form" onSubmit={handleSubmit}>
			<FieldGroup>
				<form.AppField name="name">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Name"
							placeholder="John Doe"
						/>
					)}
				</form.AppField>

				<form.AppField name="email">
					{(field) => (
						<field.TextField
							autoComplete="off"
							description="We'll use this to contact you. We will not share your email with anyone else."
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
						<form.SubscribeButton
							form="sign-up-form"
							label="Sign up"
							type="submit"
						/>
					</Field>
				</form.AppForm>
			</FieldGroup>
		</form>
	);
}
