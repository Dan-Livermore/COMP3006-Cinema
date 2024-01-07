import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

//GET ALL
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET ONE
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const user = await User.findById(id);

    return response.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//UPDATE
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (request.body.email && request.body.password) {
      const hashedPassword = await bcrypt.hash(request.body.password, 13);
      
      const result = await User.findByIdAndUpdate(id, {
        email: request.body.email,
        password: hashedPassword,
      });

      if (!result) {
        return response.status(404).json({ message: "User not found" });
      }

      return response.status(200).send({ message: "User updated successfully" });
    } else if (
      request.body.currentPassword &&
      request.body.newPassword &&
      request.body.email
    ) {
      const user = await User.findById(id);
      const match = await bcrypt.compare(
        request.body.currentPassword,
        user.password
      );

      if (match) {
        const hashedNewPassword = await bcrypt.hash(request.body.newPassword, 13);

        const result = await User.findByIdAndUpdate(id, {
          password: hashedNewPassword,
        });

        if (!result) {
          return response.status(404).json({ message: "User not found" });
        }

        return response
          .status(200)
          .send({ message: "User password updated successfully" });
      } else {
        return response.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      return response.status(400).send({
        message: "Invalid request body",
      });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



//DELETE
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "User not found" });
    }
    return response.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
