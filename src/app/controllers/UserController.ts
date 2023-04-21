import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../database/models";
import { IRegisterRequest } from "../interfaces/request";
import {
  registrationRequestSchema,
  loginRequestSchema,
} from "../validators/userSchema";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

class UserController {
  static async register(req: Request<IRegisterRequest>, res: Response) {
    try {
      const value = await registrationRequestSchema.validateAsync(req.body);
      await User.create(req.body);
      res.status(200).json({
        message: "Registration successful",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const value = await loginRequestSchema.validateAsync(req.body);
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(404).send("No user found.");
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "24h",
      });

      res.status(200).json({
        auth: true,
        token: token,
        message: "Login successful",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
}

export default UserController;
