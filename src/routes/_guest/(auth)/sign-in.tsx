import { formOptions } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { type SubmitEvent, Suspense, useId } from "react";
import { z } from "zod";
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
import { SigninFieldGroup } from "@/features/auth/components/field-groups/sign-in-field-group";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { signInSchema } from "@/features/auth/schema";
import { useAppForm } from "@/lib/form";
import { useAuthActions } from "@/store/auth-store";

export const Route = createFileRoute("/_guest/(auth)/sign-in")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

export const signinFormOpts = formOptions({
	defaultValues: { email: "", password: "" },
	validators: { onSubmit: signInSchema },
});

function RouteComponent() {
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { setAuthState } = useAuthActions();

	const { handleSignIn } = useSignIn({
		onComplete: (data) => {
			setAuthState(data);

			navigate({ to: redirect ?? "/" });
		},
	});

	const formId = useId();
	const form = useAppForm({
		...signinFormOpts,
		onSubmit: ({ value }) => handleSignIn(value),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<Suspense fallback={<AppSpinner />}>
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<Link to="/">
					<img alt="logo" height={60} src="/logo.png" width={60} />
				</Link>

				<Card className="w-full sm:max-w-sm">
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>

						<CardAction>
							<Button
								nativeButton={false}
								render={<Link search={{ redirect }} to="/sign-up" />}
								variant="link"
							>
								Sign up
							</Button>
						</CardAction>
					</CardHeader>

					<CardContent>
						<form id={formId} onSubmit={handleSubmit}>
							<FieldGroup>
								<SigninFieldGroup
									fields={{ email: "email", password: "password" }}
									form={form}
								/>
							</FieldGroup>
						</form>
					</CardContent>

					<CardFooter>
						<form.AppForm>
							<form.SubscribeButton
								className="w-full"
								form={formId}
								label="Sign in"
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
