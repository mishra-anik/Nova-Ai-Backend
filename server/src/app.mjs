import express from "express";

import authRouter from "./routes/auth.route.mjs";

import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://nova-ai-backend-tiyg.onrender.com",
		credentials: true,
	})
);

app.use("/api/auth", authRouter);

export default app;
