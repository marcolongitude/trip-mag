import { Signin } from "@/app/schemas/login/signin";
import { useValidation } from "./validation.hook";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../(services)/login/signin.service";
import { User } from "@/app/schemas/user/user.schema";

type HandleSigninResponse = {
	success: boolean;
	errors?: any;
	token?: string;
	data: Omit<User, "address" | "password"> | undefined;
};

export async function handleSignin({
	email,
	password,
}: Signin): Promise<HandleSigninResponse> {
	const { validateSignin } = useValidation();
	const validate = validateSignin({ email, password });

	if (!process.env.SECTRET_TOKEN_KEY) {
		throw new Error("SECTRET_TOKEN_KEY environment variable is not set");
	}

	if (validate.success) {
		const userExists = await getUserByEmail({ email });
		if (userExists) {
			const token = jwt.sign({ email }, process.env.SECTRET_TOKEN_KEY, {
				expiresIn: "12h",
			});
			return {
				success: true,
				token,
				data: userExists,
				errors: undefined,
			};
		}
	}

	return {
		success: false,
		errors: validate.error?.flatten().fieldErrors,
		data: undefined,
		token: undefined,
	};
}
