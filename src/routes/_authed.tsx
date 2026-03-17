import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppSpinner } from "@/components/common/app-spinner";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ location }) => {
		const user = await checkAuth();

		if (!user) {
			throw redirect({
				to: "/sign-in",
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href,
				},
			});
		}
	},
	pendingComponent: () => <AppSpinner type="screen" />,
	pendingMs: 0,
});
