import { Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "../types";

type ProductCardProps = {
	product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card>
			<CardContent>
				<div className="flex aspect-square items-center justify-center">
					<img
						alt={product.title}
						className="size-full object-cover"
						height={200}
						src={product.image}
						width={200}
					/>
				</div>
			</CardContent>

			<CardFooter className="flex flex-1 flex-col items-start gap-2">
				<h3 className="line-clamp-2 flex-1 font-medium text-sm">
					{product.title}
				</h3>
				<div className="flex w-full flex-wrap items-center justify-between">
					<span className="font-semibold">${product.price}</span>
					<div className="flex items-center gap-1 text-muted-foreground text-xs">
						<Star className="size-3 fill-yellow-500 text-yellow-500" />
						<span>{product.rating.rate}</span>
						<span>({product.rating.count})</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
