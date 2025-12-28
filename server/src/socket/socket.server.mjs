import { Server } from "socket.io";
import { embeddingResponse, generateResponse } from "../service/ai.service.mjs";
import { createMemory, queryMemory } from "../service/vector.service.mjs";
import User from "../models/user.model.mjs";
import Message from "../models/message.model.mjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const setupSocketServer = (httpServer) => {
	console.log("socket")
	const io = new Server(httpServer, {
		cors: {
			origin: "http://localhost:5173",
			methods: ["GET", "POST"],
			credentials: true,
		},
	});
 
	io.use(async (socket, next) => {
		const cookies = cookie.parse(socket.handshake.headers.cookie || "");

		if (!cookies.token) {
			next(new Error("Authentication error"));
			return;
		}

		try {
			const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

			const user = await User.findById(decoded.id);

			socket.user = user;
			next();
		} catch (error) {
			next(new Error("Authentication error"));
		}
	});

	io.on("connection", async (socket) => {
		console.log("New client connected");

		socket.on("ai-prompt", async (data) => {
			console.log("AI Prompt received:", data);

			const [message, vector] = await Promise.all([
				Message.create({
					message: data,
					user: socket.user._id,
					role: "user",
				}),
				embeddingResponse(data),
			]);


			await createMemory({
				vector,
				messageID: message._id,
				metadata: {
					userID: socket.user._id,
					chat: data,
				},
			});

			let [memory, chatHistory] = await Promise.all([
				queryMemory({
					queryVector: vector,
					topK: 3,
					metadata: { userID: socket.user._id },
				}),
				Message.find({ user: socket.user._id })
					.sort({ createdAt: -1 })
					.limit(20)
					.lean(),
			]);

			chatHistory = chatHistory.reverse();
			const stm = chatHistory.map((item) => {
				return {
					role: item.role,
					parts: [{ text: item.message }],
				};
			});

			const ltm = [
				{
					role: "user",
					parts: [
						{
							text: `these are some relevant pieces of information from your past conversations: ${memory
								.map((i) => i.metadata.response)
								.join("\n")}`,
						},
					],
				},
			];

			const response = await generateResponse([...ltm, ...stm]);

			const [responseMessage, responseVector] = await Promise.all([
				Message.create({
					message: response,
					user: socket.user._id,
					role: "assistant",
				}),
				embeddingResponse(response),
			]);

			await createMemory({
				vector: responseVector,
				messageID: message._id,
				metadata: {
					userID: socket.user._id,
					chat: data,
					response: response,
				},
			});

			socket.emit("ai-response", { response });
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
	});
};

export default setupSocketServer;
