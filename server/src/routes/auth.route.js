import { Router } from "express";
import { register , login , authMe , logout} from "../controllers/auth.control.js";

const authRouter = Router();


authRouter.post("/register",register);

authRouter.post("/login", login);

authRouter.get("/me", authMe)

authRouter.post("/logout", logout)

export default authRouter;
