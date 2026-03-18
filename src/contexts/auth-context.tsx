import type React from "react";
import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { authStore } from "@/store/auth-store";

const AuthContext = createContext<typeof authStore | null>(null);

export function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [store] = useState(() => authStore);

	return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

function useAuthStore<T>(
	selector: (state: ReturnType<typeof authStore.getState>) => T
): T {
	const context = useContext(AuthContext);

	if (!context) throw new Error("Missing AuthContext.Provider in the tree");

	return useStore(context, selector);
}

export const useAuthedUser = () => {
	return useAuthStore((s) => s.user);
};

export const useAuthToken = () => {
	return useAuthStore((s) => s.token);
};

export const useAuthActions = () => {
	return useAuthStore((s) => s.actions);
};
