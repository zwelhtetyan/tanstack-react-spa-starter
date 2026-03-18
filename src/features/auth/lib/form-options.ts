import { formOptions } from "@tanstack/react-form";
import { signInSchema, signUpSchema } from "../schema";

export const signinFormOpts = formOptions({
	defaultValues: { email: "", password: "" },
	validators: { onSubmit: signInSchema },
});

export const signupFormOpts = formOptions({
	defaultValues: { name: "", email: "", password: "" },
	validators: { onSubmit: signUpSchema },
});
