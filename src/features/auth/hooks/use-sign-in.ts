import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resolveError } from "@/lib/api/utils";
import { authService } from "../services";

type SigninResponsePromise = ReturnType<typeof authService.signIn>;

type UseSignInProps = {
	onComplete?: (data: Awaited<SigninResponsePromise>) => void;
};

export const useSignIn = (props: UseSignInProps = {}) => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: authService.signIn,

		onSuccess: (data) => {
			props.onComplete?.(data);
		},
	});

	const handleSignIn = (data: Parameters<typeof authService.signIn>[0]) => {
		const promise = mutateAsync(data);

		toast.promise(promise, {
			loading: "Signing in",
			success: ({ user }) => `Welcome back, ${user.name}!`,
			error: resolveError,
		});

		return promise;
	};

	return { isPending, handleSignIn };
};
