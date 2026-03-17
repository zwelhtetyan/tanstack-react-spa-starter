import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import z from "zod";
import { AppSpinner } from "@/components/common/app-spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/forms/sign-up-form";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { useAuthActions } from "@/store/auth-store";

export const Route = createFileRoute("/_guest/(auth)/sign-up")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
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

	return (
		<Suspense fallback={<AppSpinner />}>
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your information below to create your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<SignUpForm onSubmit={handleSignUp} />
				</CardContent>

				<CardFooter className="justify-center">
					<p className="text-muted-foreground">
						Already have an account?{" "}
						<Link
							className="underline hover:text-foreground"
							search={{ redirect }}
							to="/sign-in"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</Suspense>
	);
}
