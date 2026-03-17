import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resolveError } from "@/lib/api/utils";
import { authService } from "../services";

type UseSignOutProps = {
	onComplete?: () => void;
};

export const useSignOut = (props: UseSignOutProps = {}) => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: authService.signOut,

		onSuccess: () => {
			props.onComplete?.();
		},
	});

	const handleSignOut = () => {
		const promise = mutateAsync();

		toast.promise(promise, {
			loading: "Signing out",
			success: "Signed out successfully",
			error: resolveError,
		});

		return promise;
	};

	return { isPending, handleSignOut };
};
