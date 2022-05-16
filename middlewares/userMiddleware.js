import db from "../db.js";

export async function getUser(req, res, next) {
	const { authorization } = req.headers;
	console.log(authorization)
	
	const token = authorization?.replace("Bearer", "").trim();

	if (!token) return res.status(401).send("No token found.");

	try {
		const session = await db.collection("sessions").findOne({ token });
		if (!session) return res.status(401).send("Session not found.");

		const user = await db.collection("users").findOne({ _id: session.userId });
		if (!user) return res.status(401).send("User not found.");

		res.locals.user = user;
		next();
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
}
