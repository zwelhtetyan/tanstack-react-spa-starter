import { password as bunPassword, randomUUIDv7, serve } from "bun";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const users: Array<{
	id: string;
	name: string;
	email: string;
	password: string;
}> = [];
const sessions = new Map<string, string>(); // token -> userId

function generateToken(): string {
	return randomUUIDv7();
}

function getUserFromToken(token: string | undefined) {
	if (!token) return;
	const userId = sessions.get(token);
	if (!userId) return;
	return users.find((u) => u.id === userId);
}

const server = serve({
	port: 8000,
	// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <>
	async fetch(req) {
		const url = new URL(req.url);
		const path = url.pathname;
		const method = req.method;

		// Handle OPTIONS preflight requests for all paths
		if (method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		// POST /api/v1/register
		if (path === "/api/v1/register" && method === "POST") {
			const body = await req.json();
			const { name, email, password } = body;

			if (!(name && email && password)) {
				return Response.json(
					{ message: "Name, email, and password are required", status: 400 },
					{ status: 400, headers: corsHeaders }
				);
			}

			if (users.find((u) => u.email === email)) {
				return Response.json(
					{ message: "Email already exists", status: 400 },
					{ status: 400, headers: corsHeaders }
				);
			}

			const hashedPassword = await bunPassword.hash(password);
			const user = {
				id: randomUUIDv7(),
				name,
				email,
				password: hashedPassword,
			};
			users.push(user);

			const token = generateToken();
			sessions.set(token, user.id);

			const { password: _, ...userWithoutPassword } = user;
			return Response.json(
				{
					message: "Registration successful",
					data: { user: userWithoutPassword, token },
					status: 201,
				},
				{ status: 201, headers: corsHeaders }
			);
		}

		// POST /api/v1/login
		if (path === "/api/v1/login" && method === "POST") {
			const body = await req.json();
			const { email, password } = body;

			if (!(email && password)) {
				return Response.json(
					{ message: "Email and password are required", status: 400 },
					{ status: 400, headers: corsHeaders }
				);
			}

			const user = users.find((u) => u.email === email);
			if (!user) {
				return Response.json(
					{ message: "Invalid credentials", status: 401 },
					{ status: 401, headers: corsHeaders }
				);
			}

			const isValidPassword = await bunPassword.verify(password, user.password);
			if (!isValidPassword) {
				return Response.json(
					{ message: "Invalid credentials", status: 401 },
					{ status: 401, headers: corsHeaders }
				);
			}

			const token = generateToken();
			sessions.set(token, user.id);

			const { password: _, ...userWithoutPassword } = user;
			return Response.json(
				{
					message: "Login successful",
					data: { user: userWithoutPassword, token },
					status: 200,
				},
				{ headers: corsHeaders }
			);
		}

		// POST /api/v1/logout
		if (path === "/api/v1/logout" && method === "POST") {
			const authHeader = req.headers.get("Authorization");
			const token = authHeader?.replace("Bearer ", "");

			if (token && sessions.has(token)) {
				sessions.delete(token);
			}

			return Response.json(
				{ message: "Logged out successfully", status: 200 },
				{ headers: corsHeaders }
			);
		}

		// GET /api/v1/me
		if (path === "/api/v1/me" && method === "GET") {
			const authHeader = req.headers.get("Authorization");
			const token = authHeader?.replace("Bearer ", "");
			const user = getUserFromToken(token);

			if (!user) {
				return Response.json(
					{ message: "Unauthorized", status: 401 },
					{ status: 401, headers: corsHeaders }
				);
			}

			const { password: _, ...userWithoutPassword } = user;
			return Response.json(
				{
					message: "User retrieved successfully",
					data: userWithoutPassword,
					status: 200,
				},
				{ headers: corsHeaders }
			);
		}

		// GET /api/v1/products
		if (path === "/api/v1/products" && method === "GET") {
			const authHeader = req.headers.get("Authorization");
			const token = authHeader?.replace("Bearer ", "");
			const user = getUserFromToken(token);

			if (!user) {
				return Response.json(
					{ message: "Unauthorized", status: 401 },
					{ status: 401, headers: corsHeaders }
				);
			}

			const res = await fetch("https://fakestoreapi.com/products");
			const products = await res.json();
			return Response.json(
				{
					message: "Products retrieved successfully",
					data: products,
					status: 200,
				},
				{ headers: corsHeaders }
			);
		}

		return Response.json(
			{ message: "Not found", status: 404 },
			{ status: 404, headers: corsHeaders }
		);
	},
});

console.log(`Server is listening on ${server.url}`);
