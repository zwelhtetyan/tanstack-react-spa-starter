import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

import "../styles.css";
import { DevTools } from "@/devtools";

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

			<Toaster theme="system" />

			{import.meta.env.DEV && <DevTools />}
		</>
	);
}
