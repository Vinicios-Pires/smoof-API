import db from "../db.js";

export default async function getProducts(req, res) {
   const limit = parseInt(req.query.limit)

   try {
      const products = await db.collection("products").find().limit(10).toArray()

      return res.send(products);
   } catch (e) {
      console.log("Error logging out.");
      console.log(e);
      return res.sendStatus(500);
   }
}
