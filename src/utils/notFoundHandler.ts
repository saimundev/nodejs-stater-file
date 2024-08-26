import { Request, Response } from "express";
import responseHandler from "./responseHandler";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(responseHandler(null, "Route not found", false, 404));
};

export default notFoundHandler;
