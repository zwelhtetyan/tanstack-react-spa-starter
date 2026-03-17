import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AppSpinner } from "@/components/common/app-spinner";
import { ProductGrid } from "@/features/products/components/product-grid";
import { productsQueryOptions } from "@/features/products/services/query-options";

export const Route = createFileRoute("/_authed/(authLayout)/products")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(productsQueryOptions());
	},
	pendingComponent: () => <AppSpinner type="full" />,
});

function RouteComponent() {
	const { data: products } = useSuspenseQuery(productsQueryOptions());

	return (
		<main className="flex-1 p-4">
			<ProductGrid products={products} />
		</main>
	);
}
