import type { EntityWithID } from "@/types";

type ProductRating = { rate: number; count: number };
export type Product = EntityWithID<{
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: ProductRating;
}>;
