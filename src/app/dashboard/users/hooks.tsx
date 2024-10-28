import { type GetUser } from "@/app/schemas/user/user.schema";
import React from "react";

export function useUsersFunctions() {
	const [openModalDeleteUser, setOpenModalDeleteUser] = React.useState(false);
	const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
		null
	);
	const [listUsers, setListUsers] = React.useState<GetUser>({} as GetUser);
	const [isLoading, setIsLoading] = React.useState(true);

	const fetchUsers = async () => {
		setIsLoading(true); // Define loading como verdadeiro enquanto busca
		const response = await fetch("/api/users", {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
			cache: "force-cache",
			next: {
				revalidate: 10,
				tags: ["users"],
			},
		});
		if (response.ok) {
			const data: GetUser = await response.json();
			setListUsers(data); // Atualiza a lista de usuários
		} else {
			console.error("Failed to fetch users");
		}
		setIsLoading(false); // Define loading como falso após a busca
	};

	React.useEffect(() => {
		fetchUsers();
	}, []);

	function handleModalDeleteUser(userId: string) {
		setSelectedUserId(userId);
		setOpenModalDeleteUser(true);
	}

	return {
		handleModalDeleteUser,
		selectedUserId,
		openModalDeleteUser,
		setSelectedUserId,
		setOpenModalDeleteUser,
		listUsers,
		isLoading,
	};
}
