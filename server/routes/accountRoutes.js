import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "Enter both email and password.",
      });
    }
    const { email, password } = req.body;
    const hash = await bcrypt.hash(req.body.password, 13);

    const newAccount = {
      email: req.body.email,
      password: hash,
    };

    const account = await User.create(newAccount);
    console.log(account);
    return res.status(201).send(account);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});  

export default router;