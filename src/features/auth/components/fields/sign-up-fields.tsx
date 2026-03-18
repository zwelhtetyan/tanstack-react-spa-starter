import { withForm } from "@/lib/form";
import { signupFormOpts } from "../../lib/form-options";
import { SigninFieldGroup } from "../field-groups/sign-in-field-group";

export const SignUpFields = withForm({
	...signupFormOpts,
	render({ form }) {
		return (
			<>
				<form.AppField name="name">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Name"
							placeholder="John Doe"
						/>
					)}
				</form.AppField>

				<SigninFieldGroup
					fields={{ email: "email", password: "password" }}
					form={form}
				/>
			</>
		);
	},
});
