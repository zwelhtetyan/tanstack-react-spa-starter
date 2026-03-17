import type { Product } from "../types";

import { ProductCard } from "./product-card";

type ProductGridProps = {
	products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
	return (
		<div className="mx-auto grid max-w-6xl grid-cols-2 xs:grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
