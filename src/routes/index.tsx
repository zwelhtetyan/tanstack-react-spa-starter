import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: App,
});

const BUILT_WITH = [
	{ name: "React", url: "https://react.dev" },
	{ name: "TanStack Router", url: "https://tanstack.com/router/latest" },
	{ name: "TanStack Query", url: "https://tanstack.com/query/latest" },
	{ name: "TanStack Form", url: "https://tanstack.com/form/latest" },
	{ name: "Zustand", url: "https://zustand.docs.pmnd.rs" },
	{ name: "Ky", url: "https://github.com/sindresorhus/ky" },
	{ name: "Zod", url: "https://zod.dev" },
	{ name: "Sonner", url: "https://sonner.emilkowal.ski" },
	{ name: "Tailwind CSS", url: "https://tailwindcss.com" },
	{ name: "Shadcn/ui", url: "https://ui.shadcn.com/" },
	{ name: "Vite", url: "https://vite.dev/" },
	{ name: "Vitest", url: "https://vitest.dev" },
	{ name: "Biome", url: "https://biomejs.dev/" },
] as const;

function App() {
	return (
		<main>
			<div className="flex min-h-svh items-center justify-center p-6">
				<div className="flex min-w-0 max-w-sm flex-col leading-loose">
					<h1 className="mb-0.5 font-medium">🏝️ Tanstack SPA Starter</h1>
					<p className="text-muted-foreground text-sm">
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

					<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground text-sm">
						<span className="text-foreground">⚡ Built with</span>
						<span className="opacity-50">|</span>
						{BUILT_WITH.map((stack) => (
							<a
								className="hover:underline"
								href={stack.url}
								key={stack.name}
								rel="noopener"
								target="_blank"
							>
								{stack.name}
							</a>
						))}
					</div>

					<div className="mt-5 flex w-full items-center gap-2.5">
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
