import { getUserByEmail } from "../(services)/login/signin.service";
import { User } from "@/app/schemas/user/user.schema";
import {
	createUser,
	getAllUsers,
	getUserById,
} from "../(services)/users/users.service";
import { useValidation } from "./validation.hook";
import bcrypt from "bcryptjs";

type HandleSigninResponse = {
	success: boolean;
	errors?: any;
	token?: string;
	data: Omit<User, "address" | "password"> | undefined;
};

export async function handleCreateUsers(data: User): Promise<any> {
	const { validateSignin } = useValidation();
	const validate = validateSignin(data);

	if (validate.success) {
		const userExists = await getUserByEmail({ email: data.email });
		if (userExists) {
			return {
				success: false,
				data: [],
				errors: "User already exists",
			};
		}

		const passwordHashed = await bcrypt.hash(data.password, 8);

		const payload = {
			...data,
			password: passwordHashed,
		};

		const response = await createUser(payload);

		return {
			success: true,
			data: response,
			errors: undefined,
		};
	}

	return {
		success: false,
		errors: validate.error?.flatten().fieldErrors,
		data: undefined,
		token: undefined,
	};
}

export async function handleGetAllUsers() {
	const listUsers = await getAllUsers();

	return {
		success: true,
		data: listUsers,
		errors: undefined,
	};
}

export async function handleGetUserById(id: Pick<User, "id">) {
	const { validateEditUser } = useValidation();
	const validate = validateEditUser(id);

	if (validate.success) {
		const user = await getUserById(id);

		if (!user) {
			return {
				success: false,
				data: null,
				error: "User not found",
			};
		}

		const { password, ...userWithoutPassword } = user;

		return {
			success: true,
			data: userWithoutPassword,
			error: undefined,
		};
	}

	return {
		success: false,
		data: [],
		error: validate.error?.flatten().fieldErrors,
	};
}

export async function handleEditUsers(id: Pick<User, "id">) {
	const { validateEditUser } = useValidation();
	const validate = validateEditUser(id);

	if (validate.success) {
		const userExists = await handleGetUserById(id);
		return {
			success: true,
			data: userExists,
			errors: undefined,
		};
	}

	return {
		success: false,
		data: [],
		errors: validate.error?.flatten().fieldErrors,
	};
}
