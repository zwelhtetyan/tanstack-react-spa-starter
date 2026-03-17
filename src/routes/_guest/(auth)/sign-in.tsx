import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { z } from "zod";
import { AppSpinner } from "@/components/common/app-spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/forms/sign-in-form";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { useAuthActions } from "@/store/auth-store";

export const Route = createFileRoute("/_guest/(auth)/sign-in")({
	component: RouteComponent,
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
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

	return (
		<Suspense fallback={<AppSpinner />}>
			<Card className="w-full sm:max-w-md">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<SignInForm onSubmit={handleSignIn} />
				</CardContent>

				<CardFooter className="justify-center">
					<p className="text-muted-foreground">
						Don't have an account?{" "}
						<Link
							className="underline hover:text-foreground"
							search={{ redirect }}
							to="/sign-up"
						>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</Suspense>
	);
}
