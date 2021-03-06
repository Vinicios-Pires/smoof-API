import db from "../db.js";

export async function getProducts(req, res) {
   const page = parseInt(req.query.page) || 1

   try {
      const products = await db.collection("products").find().toArray()

      const names = []
      const models = []

      products.forEach(item => {
         const {name} = item 
         if (!names.includes(name)) {
            names.push(name)
            models.push(item)
         }
      })

      const pageModels = models.filter((model, index) => index < page * 5)

      return res.send(pageModels);
   } catch (e) {
      console.log("Error");
      console.log(e);
      return res.sendStatus(500);
   }
}


export async function postProductFilter(req, res) {
   try {
      const filters = req.body;

      console.log(filters)

      const products = await db.collection("products").find({...filters}).toArray()

      return res.send(products);
   } catch (e) {
      console.log("Error");
      console.log(e);
      return res.sendStatus(500);
   }
} 