import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: import.meta.env.PROD,
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: false, // `ky` handle instead
		},
	},
});
