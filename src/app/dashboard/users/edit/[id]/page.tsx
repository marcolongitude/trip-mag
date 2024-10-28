"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/globals/container";
import { FormUsers } from "../components/formUsers";
import { User } from "@/app/schemas/user/user.schema";

export default function EditUserPage() {
	const { id } = useParams();
	const [data, setData] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id || Array.isArray(id)) return;

		// Função para buscar dados do usuário
		const fetchUser = async () => {
			try {
				const response = await fetch(`/api/users/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) throw new Error("Erro ao buscar o usuário");

				const userData = await response.json();
				setData(userData.data);
			} catch (err) {
				setError("Erro ao carregar o usuário.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		// Chama a função fetchUser apenas uma vez após o componente montar
		fetchUser();
	}, [id]);

	if (loading) {
		return <Container title="Editar usuário">Carregando...</Container>;
	}

	if (error) {
		return <Container title="Editar usuário">{error}</Container>;
	}

	// Renderiza o formulário apenas quando os dados são carregados com sucesso
	return (
		<Container title="Editar usuário">
			{data ? (
				<FormUsers user={data} />
			) : (
				<p>Erro ao carregar dados do usuário.</p>
			)}
		</Container>
	);
}
