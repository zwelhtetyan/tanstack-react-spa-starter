import { getRouteApi, useLocation } from "@tanstack/react-router";
import { type SubmitEvent, useId } from "react";
import { useAuthActions } from "@/contexts/auth-context";
import { useAppForm } from "@/lib/form";
import { signupFormOpts } from "../lib/form-options";
import { useSignUp } from "./use-sign-up";

const Route = getRouteApi("/_guest/(auth)/sign-up");

export function useSignupForm() {
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();
	const defaultEmail = useLocation({ select: (s) => s.state.email });

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
		defaultValues: {
			...signupFormOpts.defaultValues,
			email: defaultEmail ?? "",
		},
		onSubmit: ({ value }) => handleSignUp(value),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	function goToSignin() {
		navigate({
			to: "/sign-in",
			search: { redirect },
			state: { email: form.getFieldValue("email") },
		});
	}

	return { form, formId, handleSubmit, goToSignin };
}
