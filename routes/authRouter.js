import { Router } from "express";

import { signUp, signIn, signOut } from "../controllers/authController.js";
import {
   validateSignUp,
   validateSignIn,
} from "../middlewares/validateAuthMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signin", validateSignIn, signIn);
authRouter.get("/signout", signOut);

export default authRouter;
