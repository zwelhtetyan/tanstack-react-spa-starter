import { getRouteApi, useLocation } from "@tanstack/react-router";
import { type SubmitEvent, useId } from "react";
import { useAuthActions } from "@/contexts/auth-context";
import { useAppForm } from "@/lib/form";
import { signinFormOpts } from "../lib/form-options";
import { useSignIn } from "./use-sign-in";

const Route = getRouteApi("/_guest/(auth)/sign-in");

export function useSigninForm() {
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();
	const defaultEmail = useLocation({ select: (s) => s.state.email });

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
		defaultValues: {
			...signinFormOpts.defaultValues,
			email: defaultEmail ?? "",
		},
		onSubmit: ({ value }) => handleSignIn(value),
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	function goToSignup() {
		navigate({
			to: "/sign-up",
			search: { redirect },
			state: { email: form.getFieldValue("email") },
		});
	}

	return { form, formId, handleSubmit, goToSignup };
}
