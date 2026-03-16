import ky, { type KyInstance, type Options } from "ky";
import { env } from "@/env";
import {
	AfterResponseHooks,
	beforeErrorHooks,
	beforeRequestHooks,
	beforeRetryHooks,
} from "./hooks";

const BASE_URL = env.VITE_API_URL;
const API_PREFIX = "api";
const API_VERSION = "v1";

const API_URL = `${BASE_URL}/${API_PREFIX}/${API_VERSION}`;

const retryOptions: Options["retry"] = { limit: 2, jitter: true };
const retry = import.meta.env.DEV ? 0 : retryOptions;

export const api = ky.create({
	prefixUrl: API_URL,
	retry,
	hooks: {
		beforeRequest: beforeRequestHooks,
		beforeRetry: beforeRetryHooks,
		beforeError: beforeErrorHooks,
		afterResponse: AfterResponseHooks,
	},
});

export const withAbort = (api: KyInstance) => {
	const controller = new AbortController();

	const request = api.extend({
		signal: controller.signal,
	});

	return { request, abort: () => controller.abort() };
};
