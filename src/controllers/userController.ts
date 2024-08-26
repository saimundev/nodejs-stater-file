import { NextFunction, Request, Response } from "express";
import responseHandler from "../utils/responseHandler";
import prisma from "../utils/prisma";
import { userSchema } from "../validation/userValidation";
import { Prisma } from "@prisma/client";
import responseHandlerWithPagination from "../utils/responseHandlerWithPagination";
import ValidationError from "../utils/validationError";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseUserData = userSchema.safeParse(req.body);
    if (!parseUserData.success) {
      if (!parseUserData.success) {
        throw new ValidationError(parseUserData.error.errors[0]?.message, 400);
      }
    }

    const { name, email } = parseUserData.data;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res
      .status(201)
      .json(responseHandler(newUser, "user create successful", true, 200));
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchQuery = String(req.query.search || "");
    const skip = (page - 1) * limit;

    const searchFilter = searchQuery
      ? {
          name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        }
      : {};
    const totalUsers = await prisma.user.count({
      where: searchFilter,
    });

    // Log the se
    const getUsers = await prisma.user.findMany({
      where: searchFilter,
      skip,
      take: limit,
      orderBy: { name: "desc" },
    });

    const extraData = {
      total: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      firstPage: 1,
      lastPage: Math.ceil(totalUsers / limit),
    };
    res
      .status(200)
      .json(
        responseHandlerWithPagination(
          getUsers,
          extraData,
          "users found",
          true,
          200
        )
      );
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    res.status(200).json(responseHandler(user, "users found", true, 200));
  } catch (error) {
    res
      .status(200)
      .json(
        responseHandler(getUsers, "Internal server error", false, 500, error)
      );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    const parseUserData = userSchema.safeParse(req.body);
    if (!parseUserData.success) {
      return res
        .status(400)
        .json(
          responseHandler(
            null,
            "validation error",
            false,
            400,
            parseUserData.error.errors
          )
        );
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: parseUserData.data,
    });

    if (!user)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    res.status(200).json(responseHandler(user, "users found", true, 200));
  } catch (error) {
    res
      .status(200)
      .json(
        responseHandler(getUsers, "Internal server error", false, 500, error)
      );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    const user = await prisma.user.delete({
      where: { id: id },
    });

    if (!user)
      return res
        .status(400)
        .json(responseHandler(null, "User not found", false, 400));

    res
      .status(200)
      .json(responseHandler(user, "User delete successfully", true, 200));
  } catch (error) {
    res
      .status(500)
      .json(
        responseHandler(getUsers, "Internal server error", false, 500, error)
      );
  }
};
