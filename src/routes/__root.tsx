import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import "../styles.css";
import type { QueryClient } from "@tanstack/react-query";
import { DevTools } from "#/devtools";

type RouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Outlet />

			{import.meta.env.DEV && <DevTools />}
		</>
	);
}
