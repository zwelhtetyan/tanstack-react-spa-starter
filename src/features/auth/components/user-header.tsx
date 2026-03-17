import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { User } from "@/features/auth/types";
import { useAuthActions } from "@/store/auth-store";
import { useSignOut } from "../hooks/use-sign-out";

type UserHeaderProps = {
	user: User | null;
};

export function UserHeader({ user }: UserHeaderProps) {
	const navigate = useNavigate();
	const { reset } = useAuthActions();

	const { handleSignOut, isPending } = useSignOut({
		onComplete: () => {
			reset();
			navigate({ to: "/" });
		},
	});

	return (
		<header className="flex flex-col items-center justify-center gap-4 px-4 py-6">
			<div>
				<h1 className="text-center font-medium text-lg">
					Welcome, {user?.name} 👋
				</h1>
				<p className="text-sm">Take a look around and start building 🏝️</p>
			</div>
			<Button disabled={isPending} onClick={handleSignOut} variant="outline">
				Logout
			</Button>
		</header>
	);
}
