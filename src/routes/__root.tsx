import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { DevTools } from "@/devtools";
import type { User } from "@/features/auth/types";

import "../styles.css";

type RouterContext = {
	queryClient: QueryClient;
	auth: { user: User | null };
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
