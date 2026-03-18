import { ACCESS_TOKEN_NAME } from "@/constants";
import { authService } from "@/features/auth/services";
import { authStore } from "@/store/auth-store";

export async function checkAuth() {
	const tokenFromLS = localStorage.getItem(ACCESS_TOKEN_NAME);
	if (!tokenFromLS) return;

	let user = authStore.getState().user;
	const token = authStore.getState().token;

	const hasTokenChanged = token && token !== tokenFromLS;
	const shouldRevalidateAuthState = hasTokenChanged || (token && !user);

	if (hasTokenChanged) {
		authStore.getState().actions.setToken(tokenFromLS);
	}

	if (shouldRevalidateAuthState) {
		try {
			user = await authService.getMe();
			authStore.getState().actions.setUser(user);
		} catch {
			//
		}
	}

	return user;
}
