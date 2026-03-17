import { withFieldGroup } from "@/lib/form";

export const SigninFieldGroup = withFieldGroup({
	defaultValues: {
		email: "",
		password: "",
	},
	render({ group }) {
		return (
			<>
				<group.AppField name="email">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Email"
							placeholder="name@example.com"
							type="email"
						/>
					)}
				</group.AppField>

				<group.AppField name="password">
					{(field) => (
						<field.TextField
							autoComplete="off"
							label="Password"
							type="password"
						/>
					)}
				</group.AppField>
			</>
		);
	},
});
