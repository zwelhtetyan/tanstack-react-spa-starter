import { createRouter } from "@tanstack/react-router";
import { queryClient } from "./lib/tanstack-query";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
	routeTree,

	context: { queryClient },

	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	notFoundMode: "fuzzy",

	defaultErrorComponent: () => "Oops! Something went wrong.",
	defaultNotFoundComponent: () => "404! Page Not Found.",

	// Since we're using React Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
