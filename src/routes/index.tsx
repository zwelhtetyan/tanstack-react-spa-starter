import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main>
			<div className="flex min-h-svh items-center justify-center p-6">
				<div className="flex min-w-0 max-w-sm flex-col leading-loose">
					<h1 className="font-medium">🏝️ Tanstack SPA Starter</h1>
					<p className="text-sm">
						Minimal{" "}
						<a className="hover:underline" href="https://react.dev">
							React
						</a>{" "}
						+{" "}
						<a
							className="hover:underline"
							href="https://tanstack.com/router/latest"
						>
							TanStack
						</a>{" "}
						SPA boilerplate to kickstart your next project.
					</p>

					<div className="mt-4 flex w-full items-center gap-2.5">
						<Button
							className="flex-1 justify-self-center"
							onClick={() =>
								toast.message("Hey 👋", {
									description: "Welcome to Tanstack SPA Starter",
									position: "top-center",
								})
							}
							size="lg"
						>
							Welcome 👋
						</Button>

						<Button
							className="flex-1"
							nativeButton={false}
							render={<Link to="/products" />}
							size="lg"
							variant="outline"
						>
							Demo
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
