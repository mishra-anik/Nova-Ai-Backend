import express from "express";

import authRouter from "./routes/auth.route.js";

import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});


app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://nova-ai-wine.vercel.app",
		credentials: true,
	})
);

app.use("/api/auth", authRouter);

export default app;
