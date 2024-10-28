import { ModeToggle } from "@/components/globals/toogleTheme";
import { FormLogin } from "./components/formLogin";

export default function LoginPage() {
	return (
		<div className="align-center flex h-screen w-screen flex-1 items-center justify-center">
			<div className="ml-10 mr-10 w-full max-w-lg rounded-lg border border-gray-300 p-6 sm:p-8">
				<div className="mb-8 flex flex-col w-full justify-center align-items-center gap-8">
					<div className="w-full flex justify-end">
						<ModeToggle />
					</div>
					<span className="text-2xl font-bold">MAG - TRIPS</span>
				</div>
				<div className="flex flex-col gap-4">
					<FormLogin />
				</div>
			</div>
		</div>
	);
}
