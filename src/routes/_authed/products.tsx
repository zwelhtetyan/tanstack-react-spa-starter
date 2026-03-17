import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { UserHeader } from "@/features/auth/components/user-header";
import { ProductGrid } from "@/features/products/components/product-grid";
import { productsQueryOptions } from "@/features/products/services/query-options";
import { useAuthedUser } from "@/store/auth-store";

export const Route = createFileRoute("/_authed/products")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(productsQueryOptions());
	},
});

function RouteComponent() {
	const { data: products } = useSuspenseQuery(productsQueryOptions());
	const user = useAuthedUser();

	return (
		<div className="flex min-h-screen flex-col">
			{user && <UserHeader user={user} />}

			<main className="flex-1 p-4">
				<ProductGrid products={products} />
			</main>
		</div>
	);
}
