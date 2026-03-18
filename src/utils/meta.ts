import { appConfig } from "@/config/app-config";

export const createDocumentTitle = ({
	title = "",
	suffix = appConfig.title,
	addSuffix = true,
}: {
	title: string;
	suffix?: string;
	addSuffix?: boolean;
}) => {
	return addSuffix ? `${title} - ${suffix}` : title;
};

export const setDocumentTitle = (title: string) => {
	document.title = title;
};
