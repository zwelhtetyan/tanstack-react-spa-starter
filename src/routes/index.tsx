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
	{ name: "Tailwind CSS", url: "https://tailwindcss.com" },
	{ name: "Shadcn UI", url: "https://ui.shadcn.com" },
	{ name: "Base UI", url: "https://base-ui.com" },
	{ name: "Vite", url: "https://vite.dev" },
	{ name: "Biome", url: "https://biomejs.dev" },
] as const;

function App() {
	return (
		<main>
			<div className="flex min-h-svh items-center justify-center p-6">
				<div className="flex min-w-0 max-w-sm flex-col leading-loose">
					<header className="mb-1 flex flex-wrap items-center justify-between gap-2">
						<h1 className="font-medium">🏝️ Tanstack React SPA Starter</h1>
						<Button
							nativeButton={false}
							render={
								<a
									aria-label="View on GitHub"
									href="https://github.com/zwelhtetyan/tanstack-react-spa-starter"
									rel="noopener"
									target="_blank"
								>
									<svg
										aria-hidden="true"
										className="size-3.5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
									GitHub
								</a>
							}
							variant="link"
						/>
					</header>
					<p className="text-muted-foreground text-sm">
						Minimal{" "}
						<a
							className="hover:underline"
							href="https://tanstack.com/router/latest"
						>
							TanStack
						</a>{" "}
						+{" "}
						<a className="hover:underline" href="https://react.dev">
							React
						</a>{" "}
						SPA boilerplate to kickstart your next project.
					</p>

					<div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-muted-foreground text-sm">
						<span className="font-medium text-foreground">⚡ Built with</span>
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
									description: "Welcome to Tanstack + React SPA Starter",
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
