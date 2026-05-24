import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authMe = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		// const isBlacklisted = await redis.get(`blacklist:${token}`);
		// if (isBlacklisted) {
		// 	return res.status(401).json({ message: "Unauthorized" });
		// }
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ user });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};
export const register = async (req, res) => {
	const { username, email, password } = req.body;
	console.log(req.body);
	try {
		const isUserExist = await User.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (isUserExist) {
			return res.status(400).json({
				message: "User already exists with this username or email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			username: username,
			email: email,
			password: hashedPassword,
		});

		const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
 
		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/",
			maxAge: 2 * 24 * 60 * 60 * 1000,
		});

		res.status(201).json({
			message: "User registered successfully",

			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (err) {
		console.log(err.response?.data);
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });
	if (!user) {
		return res.status(400).json({
			message: "User not found with this email",
		});
	}

	const isPassword = await bcrypt.compare(password, user.password);

	if (!isPassword) {
		return res.status(401).json({
			message: "Password is wrong",
		});
	}

	const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
	res.cookie("token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		maxAge: 2 * 24 * 60 * 60 * 1000,
	});

	res.status(200).json({
		message: "user login succesfully",
		token,
	});
};

export const logout = async (req, res) => {
	try {
		const token = req.cookies?.token;

		// if (token) {
		// 	try {
		// 		await redis.set(
		// 			`blacklist:${token}`,
		// 			"true",
		// 			"EX",
		// 			60 * 60 * 24 * 7
		// 		);
		// 	} catch (redisErr) {
		// 		console.error("Redis failed:", redisErr.message);
		// 	}
		// }

		res.clearCookie("token", {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
		});

		res.status(200).json({ message: "Logged out successfully" });
	} catch (err) {
		console.error("Logout error:", err);
		res.status(500).json({ message: "Logout failed" });
	}
};
