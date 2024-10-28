"use client";

import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<QueryClientProvider client={queryClient} {...props}>
			{children}
		</QueryClientProvider>
	);
}
