import { Router } from "express";

import { getUser } from "../middlewares/userMiddleware.js";

import {
	addProductToCart,
	getProductsCart,
} from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/cart", getUser, addProductToCart);

cartRouter.get("/cart", getUser, getProductsCart);

export default cartRouter;
