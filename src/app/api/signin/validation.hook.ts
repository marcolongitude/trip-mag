import { schemaSignin } from "@/app/schemas/login/signin";

export function useValidation() {
	function validateSignin({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) {
		return schemaSignin.safeParse({ email, password });
	}

	return {
		validateSignin,
	};
}
