import { Response, NextFunction, Request } from "express";

const errorMiddleware = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? "Внутренняя ошибка сервера" : message,
    });
  next();
};

export default errorMiddleware;
