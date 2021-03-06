import db from "../db.js";

export async function addProductToCart(req, res) {
	const { user } = res.locals;

	try {
		const { _id } = req.body;
		const product = await db.
		collection("products").findOne({_id});
		console.log(product)
		await db.collection("cart").insertOne({
			productId: product._id,
			name: product.name,
			category: product.category,
			price: product.price,
			media: product.media,
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

export async function finish(req, res) {
	const { user } = res.locals;

	try {
		await db.collection("cart").deleteMany({ userId: user._id });
		res.sendStatus(200);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
}
