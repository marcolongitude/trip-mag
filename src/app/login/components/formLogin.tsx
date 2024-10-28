"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/globals/inputField";
import { LogIn } from "lucide-react";
import { formSchemaLogin } from "./schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

type Response = {
	data: {
		success: boolean;
		token: string;
		errors?: any;
	};
};

export function FormLogin() {
	const [submitting, setSubmitting] = useState(false);
	console.log(submitting);
	const router = useRouter();
	const methods = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(formSchemaLogin),
	});

	async function fetchQuery(): Promise<Response> {
		const response = fetch("http://localhost:3000/api/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: methods.getValues("email"),
				password: methods.getValues("password"),
			}),
		});

		return (await response).json();
	}

	const onSubmitHandler: SubmitHandler<formSchemaLogin> = async () => {
		const response = await fetchQuery();
		console.log(response);
	};

	return (
		<Form {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmitHandler)}>
				<div className="flex flex-col gap-8">
					<div className="flex flex-col gap-4">
						<InputField
							control={methods.control}
							name="email"
							placeholder="E-mail"
							label="E-mail"
						/>
						<InputField
							control={methods.control}
							name="password"
							placeholder="Senha"
							label="Senha"
						/>
					</div>
					<div className="flex flex-row justify-end">
						<Button type="submit">
							Salvar <LogIn size="16" className="ml-4" />
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
