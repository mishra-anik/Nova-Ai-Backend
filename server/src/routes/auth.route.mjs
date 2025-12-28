import { Router } from "express";
import { register , login , authMe} from "../controllers/auth.control.mjs";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Auth route is working");
}
);
authRouter.post("/register",register);

authRouter.post("/login", login);

authRouter.get("/me", authMe)

export default authRouter;
