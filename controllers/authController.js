import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../db.js";

// signup
export async function signUp(req, res) {
   const { name, email, password, confirmPassword } = req.body;

   try {
      await db.collection("users").insertOne({
         name,
         email,
         password: bcrypt.hashSync(password, 10),
      });

      res.sendStatus(201);
   } catch (e) {
      console.log("Error creating new user.");
      console.log(e);
      return res.sendStatus(500);
   }
}

// signin
export async function signIn(req, res) {
   const { email, password } = req.body;

   try {
      const user = await db.collection("users").findOne({ email });
      if (!user) return res.sendStatus(404);

      if (user && bcrypt.compareSync(password, user.password)) {
         const token = uuid();
         await db.collection("sessions").insertOne({ token, userId: user._id });
         return res.send({ token });
      }

      return res.sendStatus(404);
   } catch (e) {
      console.log("Error recovering user.");
      console.log(error);
      return res.sendStatus(500);
   }
}

// signout
export async function signOut(req, res) {
   const { authorization } = req.headers;
   const token = authorization?.replace("Bearer", "").trim();
   if (!token) return res.sendStatus(403);

   try {
      await db.collection("sessions").deleteOne({ token });
      res.sendStatus(200);
   } catch (e) {
      console.log("Error logging out.");
      console.log(e);
      return res.sendStatus(500);
   }
}
