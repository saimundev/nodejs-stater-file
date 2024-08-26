import { Request, Response, NextFunction } from "express";
import responseHandler from "./responseHandler";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res
    .status(statusCode)
    .json(responseHandler(null, message, false, statusCode));
};

export default errorHandler;
