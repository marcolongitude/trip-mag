import { handleSignin } from "./auth.handler";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	const result = await handleSignin({ email, password });

	if (result.success) {
		return new Response(JSON.stringify({ data: result }), {
			status: 200,
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
