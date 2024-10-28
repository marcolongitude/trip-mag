"use client";

import { useForm } from "react-hook-form";
import { FormContainer } from "@/components/globals/formContainer";
import { InputField } from "@/components/globals/inputField";
import { formSchemaEditUser, type FormEditUser } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormUserProps = {
	user: FormEditUser;
};

export function FormUsers({ user }: FormUserProps) {
	const router = useRouter();
	console.log(user);
	const methods = useForm<FormEditUser>({
		defaultValues: {
			name: user.name ?? "",
			email: user.email,
			phone: user.phone,
			address: {
				street: user.address?.street ?? "",
				number: user.address?.number ?? "",
				district: user.address?.district ?? "",
				zipCode: user.address?.zipCode ?? "",
				city: user.address?.city ?? "",
				state: user.address?.state ?? "",
				country: user.address?.country ?? "",
			},
		},
		resolver: zodResolver(formSchemaEditUser),
	});

	function onSubmit(data: FormEditUser) {
		const payload: FormEditUser = {
			id: user.id ?? "",
			name: data.name,
			email: data.email,
			phone: data.phone,
			address: {
				street: data.address.street,
				number: data.address.number,
				district: data.address.district,
				zipCode: data.address.zipCode,
				city: data.address.city,
				state: data.address.state,
				country: data.address.country,
			},
		};
		console.log(payload);
	}

	return (
		<FormContainer<FormEditUser> form={methods} onSubmit={onSubmit}>
			<InputField
				control={methods.control}
				label="Nome"
				name="name"
				placeholder="Nome"
			/>
			<InputField
				control={methods.control}
				label="e-mail"
				name="email"
				placeholder="e-mail"
			/>
			<InputField
				control={methods.control}
				label="Telefone"
				name="phone"
				placeholder="Telefone"
			/>
			<InputField
				control={methods.control}
				label="Rua/Avenida"
				name="address.street"
				placeholder="Rua/Avenida"
			/>
			<InputField
				control={methods.control}
				label="Número"
				name="address.number"
				placeholder="Número"
			/>
			<InputField
				control={methods.control}
				label="Bairro"
				name="address.district"
				placeholder="Bairro"
			/>
			<InputField
				control={methods.control}
				label="CEP"
				name="address.zipCode"
				placeholder="CEP"
			/>
			<InputField
				control={methods.control}
				label="Cidade"
				name="address.city"
				placeholder="Cidade"
			/>
			<InputField
				control={methods.control}
				label="Estado"
				name="address.state"
				placeholder="Estado"
			/>
			<InputField
				control={methods.control}
				label="País"
				name="address.country"
				placeholder="País"
			/>
		</FormContainer>
	);
}
