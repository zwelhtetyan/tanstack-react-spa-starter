import { api } from "@/lib/api";
import type { ApiResponse } from "@/lib/api/type";
import { resolveResponse } from "@/lib/api/utils";
import { sanitizePayload } from "@/utils";
import type { User } from "../types";
import type {
	SignInRequest,
	SignInResponse,
	SignUpRequest,
	SignUpResponse,
} from "./type";

export const authService = {
	signIn: (data: SignInRequest) => {
		return api
			.post("login", { json: sanitizePayload(data) })
			.json<SignInResponse>()
			.then(resolveResponse);
	},

	signUp: (data: SignUpRequest) => {
		return api
			.post("register", { json: sanitizePayload(data) })
			.json<SignUpResponse>()
			.then(resolveResponse);
	},

	signOut: () => {
		return api.post("logout").json<ApiResponse>();
	},

	getMe: () => {
		return api.get("me").json<ApiResponse<User>>().then(resolveResponse);
	},
};
