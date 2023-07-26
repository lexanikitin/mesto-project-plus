import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorWithCode from "../utilities/ErrorWithCode";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;
  if (!cookie) {
    next(ErrorWithCode.unauthorized());
  }
  try {
    const payload:JwtPayload | string = jwt.verify(cookie!.split("=")[1], "mesto-secret");

    req.user = {
      // @ts-ignore
      _id: payload,
    };
  } catch (error) {
    next(ErrorWithCode.unauthorized());
  }
};

export default authMiddleware;
