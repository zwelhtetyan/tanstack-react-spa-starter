import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEY } from "@/lib/tanstack-query/query-keys";
import { productsService } from ".";

const productQueryKeys = QUERY_KEY.product;

export const productsQueryOptions = () => {
	return queryOptions({
		queryKey: productQueryKeys.all(),
		queryFn: () => productsService.products(),
	});
};
