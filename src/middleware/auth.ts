import { Response, NextFunction, Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
  };
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: "64b8f8aadd593a31ab8f2e74", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
};

export default authMiddleware;
