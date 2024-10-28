import { Suspense } from "react";
import { Sidebar } from "@/components/globals/sidebar/sidebar";
import Loading from "./loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientLayout from "@/components/provider/clientLayout";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ClientLayout>
			<div className="flex min-h-screen flex-row">
				{/* Sidebar */}
				<div className="mx-5 mt-16 sm:ml-[270px] sm:mt-3">
					<Sidebar />
				</div>

				{/* Content (children) */}
				<Suspense fallback={<Loading />}>
					{/* <QueryClientProvider client={queryClient}> */}
					<div className="w-full md:w-[calc(100%-270px)]">
						{children}
					</div>
					{/* </QueryClientProvider> */}
				</Suspense>
			</div>
		</ClientLayout>
	);
}
