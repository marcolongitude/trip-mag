import { NextRequest } from "next/server";
import { handleGetUserById } from "../users.handler";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	console.log("000000000000000000000000");
	const { id } = await params;

	if (!id) {
		return new Response(JSON.stringify({ error: "Missing ID" }), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	try {
		const result = await handleGetUserById({ id }); // Função para buscar usuário pelo ID

		if (!result) {
			return new Response(JSON.stringify({ error: "User not found" }), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}

		return new Response(JSON.stringify({ data: result.data }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Internal server error" }),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
