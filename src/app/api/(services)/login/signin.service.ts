import { prisma } from "../../instances/prisma.instance";
import { User } from "@/app/schemas/user/user.schema";

export async function getUserByEmail({
	email,
}: {
	email: string;
}): Promise<Omit<User, "address" | "password"> | null> {
	const userExist = await prisma.user
		.findUnique({
			where: {
				email: email,
			},
		})
		.catch((error) => {
			console.error("Prisma error:", error);
			throw error;
		});

	if (!userExist) {
		return null;
	}

	const { password, addressId, ...userWithoutPassword } = userExist;

	return userWithoutPassword;
}

// async function testConnection() {
// 	try {
// 		await prisma.$connect();
// 		console.log("Conexão com MongoDB Atlas bem-sucedida!");
// 	} catch (error) {
// 		console.error("Erro ao conectar com MongoDB Atlas:", error);
// 	} finally {
// 		await prisma.$disconnect();
// 	}
// }

// testConnection();
