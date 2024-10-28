import { handleCreateUsers, handleGetAllUsers } from "./users.handler";

export async function POST(request: Request) {
	const data = await request.json();

	const result = await handleCreateUsers(data);

	if (result.success) {
		return new Response(JSON.stringify({ data: result }), {
			status: 201,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	if (!result.success && result.errors) {
		return new Response(JSON.stringify({ data: result }), {
			status: 401,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return new Response(JSON.stringify({ data: result }), {
		status: 500,
	});
}

export async function GET() {
	const response = await handleGetAllUsers();

	return new Response(JSON.stringify({ data: response.data }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export async function PUT(request: Request) {
	return new Response(JSON.stringify({ data: "PUT" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
