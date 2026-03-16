import type {
	AfterResponseHook,
	BeforeErrorHook,
	BeforeRequestHook,
	BeforeRetryHook,
} from "ky";

export const beforeRequestHooks: BeforeRequestHook[] = [
	(request) => {
		// Get token from store(Zustand/Redux) or context if provided
		// Priority: context.token > store.token

		// const { token: contextToken } = options.context;
		// const storeToken = authStore.getState().token;
		// const token = contextToken ?? storeToken;

		const token = "";

		if (!token) return;

		request.headers.set("Authorization", `Bearer ${token}`);
	},
];

export const beforeRetryHooks: BeforeRetryHook[] = [];

export const beforeErrorHooks: BeforeErrorHook[] = [
	async (error) => {
		const { response } = error;

		if (response) {
			try {
				const body = (await response.json()) as { message?: string };

				if (body.message) {
					error.message = body.message;
				}
			} catch {
				// ...
			}
		}

		return error;
	},
];

export const AfterResponseHooks: AfterResponseHook[] = [
	async (_request, _options, _response, _state) => {
		// if (response.status === 401 && state.retryCount === 0) {
		// 	const newToken = await refreshToken();
		// 	const headers = new Headers(request.headers);
		// 	headers.set("Authorization", `Bearer ${newToken}`);
		// 	return ky.retry({
		// 		request: new Request(request, { headers }),
		// 		code: "TOKEN_REFRESHED",
		// 	});
		// }
	},
];
