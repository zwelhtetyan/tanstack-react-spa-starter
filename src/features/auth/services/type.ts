import type { ApiResponse } from "@/lib/api/type";
import type { User } from "../types";

export type SignInRequest = {
	email: string;
	password: string;
};

export type SignInResponse = ApiResponse<{ user: User; token: string }>;

export type SignUpRequest = SignInRequest & {
	name: string;
};

export type SignUpResponse = ApiResponse<{ user: User; token: string }>;
