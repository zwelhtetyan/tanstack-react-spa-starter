import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/(authLayout)/hello")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-center font-medium text-lg">Hello 👋</h1>
		</div>
	);
}
