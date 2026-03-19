import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppSpinner } from "@/components/common/app-spinner";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/features/products/components/product-grid";
import { productsQueryOptions } from "@/features/products/services/query-options";
import { createDocumentTitle } from "@/utils/meta";

const title = createDocumentTitle({ title: "Products" });
export const Route = createFileRoute("/_authed/(authLayout)/products")({
	head: () => ({ meta: [{ title }] }),
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(productsQueryOptions());
	},
	pendingComponent: () => (
		<>
			<title>{title}</title>
			<AppSpinner type="full" />
		</>
	),
});

function RouteComponent() {
	const { data: products } = useSuspenseQuery(productsQueryOptions());

	return (
		<main className="mx-auto w-full max-w-6xl flex-1 p-4">
			<Button
				className="mb-4"
				nativeButton={false}
				render={<Link to="/" />}
				variant="link"
			>
				Back to home
			</Button>

			<ProductGrid products={products} />
		</main>
	);
}
