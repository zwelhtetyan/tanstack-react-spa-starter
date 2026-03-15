const users = {
	all: () => ["users"] as const,
	list: (params?: unknown) => ["users", params] as const,
	details: <T>(userId: T) => ["users", userId] as const,
};

export const QUERY_KEY = { users };
