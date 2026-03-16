import type { ApiResponse } from "./type";

export const resolveResponse = <T extends ApiResponse<object>>(
	response: T
): T["data"] => {
	return response.data;
};

export const resolveError = (error: unknown, defaultMessage?: string) => {
	return (error as { message?: string })?.message || defaultMessage;
};
