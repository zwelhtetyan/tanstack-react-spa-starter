import { api } from "@/lib/api";
import type { ApiResponse } from "@/lib/api/type";
import { resolveResponse } from "@/lib/api/utils";
import type { Product } from "../types";

export const productsService = {
	products: () => {
		return api
			.get("products")
			.json<ApiResponse<Product[]>>()
			.then(resolveResponse);
	},
};
