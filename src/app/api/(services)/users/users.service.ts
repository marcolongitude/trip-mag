import { User } from "@/app/schemas/user/user.schema";
import { prisma } from "../../instances/prisma.instance";

export async function getAllUsers() {
	const users = await prisma.user.findMany({
		include: {
			address: true,
		},
	});

	return users;
}

export async function getUserById(id: Pick<User, "id">) {
	const user = await prisma.user.findUnique({
		where: {
			id: id.id,
		},
		include: {
			address: true,
		},
	});

	return user;
}

export async function createUser(payload: User) {
	const addressData = {
		create: {
			number: payload.address!.number,
			street: payload.address!.street,
			district: payload.address!.district,
			zipCode: payload.address!.zipCode,
			city: payload.address!.city,
			state: payload.address!.state,
			country: payload.address!.country,
		},
	};

	const response = await prisma.user.create({
		data: {
			...payload,
			address: addressData,
		},
	});

	return response;
}
