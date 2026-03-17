import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resolveError } from "@/lib/api/utils";
import { authService } from "../services";

type SignUpResponsePromise = ReturnType<typeof authService.signUp>;

export type UseSignUpProps = {
	onComplete?: (data: Awaited<SignUpResponsePromise>) => void;
};

export const useSignUp = (props: UseSignUpProps = {}) => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: authService.signUp,

		onSuccess: (data) => {
			props.onComplete?.(data);
		},
	});

	const handleSignUp = (data: Parameters<typeof authService.signUp>[0]) => {
		const promise = mutateAsync(data);

		toast.promise(promise, {
			loading: "Signing up",
			success: () => "Account created successfully.",
			error: resolveError,
		});

		return promise;
	};

	return { isPending, handleSignUp };
};
