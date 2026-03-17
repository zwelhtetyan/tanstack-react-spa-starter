import { ACCESS_TOKEN_NAME } from "@/constants";
import { authService } from "@/features/auth/services";
import { useAuthStore } from "@/store/auth-store";

export async function checkAuth() {
	const tokenFromLS = localStorage.getItem(ACCESS_TOKEN_NAME);
	if (!tokenFromLS) return;

	let user = useAuthStore.getState().user;
	const token = useAuthStore.getState().token;

	const hasTokenChanged = token && token !== tokenFromLS;
	const shouldRevalidateAuthState = hasTokenChanged || (token && !user);

	if (hasTokenChanged) {
		useAuthStore.getState().actions.setToken(tokenFromLS);
	}

	if (shouldRevalidateAuthState) {
		try {
			user = await authService.getMe();
			useAuthStore.getState().actions.setUser(user);
		} catch {
			//
		}
	}

	return user;
}
