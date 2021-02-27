import { Request } from "express";
export interface ILoginRequest extends Request {
  email: string;
  password: string;
}

export interface IRegisterRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}

export interface IValidateTokenRequest extends Request {
  userId: string;
}
