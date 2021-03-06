import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import cartRouter from "./routes/cartRouter.js";
import productsRouter from "./routes/productsRouter.js";

const app = express();
app.use(json());
app.use(cors());

dotenv.config();

app.use(authRouter);
app.use(cartRouter);
app.use(productsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
   console.log(`Server running on: http://localhost:${port}`);
});
