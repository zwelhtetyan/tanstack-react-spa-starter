export type ApiResponse<T extends object | null = null> = T extends null
	? { message: string }
	: { message: string; data: T };
