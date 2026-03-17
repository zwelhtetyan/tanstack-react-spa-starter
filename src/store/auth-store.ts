import { create } from "zustand";
import { ACCESS_TOKEN_NAME } from "@/constants";
import type { User } from "@/features/auth/types";

type AuthState = {
	token: string | null;
	user: User | null;
};
type AuthActions = {
	setAuthState: (authState: { token: string; user: User }) => void;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	reset: () => void;
};
type AuthStore = AuthState & { actions: AuthActions };

export const useAuthStore = create<AuthStore>()((set) => {
	const token = localStorage.getItem(ACCESS_TOKEN_NAME);

	return {
		user: null,
		token,

		actions: {
			setAuthState: ({ user, token }) => {
				localStorage.setItem(ACCESS_TOKEN_NAME, token);

				set(() => ({ user, token }));
			},
			setUser: (user) => set(() => ({ user })),
			setToken: (token) => {
				localStorage.setItem(ACCESS_TOKEN_NAME, token);

				set(() => ({ token }));
			},
			reset: () => {
				localStorage.removeItem(ACCESS_TOKEN_NAME);

				set(() => ({ user: undefined, token: "" }));
			},
		},
	};
});

export const useAuthedUser = () => {
	return useAuthStore((s) => s.user);
};

export const useAuthToken = () => {
	return useAuthStore((s) => s.token);
};

export const useAuthActions = () => {
	return useAuthStore((s) => s.actions);
};
