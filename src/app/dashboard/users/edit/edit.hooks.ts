import { type User } from "@/app/schemas/user/user.schema";

export function useEditUserFunctions() {
	async function handleEditUser(id: string): Promise<Omit<User, "password">> {
		const response = await fetch(`/api/users/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user");
		}

		return response.json();
	}

	return {
		handleEditUser,
	};
}
