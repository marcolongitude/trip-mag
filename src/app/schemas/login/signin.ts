import { z } from "zod";

export const schemaSignin = z.object({
	email: z
		.string()
		.min(6, "Username must be at least 6 characters")
		.email({ message: "Please enter a valid email address." })
		.trim(),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.trim(),
});

export type Signin = z.infer<typeof schemaSignin>;
