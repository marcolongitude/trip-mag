"use client"; // Adicione esta linha

import { ThemeProvider } from "@/components/provider/theme-provider";
import { useEffect, useState } from "react";
import { ReactQueryProvider } from "./queryClient-provider";

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return (
		<ReactQueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</ReactQueryProvider>
	);
}
