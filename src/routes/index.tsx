import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<div className="flex min-h-svh p-6">
				<div className="flex min-w-0 max-w-md flex-col gap-4 leading-loose">
					<div>
						<h1 className="font-medium">Project ready!</h1>
						<p>You may now add components and start building.</p>
						<p>We&apos;ve already added the button component for you.</p>
						<Button
							className="mt-2"
							onClick={() =>
								toast.message("Hey 👋", {
									description: "Welcome to Tanstack SPA Starter",
									position: "top-center",
								})
							}
							size="lg"
						>
							Button
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
