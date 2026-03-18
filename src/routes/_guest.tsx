import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppSpinner } from "@/components/common/app-spinner";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/_guest")({
	beforeLoad: async () => {
		const user = await checkAuth();

		if (user) throw redirect({ to: "/" });
	},
	pendingComponent: () => (
		<>
			<title>Verifying...</title>
			<AppSpinner type="screen" />
		</>
	),
	pendingMs: 0,
});
