import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

type AppSpinnerType = "full" | "fixed" | "default";
type AppSpinnerProps = ComponentProps<typeof Spinner> & {
	type?: AppSpinnerType;
};

const containerClasses: Record<AppSpinnerType, string> = {
	full: "flex h-dvh w-dvw items-center justify-center",
	fixed: "fixed inset-0 flex items-center justify-center",
	default: "",
};

export function AppSpinner({
	type = "default",
	className,
	...rest
}: AppSpinnerProps) {
	const containerClass = containerClasses[type];

	const spinner = <Spinner className={cn("size-7", className)} {...rest} />;

	if (!containerClass) return spinner;

	return <div className={containerClass}>{spinner}</div>;
}
