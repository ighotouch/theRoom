import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import models from "../../database/models/index";
import { IRegisterRequest } from "../interfaces/request";
import { registrationRequestSchema, loginRequestSchema } from "../validators/userSchema";
import "../../database/config/dotenv";
const { User } = models;

const secret = process.env.JWT_SECRET;

class UserController {
  static async register(req: IRegisterRequest, res: express.Response) {
    try {
      const value = await registrationRequestSchema.validateAsync(req.body)
      console.log(value)
      const resp = await User.create(req.body);
      
      return res.status(200).json({
        message: "Registration successful",
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }

  static async login(req: express.Request, res: any) {
    try {
      const value = await loginRequestSchema.validateAsync(req.body)
      const usr = await User.findOne({ where: { email: req.body.email } });

      if (!usr) return res.status(404).send("No user found.");

      if (!usr || !bcrypt.compareSync(req.body.password, usr.password)) {
        return res.status(401).send({ auth: false, token: null, message: 'Invalid Credentials' });
      }

      console.log(process.env)

      var token = jwt.sign({ id: usr.id }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });

      return res.status(200).send({ auth: true, token: token, message: 'success' });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
}

export default UserController;
