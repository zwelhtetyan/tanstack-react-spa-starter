import { z } from "zod";

export const signInSchema = z.object({
	email: z.email({ error: "Invalid email." }),
	password: z.string().min(4, "Minimum 4 characters required."),
});

export const signUpSchema = signInSchema.extend({
	name: z.string().min(3, "Minimum 3 characters required."),
});

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
