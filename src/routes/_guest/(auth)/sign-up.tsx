import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
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
import { useSignupForm } from "@/features/auth/hooks/use-sign-up-form";
import { createDocumentTitle } from "@/utils/meta";

const title = createDocumentTitle({ title: "Signup" });
export const Route = createFileRoute("/_guest/(auth)/sign-up")({
	head: () => ({ meta: [{ title }] }),
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
});

function RouteComponent() {
	const { form, formId, handleSubmit, goToSignin } = useSignupForm();

	return (
		<Suspense fallback={<AppSpinner />}>
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<Link className="rounded-full bg-foreground p-0.5" to="/">
					<img alt="logo" height={50} src="/logo.png" width={50} />
				</Link>

				<Card className="w-full sm:max-w-sm">
					<CardHeader>
						<CardTitle>Create an account</CardTitle>
						<CardDescription>
							Enter your information below to create your account
						</CardDescription>

						<CardAction>
							<Button onClick={goToSignin} variant="link">
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
