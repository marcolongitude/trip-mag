import {
	schemaEditUser,
	schemaUser,
	type User,
} from "@/app/schemas/user/user.schema";

export function useValidation() {
	function validateSignin(data: User) {
		return schemaUser.safeParse(data);
	}

	function validateEditUser(id: Pick<User, "id">) {
		return schemaEditUser.safeParse(id);
	}

	return {
		validateSignin,
		validateEditUser,
	};
}
