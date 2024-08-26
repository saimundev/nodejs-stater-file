import express from "express";
import {
  CreateUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/user", getUsers);
userRouter.get("/user/:id", getUser);
userRouter.post("/user", CreateUser);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

export default userRouter;
