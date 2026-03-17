const product = {
	all: () => ["products"] as const,
	detail: <T>(id: T) => [...product.all(), id] as const,
};

export const QUERY_KEY = { product };
