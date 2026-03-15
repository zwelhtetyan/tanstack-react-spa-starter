import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./contexts/theme-context";
import { queryClient } from "./lib/tanstack-query/query-client";
import { router } from "./router";

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<StrictMode>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ThemeProvider>
		</StrictMode>
	);
}
