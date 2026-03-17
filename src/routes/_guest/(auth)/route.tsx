import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_guest/(auth)")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-dvh w-dvw items-center justify-center">
			<Outlet />
		</div>
	);
}
