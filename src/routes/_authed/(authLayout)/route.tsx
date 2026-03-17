import { createFileRoute, Outlet } from "@tanstack/react-router";
import { UserHeader } from "@/features/auth/components/user-header";
import { useAuthedUser } from "@/store/auth-store";

export const Route = createFileRoute("/_authed/(authLayout)")({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useAuthedUser();

	return (
		<div className="flex min-h-screen flex-col">
			<UserHeader user={user} />

			<Outlet />
		</div>
	);
}
