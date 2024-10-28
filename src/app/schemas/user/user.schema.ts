import { z } from "zod";

const address = z.object({
	street: z.string().min(1, { message: "Por favor, insira uma rua." }),
	number: z.string().min(1, { message: "Por favor, insira um numero." }),
	district: z.string().min(1, { message: "Por favor, insira um bairro." }),
	zipCode: z.string().min(1, { message: "Por favor, insira um CEP." }),
	city: z.string().min(1, { message: "Por favor, insira uma cidade." }),
	state: z.string().min(1, { message: "Por favor, insira um estado." }),
	country: z.string().min(1, { message: "Por favor, insira um pais." }),
});

export const schemaUser = z.object({
	id: z.string().min(1, { message: "Por favor, insira um ID." }).optional(),
	name: z.string().min(1, { message: "Por favor, insira um nome." }),
	email: z.string().email({ message: "Por favor, insira um e-mail valido." }),
	password: z
		.string()
		.min(4, { message: "A senha deve ter nomino 4 caracteres." }),
	phone: z.string().min(1, { message: "Por favor, insira um telefone." }),
	address: address,
});

export type User = z.infer<typeof schemaUser>;

export const schemaGetUser = z.object({
	data: z.array(schemaUser),
});

export type GetUser = z.infer<typeof schemaGetUser>;

export const schemaEditUser = z.object({
	id: z.string().min(1, { message: "Por favor, insira um ID." }).optional(),
});

export type EditUser = z.infer<typeof schemaEditUser>;
