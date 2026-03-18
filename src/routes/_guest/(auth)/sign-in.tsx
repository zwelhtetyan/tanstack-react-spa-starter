import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
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
import { useSigninForm } from "@/features/auth/hooks/use-sign-in-form";

export const Route = createFileRoute("/_guest/(auth)/sign-in")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

function RouteComponent() {
	const { form, formId, handleSubmit, goToSignup } = useSigninForm();

	return (
		<Suspense fallback={<AppSpinner />}>
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<Link className="rounded-full bg-foreground p-0.5" to="/">
					<img alt="logo" height={50} src="/logo.png" width={50} />
				</Link>

				<Card className="w-full sm:max-w-sm">
					<CardHeader>
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>

						<CardAction>
							<Button onClick={goToSignup} variant="link">
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
