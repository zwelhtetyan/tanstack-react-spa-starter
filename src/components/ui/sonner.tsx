import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useTheme } from "@/contexts/theme-context";

export function Toaster({ ...props }: ToasterProps) {
	const { theme = "system" } = useTheme();

	return <SonnerToaster theme={theme} {...props} />;
}
