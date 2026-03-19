import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";

import { appConfig } from "@/config/app-config";
import { DevTools } from "@/devtools";
import type { User } from "@/features/auth/types";

import "../styles.css";
import { Toaster } from "@/components/ui/sonner";

type RouterContext = {
	queryClient: QueryClient;
	auth: { user: User | null };
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{ title: appConfig.title },
			{
				name: "title",
				content: appConfig.title,
			},
			{
				name: "description",
				content: appConfig.description,
			},
		],
	}),
});

function RootComponent() {
	return (
		<>
			<HeadContent />

			<Outlet />

			<Toaster />

			{import.meta.env.DEV && <DevTools />}
		</>
	);
}
