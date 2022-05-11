import db from "../db.js";

export async function addProductToCart(req, res) {
   const { user } = res.locals;

   try {
      const { model, colorway, size, price, img } = req.body;
      await db.collection("cart").insertOne({
         model,
         colorway,
         size,
         price,
         img,
         userId: user._id,
      });
      res.sendStatus(201);
   } catch (e) {
      console.log("Error adding product to cart.");
      console.log(e);
      return res.sendStatus(500);
   }
}

export async function getProductsCart(req, res) {
   const { user } = res.locals;

   try {
      const products = await db
         .collection("cart")
         .find({ userId: user._id })
         .toArray();
      res.send(products);
   } catch (e) {
      console.log("Error getting all products of cart.");
      console.log(e);
      res.sendStatus(500);
   }
}