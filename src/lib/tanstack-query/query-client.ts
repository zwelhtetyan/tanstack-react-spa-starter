import { QueryClient } from "@tanstack/react-query";
import { isHTTPError } from "ky";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (import.meta.env.DEV) return false;

				if (failureCount > 3 && import.meta.env.PROD) return false;

				return !(
					isHTTPError(error) && [401, 403].includes(error.response.status)
				);
			},
			refetchOnWindowFocus: import.meta.env.PROD,
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
});
