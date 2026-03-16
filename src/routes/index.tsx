import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<div className="flex min-h-svh items-center justify-center p-6">
				<div className="flex min-w-0 max-w-md flex-col leading-loose">
					<h1 className="font-medium">Tanstack SPA Starter!</h1>
					<p className="text-sm">
						A minimal React + TanStack SPA boilerplate designed to help you
						efficiently kickstart your next project.
					</p>

					<Button
						className="mt-2 justify-self-center"
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
				</div>
			</div>
		</main>
	);
}
