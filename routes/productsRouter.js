import { Router } from "express";

import { getProducts, postProductFilter } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);

productsRouter.post("/products/filter", postProductFilter)

export default productsRouter;