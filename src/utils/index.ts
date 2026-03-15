import { forEach, omitBy } from "lodash-es";

export const sanitizePayload = <T extends object>(
	obj: T,
	exclusions: unknown[] = [null, undefined, "", Number.NaN]
) => {
	return omitBy(obj, (v) => {
		if (typeof v === "number" && Number.isNaN(v)) return false;
		return exclusions.includes(v);
	});
};

export const toFormData = <Data extends Record<string, string | Blob>>(
	data: Data
) => {
	const formData = new FormData();

	forEach(data, (value, name) => {
		formData.append(name, value);
	});

	return formData;
};

export const sleep = (delay = 3000) => {
	return new Promise((res) => setTimeout(res, delay));
};

export const mockResponse = <T>(data: T, delay = 3000): Promise<T> => {
	return new Promise((res) => setTimeout(() => res(data), delay));
};

export const pluralizeText = (
	text: string,
	count: number,
	suffix: "s" | "es" = "s"
) => {
	return count === 1 ? text : `${text}${suffix}`;
};
