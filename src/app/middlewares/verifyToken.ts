import express from "express";
import jwt from "jsonwebtoken";
import env from 'dotenv';
import { IValidateTokenRequest } from "../interfaces/request";

env.config();

const secret = process.env.JWT_SECRET;

function verifyToken(req: IValidateTokenRequest, res: express.Response, next: any) {
  const token: any = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, secret, function (err: any, decoded: any) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}
export default verifyToken;
