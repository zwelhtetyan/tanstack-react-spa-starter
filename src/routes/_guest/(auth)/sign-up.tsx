import { formOptions } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { type SubmitEvent, Suspense, useId } from "react";
import z from "zod";
import { AppSpinner } from "@/components/common/app-spinner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { SignUpFields } from "@/features/auth/components/fields/sign-up-fields";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { signUpSchema } from "@/features/auth/schema";
import { useAppForm } from "@/lib/form";
import { useAuthActions } from "@/store/auth-store";

export const Route = createFileRoute("/_guest/(auth)/sign-up")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

export const signupFormOpts = formOptions({
	defaultValues: { name: "", email: "", password: "" },
	validators: { onSubmit: signUpSchema },
});

function RouteComponent() {
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();

	const { setAuthState } = useAuthActions();

	const { handleSignUp } = useSignUp({
		onComplete: (data) => {
			setAuthState(data);

			navigate({ to: redirect ?? "/" });
		},
	});

	const formId = useId();
	const form = useAppForm({
		...signupFormOpts,
		onSubmit: ({ value }) => handleSignUp(value),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<Suspense fallback={<AppSpinner />}>
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<Link to="/">
					<img alt="logo" height={60} src="/tanstack_logo.png" width={60} />
				</Link>

				<Card className="w-full sm:max-w-sm">
					<CardHeader>
						<CardTitle>Create an account</CardTitle>
						<CardDescription>
							Enter your information below to create your account
						</CardDescription>

						<CardAction>
							<Button
								nativeButton={false}
								render={<Link search={{ redirect }} to="/sign-in" />}
								variant="link"
							>
								Sign in
							</Button>
						</CardAction>
					</CardHeader>

					<CardContent>
						<form id={formId} onSubmit={handleSubmit}>
							<FieldGroup>
								<SignUpFields form={form} />
							</FieldGroup>
						</form>
					</CardContent>

					<CardFooter>
						<form.AppForm>
							<form.SubscribeButton
								className="w-full"
								form={formId}
								label="Sign up"
								size="lg"
								type="submit"
							/>
						</form.AppForm>
					</CardFooter>
				</Card>
			</div>
		</Suspense>
	);
}
