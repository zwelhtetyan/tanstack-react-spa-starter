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

const products = [
	{
		id: "1",
		title: "Nike Air Max 90",
		price: 129.99,
		description:
			"Classic running shoes with visible Air cushioning for ultimate comfort and style",
		category: "men's shoes",
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
		rating: { rate: 4.5, count: 120 },
	},
	{
		id: "2",
		title: "Adidas Ultraboost 22",
		price: 179.99,
		description:
			"Premium running shoes with Boost midsole for incredible energy return",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
		rating: { rate: 4.7, count: 85 },
	},
	{
		id: "3",
		title: "Converse Chuck Taylor All Star",
		price: 59.99,
		description: "Iconic canvas sneakers perfect for everyday casual wear",
		category: "casual",
		image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500",
		rating: { rate: 4.3, count: 210 },
	},
	{
		id: "4",
		title: "Nike Air Jordan 1 Retro High",
		price: 169.99,
		description: "Legendary basketball shoes with premium leather upper",
		category: "men's shoes",
		image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500",
		rating: { rate: 4.8, count: 95 },
	},
	{
		id: "5",
		title: "New Balance 574 Classic",
		price: 89.99,
		description: "Comfortable casual shoes with ENCAP midsole cushioning",
		category: "casual",
		image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
		rating: { rate: 4.4, count: 150 },
	},
	{
		id: "6",
		title: "Puma RS-X3 Puzzle",
		price: 109.99,
		description: "Bold running shoes with chunky design and comfortable fit",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
		rating: { rate: 4.2, count: 75 },
	},
	{
		id: "7",
		title: "Vans Old Skool",
		price: 69.99,
		description: "Classic skate shoes with durable suede and canvas uppers",
		category: "casual",
		image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
		rating: { rate: 4.6, count: 180 },
	},
	{
		id: "8",
		title: "Nike Air Force 1 '07",
		price: 110.99,
		description: "Legendary basketball-style sneakers with Air cushioning",
		category: "men's shoes",
		image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
		rating: { rate: 4.5, count: 250 },
	},
	{
		id: "9",
		title: "Adidas Stan Smith",
		price: 99.99,
		description: "Classic tennis shoes with clean minimalist design",
		category: "casual",
		image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500",
		rating: { rate: 4.4, count: 130 },
	},
	{
		id: "10",
		title: "Reebok Classic Leather",
		price: 79.99,
		description: "Timeless leather sneakers with die-cut EVA midsole",
		category: "casual",
		image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
		rating: { rate: 4.3, count: 95 },
	},
	{
		id: "11",
		title: "Nike React Infinity Run",
		price: 149.99,
		description: "Revolutionary running shoes with React foam technology",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500",
		rating: { rate: 4.6, count: 110 },
	},
	{
		id: "12",
		title: "Asics Gel-Kayano 28",
		price: 159.99,
		description: "Premium stability running shoes with GEL technology",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
		rating: { rate: 4.7, count: 65 },
	},
	{
		id: "13",
		title: "Jordan Max Aura 3",
		price: 124.99,
		description: "Performance basketball shoes with visible Air unit",
		category: "men's shoes",
		image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500",
		rating: { rate: 4.4, count: 55 },
	},
	{
		id: "14",
		title: "Skechers D'Lites",
		price: 74.99,
		description: "Lightweight memory foam sneakers with sporty design",
		category: "women's shoes",
		image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=500",
		rating: { rate: 4.2, count: 140 },
	},
	{
		id: "15",
		title: "Under Armour HOVR Sonic",
		price: 119.99,
		description: "Zero gravity feel with responsive UA HOVR cushioning",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500",
		rating: { rate: 4.5, count: 80 },
	},
	{
		id: "16",
		title: "Fila Disruptor II",
		price: 64.99,
		description: "Chunky dad sneakers with bold retro design",
		category: "women's shoes",
		image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=500",
		rating: { rate: 4.1, count: 90 },
	},
	{
		id: "17",
		title: "Brooks Ghost 14",
		price: 139.99,
		description: "Smooth neutral running shoes with DNA Loft cushioning",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
		rating: { rate: 4.6, count: 100 },
	},
	{
		id: "18",
		title: "K-Swiss ST-529",
		price: 84.99,
		description: "Classic tennis shoes with durability and style",
		category: "men's shoes",
		image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
		rating: { rate: 4.3, count: 45 },
	},
	{
		id: "19",
		title: "Champion Basic Reverse Weave",
		price: 54.99,
		description: "Casual slip-on sneakers with cushioned footbed",
		category: "casual",
		image: "https://images.unsplash.com/photo-1491553895911-0055uj9662a6?w=500",
		rating: { rate: 4.2, count: 70 },
	},
	{
		id: "20",
		title: "Salomon Speedcross 5",
		price: 144.99,
		description: "Trail running shoes with aggressive grip and protection",
		category: "athletic",
		image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
		rating: { rate: 4.8, count: 60 },
	},
];

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

			// const res = await fetch("https://fakestoreapi.com/products");
			// const products = await res.json();

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
