import { createFileRoute } from "@tanstack/react-router";
import { createDocumentTitle } from "@/utils/meta";

const title = createDocumentTitle({ title: "Hello" });
export const Route = createFileRoute("/_authed/(authLayout)/hello")({
	head: () => ({ meta: [{ title }] }),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-center font-medium text-lg">Hello 👋</h1>
		</div>
	);
}
