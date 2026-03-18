import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAuthedUser } from "@/contexts/auth-context";
import { UserHeader } from "@/features/auth/components/user-header";

export const Route = createFileRoute("/_authed/(authLayout)")({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useAuthedUser();

	// You can also access via `router context` like below 👇
	// const { auth } = Route.useRouteContext();

	return (
		<div className="flex min-h-screen flex-col">
			<UserHeader user={user} />

			<Outlet />
		</div>
	);
}
