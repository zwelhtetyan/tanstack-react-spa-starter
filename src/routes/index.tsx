import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main>
			<h1 className="text-blue-500 font-bold">HI</h1>
		</main>
	);
}
