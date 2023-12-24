import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
      const user = await User.findOne({ email: email });
      if (!user) {
        res.send('User not found');
        return;
      }
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        res.send('Wrong Password');
        return;
      }
      res.send('Login successful!');
  });
  

export default router;